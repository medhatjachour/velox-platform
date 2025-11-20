/**
 * NFC Service
 * 
 * Business logic for NFC card management and tap tracking.
 */

import { NfcCardRepository, INfcCardRepository, LeadRepository, ILeadRepository } from '@/lib/repositories';
import { PortfolioService } from './portfolio.service';
import { UserService } from './user.service';
import {
  NfcCard,
  CreateNfcCardDTO,
  UpdateNfcCardDTO,
  CreateLeadDTO,
  Lead,
} from '@/types';
import {
  NfcCardNotFoundError,
  ValidationError,
  ForbiddenError,
  DuplicateError,
  QuotaExceededError,
} from '@/lib/errors';
import { requireOwnership } from '@/lib/auth';
import { nanoid } from 'nanoid';

export interface INfcService {
  getNfcCardById(id: string): Promise<NfcCard>;
  getUserNfcCards(userId: string): Promise<NfcCard[]>;
  createNfcCard(userId: string, data: Omit<CreateNfcCardDTO, 'userId' | 'cardUid' | 'shortCode'>): Promise<NfcCard>;
  updateNfcCard(id: string, userId: string, data: UpdateNfcCardDTO): Promise<NfcCard>;
  deleteNfcCard(id: string, userId: string): Promise<void>;
  handleNfcTap(shortCode: string, metadata?: Record<string, string>): Promise<{ redirectUrl: string; portfolioId: string }>;
  captureLead(shortCode: string, leadData: Omit<CreateLeadDTO, 'portfolioId' | 'userId' | 'nfcCardId'>): Promise<Lead>;
}

export class NfcService implements INfcService {
  constructor(
    private nfcCardRepository: INfcCardRepository = new NfcCardRepository(),
    private leadRepository: ILeadRepository = new LeadRepository(),
    private portfolioService: PortfolioService = new PortfolioService(),
    private userService: UserService = new UserService()
  ) {}

  async getNfcCardById(id: string): Promise<NfcCard> {
    const card = await this.nfcCardRepository.findById(id);
    
    if (!card) {
      throw new NfcCardNotFoundError(id);
    }
    
    return card;
  }

  async getUserNfcCards(userId: string): Promise<NfcCard[]> {
    await this.userService.getUserById(userId);
    return await this.nfcCardRepository.findByUserId(userId);
  }

  async createNfcCard(
    userId: string,
    data: Omit<CreateNfcCardDTO, 'userId' | 'cardUid' | 'shortCode'>
  ): Promise<NfcCard> {
    // Check user quota
    await this.userService.requireQuota(userId, 'nfcCards');

    // Validate portfolio if provided
    if (data.portfolioId) {
      const portfolio = await this.portfolioService.getPortfolioById(data.portfolioId);
      if (portfolio.userId !== userId) {
        throw new ForbiddenError('You can only link NFC cards to your own portfolios');
      }
    }

    // Generate unique card UID and short code
    const cardUid = this.generateCardUid();
    const shortCode = await this.generateUniqueShortCode();

    // Create the card
    const card = await this.nfcCardRepository.create({
      userId,
      cardUid,
      shortCode,
      portfolioId: data.portfolioId,
      status: data.status || 'ACTIVE',
    });

    return card;
  }

  async updateNfcCard(id: string, userId: string, data: UpdateNfcCardDTO): Promise<NfcCard> {
    const card = await this.getNfcCardById(id);
    const user = await this.userService.getUserById(userId);

    // Check ownership
    requireOwnership(card.userId, userId, user.role);

    // Validate portfolio if being updated
    if (data.portfolioId) {
      const portfolio = await this.portfolioService.getPortfolioById(data.portfolioId);
      if (portfolio.userId !== userId) {
        throw new ForbiddenError('You can only link NFC cards to your own portfolios');
      }
    }

    // Update the card
    const updatedCard = await this.nfcCardRepository.update(id, data);
    return updatedCard;
  }

  async deleteNfcCard(id: string, userId: string): Promise<void> {
    const card = await this.getNfcCardById(id);
    const user = await this.userService.getUserById(userId);

    // Check ownership
    requireOwnership(card.userId, userId, user.role);

    await this.nfcCardRepository.delete(id);
  }

  /**
   * Handle NFC tap - redirect to portfolio and track the tap
   */
  async handleNfcTap(
    shortCode: string,
    metadata?: Record<string, string>
  ): Promise<{ redirectUrl: string; portfolioId: string }> {
    // Find the NFC card
    const card = await this.nfcCardRepository.findByShortCode(shortCode);
    
    if (!card) {
      throw new NfcCardNotFoundError();
    }

    // Check if card is active
    if (card.status !== 'ACTIVE') {
      throw new ValidationError('This NFC card is not active');
    }

    // Get the linked portfolio
    if (!card.portfolioId) {
      throw new ValidationError('This NFC card is not linked to a portfolio');
    }

    const portfolio = await this.portfolioService.getPortfolioById(card.portfolioId);

    // Increment tap count asynchronously
    this.nfcCardRepository.incrementTapCount(card.id).catch(console.error);

    // Increment portfolio view count asynchronously
    this.portfolioService['portfolioRepository'].incrementViewCount(portfolio.id).catch(console.error);

    // TODO: Track detailed analytics (IP, user agent, etc.) using metadata

    // Get the portfolio owner's username for the URL
    const user = await this.userService.getUserById(portfolio.userId);
    
    const redirectUrl = user.username 
      ? `/${user.username}/${portfolio.slug}`
      : `/portfolio/${portfolio.id}`;

    return {
      redirectUrl,
      portfolioId: portfolio.id,
    };
  }

  /**
   * Capture a lead from NFC tap
   */
  async captureLead(
    shortCode: string,
    leadData: Omit<CreateLeadDTO, 'portfolioId' | 'userId' | 'nfcCardId'>
  ): Promise<Lead> {
    // Find the NFC card
    const card = await this.nfcCardRepository.findByShortCode(shortCode);
    
    if (!card) {
      throw new NfcCardNotFoundError();
    }

    if (!card.portfolioId) {
      throw new ValidationError('This NFC card is not linked to a portfolio');
    }

    // Validate required fields
    if (!leadData.name || !leadData.email) {
      throw new ValidationError('Name and email are required');
    }

    // Create the lead
    const lead = await this.leadRepository.create({
      ...leadData,
      portfolioId: card.portfolioId,
      userId: card.userId,
      nfcCardId: card.id,
      source: 'nfc_tap',
    });

    // TODO: Trigger CRM sync if enabled for the user
    // TODO: Send notification email to portfolio owner

    return lead;
  }

  // ============================================================================
  // HELPER METHODS
  // ============================================================================

  /**
   * Generate a unique card UID
   */
  private generateCardUid(): string {
    return `NFC-${nanoid(16).toUpperCase()}`;
  }

  /**
   * Generate a unique short code for NFC redirects
   */
  private async generateUniqueShortCode(): string {
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      // Generate a short code (6 characters, alphanumeric)
      const code = nanoid(6).toLowerCase();
      
      // Check if it's unique
      const existing = await this.nfcCardRepository.findByShortCode(code);
      
      if (!existing) {
        return code;
      }
      
      attempts++;
    }

    throw new Error('Failed to generate unique short code');
  }
}

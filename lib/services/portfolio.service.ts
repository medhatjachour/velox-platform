/**
 * Portfolio Service
 * 
 * Business logic for portfolio management.
 * Handles portfolio CRUD, publishing, and validation.
 */

import { PortfolioRepository, IPortfolioRepository } from '@/lib/repositories';
import { UserService, IUserService } from './user.service';
import { 
  Portfolio, 
  CreatePortfolioDTO, 
  UpdatePortfolioDTO,
  PortfolioWithRelations,
  User
} from '@/types';
import { 
  PortfolioNotFoundError, 
  ValidationError, 
  ForbiddenError,
  DuplicateError
} from '@/lib/errors';
import { requireOwnership, getFeatureAccess } from '@/lib/auth';

export interface IPortfolioService {
  getPortfolioById(id: string): Promise<Portfolio>;
  getPortfolioBySlug(slug: string, userId?: string): Promise<Portfolio>;
  getUserPortfolios(userId: string): Promise<Portfolio[]>;
  getPublicPortfolio(username: string, slug: string): Promise<PortfolioWithRelations>;
  createPortfolio(userId: string, data: CreatePortfolioDTO): Promise<Portfolio>;
  updatePortfolio(id: string, userId: string, data: UpdatePortfolioDTO): Promise<Portfolio>;
  deletePortfolio(id: string, userId: string): Promise<void>;
  publishPortfolio(id: string, userId: string): Promise<Portfolio>;
  unpublishPortfolio(id: string, userId: string): Promise<Portfolio>;
}

export class PortfolioService implements IPortfolioService {
  constructor(
    private portfolioRepository: IPortfolioRepository = new PortfolioRepository(),
    private userService: IUserService = new UserService()
  ) {}

  /**
   * Get portfolio by ID
   */
  async getPortfolioById(id: string): Promise<Portfolio> {
    const portfolio = await this.portfolioRepository.findById(id);
    
    if (!portfolio) {
      throw new PortfolioNotFoundError(id);
    }
    
    return portfolio;
  }

  /**
   * Get portfolio by slug
   */
  async getPortfolioBySlug(slug: string, userId?: string): Promise<Portfolio> {
    const portfolio = await this.portfolioRepository.findBySlug(slug, userId);
    
    if (!portfolio) {
      throw new PortfolioNotFoundError();
    }
    
    return portfolio;
  }

  /**
   * Get all portfolios for a user
   */
  async getUserPortfolios(userId: string): Promise<Portfolio[]> {
    await this.userService.getUserById(userId);
    return await this.portfolioRepository.findByUserId(userId);
  }

  /**
   * Get public portfolio for viewing (by username and slug)
   */
  async getPublicPortfolio(username: string, slug: string): Promise<PortfolioWithRelations> {
    const portfolio = await this.portfolioRepository.findPublishedByUsernameAndSlug(username, slug);
    
    if (!portfolio) {
      throw new PortfolioNotFoundError();
    }

    // Increment view count asynchronously (don't await)
    this.portfolioRepository.incrementViewCount(portfolio.id).catch(console.error);
    
    return portfolio as PortfolioWithRelations;
  }

  /**
   * Create a new portfolio
   */
  async createPortfolio(userId: string, data: CreatePortfolioDTO): Promise<Portfolio> {
    // Check user quota
    await this.userService.requireQuota(userId, 'portfolios');

    // Validate required fields
    if (!data.title || !data.slug) {
      throw new ValidationError('Title and slug are required');
    }

    // Validate slug format
    if (!this.isValidSlug(data.slug)) {
      throw new ValidationError('Slug must contain only lowercase letters, numbers, and hyphens');
    }

    // Check if slug already exists for this user
    const existingPortfolio = await this.portfolioRepository.findBySlug(data.slug, userId);
    if (existingPortfolio) {
      throw new DuplicateError('slug');
    }

    // Create portfolio
    const portfolio = await this.portfolioRepository.create({
      ...data,
      userId,
    });

    return portfolio;
  }

  /**
   * Update portfolio
   */
  async updatePortfolio(id: string, userId: string, data: UpdatePortfolioDTO): Promise<Portfolio> {
    const portfolio = await this.getPortfolioById(id);
    const user = await this.userService.getUserById(userId);

    // Check ownership
    requireOwnership(portfolio.userId, userId, user.role);

    // Validate slug if being updated
    if (data.slug) {
      if (!this.isValidSlug(data.slug)) {
        throw new ValidationError('Slug must contain only lowercase letters, numbers, and hyphens');
      }
      
      const existingPortfolio = await this.portfolioRepository.findBySlug(data.slug, userId);
      if (existingPortfolio && existingPortfolio.id !== id) {
        throw new DuplicateError('slug');
      }
    }

    // Validate custom domain feature
    if (data.customDomain) {
      const features = getFeatureAccess(user.subscriptionTier);
      if (!features.canUseCustomDomain) {
        throw new ForbiddenError('Custom domain requires PRO subscription or higher');
      }
    }

    // Update portfolio
    const updatedPortfolio = await this.portfolioRepository.update(id, data);
    return updatedPortfolio;
  }

  /**
   * Delete portfolio
   */
  async deletePortfolio(id: string, userId: string): Promise<void> {
    const portfolio = await this.getPortfolioById(id);
    const user = await this.userService.getUserById(userId);

    // Check ownership
    requireOwnership(portfolio.userId, userId, user.role);

    await this.portfolioRepository.delete(id);
  }

  /**
   * Publish portfolio (make it publicly visible)
   */
  async publishPortfolio(id: string, userId: string): Promise<Portfolio> {
    const portfolio = await this.getPortfolioById(id);
    const user = await this.userService.getUserById(userId);

    // Check ownership
    requireOwnership(portfolio.userId, userId, user.role);

    // Validate portfolio has required content
    if (!portfolio.title || !portfolio.slug) {
      throw new ValidationError('Portfolio must have a title and slug before publishing');
    }

    // Update to published
    return await this.portfolioRepository.update(id, { isPublished: true });
  }

  /**
   * Unpublish portfolio
   */
  async unpublishPortfolio(id: string, userId: string): Promise<Portfolio> {
    const portfolio = await this.getPortfolioById(id);
    const user = await this.userService.getUserById(userId);

    // Check ownership
    requireOwnership(portfolio.userId, userId, user.role);

    return await this.portfolioRepository.update(id, { isPublished: false });
  }

  /**
   * Get portfolio with full details (projects, analytics, etc.)
   */
  async getPortfolioDetails(id: string, userId: string): Promise<PortfolioWithRelations> {
    const portfolio = await this.getPortfolioById(id);
    const user = await this.userService.getUserById(userId);

    // Check ownership
    requireOwnership(portfolio.userId, userId, user.role);

    const details = await this.portfolioRepository.findByIdWithRelations(id);
    
    if (!details) {
      throw new PortfolioNotFoundError(id);
    }

    return details as PortfolioWithRelations;
  }

  // ============================================================================
  // VALIDATION HELPERS
  // ============================================================================

  private isValidSlug(slug: string): boolean {
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    return slugRegex.test(slug) && slug.length >= 3 && slug.length <= 60;
  }
}

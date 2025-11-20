/**
 * Analytics Service
 * 
 * Business logic for portfolio analytics and view tracking.
 */

import { AnalyticsRepository, IAnalyticsRepository } from '@/lib/repositories/analytics.repository';
import { PortfolioService } from './portfolio.service';
import { UserService } from './user.service';
import {
  PortfolioView,
  CreatePortfolioViewDTO,
  AnalyticsSummary,
} from '@/types';
import { requireOwnership } from '@/lib/auth';

export interface IAnalyticsService {
  trackView(portfolioId: string, metadata: Omit<CreatePortfolioViewDTO, 'portfolioId'>): Promise<PortfolioView>;
  getPortfolioAnalytics(portfolioId: string, userId: string, startDate?: Date, endDate?: Date): Promise<AnalyticsSummary>;
  getPortfolioViews(portfolioId: string, userId: string, startDate?: Date, endDate?: Date): Promise<PortfolioView[]>;
}

export class AnalyticsService implements IAnalyticsService {
  constructor(
    private analyticsRepository: IAnalyticsRepository = new AnalyticsRepository(),
    private portfolioService: PortfolioService = new PortfolioService(),
    private userService: UserService = new UserService()
  ) {}

  /**
   * Track a portfolio view
   */
  async trackView(
    portfolioId: string,
    metadata: Omit<CreatePortfolioViewDTO, 'portfolioId'>
  ): Promise<PortfolioView> {
    // Validate portfolio exists (don't throw if not found - analytics shouldn't break the flow)
    try {
      await this.portfolioService.getPortfolioById(portfolioId);
    } catch {
      // Silently fail if portfolio doesn't exist
      console.warn(`Attempted to track view for non-existent portfolio: ${portfolioId}`);
      throw new Error('Portfolio not found');
    }

    // Create the view record
    const view = await this.analyticsRepository.create({
      portfolioId,
      ...metadata,
    });

    return view;
  }

  /**
   * Get analytics summary for a portfolio
   */
  async getPortfolioAnalytics(
    portfolioId: string,
    userId: string,
    startDate?: Date,
    endDate?: Date
  ): Promise<AnalyticsSummary> {
    const portfolio = await this.portfolioService.getPortfolioById(portfolioId);
    const user = await this.userService.getUserById(userId);

    // Check ownership
    requireOwnership(portfolio.userId, userId, user.role);

    // Get the summary
    const summary = await this.analyticsRepository.getSummary(portfolioId, startDate, endDate);
    return summary;
  }

  /**
   * Get detailed portfolio views
   */
  async getPortfolioViews(
    portfolioId: string,
    userId: string,
    startDate?: Date,
    endDate?: Date
  ): Promise<PortfolioView[]> {
    const portfolio = await this.portfolioService.getPortfolioById(portfolioId);
    const user = await this.userService.getUserById(userId);

    // Check ownership
    requireOwnership(portfolio.userId, userId, user.role);

    // Get the views
    const views = await this.analyticsRepository.findByPortfolioId(portfolioId, startDate, endDate);
    return views;
  }
}

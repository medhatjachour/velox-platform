/**
 * Analytics Repository
 * 
 * Handles portfolio view tracking and analytics data.
 */

import { db, portfolioViews } from '@/db';
import { eq, and, gte, lte, sql, desc } from 'drizzle-orm';
import { PortfolioView, CreatePortfolioViewDTO, AnalyticsSummary } from '@/types';
import { DatabaseError } from '@/lib/errors';

export interface IAnalyticsRepository {
  findByPortfolioId(portfolioId: string, startDate?: Date, endDate?: Date): Promise<PortfolioView[]>;
  create(data: CreatePortfolioViewDTO): Promise<PortfolioView>;
  getSummary(portfolioId: string, startDate?: Date, endDate?: Date): Promise<AnalyticsSummary>;
}

export class AnalyticsRepository implements IAnalyticsRepository {
  async findByPortfolioId(
    portfolioId: string,
    startDate?: Date,
    endDate?: Date
  ): Promise<PortfolioView[]> {
    try {
      const conditions = [eq(portfolioViews.portfolioId, portfolioId)];
      
      if (startDate) {
        conditions.push(gte(portfolioViews.viewedAt, startDate));
      }
      if (endDate) {
        conditions.push(lte(portfolioViews.viewedAt, endDate));
      }

      const result = await db.query.portfolioViews.findMany({
        where: and(...conditions),
        orderBy: [desc(portfolioViews.viewedAt)],
        limit: 1000, // Limit for performance
      });

      return result;
    } catch {
      throw new DatabaseError('Failed to find portfolio views');
    }
  }

  async create(data: CreatePortfolioViewDTO): Promise<PortfolioView> {
    try {
      const [view] = await db
        .insert(portfolioViews)
        .values({
          portfolioId: data.portfolioId,
          ipAddress: data.ipAddress,
          userAgent: data.userAgent,
          referrer: data.referrer,
          country: data.country,
          city: data.city,
          deviceType: data.deviceType,
          browser: data.browser,
          os: data.os,
          nfcCardId: data.nfcCardId || null,
        })
        .returning();

      return view;
    } catch {
      throw new DatabaseError('Failed to create portfolio view');
    }
  }

  async getSummary(
    portfolioId: string,
    startDate?: Date,
    endDate?: Date
  ): Promise<AnalyticsSummary> {
    try {
      const conditions = [eq(portfolioViews.portfolioId, portfolioId)];
      
      if (startDate) {
        conditions.push(gte(portfolioViews.viewedAt, startDate));
      }
      if (endDate) {
        conditions.push(lte(portfolioViews.viewedAt, endDate));
      }

      const views = await db.query.portfolioViews.findMany({
        where: and(...conditions),
      });

      // Calculate summary stats
      const totalViews = views.length;
      const uniqueIPs = new Set(views.map(v => v.ipAddress).filter(Boolean)).size;

      // Group by country
      const countryMap = new Map<string, number>();
      views.forEach(view => {
        if (view.country) {
          countryMap.set(view.country, (countryMap.get(view.country) || 0) + 1);
        }
      });
      const topCountries = Array.from(countryMap.entries())
        .map(([country, count]) => ({ country, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // Group by device type
      const deviceMap = new Map<string, number>();
      views.forEach(view => {
        if (view.deviceType) {
          deviceMap.set(view.deviceType, (deviceMap.get(view.deviceType) || 0) + 1);
        }
      });
      const topDevices = Array.from(deviceMap.entries())
        .map(([deviceType, count]) => ({ deviceType, count }))
        .sort((a, b) => b.count - a.count);

      // Group by day
      const dayMap = new Map<string, number>();
      views.forEach(view => {
        const date = new Date(view.viewedAt).toISOString().split('T')[0];
        dayMap.set(date, (dayMap.get(date) || 0) + 1);
      });
      const viewsByDay = Array.from(dayMap.entries())
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => a.date.localeCompare(b.date));

      return {
        totalViews,
        uniqueVisitors: uniqueIPs,
        topCountries,
        topDevices,
        viewsByDay,
      };
    } catch {
      throw new DatabaseError('Failed to get analytics summary');
    }
  }
}

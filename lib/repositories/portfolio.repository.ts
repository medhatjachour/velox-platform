/**
 * Portfolio Repository
 * 
 * Handles all database operations related to portfolios.
 */

import { db, portfolios } from '@/db';
import { eq, and, desc } from 'drizzle-orm';
import { Portfolio, CreatePortfolioDTO, UpdatePortfolioDTO, PortfolioFilterDTO } from '@/types';
import { DatabaseError, PortfolioNotFoundError } from '@/lib/errors';

export interface IPortfolioRepository {
  findById(id: string): Promise<Portfolio | null>;
  findBySlug(slug: string, userId?: string): Promise<Portfolio | null>;
  findByUserId(userId: string): Promise<Portfolio[]>;
  create(data: CreatePortfolioDTO): Promise<Portfolio>;
  update(id: string, data: UpdatePortfolioDTO): Promise<Portfolio>;
  delete(id: string): Promise<void>;
  incrementViewCount(id: string): Promise<void>;
}

export class PortfolioRepository implements IPortfolioRepository {
  /**
   * Find portfolio by ID
   */
  async findById(id: string): Promise<Portfolio | null> {
    try {
      const result = await db.query.portfolios.findFirst({
        where: eq(portfolios.id, id),
      });
      return result || null;
    } catch {
      throw new DatabaseError('Failed to find portfolio');
    }
  }

  /**
   * Find portfolio by slug
   */
  async findBySlug(slug: string, userId?: string): Promise<Portfolio | null> {
    try {
      const conditions = userId
        ? and(eq(portfolios.slug, slug), eq(portfolios.userId, userId))
        : eq(portfolios.slug, slug);

      const result = await db.query.portfolios.findFirst({
        where: conditions,
      });
      return result || null;
    } catch {
      throw new DatabaseError('Failed to find portfolio by slug');
    }
  }

  /**
   * Find all portfolios by user ID
   */
  async findByUserId(userId: string): Promise<Portfolio[]> {
    try {
      const result = await db.query.portfolios.findMany({
        where: eq(portfolios.userId, userId),
        orderBy: [desc(portfolios.createdAt)],
      });
      return result;
    } catch {
      throw new DatabaseError('Failed to find portfolios for user');
    }
  }

  /**
   * Create a new portfolio
   */
  async create(data: CreatePortfolioDTO): Promise<Portfolio> {
    try {
      const [newPortfolio] = await db
        .insert(portfolios)
        .values({
          userId: data.userId,
          title: data.title,
          slug: data.slug,
          bio: data.bio,
          headline: data.headline,
          heroImageUrl: data.heroImageUrl,
          sections: data.sections as any,
          theme: data.theme as any,
          isPublished: false,
          viewCount: 0,
        })
        .returning();

      return newPortfolio;
    } catch (error) {
      if (error instanceof Error && error.message.includes('duplicate key')) {
        if (error.message.includes('slug')) {
          throw new DatabaseError('A portfolio with this slug already exists');
        }
      }
      throw new DatabaseError('Failed to create portfolio');
    }
  }

  /**
   * Update an existing portfolio
   */
  async update(id: string, data: UpdatePortfolioDTO): Promise<Portfolio> {
    try {
      const [updatedPortfolio] = await db
        .update(portfolios)
        .set({
          ...data,
          sections: data.sections as any,
          theme: data.theme as any,
          updatedAt: new Date(),
        })
        .where(eq(portfolios.id, id))
        .returning();

      if (!updatedPortfolio) {
        throw new PortfolioNotFoundError(id);
      }

      return updatedPortfolio;
    } catch (error) {
      if (error instanceof PortfolioNotFoundError) {
        throw error;
      }
      if (error instanceof Error && error.message.includes('duplicate key')) {
        if (error.message.includes('slug')) {
          throw new DatabaseError('A portfolio with this slug already exists');
        }
      }
      throw new DatabaseError('Failed to update portfolio');
    }
  }

  /**
   * Delete a portfolio
   */
  async delete(id: string): Promise<void> {
    try {
      const result = await db.delete(portfolios).where(eq(portfolios.id, id)).returning();
      
      if (result.length === 0) {
        throw new PortfolioNotFoundError(id);
      }
    } catch (error) {
      if (error instanceof PortfolioNotFoundError) {
        throw error;
      }
      throw new DatabaseError('Failed to delete portfolio');
    }
  }

  /**
   * Increment the view count for a portfolio
   */
  async incrementViewCount(id: string): Promise<void> {
    try {
      await db
        .update(portfolios)
        .set({
          viewCount: db.$with('cte').select().from(portfolios).where(eq(portfolios.id, id)) as any,
        })
        .where(eq(portfolios.id, id));
    } catch {
      // Silently fail - view count is not critical
      console.warn(`Failed to increment view count for portfolio ${id}`);
    }
  }

  /**
   * Find portfolio with all relations (user, projects, etc.)
   */
  async findByIdWithRelations(id: string) {
    try {
      const result = await db.query.portfolios.findFirst({
        where: eq(portfolios.id, id),
        with: {
          user: true,
          projects: {
            orderBy: (projects, { asc }) => [asc(projects.order)],
          },
          nfcCards: true,
        },
      });

      return result || null;
    } catch {
      throw new DatabaseError('Failed to find portfolio with relations');
    }
  }

  /**
   * Find published portfolio by username and slug (for public view)
   */
  async findPublishedByUsernameAndSlug(username: string, slug: string) {
    try {
      const result = await db.query.portfolios.findFirst({
        where: and(
          eq(portfolios.slug, slug),
          eq(portfolios.isPublished, true)
        ),
        with: {
          user: {
            where: (users, { eq }) => eq(users.username, username),
          },
          projects: {
            orderBy: (projects, { asc }) => [asc(projects.order)],
          },
        },
      });

      return result || null;
    } catch {
      throw new DatabaseError('Failed to find published portfolio');
    }
  }
}

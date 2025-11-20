/**
 * Lead Repository
 * 
 * Handles all database operations related to leads.
 */

import { db, leads } from '@/db';
import { eq, and, gte, lte, desc } from 'drizzle-orm';
import { Lead, CreateLeadDTO, UpdateLeadDTO } from '@/types';
import { DatabaseError, NotFoundError } from '@/lib/errors';

export interface ILeadRepository {
  findById(id: string): Promise<Lead | null>;
  findByUserId(userId: string): Promise<Lead[]>;
  findByPortfolioId(portfolioId: string): Promise<Lead[]>;
  create(data: CreateLeadDTO): Promise<Lead>;
  update(id: string, data: UpdateLeadDTO): Promise<Lead>;
  delete(id: string): Promise<void>;
  countByUserId(userId: string, startDate?: Date, endDate?: Date): Promise<number>;
}

export class LeadRepository implements ILeadRepository {
  async findById(id: string): Promise<Lead | null> {
    try {
      const result = await db.query.leads.findFirst({
        where: eq(leads.id, id),
      });
      return result || null;
    } catch {
      throw new DatabaseError('Failed to find lead');
    }
  }

  async findByUserId(userId: string): Promise<Lead[]> {
    try {
      const result = await db.query.leads.findMany({
        where: eq(leads.userId, userId),
        orderBy: [desc(leads.capturedAt)],
      });
      return result;
    } catch {
      throw new DatabaseError('Failed to find leads for user');
    }
  }

  async findByPortfolioId(portfolioId: string): Promise<Lead[]> {
    try {
      const result = await db.query.leads.findMany({
        where: eq(leads.portfolioId, portfolioId),
        orderBy: [desc(leads.capturedAt)],
      });
      return result;
    } catch {
      throw new DatabaseError('Failed to find leads for portfolio');
    }
  }

  async create(data: CreateLeadDTO): Promise<Lead> {
    try {
      const [newLead] = await db
        .insert(leads)
        .values({
          portfolioId: data.portfolioId,
          userId: data.userId,
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          message: data.message,
          source: data.source || 'portfolio',
          nfcCardId: data.nfcCardId || null,
          syncedToCrm: false,
        })
        .returning();

      return newLead;
    } catch {
      throw new DatabaseError('Failed to create lead');
    }
  }

  async update(id: string, data: UpdateLeadDTO): Promise<Lead> {
    try {
      const [updatedLead] = await db
        .update(leads)
        .set(data)
        .where(eq(leads.id, id))
        .returning();

      if (!updatedLead) {
        throw new NotFoundError('Lead', id);
      }

      return updatedLead;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new DatabaseError('Failed to update lead');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const result = await db.delete(leads).where(eq(leads.id, id)).returning();
      
      if (result.length === 0) {
        throw new NotFoundError('Lead', id);
      }
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new DatabaseError('Failed to delete lead');
    }
  }

  async countByUserId(userId: string, startDate?: Date, endDate?: Date): Promise<number> {
    try {
      const conditions = [eq(leads.userId, userId)];
      
      if (startDate) {
        conditions.push(gte(leads.capturedAt, startDate));
      }
      if (endDate) {
        conditions.push(lte(leads.capturedAt, endDate));
      }

      const result = await db.query.leads.findMany({
        where: and(...conditions),
      });

      return result.length;
    } catch {
      throw new DatabaseError('Failed to count leads');
    }
  }
}

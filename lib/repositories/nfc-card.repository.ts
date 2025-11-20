/**
 * NFC Card Repository
 * 
 * Handles all database operations related to NFC cards.
 */

import { db, nfcCards } from '@/db';
import { eq, and } from 'drizzle-orm';
import { NfcCard, CreateNfcCardDTO, UpdateNfcCardDTO } from '@/types';
import { DatabaseError, NfcCardNotFoundError } from '@/lib/errors';

export interface INfcCardRepository {
  findById(id: string): Promise<NfcCard | null>;
  findByUserId(userId: string): Promise<NfcCard[]>;
  findByShortCode(shortCode: string): Promise<NfcCard | null>;
  findByCardUid(cardUid: string): Promise<NfcCard | null>;
  create(data: CreateNfcCardDTO): Promise<NfcCard>;
  update(id: string, data: UpdateNfcCardDTO): Promise<NfcCard>;
  delete(id: string): Promise<void>;
  incrementTapCount(id: string): Promise<void>;
}

export class NfcCardRepository implements INfcCardRepository {
  async findById(id: string): Promise<NfcCard | null> {
    try {
      const result = await db.query.nfcCards.findFirst({
        where: eq(nfcCards.id, id),
      });
      return result || null;
    } catch {
      throw new DatabaseError('Failed to find NFC card');
    }
  }

  async findByUserId(userId: string): Promise<NfcCard[]> {
    try {
      const result = await db.query.nfcCards.findMany({
        where: eq(nfcCards.userId, userId),
        orderBy: (cards, { desc }) => [desc(cards.createdAt)],
      });
      return result;
    } catch {
      throw new DatabaseError('Failed to find NFC cards for user');
    }
  }

  async findByShortCode(shortCode: string): Promise<NfcCard | null> {
    try {
      const result = await db.query.nfcCards.findFirst({
        where: eq(nfcCards.shortCode, shortCode),
      });
      return result || null;
    } catch {
      throw new DatabaseError('Failed to find NFC card by short code');
    }
  }

  async findByCardUid(cardUid: string): Promise<NfcCard | null> {
    try {
      const result = await db.query.nfcCards.findFirst({
        where: eq(nfcCards.cardUid, cardUid),
      });
      return result || null;
    } catch {
      throw new DatabaseError('Failed to find NFC card by UID');
    }
  }

  async create(data: CreateNfcCardDTO): Promise<NfcCard> {
    try {
      const [newCard] = await db
        .insert(nfcCards)
        .values({
          userId: data.userId,
          portfolioId: data.portfolioId || null,
          cardUid: data.cardUid,
          shortCode: data.shortCode,
          status: data.status || 'ACTIVE',
          tapCount: 0,
        })
        .returning();

      return newCard;
    } catch (error) {
      if (error instanceof Error && error.message.includes('duplicate key')) {
        if (error.message.includes('card_uid')) {
          throw new DatabaseError('An NFC card with this UID already exists');
        }
        if (error.message.includes('short_code')) {
          throw new DatabaseError('This short code is already in use');
        }
      }
      throw new DatabaseError('Failed to create NFC card');
    }
  }

  async update(id: string, data: UpdateNfcCardDTO): Promise<NfcCard> {
    try {
      const [updatedCard] = await db
        .update(nfcCards)
        .set({
          ...data,
          updatedAt: new Date(),
        })
        .where(eq(nfcCards.id, id))
        .returning();

      if (!updatedCard) {
        throw new NfcCardNotFoundError(id);
      }

      return updatedCard;
    } catch (error) {
      if (error instanceof NfcCardNotFoundError) {
        throw error;
      }
      throw new DatabaseError('Failed to update NFC card');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const result = await db.delete(nfcCards).where(eq(nfcCards.id, id)).returning();
      
      if (result.length === 0) {
        throw new NfcCardNotFoundError(id);
      }
    } catch (error) {
      if (error instanceof NfcCardNotFoundError) {
        throw error;
      }
      throw new DatabaseError('Failed to delete NFC card');
    }
  }

  async incrementTapCount(id: string): Promise<void> {
    try {
      await db.execute<{ tapCount: number }>(
        `UPDATE nfc_cards SET tap_count = tap_count + 1 WHERE id = ${id}`
      );
    } catch {
      console.warn(`Failed to increment tap count for NFC card ${id}`);
    }
  }

  async findWithRelations(id: string) {
    try {
      const result = await db.query.nfcCards.findFirst({
        where: eq(nfcCards.id, id),
        with: {
          user: true,
          portfolio: true,
        },
      });

      return result || null;
    } catch {
      throw new DatabaseError('Failed to find NFC card with relations');
    }
  }
}

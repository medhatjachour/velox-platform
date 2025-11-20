/**
 * User Repository
 * 
 * Handles all database operations related to users.
 * Implements the Repository Pattern for data access abstraction.
 */

import { db, users } from '@/db';
import { eq, and, or } from 'drizzle-orm';
import { User, NewUser, CreateUserDTO, UpdateUserDTO } from '@/types';
import { DatabaseError, UserNotFoundError } from '@/lib/errors';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByClerkId(clerkId: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  create(data: CreateUserDTO): Promise<User>;
  update(id: string, data: UpdateUserDTO): Promise<User>;
  delete(id: string): Promise<void>;
  exists(clerkId: string): Promise<boolean>;
}

export class UserRepository implements IUserRepository {
  /**
   * Find user by ID
   */
  async findById(id: string): Promise<User | null> {
    try {
      const result = await db.query.users.findFirst({
        where: eq(users.id, id),
      });
      return result || null;
    } catch (error) {
      throw new DatabaseError('Failed to find user by ID');
    }
  }

  /**
   * Find user by Clerk ID
   */
  async findByClerkId(clerkId: string): Promise<User | null> {
    try {
      const result = await db.query.users.findFirst({
        where: eq(users.clerkId, clerkId),
      });
      return result || null;
    } catch (error) {
      throw new DatabaseError('Failed to find user by Clerk ID');
    }
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<User | null> {
    try {
      const result = await db.query.users.findFirst({
        where: eq(users.email, email),
      });
      return result || null;
    } catch (error) {
      throw new DatabaseError('Failed to find user by email');
    }
  }

  /**
   * Find user by username
   */
  async findByUsername(username: string): Promise<User | null> {
    try {
      const result = await db.query.users.findFirst({
        where: eq(users.username, username),
      });
      return result || null;
    } catch (error) {
      throw new DatabaseError('Failed to find user by username');
    }
  }

  /**
   * Create a new user
   */
  async create(data: CreateUserDTO): Promise<User> {
    try {
      const [newUser] = await db
        .insert(users)
        .values({
          clerkId: data.clerkId,
          email: data.email,
          fullName: data.fullName,
          username: data.username,
          avatarUrl: data.avatarUrl,
          role: data.role || 'USER',
          subscriptionTier: data.subscriptionTier || 'FREE',
        })
        .returning();

      return newUser;
    } catch (error) {
      // Check for unique constraint violations
      if (error instanceof Error && error.message.includes('duplicate key')) {
        if (error.message.includes('email')) {
          throw new DatabaseError('A user with this email already exists');
        }
        if (error.message.includes('username')) {
          throw new DatabaseError('A user with this username already exists');
        }
        if (error.message.includes('clerk_id')) {
          throw new DatabaseError('A user with this Clerk ID already exists');
        }
      }
      throw new DatabaseError('Failed to create user');
    }
  }

  /**
   * Update an existing user
   */
  async update(id: string, data: UpdateUserDTO): Promise<User> {
    try {
      const [updatedUser] = await db
        .update(users)
        .set({
          ...data,
          updatedAt: new Date(),
        })
        .where(eq(users.id, id))
        .returning();

      if (!updatedUser) {
        throw new UserNotFoundError(id);
      }

      return updatedUser;
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw error;
      }
      // Check for unique constraint violations
      if (error instanceof Error && error.message.includes('duplicate key')) {
        if (error.message.includes('username')) {
          throw new DatabaseError('A user with this username already exists');
        }
      }
      throw new DatabaseError('Failed to update user');
    }
  }

  /**
   * Delete a user
   */
  async delete(id: string): Promise<void> {
    try {
      const result = await db.delete(users).where(eq(users.id, id)).returning();
      
      if (result.length === 0) {
        throw new UserNotFoundError(id);
      }
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw error;
      }
      throw new DatabaseError('Failed to delete user');
    }
  }

  /**
   * Check if a user exists by Clerk ID
   */
  async exists(clerkId: string): Promise<boolean> {
    try {
      const user = await this.findByClerkId(clerkId);
      return user !== null;
    } catch (error) {
      throw new DatabaseError('Failed to check if user exists');
    }
  }

  /**
   * Find user with related data (portfolios, NFC cards, etc.)
   */
  async findByIdWithRelations(id: string) {
    try {
      const result = await db.query.users.findFirst({
        where: eq(users.id, id),
        with: {
          team: true,
          portfolios: {
            orderBy: (portfolios, { desc }) => [desc(portfolios.createdAt)],
            limit: 10,
          },
          nfcCards: {
            orderBy: (nfcCards, { desc }) => [desc(nfcCards.createdAt)],
            limit: 10,
          },
        },
      });

      return result || null;
    } catch (error) {
      throw new DatabaseError('Failed to find user with relations');
    }
  }
}

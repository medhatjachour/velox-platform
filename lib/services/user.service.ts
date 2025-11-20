/**
 * User Service
 * 
 * Business logic for user management.
 * Handles user creation, updates, and profile management.
 */

import { UserRepository, IUserRepository } from '@/lib/repositories';
import { 
  User, 
  CreateUserDTO, 
  UpdateUserDTO, 
  UserWithRelations,
  SubscriptionTier,
  Role
} from '@/types';
import { 
  UserNotFoundError, 
  ValidationError, 
  DuplicateError,
  QuotaExceededError
} from '@/lib/errors';
import { getFeatureAccess } from '@/lib/auth';

export interface IUserService {
  getUserById(id: string): Promise<User>;
  getUserByClerkId(clerkId: string): Promise<User>;
  getUserProfile(id: string): Promise<UserWithRelations>;
  createUser(data: CreateUserDTO): Promise<User>;
  updateUser(id: string, data: UpdateUserDTO): Promise<User>;
  deleteUser(id: string): Promise<void>;
  syncFromClerk(clerkId: string, clerkData: any): Promise<User>;
  upgradeSubscription(userId: string, tier: SubscriptionTier): Promise<User>;
  checkQuota(userId: string, resource: 'portfolios' | 'nfcCards' | 'leads'): Promise<boolean>;
}

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository = new UserRepository()) {}

  /**
   * Get user by ID
   */
  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    
    if (!user) {
      throw new UserNotFoundError(id);
    }
    
    return user;
  }

  /**
   * Get user by Clerk ID
   */
  async getUserByClerkId(clerkId: string): Promise<User> {
    const user = await this.userRepository.findByClerkId(clerkId);
    
    if (!user) {
      throw new UserNotFoundError();
    }
    
    return user;
  }

  /**
   * Get user profile with relations
   */
  async getUserProfile(id: string): Promise<UserWithRelations> {
    const user = await this.userRepository.findByIdWithRelations(id);
    
    if (!user) {
      throw new UserNotFoundError(id);
    }
    
    return user as UserWithRelations;
  }

  /**
   * Create a new user
   */
  async createUser(data: CreateUserDTO): Promise<User> {
    // Validate required fields
    if (!data.clerkId || !data.email) {
      throw new ValidationError('Clerk ID and email are required');
    }

    // Validate email format
    if (!this.isValidEmail(data.email)) {
      throw new ValidationError('Invalid email format');
    }

    // Check if user already exists
    const existingUser = await this.userRepository.findByClerkId(data.clerkId);
    if (existingUser) {
      throw new DuplicateError('Clerk ID');
    }

    // Validate username if provided
    if (data.username) {
      if (!this.isValidUsername(data.username)) {
        throw new ValidationError('Username must be 3-30 characters and contain only letters, numbers, and underscores');
      }
      
      const existingUsername = await this.userRepository.findByUsername(data.username);
      if (existingUsername) {
        throw new DuplicateError('username');
      }
    }

    // Create user
    const user = await this.userRepository.create({
      ...data,
      role: data.role || 'USER',
      subscriptionTier: data.subscriptionTier || 'FREE',
    });

    return user;
  }

  /**
   * Update user
   */
  async updateUser(id: string, data: UpdateUserDTO): Promise<User> {
    // Validate user exists
    await this.getUserById(id);

    // Validate username if being updated
    if (data.username) {
      if (!this.isValidUsername(data.username)) {
        throw new ValidationError('Username must be 3-30 characters and contain only letters, numbers, and underscores');
      }
      
      const existingUsername = await this.userRepository.findByUsername(data.username);
      if (existingUsername && existingUsername.id !== id) {
        throw new DuplicateError('username');
      }
    }

    // Update user
    const updatedUser = await this.userRepository.update(id, data);
    return updatedUser;
  }

  /**
   * Delete user
   */
  async deleteUser(id: string): Promise<void> {
    await this.getUserById(id);
    await this.userRepository.delete(id);
  }

  /**
   * Sync user data from Clerk
   * Used during Clerk webhooks or initial sync
   */
  async syncFromClerk(clerkId: string, clerkData: any): Promise<User> {
    const existingUser = await this.userRepository.findByClerkId(clerkId);

    const userData = {
      email: clerkData.emailAddresses?.[0]?.emailAddress || '',
      fullName: `${clerkData.firstName || ''} ${clerkData.lastName || ''}`.trim(),
      avatarUrl: clerkData.imageUrl,
      username: clerkData.username,
    };

    if (existingUser) {
      // Update existing user
      return await this.userRepository.update(existingUser.id, userData);
    } else {
      // Create new user
      return await this.createUser({
        clerkId,
        ...userData,
      });
    }
  }

  /**
   * Upgrade user subscription
   */
  async upgradeSubscription(userId: string, tier: SubscriptionTier): Promise<User> {
    const user = await this.getUserById(userId);

    // Validate tier upgrade logic
    const tierHierarchy: Record<SubscriptionTier, number> = {
      FREE: 1,
      PRO: 2,
      TEAM: 3,
      ENTERPRISE: 4,
    };

    if (tierHierarchy[tier] < tierHierarchy[user.subscriptionTier]) {
      throw new ValidationError('Cannot downgrade subscription tier through this method');
    }

    return await this.userRepository.update(userId, { subscriptionTier: tier });
  }

  /**
   * Check if user has quota for a resource
   */
  async checkQuota(
    userId: string,
    resource: 'portfolios' | 'nfcCards' | 'leads'
  ): Promise<boolean> {
    const user = await this.getUserById(userId);
    const features = getFeatureAccess(user.subscriptionTier);
    
    const userProfile = await this.getUserProfile(userId);

    switch (resource) {
      case 'portfolios':
        const portfolioCount = userProfile.portfolios?.length || 0;
        if (features.maxPortfolios === -1) return true;
        return portfolioCount < features.maxPortfolios;
      
      case 'nfcCards':
        const cardCount = userProfile.nfcCards?.length || 0;
        if (features.maxNfcCards === -1) return true;
        return cardCount < features.maxNfcCards;
      
      case 'leads':
        // This would need to check leads created this month
        // For now, return true (implement proper check later)
        return true;
      
      default:
        return false;
    }
  }

  /**
   * Require quota for a resource (throws if exceeded)
   */
  async requireQuota(userId: string, resource: 'portfolios' | 'nfcCards' | 'leads'): Promise<void> {
    const hasQuota = await this.checkQuota(userId, resource);
    
    if (!hasQuota) {
      throw new QuotaExceededError(resource);
    }
  }

  // ============================================================================
  // VALIDATION HELPERS
  // ============================================================================

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidUsername(username: string): boolean {
    const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
    return usernameRegex.test(username);
  }
}

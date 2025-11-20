/**
 * DTO (Data Transfer Object) Types
 * 
 * DTOs are used to transfer data between layers.
 * They define exactly what data should be passed to/from services and repositories.
 */

import { SubscriptionTier, Role } from './domain.types';

// ============================================================================
// USER DTOs
// ============================================================================

export interface CreateUserDTO {
  clerkId: string;
  email: string;
  fullName?: string;
  username?: string;
  avatarUrl?: string;
  role?: Role;
  subscriptionTier?: SubscriptionTier;
}

export interface UpdateUserDTO {
  fullName?: string;
  username?: string;
  avatarUrl?: string;
  subscriptionTier?: SubscriptionTier;
  stripeCustomerId?: string;
  teamId?: string;
}

// ============================================================================
// PORTFOLIO DTOs
// ============================================================================

export interface CreatePortfolioDTO {
  userId: string;
  title: string;
  slug: string;
  bio?: string;
  headline?: string;
  heroImageUrl?: string;
  sections?: any[];
  theme?: any;
}

export interface UpdatePortfolioDTO {
  title?: string;
  slug?: string;
  bio?: string;
  headline?: string;
  heroImageUrl?: string;
  sections?: any[];
  theme?: any;
  metaTitle?: string;
  metaDescription?: string;
  isPublished?: boolean;
  customDomain?: string;
}

export interface PortfolioFilterDTO {
  userId?: string;
  isPublished?: boolean;
  slug?: string;
  customDomain?: string;
}

// ============================================================================
// NFC CARD DTOs
// ============================================================================

export interface CreateNfcCardDTO {
  userId: string;
  portfolioId?: string;
  cardUid: string;
  shortCode: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'PENDING';
}

export interface UpdateNfcCardDTO {
  portfolioId?: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  context?: string;
}

// ============================================================================
// LEAD DTOs
// ============================================================================

export interface CreateLeadDTO {
  portfolioId: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  source?: 'portfolio' | 'nfc_tap' | 'qr_code';
  nfcCardId?: string;
}

export interface UpdateLeadDTO {
  syncedToCrm?: boolean;
  crmId?: string;
}

// ============================================================================
// ANALYTICS DTOs
// ============================================================================

export interface CreatePortfolioViewDTO {
  portfolioId: string;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
  country?: string;
  city?: string;
  deviceType?: string;
  browser?: string;
  os?: string;
  nfcCardId?: string;
}

export interface AnalyticsFilterDTO {
  portfolioId: string;
  startDate?: Date;
  endDate?: Date;
}

// ============================================================================
// TEAM DTOs
// ============================================================================

export interface CreateTeamDTO {
  name: string;
  slug: string;
  logoUrl?: string;
  brandColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  subscriptionTier?: SubscriptionTier;
}

export interface UpdateTeamDTO {
  name?: string;
  slug?: string;
  logoUrl?: string;
  brandColors?: any;
  crmIntegration?: any;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}

export interface AddTeamMemberDTO {
  teamId: string;
  userId: string;
  role?: 'OWNER' | 'ADMIN' | 'MEMBER';
}

// ============================================================================
// AI GENERATION DTOs
// ============================================================================

export interface CreateAIGenerationDTO {
  userId: string;
  type: 'bio' | 'project_description' | 'blog_post' | 'resume_parse' | 'headline' | 'cover_letter';
  prompt: string;
  response: any;
  model: string;
  tokensUsed: number;
  cost: number;
}

// ============================================================================
// ORDER DTOs
// ============================================================================

export interface CreateOrderDTO {
  userId?: string;
  orderNumber: string;
  total: number;
  currency?: string;
  shippingAddress: any;
  stripePaymentIntentId?: string;
}

export interface UpdateOrderDTO {
  status?: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  trackingNumber?: string;
}

export interface CreateOrderItemDTO {
  orderId: string;
  productId: string;
  quantity: number;
  pricePerUnit: number;
  total: number;
}

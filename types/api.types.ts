/**
 * API Types
 * 
 * Types for API requests and responses.
 * These define the contract between frontend and backend.
 */

import { Portfolio, User, Lead, PortfolioView, NfcCard } from './domain.types';

// ============================================================================
// COMMON API TYPES
// ============================================================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: ApiMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  statusCode: number;
}

export interface ApiMeta {
  page?: number;
  limit?: number;
  total?: number;
  hasMore?: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ============================================================================
// AUTH API
// ============================================================================

export interface AuthSession {
  userId: string;
  clerkId: string;
  email: string;
  role: string;
  subscriptionTier: string;
}

// ============================================================================
// USER API
// ============================================================================

export interface UpdateUserRequest {
  fullName?: string;
  username?: string;
  avatarUrl?: string;
}

export interface UserProfileResponse {
  user: User;
  portfolioCount: number;
  nfcCardCount: number;
  leadCount: number;
}

// ============================================================================
// PORTFOLIO API
// ============================================================================

export interface CreatePortfolioRequest {
  title: string;
  slug: string;
  bio?: string;
  headline?: string;
}

export interface UpdatePortfolioRequest {
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
}

export interface GeneratePortfolioFromResumeRequest {
  resumeUrl: string;
  options?: {
    includeProjects?: boolean;
    includeSkills?: boolean;
    tone?: 'professional' | 'casual' | 'creative';
  };
}

export interface PortfolioResponse {
  portfolio: Portfolio;
  projects?: any[];
  viewCount: number;
  leadCount: number;
}

export interface PublicPortfolioResponse {
  portfolio: Portfolio;
  user: {
    fullName: string;
    username: string;
    avatarUrl?: string;
  };
  projects: any[];
}

// ============================================================================
// NFC CARD API
// ============================================================================

export interface CreateNfcCardRequest {
  portfolioId: string;
  cardUid?: string; // If provided, otherwise generate
}

export interface UpdateNfcCardRequest {
  portfolioId?: string;
  status?: 'ACTIVE' | 'INACTIVE';
  context?: string;
}

export interface NfcTapRequest {
  shortCode: string;
  metadata?: {
    userAgent?: string;
    ipAddress?: string;
    referrer?: string;
  };
}

export interface NfcTapResponse {
  redirectUrl: string;
  portfolioId: string;
}

// ============================================================================
// LEAD CAPTURE API
// ============================================================================

export interface CreateLeadRequest {
  portfolioId: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  source?: 'portfolio' | 'nfc_tap' | 'qr_code';
  nfcCardId?: string;
}

export interface LeadResponse {
  lead: Lead;
  syncedToCrm: boolean;
}

// ============================================================================
// ANALYTICS API
// ============================================================================

export interface AnalyticsRequest {
  portfolioId: string;
  startDate?: string;
  endDate?: string;
}

export interface AnalyticsResponse {
  summary: {
    totalViews: number;
    uniqueVisitors: number;
    averageViewDuration?: number;
  };
  viewsByDay: Array<{ date: string; count: number }>;
  topCountries: Array<{ country: string; count: number }>;
  topDevices: Array<{ deviceType: string; count: number }>;
  topBrowsers: Array<{ browser: string; count: number }>;
}

// ============================================================================
// AI GENERATION API
// ============================================================================

export interface GenerateBioRequest {
  resume?: string;
  existingBio?: string;
  tone?: 'professional' | 'casual' | 'creative';
}

export interface GenerateProjectDescriptionRequest {
  projectName: string;
  technologies: string[];
  brief?: string;
}

export interface AIApiResponse<T = any> {
  content: T;
  tokensUsed: number;
  cost: number;
}

// ============================================================================
// E-COMMERCE API
// ============================================================================

export interface CreateOrderRequest {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  shippingAddress: {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface CheckoutSessionRequest {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutSessionResponse {
  sessionId: string;
  url: string;
}

// ============================================================================
// WEBHOOK TYPES
// ============================================================================

export interface StripeWebhookEvent {
  type: string;
  data: {
    object: any;
  };
}

export interface CRMWebhookEvent {
  type: 'lead.created' | 'lead.updated';
  leadId: string;
  data: any;
}

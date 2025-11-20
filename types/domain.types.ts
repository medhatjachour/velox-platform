/**
 * Domain Types
 * 
 * Core business entities and value objects.
 * These types represent the domain model of the application.
 */

import { 
  users, 
  teams, 
  portfolios, 
  portfolioProjects,
  nfcCards, 
  leads,
  portfolioViews,
  products,
  orders,
  orderItems,
  aiGenerations
} from '@/db/schema';

// ============================================================================
// CORE ENTITIES (inferred from database schema)
// ============================================================================

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Team = typeof teams.$inferSelect;
export type NewTeam = typeof teams.$inferInsert;

export type Portfolio = typeof portfolios.$inferSelect;
export type NewPortfolio = typeof portfolios.$inferInsert;

export type PortfolioProject = typeof portfolioProjects.$inferSelect;
export type NewPortfolioProject = typeof portfolioProjects.$inferInsert;

export type NfcCard = typeof nfcCards.$inferSelect;
export type NewNfcCard = typeof nfcCards.$inferInsert;

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;

export type PortfolioView = typeof portfolioViews.$inferSelect;
export type NewPortfolioView = typeof portfolioViews.$inferInsert;

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;

export type OrderItem = typeof orderItems.$inferSelect;
export type NewOrderItem = typeof orderItems.$inferInsert;

export type AIGeneration = typeof aiGenerations.$inferSelect;
export type NewAIGeneration = typeof aiGenerations.$inferInsert;

// ============================================================================
// ENUMS
// ============================================================================

export type Role = 'USER' | 'TEAM_ADMIN' | 'SUPER_ADMIN';
export type SubscriptionTier = 'FREE' | 'PRO' | 'TEAM' | 'ENTERPRISE';
export type CardStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING';
export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

// ============================================================================
// VALUE OBJECTS
// ============================================================================

export interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
}

export interface CRMIntegration {
  provider: 'salesforce' | 'hubspot' | 'pipedrive';
  apiKey: string;
  webhookUrl?: string;
  enabled: boolean;
}

export interface PortfolioTheme {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  layout: 'modern' | 'minimal' | 'classic' | 'creative';
}

export interface PortfolioSection {
  id: string;
  type: 'about' | 'experience' | 'projects' | 'skills' | 'contact' | 'testimonials' | 'blog';
  title: string;
  content: any;
  order: number;
  visible: boolean;
}

export interface ShippingAddress {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// ============================================================================
// COMPOSITE TYPES (with relations)
// ============================================================================

export interface UserWithRelations extends User {
  team?: Team;
  portfolios?: Portfolio[];
  nfcCards?: NfcCard[];
  leads?: Lead[];
}

export interface PortfolioWithRelations extends Portfolio {
  user: User;
  projects?: PortfolioProject[];
  views?: PortfolioView[];
  leads?: Lead[];
  nfcCards?: NfcCard[];
}

export interface TeamWithMembers extends Team {
  members?: Array<{
    user: User;
    role: string;
    joinedAt: Date;
  }>;
}

export interface OrderWithItems extends Order {
  items: Array<OrderItem & { product?: Product }>;
}

// ============================================================================
// ANALYTICS TYPES
// ============================================================================

export interface AnalyticsSummary {
  totalViews: number;
  uniqueVisitors: number;
  topCountries: Array<{ country: string; count: number }>;
  topDevices: Array<{ deviceType: string; count: number }>;
  viewsByDay: Array<{ date: string; count: number }>;
}

export interface LeadAnalytics {
  totalLeads: number;
  conversionRate: number;
  leadsBySource: Array<{ source: string; count: number }>;
  leadsByDay: Array<{ date: string; count: number }>;
}

// ============================================================================
// AI TYPES
// ============================================================================

export interface ResumeParseResult {
  fullName: string;
  email?: string;
  phone?: string;
  headline: string;
  bio: string;
  skills: string[];
  experience: Array<{
    title: string;
    company: string;
    startDate: string;
    endDate?: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  projects: Array<{
    name: string;
    description: string;
    url?: string;
    technologies: string[];
  }>;
}

export interface AIGenerationRequest {
  type: 'bio' | 'project_description' | 'blog_post' | 'resume_parse' | 'headline' | 'cover_letter';
  input: string | Record<string, any>;
  model?: 'gpt-4o' | 'gpt-4-turbo' | 'gpt-3.5-turbo';
  maxTokens?: number;
}

export interface AIGenerationResponse<T = any> {
  content: T;
  tokensUsed: number;
  model: string;
  cost: number; // in cents
}

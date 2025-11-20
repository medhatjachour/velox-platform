import { pgTable, text, timestamp, uuid, integer, boolean, jsonb, varchar, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ============================================================================
// ENUMS
// ============================================================================

export const roleEnum = pgEnum('role', ['USER', 'TEAM_ADMIN', 'SUPER_ADMIN']);
export const subscriptionTierEnum = pgEnum('subscription_tier', ['FREE', 'PRO', 'TEAM', 'ENTERPRISE']);
export const cardStatusEnum = pgEnum('card_status', ['ACTIVE', 'INACTIVE', 'PENDING']);
export const orderStatusEnum = pgEnum('order_status', ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']);

// ============================================================================
// USERS & AUTH
// ============================================================================

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  clerkId: text('clerk_id').notNull().unique(), // Clerk User ID
  email: text('email').notNull().unique(),
  username: text('username').unique(), // For /[username] public route
  fullName: text('full_name'),
  avatarUrl: text('avatar_url'),
  role: roleEnum('role').default('USER').notNull(),
  subscriptionTier: subscriptionTierEnum('subscription_tier').default('FREE').notNull(),
  stripeCustomerId: text('stripe_customer_id'),
  teamId: uuid('team_id').references(() => teams.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================================================
// TEAMS / ORGANIZATIONS
// ============================================================================

export const teams = pgTable('teams', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  logoUrl: text('logo_url'),
  brandColors: jsonb('brand_colors').$type<{ primary: string; secondary: string; accent: string }>(), // Store brand colors
  subscriptionTier: subscriptionTierEnum('subscription_tier').default('TEAM').notNull(),
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  crmIntegration: jsonb('crm_integration').$type<{ provider: string; apiKey: string; webhookUrl?: string }>(), // CRM settings
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const teamMembers = pgTable('team_members', {
  id: uuid('id').defaultRandom().primaryKey(),
  teamId: uuid('team_id').references(() => teams.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  role: text('role').default('MEMBER').notNull(), // OWNER, ADMIN, MEMBER
  joinedAt: timestamp('joined_at').defaultNow().notNull(),
});

// ============================================================================
// PORTFOLIOS
// ============================================================================

export const portfolios = pgTable('portfolios', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  title: text('title').notNull(),
  slug: text('slug').notNull(), // Used in /[username] route
  isPublished: boolean('is_published').default(false).notNull(),
  customDomain: text('custom_domain'), // Pro feature
  
  // Content (AI-generated or manual)
  bio: text('bio'),
  headline: text('headline'),
  heroImageUrl: text('hero_image_url'),
  sections: jsonb('sections').$type<Array<{
    id: string;
    type: 'about' | 'experience' | 'projects' | 'skills' | 'contact';
    title: string;
    content: any;
    order: number;
  }>>(),
  
  // Design/Theming
  theme: jsonb('theme').$type<{
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    layout: string;
  }>(),
  
  // SEO
  metaTitle: text('meta_title'),
  metaDescription: text('meta_description'),
  
  // Analytics
  viewCount: integer('view_count').default(0).notNull(),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const portfolioProjects = pgTable('portfolio_projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  portfolioId: uuid('portfolio_id').references(() => portfolios.id, { onDelete: 'cascade' }).notNull(),
  title: text('title').notNull(),
  description: text('description'),
  imageUrl: text('image_url'),
  url: text('url'),
  tags: jsonb('tags').$type<string[]>(),
  order: integer('order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================================================
// NFC CARDS
// ============================================================================

export const nfcCards = pgTable('nfc_cards', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  portfolioId: uuid('portfolio_id').references(() => portfolios.id, { onDelete: 'set null' }),
  
  cardUid: text('card_uid').notNull().unique(), // Physical NFC chip UID
  shortCode: text('short_code').notNull().unique(), // For /tap/:shortCode redirect
  
  status: cardStatusEnum('status').default('ACTIVE').notNull(),
  tapCount: integer('tap_count').default(0).notNull(),
  
  // Context Switching (e.g., "Conference Mode" vs "Meeting Mode")
  context: text('context').default('default').notNull(),
  
  activatedAt: timestamp('activated_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================================================
// ANALYTICS & TRACKING
// ============================================================================

export const portfolioViews = pgTable('portfolio_views', {
  id: uuid('id').defaultRandom().primaryKey(),
  portfolioId: uuid('portfolio_id').references(() => portfolios.id, { onDelete: 'cascade' }).notNull(),
  
  // Visitor Info
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  referrer: text('referrer'),
  
  // Location
  country: text('country'),
  city: text('city'),
  
  // Device
  deviceType: text('device_type'), // mobile, tablet, desktop
  browser: text('browser'),
  os: text('os'),
  
  // NFC specific
  nfcCardId: uuid('nfc_card_id').references(() => nfcCards.id, { onDelete: 'set null' }),
  
  viewedAt: timestamp('viewed_at').defaultNow().notNull(),
});

// ============================================================================
// LEAD CAPTURE
// ============================================================================

export const leads = pgTable('leads', {
  id: uuid('id').defaultRandom().primaryKey(),
  portfolioId: uuid('portfolio_id').references(() => portfolios.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(), // Portfolio owner
  
  // Lead Data
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  company: text('company'),
  message: text('message'),
  
  // Metadata
  source: text('source').default('portfolio').notNull(), // portfolio, nfc_tap, qr_code
  nfcCardId: uuid('nfc_card_id').references(() => nfcCards.id, { onDelete: 'set null' }),
  
  // CRM Sync
  syncedToCrm: boolean('synced_to_crm').default(false).notNull(),
  crmId: text('crm_id'), // External CRM record ID
  
  capturedAt: timestamp('captured_at').defaultNow().notNull(),
});

// ============================================================================
// E-COMMERCE (NFC Card Shop)
// ============================================================================

export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  price: integer('price').notNull(), // in cents
  currency: varchar('currency', { length: 3 }).default('USD').notNull(),
  imageUrl: text('image_url'),
  material: text('material'), // PVC, Wood, Metal
  stripePriceId: text('stripe_price_id'), // For Stripe integration
  isActive: boolean('is_active').default(true).notNull(),
  stock: integer('stock').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  
  // Order Details
  orderNumber: text('order_number').notNull().unique(),
  status: orderStatusEnum('status').default('PENDING').notNull(),
  total: integer('total').notNull(), // in cents
  currency: varchar('currency', { length: 3 }).default('USD').notNull(),
  
  // Shipping
  shippingAddress: jsonb('shipping_address').$type<{
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }>(),
  trackingNumber: text('tracking_number'),
  
  // Payment
  stripePaymentIntentId: text('stripe_payment_intent_id'),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const orderItems = pgTable('order_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').references(() => orders.id, { onDelete: 'cascade' }).notNull(),
  productId: uuid('product_id').references(() => products.id, { onDelete: 'set null' }),
  quantity: integer('quantity').notNull(),
  pricePerUnit: integer('price_per_unit').notNull(), // in cents
  total: integer('total').notNull(), // in cents
});

// ============================================================================
// AI GENERATION LOGS (for debugging & rate limiting)
// ============================================================================

export const aiGenerations = pgTable('ai_generations', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  
  type: text('type').notNull(), // 'bio', 'project_description', 'blog_post', 'resume_parse'
  prompt: text('prompt').notNull(),
  response: jsonb('response'),
  model: text('model').default('gpt-4o').notNull(),
  
  tokensUsed: integer('tokens_used'),
  cost: integer('cost'), // in cents
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================================================
// RELATIONS
// ============================================================================

export const usersRelations = relations(users, ({ one, many }) => ({
  team: one(teams, {
    fields: [users.teamId],
    references: [teams.id],
  }),
  portfolios: many(portfolios),
  nfcCards: many(nfcCards),
  leads: many(leads),
  aiGenerations: many(aiGenerations),
}));

export const teamsRelations = relations(teams, ({ many }) => ({
  members: many(teamMembers),
  users: many(users),
}));

export const portfoliosRelations = relations(portfolios, ({ one, many }) => ({
  user: one(users, {
    fields: [portfolios.userId],
    references: [users.id],
  }),
  projects: many(portfolioProjects),
  views: many(portfolioViews),
  leads: many(leads),
  nfcCards: many(nfcCards),
}));

export const nfcCardsRelations = relations(nfcCards, ({ one, many }) => ({
  user: one(users, {
    fields: [nfcCards.userId],
    references: [users.id],
  }),
  portfolio: one(portfolios, {
    fields: [nfcCards.portfolioId],
    references: [portfolios.id],
  }),
  views: many(portfolioViews),
  leads: many(leads),
}));

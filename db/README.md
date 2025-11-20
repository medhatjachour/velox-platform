# Database Setup Guide

This directory contains the Drizzle ORM schema and migration files for the Velox platform.

## 📋 Schema Overview

The database is organized into the following main entities:

### Core Tables
- **users** - User accounts (linked to Clerk auth)
- **teams** - Team/Organization accounts
- **team_members** - Team membership relationships

### Portfolio & Content
- **portfolios** - User portfolio pages
- **portfolio_projects** - Projects within portfolios
- **portfolio_views** - Analytics tracking for portfolio views

### NFC & Physical Cards
- **nfc_cards** - Physical NFC card records
- **leads** - Lead capture from portfolio/NFC taps

### E-commerce
- **products** - NFC card products in the shop
- **orders** - Customer orders
- **order_items** - Line items for orders

### AI & Analytics
- **ai_generations** - Logs of AI-generated content (for rate limiting)

## 🚀 Getting Started

### 1. Setup Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Then fill in your DATABASE_URL with your Neon PostgreSQL connection string.

### 2. Generate Migrations

After making changes to `schema.ts`, generate migration files:

```bash
npm run db:generate
```

### 3. Push Schema to Database

For development, you can push the schema directly without migrations:

```bash
npm run db:push
```

Or run migrations manually:

```bash
npm run db:migrate
```

### 4. Explore Database (Drizzle Studio)

Launch the visual database browser:

```bash
npm run db:studio
```

This opens a web interface at `https://local.drizzle.studio`

## 📝 Making Schema Changes

1. Edit `db/schema.ts`
2. Run `npm run db:generate` to create migration files
3. Review the generated migration in `db/migrations/`
4. Run `npm run db:push` or `npm run db:migrate`

## 🔗 Usage in Code

Import the database client and schema:

```typescript
import { db, users, portfolios } from '@/db';
import { eq } from 'drizzle-orm';

// Query example
const user = await db.query.users.findFirst({
  where: eq(users.clerkId, 'user_xxx'),
  with: {
    portfolios: true,
    nfcCards: true,
  },
});

// Insert example
const newPortfolio = await db.insert(portfolios).values({
  userId: user.id,
  title: 'My Portfolio',
  slug: 'my-portfolio',
}).returning();
```

## 🏗 Architecture Notes

- **Neon Serverless**: We use `@neondatabase/serverless` for edge-compatible queries
- **Relations**: Drizzle relations are defined for easy querying with `db.query`
- **Enums**: PostgreSQL enums are used for status fields (role, subscription_tier, etc.)
- **JSON Columns**: Complex data (theme, sections, CRM config) is stored as JSONB

## 📚 Resources

- [Drizzle ORM Docs](https://orm.drizzle.team)
- [Neon Serverless Driver](https://neon.tech/docs/serverless/serverless-driver)
- [PostgreSQL Data Types](https://www.postgresql.org/docs/current/datatype.html)

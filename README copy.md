# Velox - AI-Powered NFC Portfolio Platform

## 🚀 Overview
Velox is a B2B platform that combines **Generative AI** with **NFC Technology**. It allows professionals to generate high-converting portfolios from a simple resume upload and share them instantly via physical NFC cards. Unlike standard link-in-bio tools, Velox focuses on **Lead Capture**, **CRM Integration**, and **Dynamic Context**.

## 🎨 Brand Identity
*   **Name:** Velox (Latin for "Swift")
*   **Tagline:** "The Last Business Card You’ll Ever Need."
*   **Primary Color:** Midnight Navy (`#0F172A`) - Trust, Corporate, B2B.
*   **Secondary Color:** Electric Cyan (`#06B6D4`) - AI, Technology, Future.
*   **Accent Color:** Signal Amber (`#F59E0B`) - Alerts, CTAs, Conversion.
*   **Background:** Ghost White (`#F8FAFC`) - Clean, Modern UI.

## 🛠 Tech Stack

### Frontend
*   **Framework:** Next.js (App Router) - *Leveraging Server Components for SEO.*
*   **Styling:** Tailwind CSS + Shadcn UI + Lucide Icons.
*   **State Management:** Zustand (Global Store) + TanStack Query (Data Fetching).
*   **Forms & Validation:** React Hook Form + Zod (Crucial for validating AI outputs).
*   **PWA:** `next-pwa` (Ensures portfolios load offline after the first tap).

### Backend & Infrastructure
*   **Runtime:** Vercel Edge Functions (For sub-100ms NFC redirects).
*   **Database:** PostgreSQL (Supabase or Neon).
*   **ORM:** Drizzle ORM (Preferred over Prisma for faster serverless cold starts).
*   **Auth:** Clerk (Chosen for built-in **B2B/Organization** support).
*   **File Storage:** UploadThing (S3 wrapper for easy resume/image uploads).
*   **Email:** Resend (For sending "Lead Captured" alerts to users).

### AI & Logic
*   **LLM:** OpenAI GPT-4o (Using "JSON Mode" for structured website generation).
*   **Image Gen:** Stable Diffusion XL or Flux (For generating custom hero backgrounds).
*   **Analytics:** PostHog (Captures session replays to see *how* investors view the portfolio).
*   **Payments:** Stripe Billing (Subscription management).

## 📦 Key Features

### 1. AI "Magic Build"
Users upload a PDF Resume/CV. The system parses text, extracts skills, experience, and projects, and auto-generates a structured website with professional copy.

### 2. NFC "Smart Tap"
*   **Deep Linking:** Tapping the card opens the portfolio.
*   **Lead Capture:** A "Connect" button on the portfolio saves the visitor's details directly to the user's dashboard.
*   **Context Switching:** Users can toggle their card mode (e.g., "Conference Mode" vs "Meeting Mode") via mobile.

### 3. Enterprise Team Management
*   **Brand Locking:** Admins enforce logos and colors across all employee cards.
*   **CRM Sync:** Leads captured by employees are pushed to the company Salesforce/HubSpot.

## 💰 Business Model & Monetization

### 1. Free Tier (The Hook)
*   1 Basic Portfolio (Velox branding).
*   Basic AI Resume Parser.
*   QR Code generation.

### 2. Pro Tier ($12/mo - The Individual)
*   Custom Domain (`yourname.com`).
*   Advanced AI (Cover letter generator, Blog writer).
*   Detailed Analytics (Who viewed, location data).
*   Remove Branding.

### 3. Team/Enterprise ($49/mo + $5/user - The Cash Cow)
*   Centralized Admin Dashboard.
*   Brand Locking (Enforce company colors/fonts).
*   CRM Sync (HubSpot/Salesforce).
*   Lead Capture Forms.

### 4. Hardware Store
*   Sell NFC Cards (PVC, Wood, Metal) ranging from $15 to $100.

## 🗺 Site Map & Pages

### A. Public Website (Marketing)
1.  `/` - Landing Page (Hero, Demo, Social Proof).
2.  `/features` - AI capabilities, NFC explanation.
3.  `/pricing` - Tiers comparison.
4.  `/shop` - E-commerce store to buy physical NFC cards.
5.  `/contact` - Support.

### B. Authentication
6.  `/auth/login`
7.  `/auth/register`
8.  `/auth/onboarding` - (Step-by-step wizard: Upload Resume -> AI Generates Site).

### C. The Product (Public View)
9.  `/[username]` - The actual portfolio page (Dynamic).
10. `/[username]/vcard` - Downloadable contact file endpoint.
11. `/[username]/exchange` - Lead capture form for people tapping the card.

### D. User Dashboard (Private)
12. `/dashboard` - Overview (Recent views, quick stats).
13. `/dashboard/editor` - Drag-and-drop builder + AI Text/Image Generators.
14. `/dashboard/analytics` - Charts, Maps, Device types.
15. `/dashboard/nfc` - Link physical card, manage QR codes.
16. `/dashboard/contacts` - List of leads captured via the card.
17. `/dashboard/settings` - Billing, Account, Integrations.

### E. Team/Enterprise Dashboard
18. `/team` - Team Overview.
19. `/team/members` - Add/Remove employees, bulk invite.
20. `/team/brand-kit` - Set global styles for all employees.
21. `/team/crm` - Configure Salesforce/HubSpot API keys.

### F. Super Admin (For You)
22. `/admin` - Global stats (MRR, Total Users).
23. `/admin/users` - Ban users, view data.
24. `/admin/orders` - Manage NFC card shipments.
25. `/admin/content` - Moderation (flagged portfolios).

## 🏗 Software Architecture & Design Patterns

### Core Architecture: **Clean Architecture + Domain-Driven Design (DDD)**

We follow a **layered architecture** to ensure scalability, testability, and maintainability:

```
┌─────────────────────────────────────────────────────────┐
│                    Presentation Layer                    │
│              (Next.js Pages & Components)                │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                    Application Layer                     │
│           (Use Cases, Services, Business Logic)          │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                      Domain Layer                        │
│            (Entities, Value Objects, Events)             │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                  Infrastructure Layer                    │
│        (Database, APIs, External Services)               │
└─────────────────────────────────────────────────────────┘
```

### Key Design Patterns

#### 1. **Repository Pattern** (Data Access)
Abstract database operations to make them testable and swappable.

```typescript
// lib/repositories/user.repository.ts
export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  create(data: CreateUserDTO): Promise<User>;
  update(id: string, data: UpdateUserDTO): Promise<User>;
}

export class UserRepository implements IUserRepository {
  // Implementation using Drizzle ORM
}
```

#### 2. **Service Layer Pattern** (Business Logic)
Keep business logic OUT of API routes and components.

```typescript
// lib/services/portfolio.service.ts
export class PortfolioService {
  constructor(
    private portfolioRepo: IPortfolioRepository,
    private aiService: IAIService
  ) {}

  async generateFromResume(userId: string, resumeFile: File) {
    // 1. Extract text from PDF
    // 2. Call AI to structure content
    // 3. Validate with Zod
    // 4. Save to database
    // 5. Return portfolio
  }
}
```

#### 3. **Factory Pattern** (AI Generation)
Create different AI strategies for different content types.

```typescript
// lib/ai/factories/content.factory.ts
export class AIContentFactory {
  static createGenerator(type: 'bio' | 'project' | 'blog'): IAIGenerator {
    switch(type) {
      case 'bio': return new BioGenerator();
      case 'project': return new ProjectGenerator();
      case 'blog': return new BlogGenerator();
    }
  }
}
```

#### 4. **Observer Pattern** (Real-time Analytics)
Emit events when portfolios are viewed, leads are captured, etc.

```typescript
// lib/events/portfolio.events.ts
export class PortfolioEventEmitter {
  emit(event: 'viewed' | 'lead_captured', data: any) {
    // Send to analytics
    // Trigger webhooks
    // Send email notifications
  }
}
```

#### 5. **Strategy Pattern** (Multi-Tenant Logic)
Different behavior for Free vs Pro vs Enterprise users.

```typescript
// lib/strategies/feature-access.strategy.ts
export interface IFeatureStrategy {
  canUseAI(): boolean;
  canCustomDomain(): boolean;
  canAccessAnalytics(): boolean;
}

export class FreeUserStrategy implements IFeatureStrategy { /* ... */ }
export class ProUserStrategy implements IFeatureStrategy { /* ... */ }
export class EnterpriseStrategy implements IFeatureStrategy { /* ... */ }
```

#### 6. **Decorator Pattern** (Rate Limiting & Caching)
Wrap API calls with middleware for protection.

```typescript
// lib/decorators/rate-limit.decorator.ts
export function RateLimit(requests: number, window: string) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function(...args: any[]) {
      // Check rate limit
      // If exceeded, throw error
      return originalMethod.apply(this, args);
    };
  };
}

// Usage
class AIService {
  @RateLimit(10, '1h')
  async generateBio(resume: string) { /* ... */ }
}
```

### SOLID Principles Applied

1. **Single Responsibility:** Each service does ONE thing (e.g., `AIService` only handles AI, not database writes).
2. **Open/Closed:** Easy to add new AI providers without changing existing code.
3. **Liskov Substitution:** Any `IUserRepository` implementation works (SQL, MongoDB, Mock).
4. **Interface Segregation:** Small, focused interfaces (e.g., `IEmailService` vs `INotificationService`).
5. **Dependency Inversion:** High-level modules depend on abstractions, not implementations.

### Security Architecture

```typescript
// lib/security/rbac.ts (Role-Based Access Control)
export enum Role {
  USER = 'user',
  TEAM_ADMIN = 'team_admin',
  SUPER_ADMIN = 'super_admin'
}

export class RBACService {
  canAccess(user: User, resource: string, action: string): boolean {
    // Check permissions based on role
  }
}
```

### Error Handling Strategy

```typescript
// lib/errors/app-error.ts
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational: boolean = true
  ) {
    super(message);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(400, message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(401, message);
  }
}
```

### Testing Strategy

```typescript
// __tests__/unit/services/portfolio.service.test.ts
describe('PortfolioService', () => {
  let service: PortfolioService;
  let mockRepo: jest.Mocked<IPortfolioRepository>;
  let mockAI: jest.Mocked<IAIService>;

  beforeEach(() => {
    mockRepo = createMockRepository();
    mockAI = createMockAIService();
    service = new PortfolioService(mockRepo, mockAI);
  });

  it('should generate portfolio from resume', async () => {
    // Test implementation
  });
});
```

## 🗂 Project Structure

```bash
/
├── app/                         # Next.js App Router
│   ├── (marketing)/            # Public pages (landing, pricing)
│   ├── (auth)/                 # Authentication flows
│   ├── (dashboard)/            # Protected user dashboard
│   ├── (team)/                 # Team/Enterprise dashboard
│   ├── (admin)/                # Super admin panel
│   ├── [username]/             # Dynamic portfolio renderer
│   └── api/                    # API Routes
│       ├── auth/               # Auth endpoints
│       ├── portfolios/         # Portfolio CRUD
│       ├── ai/                 # AI generation endpoints
│       ├── nfc/                # NFC activation/tracking
│       └── webhooks/           # Stripe, CRM webhooks
│
├── components/                  # React Components
│   ├── ui/                     # Shadcn UI components
│   ├── marketing/              # Landing page components
│   ├── dashboard/              # Dashboard-specific components
│   ├── portfolio/              # Portfolio renderer components
│   └── shared/                 # Shared components
│
├── lib/                         # Core Business Logic
│   ├── domain/                 # Domain entities
│   │   ├── entities/           # User, Portfolio, Team, etc.
│   │   ├── value-objects/      # Email, URL, Color, etc.
│   │   └── events/             # Domain events
│   │
│   ├── repositories/           # Data access abstractions
│   │   ├── user.repository.ts
│   │   ├── portfolio.repository.ts
│   │   └── team.repository.ts
│   │
│   ├── services/               # Business logic
│   │   ├── auth.service.ts
│   │   ├── portfolio.service.ts
│   │   ├── ai.service.ts
│   │   ├── nfc.service.ts
│   │   └── analytics.service.ts
│   │
│   ├── ai/                     # AI-related logic
│   │   ├── providers/          # OpenAI, Anthropic, etc.
│   │   ├── prompts/            # Structured prompts
│   │   └── validators/         # Zod schemas for AI outputs
│   │
│   ├── integrations/           # External APIs
│   │   ├── stripe/
│   │   ├── crm/                # HubSpot, Salesforce
│   │   └── email/              # Resend
│   │
│   ├── security/               # Security utilities
│   │   ├── rbac.ts             # Role-based access control
│   │   ├── rate-limit.ts
│   │   └── encryption.ts
│   │
│   └── utils/                  # Helpers
│       ├── validators.ts
│       ├── formatters.ts
│       └── constants.ts
│
├── db/                          # Database
│   ├── schema.ts               # Drizzle schema
│   ├── migrations/             # SQL migrations
│   └── seed.ts                 # Seed data
│
├── types/                       # TypeScript types
│   ├── api.types.ts
│   ├── domain.types.ts
│   └── dto.types.ts
│
├── __tests__/                   # Tests
│   ├── unit/                   # Unit tests
│   ├── integration/            # Integration tests
│   └── e2e/                    # End-to-end tests
│
└── public/                      # Static assets
    ├── logo.svg
    └── images/
```

## 🚦 Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."

# Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...

# AI
OPENAI_API_KEY=...

# Storage
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_BUCKET_NAME=...

# Payments
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
```

## 🏃‍♂️ Getting Started

1.  **Clone the repo:**
    ```bash
    git clone https://github.com/yourusername/velox.git
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Setup Database:**
    ```bash
    npx prisma generate
    npx prisma db push
    ```
4.  **Run Development Server:**
    ```bash
    npm run dev
    ```

## 🗺 Roadmap

- [ ] **Phase 1: The Core (Weeks 1-4)**
    - Setup Next.js + PostgreSQL.
    - Build Auth (Clerk or NextAuth).
    - **AI Engine:** Integrate OpenAI to parse PDF resumes and output JSON for the portfolio.
    - Basic "Public View" page rendering.

- [ ] **Phase 2: The Dashboard (Weeks 5-8)**
    - Build the Editor (React-Hook-Form + Live Preview).
    - Implement Image Uploads (AWS S3 or Cloudinary).
    - Create the "Onboarding Wizard" (Crucial for UX).

- [ ] **Phase 3: NFC & Analytics (Weeks 9-10)**
    - Implement Deep Linking logic.
    - Build the Analytics tracker (track `userAgent`, `IP`, `Referrer`).
    - Create the "Lead Capture" form logic.

- [ ] **Phase 4: Monetization & B2B (Weeks 11-14)**
    - Integrate Stripe (Subscriptions + One-off hardware payments).
    - Build the Team Dashboard.
    - Implement CRM Webhooks.

# Velox Platform - Clean Architecture

## 🎯 Vision

A stunning NFC card platform that **tells a story**, **shows value**, and **converts visitors into customers** through exceptional UI/UX, smooth animations, and clear user journeys.

---

## 🏗️ System Architecture

### Technology Stack

```
Frontend:
├── Next.js 15+ (App Router) - SSR + Client components
├── React 19 - UI framework
├── TypeScript - Type safety
├── Tailwind CSS v4 - Styling
├── Framer Motion - Animations
├── Three.js / React Three Fiber - 3D elements
└── Zustand - State management

Backend:
├── Next.js API Routes - RESTful API
├── PostgreSQL - Database (local/self-hosted)
├── Prisma - ORM & Type safety
├── JWT - Authentication (custom)
└── Groq AI - AI features (14,400 free/day)

DevOps:
├── Docker - Containerization
├── GitHub Actions - CI/CD
└── Vercel/Netlify - Deployment
```

---

## 📁 Project Structure

```
velox-platform/
├── app/                           # Next.js App Directory
│   ├── (marketing)/              # Public pages (SSR)
│   │   ├── page.tsx              # Homepage - Hero + Value Prop
│   │   ├── features/             # Features showcase
│   │   ├── pricing/              # Pricing plans
│   │   ├── showcase/             # 3D NFC card demo
│   │   └── about/                # Company story
│   │
│   ├── (auth)/                   # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   └── reset-password/
│   │
│   ├── (dashboard)/              # Protected dashboard (Client)
│   │   ├── dashboard/            # Main dashboard
│   │   ├── portfolio/            # Portfolio builder
│   │   ├── teams/                # Team management
│   │   ├── nfc-cards/            # NFC card orders
│   │   ├── analytics/            # Analytics
│   │   └── settings/             # User settings
│   │
│   ├── (admin)/                  # Super admin panel
│   │   ├── users/
│   │   ├── orders/
│   │   ├── analytics/
│   │   └── system/
│   │
│   ├── api/                      # API Routes
│   │   ├── auth/
│   │   ├── users/
│   │   ├── portfolios/
│   │   ├── teams/
│   │   ├── nfc/
│   │   └── ai/
│   │
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
│
├── components/
│   ├── marketing/                # Landing page components
│   │   ├── Hero.tsx
│   │   ├── ValueProposition.tsx
│   │   ├── NFCShowcase3D.tsx
│   │   ├── Features.tsx
│   │   ├── Pricing.tsx
│   │   ├── Testimonials.tsx
│   │   └── CTA.tsx
│   │
│   ├── dashboard/                # Dashboard components
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── PortfolioBuilder/
│   │   └── TeamManager/
│   │
│   ├── ui/                       # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── ...
│   │
│   └── 3d/                       # Three.js components
│       ├── NFCCard3D.tsx
│       ├── ParallaxScene.tsx
│       └── AnimatedBackground.tsx
│
├── lib/
│   ├── auth/                     # Authentication
│   │   ├── jwt.ts                # JWT utils
│   │   ├── password.ts           # Password hashing
│   │   ├── middleware.ts         # Auth middleware
│   │   └── rbac.ts               # Role-based access
│   │
│   ├── db/                       # Database layer
│   │   ├── prisma.ts             # Prisma client
│   │   └── seed.ts               # Database seeding
│   │
│   ├── services/                 # Business logic
│   │   ├── user.service.ts
│   │   ├── portfolio.service.ts
│   │   ├── team.service.ts
│   │   ├── nfc.service.ts
│   │   └── ai.service.ts
│   │
│   ├── repositories/             # Data access layer
│   │   ├── user.repository.ts
│   │   ├── portfolio.repository.ts
│   │   └── ...
│   │
│   ├── validators/               # Input validation
│   │   └── schemas.ts            # Zod schemas
│   │
│   └── utils/                    # Utilities
│       ├── logger.ts
│       ├── errors.ts
│       └── helpers.ts
│
├── prisma/
│   ├── schema.prisma             # Database schema
│   ├── migrations/               # Migration files
│   └── seed.ts                   # Seed data
│
├── public/
│   ├── images/
│   ├── models/                   # 3D models
│   └── fonts/
│
├── types/
│   ├── auth.types.ts
│   ├── user.types.ts
│   └── ...
│
├── config/
│   ├── site.config.ts            # Site configuration
│   └── roles.config.ts           # Role definitions
│
└── docs/
    ├── API.md                    # API documentation
    ├── DEPLOYMENT.md             # Deployment guide
    └── USER_JOURNEYS.md          # User flow documentation
```

---

## 🎨 Design System

### Brand Colors

```typescript
const colors = {
  // Primary - Electric Cyan (from logo)
  primary: {
    50: '#ECFEFF',
    100: '#CFFAFE',
    200: '#A5F3FC',
    300: '#67E8F9',
    400: '#22D3EE',
    500: '#06B6D4', // Main brand color
    600: '#0891B2',
    700: '#0E7490',
    800: '#155E75',
    900: '#164E63',
  },
  
  // Secondary - Deep Purple
  secondary: {
    50: '#FAF5FF',
    100: '#F3E8FF',
    200: '#E9D5FF',
    300: '#D8B4FE',
    400: '#C084FC',
    500: '#A855F7',
    600: '#9333EA',
    700: '#7E22CE',
    800: '#6B21A8',
    900: '#581C87',
  },
  
  // Accent - Amber (call-to-action)
  accent: {
    500: '#F59E0B',
    600: '#D97706',
  },
  
  // Neutrals
  dark: {
    900: '#0F172A', // Midnight Navy
    800: '#1E293B',
    700: '#334155',
  },
  
  light: {
    50: '#F8FAFC',  // Ghost White
    100: '#F1F5F9',
    200: '#E2E8F0',
  }
};
```

### Typography

```typescript
const typography = {
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },
  
  sizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem',  // 72px
  },
};
```

### Animation Principles

```typescript
const animations = {
  // Durations
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  
  // Easings
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: 'cubic-bezier(0.65, 0, 0.35, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  // Effects
  effects: {
    fadeIn: 'fade-in 300ms ease-in',
    slideUp: 'slide-up 500ms cubic-bezier(0.65, 0, 0.35, 1)',
    scale: 'scale 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
};
```

---

## 👤 User Roles & Permissions

### Role Hierarchy

```typescript
enum UserRole {
  GUEST = 'guest',           // Not logged in
  USER = 'user',             // Regular user
  TEAM_MEMBER = 'member',    // Team member
  TEAM_LEADER = 'leader',    // Team leader
  SUPER_ADMIN = 'admin',     // You (full access)
}

const permissions = {
  guest: {
    canView: ['landing', 'features', 'pricing'],
    canCreate: [],
    canEdit: [],
    canDelete: [],
  },
  
  user: {
    canView: ['dashboard', 'own-portfolio', 'analytics'],
    canCreate: ['portfolio', 'nfc-order'],
    canEdit: ['own-portfolio', 'own-profile'],
    canDelete: ['own-portfolio'],
    limits: {
      portfolios: 3,
      nfcCards: 2,
    },
  },
  
  member: {
    inherits: 'user',
    canView: ['team-portfolios'],
    canEdit: ['assigned-portfolios'],
  },
  
  leader: {
    inherits: 'member',
    canCreate: ['team', 'invite-member'],
    canEdit: ['team-settings', 'all-team-portfolios'],
    canDelete: ['team-member', 'team-portfolio'],
    limits: {
      portfolios: 10,
      teamMembers: 5,
    },
  },
  
  admin: {
    canView: ['*'],
    canCreate: ['*'],
    canEdit: ['*'],
    canDelete: ['*'],
    limits: null, // Unlimited
  },
};
```

---

## 🛣️ User Journeys

### 1. Guest Journey (Conversion Focus)

```
Landing Page
  ↓
See Hero with 3D NFC Card Animation
  ↓
Scroll through Value Propositions
  ↓
Watch Interactive 3D Demo
  ↓
View Features & Benefits
  ↓
Check Pricing
  ↓
Decision Point:
  ├─→ Order NFC Card (Quick checkout)
  └─→ Create Account
        ↓
      Complete Registration
        ↓
      Access Dashboard
```

### 2. New User Journey

```
Register Account
  ↓
Email Verification
  ↓
Onboarding Wizard:
  ├─ Step 1: Profile Setup
  ├─ Step 2: Create First Portfolio
  ├─ Step 3: Customize Design
  └─ Step 4: Order NFC Card (optional)
  ↓
Dashboard Overview
  ↓
Explore Features
```

### 3. Team Leader Journey

```
Dashboard
  ↓
Create Team
  ↓
Invite Members
  ↓
Assign Roles & Permissions
  ↓
Create Team Portfolios
  ↓
Assign to Members
  ↓
Monitor Team Analytics
```

### 4. Super Admin Journey

```
Admin Dashboard
  ↓
View System Overview
  ↓
Manage Users & Teams
  ↓
Review NFC Orders
  ↓
Access System Settings
  ↓
View Platform Analytics
```

---

## 🔐 Authentication System

### JWT-Based Auth

```typescript
// Token Structure
interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat: number; // Issued at
  exp: number; // Expiration
}

// Auth Flow
1. User registers/logs in
2. Server validates credentials
3. Server generates JWT (access + refresh tokens)
4. Client stores tokens (httpOnly cookies)
5. Client includes token in requests
6. Server validates token
7. Server checks permissions (RBAC)
8. Server responds
```

### Password Security

```typescript
- Bcrypt hashing (cost factor: 12)
- Password requirements:
  - Minimum 8 characters
  - At least 1 uppercase
  - At least 1 lowercase
  - At least 1 number
  - At least 1 special character
```

---

## 🤖 AI Integration (Groq)

### Why Groq?

- ✅ **14,400 free requests per day**
- ✅ Fastest AI inference
- ✅ Multiple models available
- ✅ Easy to switch to other providers later

### AI Features

```typescript
1. Portfolio Content Generation
   - Bio writing
   - Project descriptions
   - Skills suggestions

2. NFC Card Design
   - Color scheme suggestions
   - Layout recommendations
   - Content optimization

3. Analytics Insights
   - Performance summaries
   - Improvement suggestions
   - Trend analysis
```

---

## 📊 Database Schema

### Core Tables

```prisma
model User {
  id            String   @id @default(uuid())
  email         String   @unique
  password      String   // Hashed
  fullName      String
  role          UserRole @default(USER)
  avatar        String?
  
  portfolios    Portfolio[]
  teams         TeamMember[]
  nfcCards      NFCCard[]
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Portfolio {
  id            String   @id @default(uuid())
  userId        String
  slug          String   @unique
  title         String
  bio           String?
  theme         Json
  isPublished   Boolean  @default(false)
  
  user          User     @relation(fields: [userId], references: [id])
  projects      Project[]
  analytics     PortfolioView[]
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Team {
  id            String   @id @default(uuid())
  name          String
  leaderId      String
  
  members       TeamMember[]
  portfolios    Portfolio[]
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model NFCCard {
  id            String   @id @default(uuid())
  userId        String
  cardUid       String   @unique
  design        Json
  portfolioId   String?
  status        CardStatus
  
  user          User     @relation(fields: [userId], references: [id])
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

---

## 🎯 Next Steps (Implementation Plan)

### Phase 1: Foundation (Days 1-3)
- [ ] Set up PostgreSQL locally
- [ ] Configure Prisma
- [ ] Implement JWT authentication
- [ ] Create RBAC system
- [ ] Set up Groq AI integration

### Phase 2: Landing Page (Days 4-6)
- [ ] Design hero section with 3D NFC card
- [ ] Build value proposition sections
- [ ] Create interactive features showcase
- [ ] Design pricing page
- [ ] Add smooth animations

### Phase 3: Dashboard (Days 7-10)
- [ ] Build dashboard layout
- [ ] Create portfolio builder
- [ ] Implement team management
- [ ] Add NFC card customization
- [ ] Build analytics views

### Phase 4: Admin Panel (Days 11-12)
- [ ] Create admin dashboard
- [ ] User management interface
- [ ] Order management
- [ ] System settings

### Phase 5: Polish & Deploy (Days 13-14)
- [ ] Responsive design
- [ ] Performance optimization
- [ ] Testing
- [ ] Deployment

---

## 🚀 Let's Build!

Ready to create something amazing? Let's start with Phase 1! 🎨✨

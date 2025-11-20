# Phase 1 Testing Guide

## Prerequisites

1. **Environment Variables** - Ensure `.env.local` has:
```env
# Database
DATABASE_URL=your_neon_postgresql_url

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key
```

2. **Database Setup**
```bash
# Generate and run migrations
npm run db:generate
npm run db:push
```

3. **Install Dependencies**
```bash
npm install
```

4. **Start Development Server**
```bash
npm run dev
```

---

## Testing Strategy

### 1. API Route Testing (Using curl or Postman)

#### A. User Routes

**Get Current User Profile**
```bash
curl http://localhost:3000/api/users/me \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN"
```

**Update User Profile**
```bash
curl -X PATCH http://localhost:3000/api/users/me \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN" \
  -d '{"subscriptionTier": "pro"}'
```

**Upgrade Subscription**
```bash
curl -X POST http://localhost:3000/api/users/me/upgrade \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN" \
  -d '{"tier": "premium"}'
```

#### B. Portfolio Routes

**Create Portfolio**
```bash
curl -X POST http://localhost:3000/api/portfolios \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN" \
  -d '{
    "slug": "john-doe",
    "title": "John Doe - Full Stack Developer",
    "bio": "Experienced developer with 5+ years in web development",
    "headline": "Full Stack Developer | React | Node.js",
    "theme": "default",
    "contactInfo": {
      "email": "john@example.com",
      "phone": "+1234567890"
    },
    "socialLinks": {
      "github": "https://github.com/johndoe",
      "linkedin": "https://linkedin.com/in/johndoe"
    }
  }'
```

**List User Portfolios**
```bash
curl http://localhost:3000/api/portfolios \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN"
```

**Get Portfolio by ID**
```bash
curl http://localhost:3000/api/portfolios/[portfolio-id]
```

**Update Portfolio**
```bash
curl -X PATCH http://localhost:3000/api/portfolios/[portfolio-id] \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN" \
  -d '{"title": "Updated Title", "bio": "Updated bio"}'
```

**Publish Portfolio**
```bash
curl -X POST http://localhost:3000/api/portfolios/[portfolio-id]/publish \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN"
```

**Delete Portfolio**
```bash
curl -X DELETE http://localhost:3000/api/portfolios/[portfolio-id] \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN"
```

#### C. AI Generation Routes

**Generate Bio**
```bash
curl -X POST http://localhost:3000/api/portfolios/[portfolio-id]/ai-generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN" \
  -d '{
    "type": "bio",
    "input": {
      "text": "Senior full-stack developer with expertise in React, Node.js, and cloud architecture. Built scalable systems for Fortune 500 companies.",
      "tone": "professional"
    }
  }'
```

**Generate Headline**
```bash
curl -X POST http://localhost:3000/api/portfolios/[portfolio-id]/ai-generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN" \
  -d '{
    "type": "headline",
    "input": {
      "bio": "Senior full-stack developer with 10+ years experience",
      "skills": ["React", "Node.js", "TypeScript", "AWS"]
    }
  }'
```

**Parse Resume**
```bash
curl -X POST http://localhost:3000/api/portfolios/[portfolio-id]/ai-generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN" \
  -d '{
    "type": "resume-parse",
    "input": {
      "resumeText": "JOHN DOE\nSenior Software Engineer\n\nEXPERIENCE:\nSenior Developer at Tech Corp (2020-2024)\n- Led team of 5 developers\n- Built microservices architecture\n\nSKILLS:\nReact, Node.js, Python, AWS, Docker"
    }
  }'
```

**Generate Project Description**
```bash
curl -X POST http://localhost:3000/api/portfolios/[portfolio-id]/ai-generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN" \
  -d '{
    "type": "project-description",
    "input": {
      "projectName": "E-commerce Platform",
      "technologies": ["React", "Node.js", "PostgreSQL", "Stripe"],
      "brief": "Built a full-featured online store with payment processing"
    }
  }'
```

#### D. NFC Routes

**Create NFC Card**
```bash
curl -X POST http://localhost:3000/api/nfc/cards \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN" \
  -d '{
    "portfolioId": "[portfolio-id]"
  }'
```

**List NFC Cards**
```bash
curl http://localhost:3000/api/nfc/cards \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN"
```

**Simulate NFC Tap** (No auth required)
```bash
# First create a card and get the shortCode, then:
curl http://localhost:3000/api/nfc/tap/[short-code] \
  -H "User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)" \
  -L  # -L follows the redirect
```

**Capture Lead from NFC Tap**
```bash
curl -X POST http://localhost:3000/api/nfc/leads \
  -H "Content-Type: application/json" \
  -d '{
    "shortCode": "[short-code]",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+1234567890",
    "company": "Tech Startup Inc",
    "message": "Interested in collaboration"
  }'
```

#### E. Analytics Routes

**Get Portfolio Analytics**
```bash
# Get all-time analytics
curl http://localhost:3000/api/analytics/portfolios/[portfolio-id] \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN"

# Get analytics for date range
curl "http://localhost:3000/api/analytics/portfolios/[portfolio-id]?startDate=2025-01-01&endDate=2025-12-31" \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN"
```

---

## 2. Manual Testing with Browser

### Setup Test User

1. Visit `http://localhost:3000`
2. Click "Sign In" (you'll need to configure Clerk first)
3. Create a test account

### Test Flow

1. **Create Portfolio**
   - POST to `/api/portfolios` with test data
   - Verify response contains portfolio ID

2. **Generate AI Content**
   - Use portfolio ID to generate bio, headline
   - Verify AI-generated content quality

3. **Create NFC Card**
   - Create card linked to portfolio
   - Note the `shortCode` in response

4. **Test NFC Tap**
   - Visit `/api/nfc/tap/[shortCode]` in browser
   - Should redirect to portfolio
   - Check database for tap count increment

5. **Capture Lead**
   - Submit lead data with short code
   - Verify lead saved in database

6. **View Analytics**
   - GET analytics for portfolio
   - Verify views, devices, countries data

---

## 3. Database Verification

Use Drizzle Studio to inspect data:

```bash
npm run db:studio
```

Then check:
- `users` table - user records created
- `portfolios` table - portfolios created and published
- `nfc_cards` table - cards with unique short codes
- `portfolio_views` table - view tracking data
- `leads` table - captured lead information
- `ai_generations` table - AI generation history with costs

---

## 4. Unit Testing (Future - Not Implemented Yet)

To add proper unit tests, install testing libraries:

```bash
npm install -D jest @testing-library/react @testing-library/jest-dom
npm install -D @types/jest ts-jest
```

Create test files for services:
- `lib/services/__tests__/portfolio.service.test.ts`
- `lib/services/__tests__/nfc.service.test.ts`
- `lib/services/__tests__/ai.service.test.ts`
- `lib/services/__tests__/analytics.service.test.ts`

---

## 5. Integration Testing Checklist

### User & Portfolio Flow
- [ ] Create user via Clerk
- [ ] User profile syncs to database
- [ ] Create portfolio for user
- [ ] Update portfolio
- [ ] Publish portfolio (slug becomes accessible)
- [ ] Delete portfolio

### AI Generation Flow
- [ ] Parse resume and extract data
- [ ] Generate professional bio
- [ ] Generate casual bio
- [ ] Generate creative bio
- [ ] Generate headline (verify 60 char limit)
- [ ] Generate project description
- [ ] Verify token usage tracking
- [ ] Check AI generation costs in database

### NFC & Lead Flow
- [ ] Create NFC card for portfolio
- [ ] Tap NFC card (increment tap count)
- [ ] Capture lead from NFC tap
- [ ] Verify lead associated with correct portfolio
- [ ] Check quota limits (free tier: 1 portfolio, 1 NFC card)

### Analytics Flow
- [ ] Track portfolio view
- [ ] Record device type, location, user agent
- [ ] Get analytics summary
- [ ] Filter by date range
- [ ] Verify unique visitor count
- [ ] Check top countries/devices

### Authorization Flow
- [ ] Verify users can only edit own portfolios
- [ ] Test admin role permissions
- [ ] Verify NFC cards only link to own portfolios
- [ ] Ensure analytics only visible to portfolio owner

### Quota & Subscription Flow
- [ ] Free tier: 1 portfolio, 1 NFC card, 5 AI generations
- [ ] Pro tier: 3 portfolios, 3 NFC cards, 50 AI generations
- [ ] Premium tier: unlimited
- [ ] Upgrade subscription
- [ ] Verify quota increases

---

## 6. Error Handling Tests

Test error scenarios:
- [ ] Invalid portfolio ID
- [ ] Unauthorized access attempts
- [ ] Quota exceeded errors
- [ ] Duplicate slug creation
- [ ] Invalid NFC short code
- [ ] Missing required fields
- [ ] AI rate limit handling

---

## 7. Performance Testing

- [ ] Create 100+ portfolios
- [ ] Track 1000+ portfolio views
- [ ] Test analytics query performance
- [ ] Verify pagination works

---

## Expected Results

### Successful Portfolio Creation
```json
{
  "portfolio": {
    "id": "uuid",
    "userId": "clerk_user_id",
    "slug": "john-doe",
    "title": "John Doe - Full Stack Developer",
    "bio": "...",
    "headline": "...",
    "isPublished": false,
    "theme": "default",
    "createdAt": "2025-11-20T...",
    "updatedAt": "2025-11-20T..."
  }
}
```

### Successful NFC Card Creation
```json
{
  "card": {
    "id": "uuid",
    "userId": "clerk_user_id",
    "portfolioId": "portfolio_uuid",
    "cardUid": "generated_uid",
    "shortCode": "abc123",
    "tapCount": 0,
    "isActive": true,
    "createdAt": "2025-11-20T..."
  }
}
```

### Successful Analytics Response
```json
{
  "analytics": {
    "totalViews": 150,
    "uniqueVisitors": 89,
    "topCountries": [
      { "country": "US", "count": 45 },
      { "country": "UK", "count": 30 }
    ],
    "topDevices": [
      { "deviceType": "mobile", "count": 90 },
      { "deviceType": "desktop", "count": 60 }
    ],
    "viewsByDay": [
      { "date": "2025-11-20", "count": 15 }
    ]
  }
}
```

---

## Common Issues & Solutions

### Issue: "Unauthorized" errors
**Solution:** Make sure Clerk is configured and you're passing valid auth token

### Issue: Database connection errors
**Solution:** Verify `DATABASE_URL` in `.env.local` is correct

### Issue: OpenAI API errors
**Solution:** Check `OPENAI_API_KEY` is valid and has credits

### Issue: NFC tap doesn't redirect
**Solution:** Verify portfolio is published (`isPublished: true`)

### Issue: Quota exceeded
**Solution:** Upgrade subscription tier or delete existing resources

---

## Next Steps After Testing

1. Fix any bugs found during testing
2. Add proper unit tests with Jest
3. Set up CI/CD pipeline
4. Add API documentation (Swagger/OpenAPI)
5. Implement rate limiting
6. Add request validation middleware
7. Set up monitoring and logging

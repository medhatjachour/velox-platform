# Phase 1 Testing - Quick Start Guide

## 🚀 Quick Start (5 Minutes)

### 1. Setup Environment (.env.local)
```bash
# Copy example and add your keys
cp .env.example .env.local
```

Required variables:
```env
DATABASE_URL=postgresql://user:pass@host/db
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
OPENAI_API_KEY=sk-...
```

### 2. Setup Database
```bash
npm run db:push      # Push schema to database
npm run db:studio    # Open Drizzle Studio (optional)
```

### 3. Start Server
```bash
npm run dev
```
Server runs at: http://localhost:3000

### 4. Run Test Script
```bash
./scripts/test-phase1.sh
```

---

## 🧪 Testing Methods

### Method 1: Postman (Recommended for API Testing)
1. Open Postman
2. Import `Velox_Phase1_API.postman_collection.json`
3. Set variables:
   - `baseUrl`: http://localhost:3000
   - `authToken`: Get from Clerk after signing in
4. Run requests in order:
   - Create Portfolio → saves portfolioId
   - Create NFC Card → saves shortCode
   - Test other endpoints

### Method 2: curl Commands
See `TESTING_PHASE1.md` for complete curl examples.

Example:
```bash
# Create a portfolio
curl -X POST http://localhost:3000/api/portfolios \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"slug": "john-doe", "title": "John Doe", ...}'
```

### Method 3: Browser Testing
1. Visit http://localhost:3000
2. Sign in with Clerk
3. Open Browser DevTools → Network tab
4. Make API calls from your frontend
5. Inspect requests/responses

### Method 4: Drizzle Studio (Database)
```bash
npm run db:studio
```
Opens at: https://local.drizzle.studio
- View all tables
- Inspect data
- Verify records created

---

## 📋 Quick Test Checklist

### Essential Tests (Must Do)
- [ ] **Setup**: Environment variables configured
- [ ] **Database**: Schema pushed, tables created
- [ ] **Server**: Development server running
- [ ] **Auth**: Can sign in with Clerk
- [ ] **Portfolio**: Can create portfolio
- [ ] **NFC**: Can create NFC card
- [ ] **Tap**: NFC tap redirects correctly

### Feature Tests (Recommended)
- [ ] **AI Bio**: Generate professional bio
- [ ] **AI Headline**: Generate headline
- [ ] **AI Resume**: Parse resume text
- [ ] **Lead Capture**: Submit lead form
- [ ] **Analytics**: View portfolio stats
- [ ] **Publish**: Publish portfolio

### Advanced Tests (Optional)
- [ ] **Quotas**: Test free tier limits
- [ ] **Upgrade**: Upgrade subscription
- [ ] **Auth**: Test unauthorized access
- [ ] **Errors**: Test invalid inputs
- [ ] **Performance**: Create 10+ portfolios

---

## 🔍 Where to Look

### Check API Responses
**Success Response (201)**:
```json
{
  "portfolio": {
    "id": "uuid",
    "slug": "john-doe",
    "title": "John Doe - Developer",
    "isPublished": false
  }
}
```

**Error Response (400)**:
```json
{
  "error": "Validation failed: slug already exists"
}
```

### Check Database (Drizzle Studio)
Tables to inspect:
- `users` - User accounts from Clerk
- `portfolios` - Created portfolios
- `nfc_cards` - NFC cards with short codes
- `portfolio_views` - View analytics
- `leads` - Captured leads
- `ai_generations` - AI generation history

### Check Server Logs
Watch terminal for:
- API requests/responses
- Error messages
- Database queries
- AI generation status

---

## 🐛 Common Issues

### "Unauthorized" Error
**Problem**: No auth token or invalid token
**Solution**: 
1. Sign in with Clerk
2. Get token from browser DevTools
3. Add to Authorization header: `Bearer YOUR_TOKEN`

### Database Connection Error
**Problem**: Can't connect to Neon PostgreSQL
**Solution**:
1. Check `DATABASE_URL` in `.env.local`
2. Verify Neon database is active
3. Run `npm run db:push` again

### OpenAI API Error
**Problem**: AI generation fails
**Solution**:
1. Verify `OPENAI_API_KEY` is correct
2. Check OpenAI account has credits
3. Test API key at https://platform.openai.com

### NFC Tap Returns 404
**Problem**: Short code not found
**Solution**:
1. Create NFC card first via API
2. Publish the linked portfolio
3. Use correct short code from response

---

## 📊 Expected Test Results

### After Creating Portfolio
- Database: 1 new row in `portfolios` table
- Response: Portfolio object with `id` and all fields
- Status: 201 Created

### After Creating NFC Card
- Database: 1 new row in `nfc_cards` table
- Response: Card with `shortCode` (6 characters)
- Status: 201 Created

### After NFC Tap
- Database: `tapCount` incremented by 1
- Database: New row in `portfolio_views` table
- Browser: Redirects to portfolio URL
- Status: 302 Redirect

### After Lead Capture
- Database: New row in `leads` table
- Response: Lead object with all contact info
- Status: 201 Created

### After AI Generation
- Database: New row in `ai_generations` table
- Database: `aiGenerationsUsed` incremented
- Response: Generated content (bio/headline/etc)
- Response: Token usage and cost info
- Status: 200 OK

---

## 📈 Testing Order (Recommended Flow)

1. **User Setup**
   - Sign in with Clerk
   - Verify user created in database

2. **Portfolio Creation**
   - Create portfolio
   - Get portfolio by ID
   - Update portfolio
   - Publish portfolio

3. **AI Features**
   - Generate bio
   - Generate headline
   - Parse resume (optional)

4. **NFC Setup**
   - Create NFC card for portfolio
   - Note the short code

5. **NFC Testing**
   - Visit tap URL in browser
   - Verify redirect
   - Check tap count incremented

6. **Lead Capture**
   - Submit lead form
   - Verify lead saved

7. **Analytics**
   - Get portfolio analytics
   - Verify views tracked
   - Check device/country data

---

## 🎯 Success Criteria

✅ **Phase 1 is working correctly if:**
1. All API endpoints return expected responses
2. Database records are created correctly
3. NFC tap redirects to portfolio
4. AI generates reasonable content
5. Analytics tracks views properly
6. Authorization checks work (can't edit others' portfolios)
7. Quota limits are enforced

---

## 📚 Documentation Files

- **TESTING_PHASE1.md** - Complete testing guide with all curl examples
- **Velox_Phase1_API.postman_collection.json** - Postman collection for API testing
- **scripts/test-phase1.sh** - Automated test script
- **README.md** - Project overview
- **README copy.md** - Additional documentation

---

## 🆘 Need Help?

1. **Check server logs** in terminal
2. **Check browser console** for errors
3. **Check Drizzle Studio** for database state
4. **Review TESTING_PHASE1.md** for detailed examples
5. **Check environment variables** in `.env.local`

---

## ⏭️ Next Steps

After Phase 1 testing is complete:
1. Fix any bugs found
2. Add unit tests with Jest
3. Set up CI/CD pipeline
4. Move to Phase 2: Frontend development
5. Implement dashboard UI
6. Add portfolio editor
7. Build NFC card management UI

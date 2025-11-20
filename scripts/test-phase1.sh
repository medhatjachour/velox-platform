#!/bin/bash

# Phase 1 Quick Test Script
# This script helps you quickly test the API endpoints

BASE_URL="http://localhost:3000"
PORTFOLIO_ID=""
SHORT_CODE=""

echo "======================================"
echo "Velox Platform - Phase 1 Quick Test"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if server is running
echo -e "${YELLOW}Checking if server is running...${NC}"
if curl -s "$BASE_URL" > /dev/null; then
    echo -e "${GREEN}✓ Server is running${NC}"
else
    echo -e "${RED}✗ Server is not running. Please start it with: npm run dev${NC}"
    exit 1
fi

echo ""
echo "======================================"
echo "Note: Most endpoints require authentication"
echo "You'll need to:"
echo "1. Set up Clerk authentication"
echo "2. Get a valid auth token"
echo "3. Replace 'YOUR_AUTH_TOKEN' in requests"
echo "======================================"
echo ""

# Test 1: Health check (no auth)
echo -e "${YELLOW}Test 1: Health Check${NC}"
echo "GET /"
response=$(curl -s "$BASE_URL")
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Homepage accessible${NC}"
else
    echo -e "${RED}✗ Failed to access homepage${NC}"
fi
echo ""

# Test 2: Create Portfolio (requires auth)
echo -e "${YELLOW}Test 2: Create Portfolio (requires auth)${NC}"
echo "POST /api/portfolios"
echo "Command to test:"
echo "curl -X POST $BASE_URL/api/portfolios \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -H 'Authorization: Bearer YOUR_AUTH_TOKEN' \\"
echo "  -d '{"
echo "    \"slug\": \"test-portfolio\","
echo "    \"title\": \"Test Portfolio\","
echo "    \"bio\": \"This is a test portfolio\","
echo "    \"headline\": \"Test Developer\","
echo "    \"theme\": \"default\""
echo "  }'"
echo ""

# Test 3: NFC Tap (no auth - public endpoint)
echo -e "${YELLOW}Test 3: NFC Tap (public endpoint)${NC}"
echo "GET /api/nfc/tap/[shortCode]"
echo "This endpoint requires a valid NFC card short code"
echo "After creating an NFC card, test with:"
echo "curl -L $BASE_URL/api/nfc/tap/YOUR_SHORT_CODE"
echo ""

# Test 4: List API routes
echo -e "${YELLOW}Test 4: Available API Routes${NC}"
echo ""
echo "User Routes:"
echo "  GET    /api/users/me              - Get user profile"
echo "  PATCH  /api/users/me              - Update profile"
echo "  POST   /api/users/me/upgrade      - Upgrade subscription"
echo ""
echo "Portfolio Routes:"
echo "  GET    /api/portfolios             - List portfolios"
echo "  POST   /api/portfolios             - Create portfolio"
echo "  GET    /api/portfolios/[id]        - Get portfolio"
echo "  PATCH  /api/portfolios/[id]        - Update portfolio"
echo "  DELETE /api/portfolios/[id]        - Delete portfolio"
echo "  POST   /api/portfolios/[id]/publish - Publish portfolio"
echo "  POST   /api/portfolios/[id]/ai-generate - AI content generation"
echo ""
echo "NFC Routes:"
echo "  GET    /api/nfc/tap/[shortCode]   - Handle NFC tap (public)"
echo "  GET    /api/nfc/cards             - List NFC cards"
echo "  POST   /api/nfc/cards             - Create NFC card"
echo "  POST   /api/nfc/leads             - Capture lead"
echo ""
echo "Analytics Routes:"
echo "  GET    /api/analytics/portfolios/[id] - Get portfolio analytics"
echo ""

# Database check
echo -e "${YELLOW}Test 5: Database Check${NC}"
if [ -f ".env.local" ]; then
    if grep -q "DATABASE_URL" .env.local; then
        echo -e "${GREEN}✓ DATABASE_URL found in .env.local${NC}"
    else
        echo -e "${RED}✗ DATABASE_URL not found in .env.local${NC}"
    fi
    
    if grep -q "OPENAI_API_KEY" .env.local; then
        echo -e "${GREEN}✓ OPENAI_API_KEY found in .env.local${NC}"
    else
        echo -e "${YELLOW}⚠ OPENAI_API_KEY not found (needed for AI features)${NC}"
    fi
    
    if grep -q "CLERK" .env.local; then
        echo -e "${GREEN}✓ Clerk keys found in .env.local${NC}"
    else
        echo -e "${RED}✗ Clerk keys not found (needed for authentication)${NC}"
    fi
else
    echo -e "${RED}✗ .env.local file not found${NC}"
    echo "Create .env.local with required environment variables"
fi
echo ""

# Test commands
echo "======================================"
echo "Quick Test Commands"
echo "======================================"
echo ""
echo "1. Test with Drizzle Studio:"
echo "   npm run db:studio"
echo ""
echo "2. Generate database migrations:"
echo "   npm run db:generate"
echo ""
echo "3. Push database schema:"
echo "   npm run db:push"
echo ""
echo "4. Start development server:"
echo "   npm run dev"
echo ""

echo "======================================"
echo "Interactive Testing Tools"
echo "======================================"
echo ""
echo "1. Use Postman or Insomnia:"
echo "   - Import the API endpoints"
echo "   - Set up Clerk authentication"
echo "   - Test all endpoints interactively"
echo ""
echo "2. Use curl (see TESTING_PHASE1.md for examples)"
echo ""
echo "3. Use the browser:"
echo "   - Visit http://localhost:3000"
echo "   - Sign in with Clerk"
echo "   - Use browser dev tools to test API calls"
echo ""

echo "======================================"
echo "For detailed testing guide, see:"
echo "TESTING_PHASE1.md"
echo "======================================"

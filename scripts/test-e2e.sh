#!/bin/bash

# Velox Platform - End-to-End Test Script
# Tests the main flows: Registration → Portfolio Creation → AI Generation → Publishing → Viewing

echo "🚀 Velox Platform - End-to-End Tests"
echo "===================================="
echo ""

BASE_URL="http://localhost:3000"
API_URL="$BASE_URL/api"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
TESTS_PASSED=0
TESTS_FAILED=0

# Helper function to test endpoint
test_endpoint() {
    local name=$1
    local method=$2
    local url=$3
    local data=$4
    local expected_status=$5
    local cookie=$6
    
    echo -n "Testing: $name... "
    
    if [ -z "$cookie" ]; then
        response=$(curl -s -w "\n%{http_code}" -X $method "$url" \
            -H "Content-Type: application/json" \
            ${data:+-d "$data"})
    else
        response=$(curl -s -w "\n%{http_code}" -X $method "$url" \
            -H "Content-Type: application/json" \
            -H "Cookie: $cookie" \
            ${data:+-d "$data"})
    fi
    
    status_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | head -n-1)
    
    if [ "$status_code" -eq "$expected_status" ]; then
        echo -e "${GREEN}✓ PASS${NC} (Status: $status_code)"
        TESTS_PASSED=$((TESTS_PASSED + 1))
        echo "$body"
        return 0
    else
        echo -e "${RED}✗ FAIL${NC} (Expected: $expected_status, Got: $status_code)"
        echo "Response: $body"
        TESTS_FAILED=$((TESTS_FAILED + 1))
        return 1
    fi
}

echo "📋 Test Suite: Core Functionality"
echo "=================================="
echo ""

# Test 1: Server is running
echo "1. Server Health Check"
echo "----------------------"
if curl -s "$BASE_URL" > /dev/null; then
    echo -e "${GREEN}✓ Server is running${NC}"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    echo -e "${RED}✗ Server is not running${NC}"
    echo "Please start the development server: npm run dev"
    TESTS_FAILED=$((TESTS_FAILED + 1))
    exit 1
fi
echo ""

# Test 2: Register new user
echo "2. User Registration"
echo "--------------------"
TIMESTAMP=$(date +%s)
TEST_EMAIL="test$TIMESTAMP@example.com"
TEST_USERNAME="testuser$TIMESTAMP"
TEST_PASSWORD="Test123!@#"

REGISTER_DATA=$(cat <<EOF
{
  "email": "$TEST_EMAIL",
  "username": "$TEST_USERNAME",
  "password": "$TEST_PASSWORD",
  "fullName": "Test User"
}
EOF
)

test_endpoint "User Registration" "POST" "$API_URL/auth/register" "$REGISTER_DATA" 201
echo ""

# Test 3: Login
echo "3. User Login"
echo "-------------"
LOGIN_DATA=$(cat <<EOF
{
  "email": "$TEST_EMAIL",
  "password": "$TEST_PASSWORD"
}
EOF
)

login_response=$(curl -s -c /tmp/velox-cookies.txt -w "\n%{http_code}" -X POST "$API_URL/auth/login" \
    -H "Content-Type: application/json" \
    -d "$LOGIN_DATA")

login_status=$(echo "$login_response" | tail -n1)
if [ "$login_status" -eq 200 ]; then
    echo -e "${GREEN}✓ Login successful${NC}"
    TESTS_PASSED=$((TESTS_PASSED + 1))
    # Extract auth token
    AUTH_COOKIE=$(grep "auth-token" /tmp/velox-cookies.txt | awk '{print $7}')
    if [ -n "$AUTH_COOKIE" ]; then
        echo "Auth token received: ${AUTH_COOKIE:0:20}..."
    fi
else
    echo -e "${RED}✗ Login failed${NC} (Status: $login_status)"
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi
echo ""

# Test 4: Create Portfolio
echo "4. Create Portfolio"
echo "-------------------"
PORTFOLIO_DATA=$(cat <<EOF
{
  "title": "Test Portfolio",
  "slug": "test-portfolio-$TIMESTAMP",
  "bio": "This is a test portfolio",
  "headline": "Software Developer"
}
EOF
)

portfolio_response=$(curl -s -b /tmp/velox-cookies.txt -w "\n%{http_code}" -X POST "$API_URL/portfolio" \
    -H "Content-Type: application/json" \
    -d "$PORTFOLIO_DATA")

portfolio_status=$(echo "$portfolio_response" | tail -n1)
portfolio_body=$(echo "$portfolio_response" | head -n-1)

if [ "$portfolio_status" -eq 201 ]; then
    echo -e "${GREEN}✓ Portfolio created${NC}"
    TESTS_PASSED=$((TESTS_PASSED + 1))
    PORTFOLIO_ID=$(echo "$portfolio_body" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
    echo "Portfolio ID: $PORTFOLIO_ID"
else
    echo -e "${RED}✗ Portfolio creation failed${NC} (Status: $portfolio_status)"
    echo "Response: $portfolio_body"
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi
echo ""

# Test 5: AI Bio Generation
echo "5. AI Bio Generation"
echo "--------------------"
AI_BIO_DATA=$(cat <<EOF
{
  "name": "Test User",
  "title": "Software Developer",
  "skills": ["JavaScript", "React", "Node.js"],
  "experience": "5 years"
}
EOF
)

ai_response=$(curl -s -b /tmp/velox-cookies.txt -w "\n%{http_code}" -X POST "$API_URL/ai/generate-bio" \
    -H "Content-Type: application/json" \
    -d "$AI_BIO_DATA")

ai_status=$(echo "$ai_response" | tail -n1)
ai_body=$(echo "$ai_response" | head -n-1)

if [ "$ai_status" -eq 200 ]; then
    echo -e "${GREEN}✓ AI Bio generated${NC}"
    TESTS_PASSED=$((TESTS_PASSED + 1))
    echo "Generated bio: $(echo "$ai_body" | head -c 100)..."
else
    echo -e "${YELLOW}⚠ AI Bio generation failed${NC} (Status: $ai_status)"
    echo "Note: This might fail if GROQ_API_KEY is not set"
    echo "Response: $ai_body"
fi
echo ""

# Test 6: Publish Portfolio
if [ -n "$PORTFOLIO_ID" ]; then
    echo "6. Publish Portfolio"
    echo "--------------------"
    PUBLISH_DATA='{"isPublished": true}'
    
    publish_response=$(curl -s -b /tmp/velox-cookies.txt -w "\n%{http_code}" -X POST "$API_URL/portfolio/$PORTFOLIO_ID/publish" \
        -H "Content-Type: application/json" \
        -d "$PUBLISH_DATA")
    
    publish_status=$(echo "$publish_response" | tail -n1)
    
    if [ "$publish_status" -eq 200 ]; then
        echo -e "${GREEN}✓ Portfolio published${NC}"
        TESTS_PASSED=$((TESTS_PASSED + 1))
    else
        echo -e "${RED}✗ Portfolio publishing failed${NC} (Status: $publish_status)"
        TESTS_FAILED=$((TESTS_FAILED + 1))
    fi
    echo ""
fi

# Test 7: View Public Portfolio
echo "7. View Public Portfolio"
echo "------------------------"
public_url="$BASE_URL/p/test-portfolio-$TIMESTAMP"
echo "Testing: $public_url"

public_response=$(curl -s -w "\n%{http_code}" "$public_url")
public_status=$(echo "$public_response" | tail -n1)

if [ "$public_status" -eq 200 ]; then
    echo -e "${GREEN}✓ Public portfolio accessible${NC}"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    echo -e "${RED}✗ Public portfolio not accessible${NC} (Status: $public_status)"
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi
echo ""

# Test 8: Analytics Tracking
echo "8. Analytics Tracking"
echo "---------------------"
if [ -n "$PORTFOLIO_ID" ]; then
    TRACK_DATA=$(cat <<EOF
{
  "portfolioId": "$PORTFOLIO_ID"
}
EOF
)
    
    track_response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL/analytics/track" \
        -H "Content-Type: application/json" \
        -d "$TRACK_DATA")
    
    track_status=$(echo "$track_response" | tail -n1)
    
    if [ "$track_status" -eq 200 ]; then
        echo -e "${GREEN}✓ Analytics tracking works${NC}"
        TESTS_PASSED=$((TESTS_PASSED + 1))
    else
        echo -e "${RED}✗ Analytics tracking failed${NC} (Status: $track_status)"
        TESTS_FAILED=$((TESTS_FAILED + 1))
    fi
fi
echo ""

# Summary
echo "=================================="
echo "📊 Test Summary"
echo "=================================="
echo -e "Tests Passed: ${GREEN}$TESTS_PASSED${NC}"
echo -e "Tests Failed: ${RED}$TESTS_FAILED${NC}"
echo "Total Tests: $((TESTS_PASSED + TESTS_FAILED))"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}❌ Some tests failed${NC}"
    exit 1
fi

#!/bin/bash

# Script to promote a user to SUPER_ADMIN
# Usage: ./scripts/make-admin.sh <email>

EMAIL="${1:-medhat@gmail.com}"

echo "🔐 Promoting user to SUPER_ADMIN..."
echo "Email: $EMAIL"
echo ""

# Run the SQL command
PGPASSWORD=password psql -h localhost -U postgres -d velox_platform << EOF
-- Update user role
UPDATE users 
SET role = 'SUPER_ADMIN' 
WHERE email = '$EMAIL';

-- Show the updated user
SELECT 
  email, 
  username, 
  role, 
  subscription_tier,
  is_active
FROM users 
WHERE email = '$EMAIL';
EOF

echo ""
echo "✅ Done! You can now access the admin panel at:"
echo "   http://localhost:3000/admin"
echo ""
echo "📝 To login:"
echo "   1. Go to http://localhost:3000/auth/login"
echo "   2. Login with: $EMAIL"
echo "   3. After login, visit: http://localhost:3000/admin"

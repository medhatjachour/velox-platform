-- SQL script to promote a user to SUPER_ADMIN
-- Replace 'your-email@example.com' with your actual email

UPDATE users 
SET role = 'SUPER_ADMIN' 
WHERE email = 'medhat@gmail.com';

-- Verify the update
SELECT id, email, username, role, subscription_tier 
FROM users 
WHERE email = 'medhat@gmail.com';

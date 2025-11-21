# Admin Dashboard Access Guide

## 🎯 Quick Start

### Step 1: Promote Your User to SUPER_ADMIN

You need `SUPER_ADMIN` role to access the admin dashboard. Run:

```bash
./scripts/make-admin.sh your-email@example.com
```

Or manually with SQL:

```bash
PGPASSWORD=password psql -h localhost -U postgres -d velox_platform -c \
  "UPDATE users SET role = 'SUPER_ADMIN' WHERE email = 'your-email@example.com';"
```

### Step 2: Login to Your Account

1. Go to http://localhost:3000/auth/login
2. Login with your promoted user credentials
3. Email: `medhat@gmail.com` (or your email)
4. Password: Your account password

### Step 3: Access Admin Dashboard

After logging in, visit: **http://localhost:3000/admin**

---

## 📊 Admin Dashboard Features

The admin panel provides:

### Platform Statistics
- **Total Users** - All registered users
- **Active Users** - Users with `isActive = true`
- **Total Revenue** - Sum of all delivered orders
- **Portfolios** - Total and published portfolio counts
- **Teams** - Active teams count
- **NFC Cards** - Total cards registered

### Subscription Distribution
- Breakdown of users by subscription tier (FREE, PRO, TEAM, ENTERPRISE)
- Percentage of total users per tier

### User Growth Chart
- Last 7 days of daily signups
- Visual bar chart representation

### Quick Actions
- Manage Users
- View Portfolios
- Orders Management
- System Configuration

---

## 🔐 Admin API Endpoints

### Stats
```
GET /api/admin/stats
```
Returns platform-wide statistics

### User Management
```
GET /api/admin/users?page=1&limit=50&search=john&role=USER
```
List users with pagination and filters

```
PATCH /api/admin/users/[userId]
Body: { "role": "TEAM_LEADER", "isActive": false }
```
Update user role, status, subscription

```
DELETE /api/admin/users/[userId]
```
Delete user (cannot delete SUPER_ADMINs)

---

## 🛡️ Security

- Admin routes are protected by `/app/admin/layout.tsx`
- Middleware checks for `SUPER_ADMIN` role
- Non-admin users are redirected to `/dashboard`
- Unauthenticated users are redirected to `/auth/login`

---

## 👥 User Roles

The platform supports 5 user roles:

1. **GUEST** - Limited access (not logged in)
2. **USER** - Standard user account
3. **TEAM_MEMBER** - Member of a team
4. **TEAM_LEADER** - Can manage team members
5. **SUPER_ADMIN** - Full platform access (admin dashboard)

---

## 🐛 Troubleshooting

### "Forbidden" error when accessing /admin

**Problem:** User doesn't have SUPER_ADMIN role

**Solution:** Run the promotion script:
```bash
./scripts/make-admin.sh your-email@example.com
```

### Admin dashboard not loading

**Problem:** Not logged in or session expired

**Solution:**
1. Clear cookies
2. Login again at http://localhost:3000/auth/login
3. Visit http://localhost:3000/admin

### Database connection error in scripts

**Problem:** Wrong database password in .env.local

**Solution:** Check DATABASE_URL in `.env.local`:
```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/velox_platform"
```

---

## 📝 Scripts

### promote-admin.ts
TypeScript script to promote users (if database issues resolved):
```bash
npx tsx scripts/promote-admin.ts user@example.com
```

### make-admin.sh
Bash script for quick promotion:
```bash
./scripts/make-admin.sh user@example.com
```

### promote-admin.sql
Direct SQL for manual execution:
```sql
UPDATE users SET role = 'SUPER_ADMIN' WHERE email = 'user@example.com';
```

---

## ✅ Current Status

- ✅ Admin dashboard created at `/admin`
- ✅ Admin API endpoints functional
- ✅ Role-based access control working
- ✅ User promotion scripts available
- ✅ medhat@gmail.com promoted to SUPER_ADMIN

**You can now access the admin panel!** 🎉

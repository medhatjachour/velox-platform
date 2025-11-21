// Script to promote a user to SUPER_ADMIN role
// Usage: tsx scripts/promote-admin.ts <email>

import { prisma } from '../lib/db/prisma';

async function promoteToAdmin(email: string) {
  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, username: true, role: true }
    });

    if (!user) {
      console.error(`❌ User with email '${email}' not found`);
      process.exit(1);
    }

    console.log(`Found user: ${user.email} (${user.username})`);
    console.log(`Current role: ${user.role}`);

    // Update role to SUPER_ADMIN
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { role: 'SUPER_ADMIN' },
      select: { id: true, email: true, username: true, role: true }
    });

    console.log(`\n✅ Successfully promoted user to SUPER_ADMIN!`);
    console.log(`Email: ${updatedUser.email}`);
    console.log(`Username: ${updatedUser.username}`);
    console.log(`New role: ${updatedUser.role}`);
    console.log(`\n🔐 You can now access the admin dashboard at: http://localhost:3000/admin`);

  } catch (error) {
    console.error('Error promoting user:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Get email from command line argument
const email = process.argv[2];

if (!email) {
  console.error('❌ Please provide an email address');
  console.log('Usage: tsx scripts/promote-admin.ts <email>');
  console.log('Example: tsx scripts/promote-admin.ts medhat@gmail.com');
  process.exit(1);
}

promoteToAdmin(email).catch(console.error);

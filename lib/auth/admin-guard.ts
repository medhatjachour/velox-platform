import { getCurrentUser } from "./get-current-user";

export async function requireAdmin() {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error("Unauthorized");
  }
  
  if (user.role !== 'SUPER_ADMIN') {
    throw new Error("Forbidden: Admin access required");
  }
  
  return user;
}

export async function isAdmin() {
  const user = await getCurrentUser();
  return user?.role === 'SUPER_ADMIN';
}

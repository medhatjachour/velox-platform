import { NextRequest } from 'next/server'
import { getSession } from '@/lib/auth/session'
import { UserRole } from '@prisma/client'

export async function getAuthUser(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value
  if (!token) return null

  const session = await getSession(token)
  return session?.user || null
}

export async function requireAuth(request: NextRequest) {
  const user = await getAuthUser(request)
  if (!user) {
    throw new Error('Authentication required')
  }
  return user
}

export async function requireRole(request: NextRequest, roles: UserRole[]) {
  const user = await requireAuth(request)
  if (!roles.includes(user.role)) {
    throw new Error('Insufficient permissions')
  }
  return user
}

export async function requireSuperAdmin(request: NextRequest) {
  return requireRole(request, [UserRole.SUPER_ADMIN])
}

export async function requireTeamLeader(request: NextRequest) {
  return requireRole(request, [UserRole.SUPER_ADMIN, UserRole.TEAM_LEADER])
}

export async function requireTeamMember(request: NextRequest) {
  return requireRole(request, [
    UserRole.SUPER_ADMIN,
    UserRole.TEAM_LEADER,
    UserRole.TEAM_MEMBER,
  ])
}

export async function requireUser(request: NextRequest) {
  return requireRole(request, [
    UserRole.SUPER_ADMIN,
    UserRole.TEAM_LEADER,
    UserRole.TEAM_MEMBER,
    UserRole.USER,
  ])
}

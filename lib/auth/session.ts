import { prisma } from '@/lib/db/prisma'
import { signToken, verifyToken } from './jwt'

export interface CreateSessionOptions {
  userId: string
  email: string
  role: string
  ipAddress?: string
  userAgent?: string
}

export async function createSession(options: CreateSessionOptions) {
  const { userId, email, role, ipAddress, userAgent } = options

  // Generate token
  const token = signToken({ userId, email, role })

  // Calculate expiration (7 days from now)
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7)

  // Store session in database
  const session = await prisma.session.create({
    data: {
      userId,
      token,
      expiresAt,
      ipAddress,
      userAgent,
    },
  })

  return { session, token }
}

export async function getSession(token: string) {
  // Verify token first
  const payload = verifyToken(token)
  if (!payload) return null

  // Get session from database
  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  })

  // Check if session exists and is not expired
  if (!session || session.expiresAt < new Date()) {
    return null
  }

  return session
}

export async function deleteSession(token: string) {
  await prisma.session.delete({
    where: { token },
  })
}

export async function deleteAllUserSessions(userId: string) {
  await prisma.session.deleteMany({
    where: { userId },
  })
}

export async function cleanExpiredSessions() {
  await prisma.session.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  })
}

import { prisma } from '@/lib/db/prisma'
import { hashPassword, verifyPassword } from './password'
import { createSession, deleteSession, getSession } from './session'
import { UserRole } from '@prisma/client'

export interface RegisterInput {
  email: string
  password: string
  username: string
  firstName?: string
  lastName?: string
}

export interface LoginInput {
  email: string
  password: string
  ipAddress?: string
  userAgent?: string
}

export class AuthError extends Error {
  constructor(message: string, public code: string) {
    super(message)
    this.name = 'AuthError'
  }
}

export const authService = {
  async register(input: RegisterInput) {
    const { email, password, username, firstName, lastName } = input

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    })

    if (existingUser) {
      if (existingUser.email === email) {
        throw new AuthError('Email already in use', 'EMAIL_EXISTS')
      }
      throw new AuthError('Username already taken', 'USERNAME_EXISTS')
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Combine first and last name into fullName
    const fullName = [firstName, lastName].filter(Boolean).join(' ') || null

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        fullName,
        role: UserRole.USER, // Default role
      },
      select: {
        id: true,
        email: true,
        username: true,
        fullName: true,
        role: true,
        createdAt: true,
      },
    })

    return user
  },

  async login(input: LoginInput) {
    const { email, password, ipAddress, userAgent } = input

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new AuthError('Invalid email or password', 'INVALID_CREDENTIALS')
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password)
    if (!isPasswordValid) {
      throw new AuthError('Invalid email or password', 'INVALID_CREDENTIALS')
    }

    // Create session
    const { session, token } = await createSession({
      userId: user.id,
      email: user.email,
      role: user.role,
      ipAddress,
      userAgent,
    })

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        fullName: user.fullName,
        role: user.role,
      },
      token,
      session,
    }
  },

  async logout(token: string) {
    await deleteSession(token)
  },

  async verifySession(token: string) {
    const session = await getSession(token)
    if (!session) {
      throw new AuthError('Invalid or expired session', 'INVALID_SESSION')
    }
    return session
  },

  async getCurrentUser(token: string) {
    const session = await getSession(token)
    if (!session) return null

    return {
      id: session.user.id,
      email: session.user.email,
      username: session.user.username,
      fullName: session.user.fullName,
      role: session.user.role,
      avatarUrl: session.user.avatarUrl,
    }
  },

  async updatePassword(userId: string, oldPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      throw new AuthError('User not found', 'USER_NOT_FOUND')
    }

    // Verify old password
    const isPasswordValid = await verifyPassword(oldPassword, user.password)
    if (!isPasswordValid) {
      throw new AuthError('Invalid password', 'INVALID_PASSWORD')
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword)

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    })
  },

  async sendPasswordResetEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      // Don't reveal if email exists or not
      return { success: true }
    }

    // TODO: Implement password reset token and email sending
    // For now, just return success
    return { success: true }
  },
}

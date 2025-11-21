import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        username: true,
        fullName: true,
        avatarUrl: true,
        createdAt: true,
        emailVerified: true,
        isActive: true,
      },
    })

    if (existingUser) {
      return NextResponse.json({
        exists: true,
        user: {
          email: existingUser.email,
          username: existingUser.username,
          fullName: existingUser.fullName,
          createdAt: existingUser.createdAt,
          isActive: existingUser.isActive,
        },
      })
    }

    return NextResponse.json({
      exists: false,
    })
  } catch (error) {
    console.error('Check email error:', error)
    return NextResponse.json(
      { error: 'An error occurred while checking email' },
      { status: 500 }
    )
  }
}

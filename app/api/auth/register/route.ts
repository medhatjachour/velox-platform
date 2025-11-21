import { NextRequest, NextResponse } from 'next/server'
import { authService, AuthError } from '@/lib/auth/auth-service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, username, firstName, lastName } = body

    // Validate required fields
    if (!email || !password || !username) {
      return NextResponse.json(
        { error: 'Email, password, and username are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // Register user
    const user = await authService.register({
      email,
      password,
      username,
      firstName,
      lastName,
    })

    return NextResponse.json(
      {
        success: true,
        user,
        message: 'Registration successful',
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: 400 }
      )
    }

    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    )
  }
}

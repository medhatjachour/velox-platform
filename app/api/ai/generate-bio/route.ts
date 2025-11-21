import { NextRequest, NextResponse } from 'next/server'
import { aiService } from '@/lib/ai/ai-service'
import { requireAuth } from '@/lib/auth/middleware'
import { prisma } from '@/lib/db/prisma'

export async function POST(request: NextRequest) {
  try {
    // Require authentication
    const user = await requireAuth(request)

    const body = await request.json()
    const { name, title, skills, experience } = body

    // Generate bio
    const bio = await aiService.generateBio({
      name,
      title,
      skills,
      experience,
    })

    // Track AI generation
    await prisma.aIGeneration.create({
      data: {
        userId: user.id,
        type: 'bio',
        prompt: JSON.stringify({ name, title, skills, experience }),
        response: bio,
        model: 'llama-3.3-70b-versatile',
        tokensUsed: 0, // Will be updated with actual usage
      },
    })

    return NextResponse.json(
      {
        success: true,
        bio,
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    console.error('Generate bio error:', error)
    return NextResponse.json(
      { error: 'Failed to generate bio' },
      { status: 500 }
    )
  }
}

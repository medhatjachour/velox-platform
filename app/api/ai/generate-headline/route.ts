import { NextRequest, NextResponse } from 'next/server'
import { aiService } from '@/lib/ai/ai-service'
import { requireAuth } from '@/lib/auth/middleware'
import { prisma } from '@/lib/db/prisma'

export async function POST(request: NextRequest) {
  try {
    // Require authentication
    const user = await requireAuth(request)

    const body = await request.json()
    const { title, skills } = body

    // Generate headline
    const headline = await aiService.generateHeadline({
      title,
      skills,
    })

    // Track AI generation
    await prisma.aIGeneration.create({
      data: {
        userId: user.id,
        type: 'headline',
        prompt: JSON.stringify({ title, skills }),
        response: headline,
        model: 'llama-3.3-70b-versatile',
        tokensUsed: 0,
      },
    })

    return NextResponse.json(
      {
        success: true,
        headline,
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

    console.error('Generate headline error:', error)
    return NextResponse.json(
      { error: 'Failed to generate headline' },
      { status: 500 }
    )
  }
}

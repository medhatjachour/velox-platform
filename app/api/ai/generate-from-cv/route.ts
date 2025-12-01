import { NextRequest, NextResponse } from 'next/server'
import { aiService } from '@/lib/ai/ai-service'
import { requireAuth } from '@/lib/auth/middleware'
import { prisma } from '@/lib/db/prisma'

/**
 * Generate complete portfolio content from CV data
 */
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request)
    const body = await request.json()
    const { cvText } = body

    if (!cvText) {
      return NextResponse.json(
        { error: 'CV text is required' },
        { status: 400 }
      )
    }

    // Generate structured portfolio content using AI
    const prompt = `You are a CV parser. Extract information from this CV and return ONLY valid JSON.

CV Text:
${cvText}

Return a JSON object with this structure (use empty strings/arrays if data not found):
{
  "title": "person's full name",
  "headline": "professional title or tagline",
  "bio": "2-3 sentence professional summary",
  "email": "email address",
  "phone": "phone number",
  "location": "city or location",
  "skills": [{"name": "skill1"}, {"name": "skill2"}],
  "projects": [{"title": "project name", "description": "what it does", "technologies": ["tech1"], "url": "link"}],
  "experience": [{"company": "company", "position": "title", "startDate": "2020-01", "endDate": "2022-12", "current": false, "description": "what they did"}],
  "education": [{"institution": "school", "degree": "degree type", "field": "major", "startDate": "2015", "endDate": "2019"}]
}

IMPORTANT: Return ONLY the JSON object. No explanations, no markdown, just the JSON.`

    // Try up to 3 times if we get corrupted responses
    let result
    let attempts = 0
    const maxAttempts = 3

    while (attempts < maxAttempts) {
      try {
        result = await aiService.generate({
          prompt,
          maxTokens: 2000,
          temperature: 0.3, // Very low temperature for consistent output
        })

        // Check if response is corrupted
        if (!result.content || 
            result.content.length < 10 || 
            /[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F-\x9F]/.test(result.content)) {
          throw new Error('Corrupted response detected')
        }

        break // Success, exit loop
      } catch (error) {
        attempts++
        console.log(`Attempt ${attempts} failed:`, error)
        
        if (attempts >= maxAttempts) {
          throw new Error('Failed to get valid response from AI after multiple attempts')
        }
        
        // Wait a bit before retrying
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }

    if (!result) {
      throw new Error('Failed to generate content from CV')
    }

    console.log('AI Response (first 200 chars):', result.content.substring(0, 200))

    // Parse the AI response
    let portfolioData
    try {
      // Validate that we got actual content
      if (!result.content || typeof result.content !== 'string') {
        throw new Error('Invalid AI response format')
      }

      // Clean up the response - remove markdown code blocks if present
      let cleanedResponse = result.content.trim()
      
      // Remove markdown code blocks
      if (cleanedResponse.includes('```json')) {
        cleanedResponse = cleanedResponse.replace(/```json\n?/g, '').replace(/\n?```/g, '')
      } else if (cleanedResponse.includes('```')) {
        cleanedResponse = cleanedResponse.replace(/```\n?/g, '')
      }

      // Find JSON object boundaries
      const jsonStart = cleanedResponse.indexOf('{')
      const jsonEnd = cleanedResponse.lastIndexOf('}')
      
      if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error('No JSON object found in response')
      }

      cleanedResponse = cleanedResponse.substring(jsonStart, jsonEnd + 1)
      
      portfolioData = JSON.parse(cleanedResponse)
    } catch (parseError) {
      console.error('Failed to parse AI response:', {
        rawContent: result.content,
        error: parseError
      })
      return NextResponse.json(
        { 
          error: 'Failed to parse CV data. The AI response was not in the expected format. Please try again.',
          debug: process.env.NODE_ENV === 'development' ? result.content.substring(0, 500) : undefined
        },
        { status: 500 }
      )
    }

    // Track AI generation
    await prisma.aIGeneration.create({
      data: {
        userId: user.id,
        type: 'portfolio_from_cv',
        prompt: cvText.substring(0, 500), // Store first 500 chars
        response: JSON.stringify(portfolioData),
        model: result.model,
        tokensUsed: result.tokensUsed,
      },
    })

    return NextResponse.json({
      success: true,
      data: portfolioData
    })

  } catch (error) {
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    console.error('Generate from CV error:', error)
    return NextResponse.json(
      { error: 'Failed to generate portfolio from CV' },
      { status: 500 }
    )
  }
}

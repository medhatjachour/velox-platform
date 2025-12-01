import { NextRequest, NextResponse } from 'next/server'
import { aiService } from '@/lib/ai/ai-service'
import { requireAuth } from '@/lib/auth/middleware'
import { prisma } from '@/lib/db/prisma'
import { PortfolioConfig } from '@/types/portfolio-editor.types'

/**
 * Generate structured portfolio configuration from CV/profile data using AI
 * Returns JSON config instead of HTML for use with the advanced editor
 */
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request)
    const body = await request.json()
    const { cvText, githubData, preferences } = body

    if (!cvText && !githubData) {
      return NextResponse.json(
        { error: 'Either CV text or GitHub data is required' },
        { status: 400 }
      )
    }

    // Build comprehensive context for AI
    let context = '';
    
    if (cvText) {
      context += `CV/Resume Content:\n${cvText}\n\n`;
    }
    
    if (githubData) {
      context += `GitHub Profile:\n`;
      context += `Name: ${githubData.name}\n`;
      context += `Bio: ${githubData.bio}\n`;
      context += `Location: ${githubData.location}\n`;
      context += `Email: ${githubData.email}\n`;
      context += `Company: ${githubData.company}\n`;
      context += `Public Repos: ${githubData.publicRepos}\n`;
      context += `Followers: ${githubData.followers}\n\n`;
    }

    if (preferences) {
      context += `User Preferences:\n${JSON.stringify(preferences, null, 2)}\n\n`;
    }

    const prompt = `You are an expert portfolio builder. Analyze the provided information and create a structured portfolio configuration in JSON format.

${context}

Generate a complete portfolio configuration with the following structure:

{
  "sections": [
    {
      "id": "hero-1",
      "type": "hero",
      "visible": true,
      "order": 0,
      "settings": {},
      "data": {
        "name": "Person's full name",
        "tagline": "Professional title or tagline (concise, impactful)",
        "description": "2-3 sentence introduction",
        "image": null,
        "backgroundImage": null,
        "ctaText": "Get in Touch",
        "ctaUrl": "#contact",
        "showSocialLinks": true,
        "socialLinks": {
          "linkedin": "url if found",
          "github": "url if found",
          "twitter": "url if found",
          "website": "url if found"
        }
      }
    },
    {
      "id": "about-1",
      "type": "about",
      "visible": true,
      "order": 1,
      "settings": {},
      "data": {
        "title": "About Me",
        "bio": "Compelling professional bio paragraph (2-3 sentences)",
        "image": null,
        "highlights": ["Key highlight 1", "Key highlight 2", "Key highlight 3"],
        "stats": [
          {"label": "Years Experience", "value": "X+"},
          {"label": "Projects Completed", "value": "XX+"},
          {"label": "Happy Clients", "value": "XX+"}
        ]
      }
    },
    {
      "id": "experience-1",
      "type": "experience",
      "visible": true,
      "order": 2,
      "settings": {},
      "data": {
        "title": "Work Experience",
        "items": [
          {
            "id": "exp-1",
            "company": "Company Name",
            "position": "Job Title",
            "startDate": "YYYY-MM",
            "endDate": "YYYY-MM or Present",
            "current": true/false,
            "description": "Key responsibilities and achievements",
            "achievements": ["Achievement 1", "Achievement 2"],
            "location": "City, Country",
            "logo": null
          }
        ]
      }
    },
    {
      "id": "projects-1",
      "type": "projects",
      "visible": true,
      "order": 3,
      "settings": {},
      "data": {
        "title": "Featured Projects",
        "items": [
          {
            "id": "proj-1",
            "title": "Project Name",
            "description": "What the project does (1-2 sentences)",
            "image": null,
            "technologies": ["Tech1", "Tech2", "Tech3"],
            "url": "project url if found",
            "githubUrl": "github url if found",
            "featured": true,
            "status": "completed"
          }
        ]
      }
    },
    {
      "id": "skills-1",
      "type": "skills",
      "visible": true,
      "order": 4,
      "settings": {},
      "data": {
        "title": "Skills & Expertise",
        "categories": [
          {
            "id": "cat-1",
            "name": "Technical Skills",
            "skills": [
              {"id": "skill-1", "name": "Skill Name", "level": 90, "yearsOfExperience": 5}
            ]
          }
        ]
      }
    },
    {
      "id": "contact-1",
      "type": "contact",
      "visible": true,
      "order": 5,
      "settings": {},
      "data": {
        "title": "Get in Touch",
        "description": "Let's work together on your next project",
        "email": "email address",
        "phone": "phone if found",
        "location": "location if found",
        "showForm": true,
        "socialLinks": {
          "linkedin": "url",
          "github": "url",
          "twitter": "url"
        }
      }
    }
  ],
  "design": {
    "template": "modern",
    "colors": {
      "primary": "#2563eb",
      "secondary": "#8b5cf6",
      "accent": "#ec4899",
      "background": "#ffffff",
      "text": "#0f172a"
    },
    "typography": {
      "headingFont": "Inter",
      "bodyFont": "Inter",
      "fontSize": "medium"
    },
    "layout": {
      "maxWidth": 1280,
      "spacing": "normal",
      "borderRadius": 8
    },
    "animations": {
      "enabled": true,
      "speed": "normal",
      "style": "smooth"
    }
  }
}

IMPORTANT INSTRUCTIONS:
1. Extract ALL information from the provided data
2. Create meaningful, professional content
3. If education data is found, add an "education" section
4. If testimonials/recommendations found, add a "testimonials" section
5. Organize skills into logical categories (Frontend, Backend, Tools, etc.)
6. Make descriptions engaging and professional
7. Estimate skill levels based on experience mentioned
8. Return ONLY valid JSON, no explanations or markdown
9. Each section MUST have a unique ID
10. Keep section order logical (hero → about → experience → projects → skills → contact)

Return the JSON now:`

    // Generate with retry logic for corrupted responses
    let result
    let attempts = 0
    const maxAttempts = 3

    while (attempts < maxAttempts) {
      try {
        result = await aiService.generate({
          prompt,
          maxTokens: 3000,
          temperature: 0.3, // Low temperature for consistent JSON
        })

        // Check if response is corrupted
        if (!result.content || 
            result.content.length < 50 || 
            /[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F-\x9F]/.test(result.content)) {
          throw new Error('Corrupted response detected')
        }

        break // Success
      } catch (error) {
        attempts++
        console.log(`Attempt ${attempts} failed:`, error)
        
        if (attempts >= maxAttempts) {
          throw new Error('Failed to get valid response from AI after multiple attempts')
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }

    if (!result) {
      throw new Error('Failed to generate portfolio config')
    }

    console.log('AI Response (first 300 chars):', result.content.substring(0, 300))

    // Parse the AI response
    let portfolioConfig: Partial<PortfolioConfig>
    try {
      // Clean up the response
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
      
      portfolioConfig = JSON.parse(cleanedResponse)

      // Add metadata
      portfolioConfig.title = (portfolioConfig.sections?.[0] as any)?.data?.name || "My Portfolio"
      portfolioConfig.slug = portfolioConfig.title.toLowerCase().replace(/\s+/g, '-')
      portfolioConfig.published = false

    } catch (parseError) {
      console.error('Failed to parse AI response:', {
        rawContent: result.content,
        error: parseError
      })
      return NextResponse.json(
        { 
          error: 'Failed to generate portfolio config. The AI response was not in the expected format.',
          debug: process.env.NODE_ENV === 'development' ? result.content.substring(0, 500) : undefined
        },
        { status: 500 }
      )
    }

    // Track AI generation
    await prisma.aIGeneration.create({
      data: {
        userId: user.id,
        type: 'portfolio_config',
        prompt: context.substring(0, 500),
        response: JSON.stringify(portfolioConfig),
        model: result.model,
        tokensUsed: result.tokensUsed,
      },
    })

    return NextResponse.json({
      success: true,
      config: portfolioConfig
    })

  } catch (error) {
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    console.error('Generate portfolio config error:', error)
    return NextResponse.json(
      { error: 'Failed to generate portfolio configuration' },
      { status: 500 }
    )
  }
}

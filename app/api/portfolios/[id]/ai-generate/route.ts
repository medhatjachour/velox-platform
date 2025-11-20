/**
 * Portfolio AI Generation API Route
 * POST /api/portfolios/[id]/ai-generate - Generate AI content for portfolio
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { AIService } from '@/lib/services';
import { NotFoundError, ValidationError, AIRateLimitError } from '@/lib/errors';

const aiService = new AIService();

/**
 * POST /api/portfolios/[id]/ai-generate
 * Generate AI content (bio, headline, project descriptions)
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { type, input } = body;

    let result;

    switch (type) {
      case 'bio':
        result = await aiService.generateBio(
          input.text || input.experience,
          input.tone || 'professional'
        );
        break;

      case 'headline':
        result = await aiService.generateHeadline(
          input.bio,
          input.skills || []
        );
        break;

      case 'project-description':
        result = await aiService.generateProjectDescription(
          input.projectName,
          input.technologies || [],
          input.brief
        );
        break;

      case 'resume-parse':
        if (!input.resumeText) {
          return NextResponse.json(
            { error: 'Resume text is required' },
            { status: 400 }
          );
        }
        result = await aiService.parseResume(input.resumeText);
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid generation type. Supported types: bio, headline, project-description, resume-parse' },
          { status: 400 }
        );
    }
    
    return NextResponse.json({ result });
  } catch (error) {
    console.error(`POST /api/portfolios/${(await params).id}/ai-generate error:`, error);
    
    if (error instanceof NotFoundError) {
      return NextResponse.json(
        { error: error.message },
        { status: 404 }
      );
    }
    
    if (error instanceof ValidationError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    if (error instanceof AIRateLimitError) {
      return NextResponse.json(
        { error: error.message },
        { status: 429 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to generate AI content' },
      { status: 500 }
    );
  }
}

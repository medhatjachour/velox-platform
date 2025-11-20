/**
 * AI Service
 * 
 * Handles all AI-related operations using OpenAI.
 * Includes resume parsing, content generation, and prompt management.
 */

import OpenAI from 'openai';
import { 
  ResumeParseResult, 
  AIGenerationRequest,
  AIGenerationResponse,
  CreateAIGenerationDTO
} from '@/types';
import { ExternalServiceError, ValidationError, AIRateLimitError } from '@/lib/errors';
import { db, aiGenerations } from '@/db';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface IAIService {
  parseResume(resumeText: string): Promise<ResumeParseResult>;
  generateBio(input: string, tone?: 'professional' | 'casual' | 'creative'): Promise<string>;
  generateHeadline(bio: string, skills: string[]): Promise<string>;
  generateProjectDescription(name: string, technologies: string[], brief?: string): Promise<string>;
  generateBlogPost(topic: string, keywords: string[]): Promise<string>;
}

export class AIService implements IAIService {
  /**
   * Parse resume text and extract structured data
   */
  async parseResume(resumeText: string): Promise<ResumeParseResult> {
    if (!resumeText || resumeText.trim().length < 50) {
      throw new ValidationError('Resume text is too short or empty');
    }

    const prompt = this.getResumeParsePrompt(resumeText);
    
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are an expert resume parser. Extract structured information from resumes and return valid JSON.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.3,
        max_tokens: 2000,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new ExternalServiceError('OpenAI', 'No response received from AI');
      }

      const parsed = JSON.parse(content) as ResumeParseResult;
      
      // Validate required fields
      if (!parsed.fullName || !parsed.headline) {
        throw new ValidationError('AI failed to extract required fields from resume');
      }

      // Log the generation
      await this.logGeneration({
        userId: '', // Will be set by the service caller
        type: 'resume_parse',
        prompt,
        response: parsed,
        model: 'gpt-4o',
        tokensUsed: response.usage?.total_tokens || 0,
        cost: this.calculateCost(response.usage?.total_tokens || 0, 'gpt-4o'),
      });

      return parsed;
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('rate_limit')) {
          throw new AIRateLimitError();
        }
        if (error.message.includes('insufficient_quota')) {
          throw new ExternalServiceError('OpenAI', 'API quota exceeded');
        }
      }
      throw new ExternalServiceError('OpenAI', 'Failed to parse resume');
    }
  }

  /**
   * Generate a professional bio
   */
  async generateBio(
    input: string,
    tone: 'professional' | 'casual' | 'creative' = 'professional'
  ): Promise<string> {
    const prompt = this.getBioPrompt(input, tone);
    
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are an expert copywriter specializing in professional bios. Write compelling, ${tone} bios that highlight achievements and expertise.`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      const bio = response.choices[0]?.message?.content?.trim();
      if (!bio) {
        throw new ExternalServiceError('OpenAI', 'Failed to generate bio');
      }

      return bio;
    } catch (error) {
      if (error instanceof Error && error.message.includes('rate_limit')) {
        throw new AIRateLimitError();
      }
      throw new ExternalServiceError('OpenAI', 'Failed to generate bio');
    }
  }

  /**
   * Generate a catchy headline
   */
  async generateHeadline(bio: string, skills: string[]): Promise<string> {
    const prompt = `Based on this bio and skills, create a catchy, concise professional headline (max 60 characters):

Bio: ${bio}
Skills: ${skills.join(', ')}

Return only the headline, no quotes or extra text.`;

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are an expert at crafting compelling professional headlines. Keep them concise and impactful.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 100,
      });

      const headline = response.choices[0]?.message?.content?.trim();
      if (!headline) {
        throw new ExternalServiceError('OpenAI', 'Failed to generate headline');
      }

      // Ensure it's not too long
      return headline.length > 60 ? headline.substring(0, 57) + '...' : headline;
    } catch (error) {
      if (error instanceof Error && error.message.includes('rate_limit')) {
        throw new AIRateLimitError();
      }
      throw new ExternalServiceError('OpenAI', 'Failed to generate headline');
    }
  }

  /**
   * Generate project description
   */
  async generateProjectDescription(
    name: string,
    technologies: string[],
    brief?: string
  ): Promise<string> {
    const prompt = `Create a compelling project description for a portfolio:

Project Name: ${name}
Technologies: ${technologies.join(', ')}
${brief ? `Brief: ${brief}` : ''}

Write a 2-3 paragraph description that highlights the project's purpose, technical implementation, and impact. Make it engaging and professional.`;

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are an expert at writing technical project descriptions for portfolios.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 400,
      });

      const description = response.choices[0]?.message?.content?.trim();
      if (!description) {
        throw new ExternalServiceError('OpenAI', 'Failed to generate project description');
      }

      return description;
    } catch (error) {
      if (error instanceof Error && error.message.includes('rate_limit')) {
        throw new AIRateLimitError();
      }
      throw new ExternalServiceError('OpenAI', 'Failed to generate project description');
    }
  }

  /**
   * Generate a blog post
   */
  async generateBlogPost(topic: string, keywords: string[]): Promise<string> {
    const prompt = `Write a professional blog post about "${topic}".

Keywords to include: ${keywords.join(', ')}

The post should be:
- 500-800 words
- Well-structured with headings
- Informative and engaging
- Include practical examples or insights
- Formatted in Markdown`;

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are an expert blog writer who creates engaging, informative content for professional audiences.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      });

      const blogPost = response.choices[0]?.message?.content?.trim();
      if (!blogPost) {
        throw new ExternalServiceError('OpenAI', 'Failed to generate blog post');
      }

      return blogPost;
    } catch (error) {
      if (error instanceof Error && error.message.includes('rate_limit')) {
        throw new AIRateLimitError();
      }
      throw new ExternalServiceError('OpenAI', 'Failed to generate blog post');
    }
  }

  // ============================================================================
  // PROMPT TEMPLATES
  // ============================================================================

  private getResumeParsePrompt(resumeText: string): string {
    return `Parse the following resume and extract structured information. Return a JSON object with this exact structure:

{
  "fullName": "string",
  "email": "string or null",
  "phone": "string or null",
  "headline": "string (a short professional title/tagline)",
  "bio": "string (2-3 paragraph professional bio)",
  "skills": ["array", "of", "skills"],
  "experience": [
    {
      "title": "string",
      "company": "string",
      "startDate": "string (YYYY-MM format)",
      "endDate": "string (YYYY-MM format) or null if current",
      "description": "string"
    }
  ],
  "education": [
    {
      "degree": "string",
      "institution": "string",
      "year": "string (YYYY format)"
    }
  ],
  "projects": [
    {
      "name": "string",
      "description": "string",
      "url": "string or null",
      "technologies": ["array", "of", "tech"]
    }
  ]
}

Resume Text:
${resumeText}

Important:
- Extract ALL relevant information
- Generate a compelling bio even if not explicitly in the resume
- Create a professional headline that summarizes their expertise
- Ensure all dates are in the specified format
- If a field is not found, use null or an empty array as appropriate`;
  }

  private getBioPrompt(input: string, tone: 'professional' | 'casual' | 'creative'): string {
    const toneGuidelines = {
      professional: 'formal, achievement-focused, and corporate-friendly',
      casual: 'conversational, approachable, and friendly',
      creative: 'unique, personality-driven, and memorable',
    };

    return `Write a ${tone} professional bio based on this information:

${input}

Guidelines:
- Tone: ${toneGuidelines[tone]}
- Length: 2-3 paragraphs
- Highlight key achievements and expertise
- Make it engaging and authentic
- Avoid clichés
- Write in third person`;
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  /**
   * Calculate cost in cents based on tokens used
   */
  private calculateCost(tokens: number, model: string): number {
    // OpenAI pricing (as of 2024)
    const pricing: Record<string, { input: number; output: number }> = {
      'gpt-4o': { input: 0.005 / 1000, output: 0.015 / 1000 }, // $5/$15 per 1M tokens
      'gpt-4-turbo': { input: 0.01 / 1000, output: 0.03 / 1000 },
      'gpt-3.5-turbo': { input: 0.0005 / 1000, output: 0.0015 / 1000 },
    };

    const modelPricing = pricing[model] || pricing['gpt-4o'];
    // Rough estimate: 75% input, 25% output
    const cost = tokens * ((modelPricing.input * 0.75) + (modelPricing.output * 0.25));
    
    return Math.ceil(cost * 100); // Convert to cents
  }

  /**
   * Log AI generation to database
   */
  private async logGeneration(data: Omit<CreateAIGenerationDTO, 'userId'> & { userId: string }): Promise<void> {
    try {
      if (!data.userId) return; // Skip logging if no user ID

      await db.insert(aiGenerations).values({
        userId: data.userId,
        type: data.type,
        prompt: data.prompt,
        response: data.response as any,
        model: data.model,
        tokensUsed: data.tokensUsed,
        cost: data.cost,
      });
    } catch (error) {
      // Don't throw - logging failures shouldn't break the flow
      console.error('Failed to log AI generation:', error);
    }
  }

  /**
   * Check if user has exceeded AI usage limits
   */
  async checkRateLimit(userId: string, subscriptionTier: string): Promise<boolean> {
    // Implement rate limiting logic based on subscription tier
    // For now, return true (allowed)
    // TODO: Implement proper rate limiting with Redis or similar
    return true;
  }
}

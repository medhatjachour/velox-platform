import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
})

export interface AIGenerationOptions {
  prompt: string
  maxTokens?: number
  temperature?: number
  model?: string
}

export interface AIResponse {
  content: string
  model: string
  tokensUsed: number
  finishReason: string
}

export class AIService {
  private defaultModel = 'llama-3.3-70b-versatile'
  private maxRetries = 2
  private retryDelay = 1000 // 1 second

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async generate(options: AIGenerationOptions): Promise<AIResponse> {
    const {
      prompt,
      maxTokens = 500,
      temperature = 0.7,
      model = this.defaultModel,
    } = options

    let lastError: Error | null = null

    // Retry logic for network errors
    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        const completion = await groq.chat.completions.create({
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          model,
          temperature,
          max_tokens: maxTokens,
          stream: false, // Explicitly disable streaming
        })

        const message = completion.choices[0]?.message
        const usage = completion.usage
        const content = message?.content || ''

        // Validate content is not corrupted
        if (content.includes('\x00') || content.includes('\uFFFD') || /[\x00-\x08\x0B-\x0C\x0E-\x1F]/.test(content)) {
          throw new Error('Received corrupted response from AI service')
        }

        return {
          content,
          model,
          tokensUsed: usage?.total_tokens || 0,
          finishReason: completion.choices[0]?.finish_reason || 'stop',
        }
      } catch (error) {
        lastError = error as Error
        console.error(`AI generation error (attempt ${attempt + 1}/${this.maxRetries + 1}):`, error)

        // Check if it's a network/timeout error
        const err = error as { code?: string; message?: string }
        const isNetworkError = 
          err.code === 'ETIMEDOUT' || 
          err.code === 'ECONNREFUSED' ||
          err.code === 'ENOTFOUND' ||
          err.message?.includes('timeout') ||
          err.message?.includes('Connection error')

        // Retry only on network errors and if we have attempts left
        if (isNetworkError && attempt < this.maxRetries) {
          console.log(`Retrying in ${this.retryDelay}ms...`)
          await this.delay(this.retryDelay)
          continue
        }

        // Don't retry on other errors (API key, rate limit, etc.)
        break
      }
    }

    // If we get here, all retries failed
    const errorMessage = lastError?.message || 'Unknown error'
    if (errorMessage.includes('timeout') || errorMessage.includes('Connection error')) {
      throw new Error('AI service is temporarily unavailable. Please check your internet connection and try again.')
    } else if (errorMessage.includes('API key')) {
      throw new Error('AI service configuration error. Please contact support.')
    } else if (errorMessage.includes('rate limit')) {
      throw new Error('AI service rate limit reached. Please try again in a moment.')
    } else {
      throw new Error('Failed to generate AI content. Please try again.')
    }
  }

  async generateBio(context: {
    name?: string
    title?: string
    skills?: string[]
    experience?: string
  }): Promise<string> {
    const { name, title, skills, experience } = context

    const prompt = `Generate a professional bio for a portfolio website based on the following information:
${name ? `Name: ${name}` : ''}
${title ? `Title: ${title}` : ''}
${skills && skills.length > 0 ? `Skills: ${skills.join(', ')}` : ''}
${experience ? `Experience: ${experience}` : ''}

Create a compelling, professional bio (2-3 sentences) that highlights their expertise and value proposition. Make it engaging and personalized.`

    const response = await this.generate({
      prompt,
      maxTokens: 200,
      temperature: 0.8,
    })

    return response.content.trim()
  }

  async generateHeadline(context: {
    title?: string
    skills?: string[]
  }): Promise<string> {
    const { title, skills } = context

    const prompt = `Generate a catchy professional headline for a portfolio website:
${title ? `Title: ${title}` : ''}
${skills && skills.length > 0 ? `Skills: ${skills.join(', ')}` : ''}

Create a short, impactful headline (5-10 words) that captures their professional identity. Be creative and memorable.`

    const response = await this.generate({
      prompt,
      maxTokens: 50,
      temperature: 0.9,
    })

    return response.content.trim()
  }

  async generateProjectDescription(context: {
    projectName: string
    technologies?: string[]
    features?: string[]
  }): Promise<string> {
    const { projectName, technologies, features } = context

    const prompt = `Generate a compelling project description for a portfolio:
Project Name: ${projectName}
${technologies && technologies.length > 0 ? `Technologies: ${technologies.join(', ')}` : ''}
${features && features.length > 0 ? `Features: ${features.join(', ')}` : ''}

Create a concise, engaging description (2-3 sentences) that highlights the project's value and technical implementation.`

    const response = await this.generate({
      prompt,
      maxTokens: 150,
      temperature: 0.8,
    })

    return response.content.trim()
  }

  async enhanceContent(content: string, style: 'professional' | 'casual' | 'creative'): Promise<string> {
    const prompt = `Enhance the following content with a ${style} tone while maintaining its core message:

"${content}"

Rewrite this to be more engaging and ${style}. Keep it concise and impactful.`

    const response = await this.generate({
      prompt,
      maxTokens: 300,
      temperature: 0.8,
    })

    return response.content.trim()
  }

  async generateSEOMetadata(context: {
    name: string
    title?: string
    bio?: string
  }): Promise<{ title: string; description: string }> {
    const { name, title, bio } = context

    const prompt = `Generate SEO-optimized metadata for a portfolio website:
Name: ${name}
${title ? `Title: ${title}` : ''}
${bio ? `Bio: ${bio}` : ''}

Generate:
1. A compelling SEO title (50-60 characters)
2. A meta description (150-160 characters)

Format the response as:
Title: [title here]
Description: [description here]`

    const response = await this.generate({
      prompt,
      maxTokens: 150,
      temperature: 0.7,
    })

    const content = response.content
    const titleMatch = content.match(/Title:\s*(.+)/i)
    const descMatch = content.match(/Description:\s*(.+)/i)

    return {
      title: titleMatch?.[1]?.trim() || `${name}'s Portfolio`,
      description: descMatch?.[1]?.trim() || `Professional portfolio of ${name}`,
    }
  }
}

export const aiService = new AIService()

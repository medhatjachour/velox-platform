import { AIService } from '../ai-service'
import Groq from 'groq-sdk'

// Mock Groq SDK
jest.mock('groq-sdk')

describe('AIService', () => {
  let aiService: AIService
  let mockGroq: jest.Mocked<Groq>

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()

    // Create mock Groq instance
    mockGroq = {
      chat: {
        completions: {
          create: jest.fn(),
        },
      },
    } as any

    // Mock Groq constructor
    ;(Groq as jest.MockedClass<typeof Groq>).mockImplementation(() => mockGroq)

    aiService = new AIService()
  })

  describe('generate', () => {
    it('should generate AI content successfully', async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: 'Generated content',
            },
            finish_reason: 'stop',
          },
        ],
        usage: {
          total_tokens: 100,
        },
      }

      mockGroq.chat.completions.create.mockResolvedValue(mockResponse as any)

      const result = await aiService.generate({
        prompt: 'Test prompt',
      })

      expect(result).toEqual({
        content: 'Generated content',
        model: 'llama-3.3-70b-versatile',
        tokensUsed: 100,
        finishReason: 'stop',
      })

      expect(mockGroq.chat.completions.create).toHaveBeenCalledWith({
        messages: [
          {
            role: 'user',
            content: 'Test prompt',
          },
        ],
        model: 'llama-3.3-70b-versatile',
        temperature: 0.7,
        max_tokens: 500,
      })
    })

    it('should use custom parameters', async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: 'Custom content',
            },
            finish_reason: 'length',
          },
        ],
        usage: {
          total_tokens: 200,
        },
      }

      mockGroq.chat.completions.create.mockResolvedValue(mockResponse as any)

      await aiService.generate({
        prompt: 'Custom prompt',
        maxTokens: 1000,
        temperature: 0.9,
        model: 'llama-3.1-70b-versatile',
      })

      expect(mockGroq.chat.completions.create).toHaveBeenCalledWith({
        messages: [
          {
            role: 'user',
            content: 'Custom prompt',
          },
        ],
        model: 'llama-3.1-70b-versatile',
        temperature: 0.9,
        max_tokens: 1000,
      })
    })

    it('should throw error when AI generation fails', async () => {
      mockGroq.chat.completions.create.mockRejectedValue(new Error('API Error'))

      await expect(
        aiService.generate({
          prompt: 'Test prompt',
        })
      ).rejects.toThrow('Failed to generate AI content')
    })

    it('should handle empty response', async () => {
      const mockResponse = {
        choices: [],
        usage: {
          total_tokens: 0,
        },
      }

      mockGroq.chat.completions.create.mockResolvedValue(mockResponse as any)

      const result = await aiService.generate({
        prompt: 'Test prompt',
      })

      expect(result.content).toBe('')
      expect(result.tokensUsed).toBe(0)
    })
  })

  describe('generateBio', () => {
    it('should generate professional bio with full context', async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content:
                'John Doe is a Product Designer with 5 years of experience in UI/UX and Figma, creating exceptional user experiences.',
            },
            finish_reason: 'stop',
          },
        ],
        usage: {
          total_tokens: 50,
        },
      }

      mockGroq.chat.completions.create.mockResolvedValue(mockResponse as any)

      const result = await aiService.generateBio({
        name: 'John Doe',
        title: 'Product Designer',
        skills: ['UI/UX', 'Figma', 'React'],
        experience: '5 years',
      })

      expect(result).toContain('John Doe')
      expect(result).toContain('Product Designer')
      expect(mockGroq.chat.completions.create).toHaveBeenCalledWith(
        expect.objectContaining({
          temperature: 0.8,
          max_tokens: 200,
        })
      )
    })

    it('should generate bio with minimal context', async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: 'A passionate professional dedicated to excellence.',
            },
            finish_reason: 'stop',
          },
        ],
        usage: {
          total_tokens: 30,
        },
      }

      mockGroq.chat.completions.create.mockResolvedValue(mockResponse as any)

      const result = await aiService.generateBio({})

      expect(result).toBe('A passionate professional dedicated to excellence.')
    })

    it('should trim whitespace from bio', async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: '   Bio with spaces   ',
            },
            finish_reason: 'stop',
          },
        ],
        usage: {
          total_tokens: 20,
        },
      }

      mockGroq.chat.completions.create.mockResolvedValue(mockResponse as any)

      const result = await aiService.generateBio({ name: 'Test' })

      expect(result).toBe('Bio with spaces')
    })
  })

  describe('generateHeadline', () => {
    it('should generate catchy headline', async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: 'Full Stack Developer | React Expert',
            },
            finish_reason: 'stop',
          },
        ],
        usage: {
          total_tokens: 15,
        },
      }

      mockGroq.chat.completions.create.mockResolvedValue(mockResponse as any)

      const result = await aiService.generateHeadline({
        title: 'Full Stack Developer',
        skills: ['React', 'Node.js', 'TypeScript'],
      })

      expect(result).toBe('Full Stack Developer | React Expert')
      expect(mockGroq.chat.completions.create).toHaveBeenCalledWith(
        expect.objectContaining({
          temperature: 0.9,
          max_tokens: 50,
        })
      )
    })

    it('should generate headline with title only', async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: 'Software Engineer',
            },
            finish_reason: 'stop',
          },
        ],
        usage: {
          total_tokens: 10,
        },
      }

      mockGroq.chat.completions.create.mockResolvedValue(mockResponse as any)

      const result = await aiService.generateHeadline({
        title: 'Software Engineer',
      })

      expect(result).toBe('Software Engineer')
    })
  })

  describe('generateProjectDescription', () => {
    it('should generate compelling project description', async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content:
                'E-commerce Platform is a modern web application built with Next.js and Stripe, featuring secure payment processing and an intuitive admin dashboard.',
            },
            finish_reason: 'stop',
          },
        ],
        usage: {
          total_tokens: 40,
        },
      }

      mockGroq.chat.completions.create.mockResolvedValue(mockResponse as any)

      const result = await aiService.generateProjectDescription({
        projectName: 'E-commerce Platform',
        technologies: ['Next.js', 'Stripe', 'Tailwind'],
        features: ['Payment processing', 'Admin dashboard'],
      })

      expect(result).toContain('E-commerce Platform')
      expect(result).toContain('Next.js')
      expect(mockGroq.chat.completions.create).toHaveBeenCalledWith(
        expect.objectContaining({
          temperature: 0.8,
          max_tokens: 150,
        })
      )
    })

    it('should generate description with project name only', async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: 'A revolutionary project that changes everything.',
            },
            finish_reason: 'stop',
          },
        ],
        usage: {
          total_tokens: 20,
        },
      }

      mockGroq.chat.completions.create.mockResolvedValue(mockResponse as any)

      const result = await aiService.generateProjectDescription({
        projectName: 'Revolutionary Project',
      })

      expect(result).toBe('A revolutionary project that changes everything.')
    })
  })

  describe('enhanceContent', () => {
    it('should enhance content with professional tone', async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content:
                'We deliver exceptional results through innovative solutions and dedicated expertise.',
            },
            finish_reason: 'stop',
          },
        ],
        usage: {
          total_tokens: 30,
        },
      }

      mockGroq.chat.completions.create.mockResolvedValue(mockResponse as any)

      const result = await aiService.enhanceContent(
        'We do good work',
        'professional'
      )

      expect(result).toContain('exceptional')
      expect(result).toContain('innovative')
    })

    it('should enhance content with casual tone', async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: 'We make awesome stuff that people love!',
            },
            finish_reason: 'stop',
          },
        ],
        usage: {
          total_tokens: 25,
        },
      }

      mockGroq.chat.completions.create.mockResolvedValue(mockResponse as any)

      const result = await aiService.enhanceContent('We do good work', 'casual')

      expect(result).toBe('We make awesome stuff that people love!')
    })

    it('should enhance content with creative tone', async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content:
                'We craft magical experiences that transform the ordinary into extraordinary.',
            },
            finish_reason: 'stop',
          },
        ],
        usage: {
          total_tokens: 35,
        },
      }

      mockGroq.chat.completions.create.mockResolvedValue(mockResponse as any)

      const result = await aiService.enhanceContent(
        'We do good work',
        'creative'
      )

      expect(result).toContain('magical')
      expect(result).toContain('extraordinary')
    })
  })

  describe('generateSEOMetadata', () => {
    it('should generate SEO title and description', async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content:
                'Title: John Doe - Product Designer & UI/UX Expert\nDescription: Explore the portfolio of John Doe, an experienced Product Designer specializing in UI/UX design, creating beautiful digital experiences.',
            },
            finish_reason: 'stop',
          },
        ],
        usage: {
          total_tokens: 60,
        },
      }

      mockGroq.chat.completions.create.mockResolvedValue(mockResponse as any)

      const result = await aiService.generateSEOMetadata({
        name: 'John Doe',
        title: 'Product Designer',
        bio: 'Passionate about creating beautiful user experiences',
      })

      expect(result.title).toContain('John Doe')
      expect(result.description).toContain('John Doe')
      expect(mockGroq.chat.completions.create).toHaveBeenCalledWith(
        expect.objectContaining({
          temperature: 0.7,
          max_tokens: 150,
        })
      )
    })

    it('should use fallback values when parsing fails', async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: 'Invalid format without proper title and description',
            },
            finish_reason: 'stop',
          },
        ],
        usage: {
          total_tokens: 30,
        },
      }

      mockGroq.chat.completions.create.mockResolvedValue(mockResponse as any)

      const result = await aiService.generateSEOMetadata({
        name: 'Jane Smith',
      })

      expect(result.title).toBe("Jane Smith's Portfolio")
      expect(result.description).toBe('Professional portfolio of Jane Smith')
    })

    it('should handle partial parsing', async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: 'Title: Custom Title Here',
            },
            finish_reason: 'stop',
          },
        ],
        usage: {
          total_tokens: 20,
        },
      }

      mockGroq.chat.completions.create.mockResolvedValue(mockResponse as any)

      const result = await aiService.generateSEOMetadata({
        name: 'Test User',
      })

      expect(result.title).toBe('Custom Title Here')
      expect(result.description).toBe('Professional portfolio of Test User')
    })
  })
})

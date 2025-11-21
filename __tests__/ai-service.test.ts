// Use the manual mock in __mocks__/groq-sdk.ts
jest.mock('groq-sdk')
import { aiService } from '@/lib/ai/ai-service'

describe('AI Service', () => {
  test('generateBio returns mocked response', async () => {
    const bio = await aiService.generateBio({
      name: 'Alice',
      title: 'Engineer',
      skills: ['React', 'Node'],
      experience: '3 years',
    })
    expect(bio).toContain('MOCKED_RESPONSE')
    expect(bio).toContain('Name: Alice')
  })

  test('generateHeadline returns mocked response', async () => {
    const headline = await aiService.generateHeadline({
      title: 'Full Stack',
      skills: ['TypeScript'],
    })
    expect(headline).toContain('MOCKED_RESPONSE')
    expect(headline).toContain('Title: Full Stack')
  })

  test('generateProjectDescription returns mocked response', async () => {
    const desc = await aiService.generateProjectDescription({
      projectName: 'Project X',
      technologies: ['Next.js'],
      features: ['Auth'],
    })
    expect(desc).toContain('MOCKED_RESPONSE')
    expect(desc).toContain('Project Name: Project X')
  })

  test('enhanceContent returns mocked response', async () => {
    const out = await aiService.enhanceContent('Hello world', 'professional')
    expect(out).toContain('MOCKED_RESPONSE')
    expect(out).toContain('Hello world')
  })

  test('generateSEOMetadata returns parsed title and description', async () => {
    const meta = await aiService.generateSEOMetadata({ name: 'Bob', title: 'Designer', bio: 'Makes things' })
    expect(meta).toHaveProperty('title')
    expect(meta).toHaveProperty('description')
  })
})

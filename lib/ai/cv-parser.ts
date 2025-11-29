import { aiService } from './ai-service';

export interface ParsedCV {
  personalInfo: {
    fullName: string;
    email?: string;
    phone?: string;
    location?: string;
    title?: string;
    summary?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    achievements: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa?: string;
    achievements?: string[];
  }>;
  skills: {
    technical: string[];
    soft: string[];
    languages: string[];
    tools: string[];
  };
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    url?: string;
    highlights: string[];
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    url?: string;
  }>;
  awards?: string[];
  languages?: Array<{
    language: string;
    proficiency: string;
  }>;
}

export class CVParser {
  /**
   * Parse CV text and extract structured information using AI
   */
  async parseCV(cvText: string): Promise<ParsedCV> {
    const prompt = `You are a professional CV parser. Analyze the following CV/resume and extract ALL information into a structured JSON format.

CV Content:
${cvText}

Extract and return a JSON object with this EXACT structure:
{
  "personalInfo": {
    "fullName": "extracted name",
    "email": "extracted email or null",
    "phone": "extracted phone or null",
    "location": "extracted location or null",
    "title": "professional title/role or null",
    "summary": "professional summary/objective or null",
    "linkedin": "LinkedIn URL or null",
    "github": "GitHub URL or null",
    "website": "personal website or null"
  },
  "experience": [
    {
      "company": "company name",
      "position": "job title",
      "startDate": "start date",
      "endDate": "end date or Present",
      "current": true/false,
      "description": "role description",
      "achievements": ["achievement 1", "achievement 2"]
    }
  ],
  "education": [
    {
      "institution": "school/university name",
      "degree": "degree type (BS, MS, PhD, etc)",
      "field": "field of study",
      "startDate": "start date",
      "endDate": "end date",
      "gpa": "GPA if mentioned or null",
      "achievements": ["achievement or honor"]
    }
  ],
  "skills": {
    "technical": ["programming languages, frameworks, etc"],
    "soft": ["communication, leadership, etc"],
    "languages": ["English - Native", "Spanish - Fluent"],
    "tools": ["Git, Docker, AWS, etc"]
  },
  "projects": [
    {
      "name": "project name",
      "description": "project description",
      "technologies": ["tech1", "tech2"],
      "url": "project URL or null",
      "highlights": ["key achievement or feature"]
    }
  ],
  "certifications": [
    {
      "name": "certification name",
      "issuer": "issuing organization",
      "date": "date obtained",
      "url": "credential URL or null"
    }
  ],
  "awards": ["award 1", "award 2"],
  "languages": [
    {
      "language": "language name",
      "proficiency": "Native/Fluent/Intermediate/Basic"
    }
  ]
}

IMPORTANT:
- Extract ALL information present in the CV
- If a field is not found, use null or empty array
- For dates, preserve the format used in CV
- For skills, categorize them appropriately
- Return ONLY valid JSON, no markdown formatting`;

    const response = await aiService.generate({
      prompt,
      maxTokens: 2000,
      temperature: 0.3, // Lower temperature for more accurate extraction
    });

    try {
      // Clean the response to ensure valid JSON
      let jsonStr = response.content.trim();
      
      // Remove markdown code blocks if present
      jsonStr = jsonStr.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      
      // Parse JSON
      const parsed = JSON.parse(jsonStr);
      
      return parsed as ParsedCV;
    } catch (error) {
      console.error('Failed to parse AI response as JSON:', error);
      throw new Error('Failed to parse CV. Please try again or upload a different file.');
    }
  }

  /**
   * Generate a professional bio from CV data
   */
  async generateBioFromCV(cvData: ParsedCV): Promise<string> {
    const { personalInfo, experience, skills } = cvData;
    
    const yearsOfExperience = experience.length > 0 
      ? this.calculateYearsOfExperience(experience)
      : 0;

    const topSkills = skills.technical.slice(0, 5).join(', ');

    const prompt = `Create a compelling professional bio (3-4 sentences) for a portfolio based on this information:

Name: ${personalInfo.fullName}
Title: ${personalInfo.title || 'Professional'}
Years of Experience: ${yearsOfExperience} years
Top Skills: ${topSkills}
Summary: ${personalInfo.summary || 'Experienced professional'}

Recent Role: ${experience[0]?.position || 'Various roles'} at ${experience[0]?.company || 'leading companies'}

Write a bio that:
- Is engaging and professional
- Highlights unique value proposition
- Mentions specific achievements or impact
- Shows personality while remaining professional
- Is suitable for a modern portfolio website

Return ONLY the bio text, no additional formatting.`;

    const response = await aiService.generate({
      prompt,
      maxTokens: 300,
      temperature: 0.8,
    });

    return response.content.trim();
  }

  /**
   * Generate a catchy headline from CV data
   */
  async generateHeadlineFromCV(cvData: ParsedCV): Promise<string> {
    const { personalInfo, skills, experience } = cvData;

    const prompt = `Create a catchy, memorable professional headline for a portfolio based on:

Current Title: ${personalInfo.title || 'Professional'}
Top Skills: ${skills.technical.slice(0, 3).join(', ')}
Experience Level: ${experience.length > 0 ? 'Experienced' : 'Emerging'}

Create a headline that:
- Is 5-8 words maximum
- Is memorable and unique
- Highlights specialization
- Uses action words or impact-focused language
- Avoids clichés like "passionate" or "enthusiast"

Examples of good headlines:
- "Building Scalable Systems at Enterprise Scale"
- "AI Engineer Shipping Production ML Models"
- "Designer Crafting Digital Experiences That Convert"

Return ONLY the headline, no quotes or formatting.`;

    const response = await aiService.generate({
      prompt,
      maxTokens: 50,
      temperature: 0.9,
    });

    return response.content.trim().replace(/^["']|["']$/g, '');
  }

  /**
   * Generate project descriptions from brief mentions
   */
  async enhanceProjects(projects: ParsedCV['projects']): Promise<ParsedCV['projects']> {
    const enhanced = await Promise.all(
      projects.map(async (project) => {
        if (project.description && project.description.length < 100) {
          // Enhance short descriptions
          const prompt = `Expand this project description into a compelling 2-3 sentence description:

Project: ${project.name}
Current Description: ${project.description}
Technologies: ${project.technologies.join(', ')}
Highlights: ${project.highlights.join(', ')}

Make it:
- Professional and concrete
- Highlight technical challenges solved
- Show business impact or user value
- Be specific about what was built

Return ONLY the enhanced description.`;

          const response = await aiService.generate({
            prompt,
            maxTokens: 150,
            temperature: 0.7,
          });

          return {
            ...project,
            description: response.content.trim(),
          };
        }
        return project;
      })
    );

    return enhanced;
  }

  /**
   * Calculate years of experience from work history
   */
  private calculateYearsOfExperience(experience: ParsedCV['experience']): number {
    let totalMonths = 0;

    experience.forEach((job) => {
      const start = new Date(job.startDate);
      const end = job.current ? new Date() : new Date(job.endDate);
      
      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        const months = (end.getFullYear() - start.getFullYear()) * 12 + 
                      (end.getMonth() - start.getMonth());
        totalMonths += months;
      }
    });

    return Math.round(totalMonths / 12);
  }
}

export const cvParser = new CVParser();

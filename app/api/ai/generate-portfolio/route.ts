import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { portfolioData, template = "modern-minimal", style = "professional" } = body;

    if (!portfolioData) {
      return NextResponse.json(
        { error: "Portfolio data is required" },
        { status: 400 }
      );
    }

    // Template-specific instructions
    const templateInstructions: Record<string, string> = {
      "modern-minimal": "Create a clean, minimal single-page design inspired by Brittany Chiang with smooth scrolling, sticky navigation, and elegant typography.",
      "interactive-3d": "Build an interactive 3D experience using CSS 3D transforms and animations, inspired by Bruno Simon. Include playful hover effects and parallax scrolling.",
      "dark-elegant": "Design a sophisticated dark-themed portfolio with dancing character animations and smooth scrolling, inspired by Pierre Nel.",
      "vintage-terminal": "Create a vintage computer terminal aesthetic where sections appear like command outputs, inspired by Edward Hinrichsen.",
      "bold-creative": "Design a bold, creative portfolio with fun animations and interactive elements that reveal content, inspired by Rafael Caferati.",
      "simple-effective": "Build a simple, effective portfolio with light/dark mode toggle and concise sections, inspired by Keita Yamada.",
      "professional-formal": "Create a formal, professional single-page layout with consistent color scheme and clear sections, inspired by Ram Maheshwari.",
      "portfolio-showcase": "Design a project-focused portfolio with large project cards and testimonials section, inspired by Matt Farley.",
      "developer-focused": "Build a technical developer portfolio with detailed project breakdowns and tech stack highlights, inspired by Akshat Gupta.",
      "award-winning": "Create an innovative, award-worthy design with unique UI/UX elements and impressive interactions, inspired by Awwwards winners.",
    };

    // Style-specific instructions
    const styleInstructions: Record<string, string> = {
      "professional": "Use clean lines, professional typography, corporate colors, and formal layout.",
      "creative": "Use bold colors, artistic elements, unique animations, and creative layouts.",
      "interactive": "Include hover effects, scroll animations, parallax effects, and engaging interactions.",
      "minimalist": "Use maximum white space, minimal colors, simple typography, and focused content.",
      "technical": "Highlight code snippets, tech stack badges, GitHub stats, and developer tools.",
      "showcase": "Focus on large project images, case studies, before/after comparisons, and results.",
    };

    // Build comprehensive prompt with portfolio data
    const prompt = `You are an expert web designer and developer. Generate a beautiful, modern, responsive HTML portfolio webpage based on the following data:

**TEMPLATE:** ${template}
${templateInstructions[template] || templateInstructions["modern-minimal"]}

**STYLE:** ${style}
${styleInstructions[style] || styleInstructions["professional"]}

**Personal Information:**
- Name/Title: ${portfolioData.title || "Not provided"}
- Current Role: ${portfolioData.currentRole || "Not provided"}
- Company: ${portfolioData.company || "Not provided"}
- Years of Experience: ${portfolioData.yearsOfExperience || "Not provided"}
- Headline: ${portfolioData.headline || "Not provided"}
- Bio: ${portfolioData.bio || "Not provided"}

**Contact Information:**
- Email: ${portfolioData.email || "Not provided"}
- Phone: ${portfolioData.phone || "Not provided"}
- Location: ${portfolioData.location || "Not provided"}
- Website: ${portfolioData.website || "Not provided"}

**Professional Journey (Work Experience):**
${
  portfolioData.cvData?.experience && portfolioData.cvData.experience.length > 0
    ? portfolioData.cvData.experience
        .map(
          (exp: { position: string; company: string; startDate: string; endDate: string; current: boolean; description: string; achievements?: string[] }, i: number) =>
            `${i + 1}. ${exp.position} at ${exp.company} (${exp.startDate} - ${exp.current ? 'Present' : exp.endDate})
   ${exp.description}
   Key Achievements: ${exp.achievements?.join('; ') || 'N/A'}`
        )
        .join('\n\n')
    : "No work experience provided"
}

**Education:**
${
  portfolioData.cvData?.education && portfolioData.cvData.education.length > 0
    ? portfolioData.cvData.education
        .map(
          (edu: { degree: string; field: string; institution: string; startDate: string; endDate: string; gpa?: string }) =>
            `- ${edu.degree} in ${edu.field} from ${edu.institution} (${edu.startDate} - ${edu.endDate})${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}`
        )
        .join('\n')
    : "No education provided"
}

**Skills & Expertise:**
- Technical Skills: ${(portfolioData.skills || []).join(', ') || 'Not provided'}
- Services Offered: ${(portfolioData.services || []).join(', ') || 'Not provided'}

**Certifications:**
${
  portfolioData.cvData?.certifications && portfolioData.cvData.certifications.length > 0
    ? portfolioData.cvData.certifications
        .map((cert: { name: string; issuer: string; date: string }) => `- ${cert.name} by ${cert.issuer} (${cert.date})`)
        .join('\n')
    : "No certifications provided"
}

**Awards & Recognitions:**
${portfolioData.cvData?.awards && portfolioData.cvData.awards.length > 0 ? portfolioData.cvData.awards.join(', ') : "None provided"}

**Social Links:**
- LinkedIn: ${portfolioData.linkedinUrl || "Not provided"}
- GitHub: ${portfolioData.githubUrl || "Not provided"}
- Twitter: ${portfolioData.twitterUrl || "Not provided"}
- Instagram: ${portfolioData.instagramUrl || "Not provided"}

**Projects:**
${
  portfolioData.projects && portfolioData.projects.length > 0
    ? portfolioData.projects
        .map(
          (p: { title: string; description: string; url?: string; featured?: boolean }, i: number) =>
            `${i + 1}. ${p.title}
   Description: ${p.description}
   URL: ${p.url || "No URL"}
   Featured: ${p.featured ? "Yes" : "No"}`
        )
        .join("\n\n")
    : "No projects added yet"
}

**Theme Preference:** ${portfolioData.theme || "modern"}
**Primary Color:** ${portfolioData.primaryColor || "#3B82F6"}

**Requirements:**
1. Create a complete, single-page HTML document with embedded CSS and inline JavaScript if needed
2. Follow the ${template} template style and ${style} aesthetic precisely
3. Make it fully responsive (mobile, tablet, desktop) with proper breakpoints
4. Include smooth scroll behavior, animations, and transitions matching the template style
5. Use the primary color ${portfolioData.primaryColor || "#3B82F6"} as the main accent color
6. **TELL THE PROFESSIONAL STORY**: Create a compelling narrative showing career progression from past to present
7. Include sections in this order:
   - Hero/Header with name and current role
   - About/Bio section highlighting journey and expertise
   - **Experience Timeline** showing career progression with dates, achievements (if work experience provided)
   - **Education** section with degrees and institutions (if provided)
   - Projects/Portfolio showcasing work
   - Skills section with technical expertise
   - **Certifications & Awards** (if provided)
   - Contact/Footer with social links
8. Add working social media icon links using SVG icons or Unicode
9. Use professional typography with proper font hierarchy (h1, h2, h3, p)
10. Add hover effects, transitions, and micro-interactions appropriate to the style
11. Include meta tags for SEO and proper semantic HTML5 elements
12. Add smooth scrolling, fade-in animations on scroll if style is interactive
13. For experience timeline: Use visual timeline design with dates, company logos (placeholders), and achievement bullets
14. For interactive/3d templates: Include CSS 3D transforms, parallax effects, or creative animations
15. For minimalist templates: Use maximum white space, limited color palette, and clean typography
16. For dark templates: Use dark background (#0f172a or similar) with light text
17. **Show career progression visually** - early roles → current position with growth indicators
18. Make it production-ready with optimized performance and accessibility

Generate ONLY the complete HTML code with inline CSS and JavaScript. No explanations, no markdown code blocks, just pure HTML starting with <!DOCTYPE html>.`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert web designer who creates beautiful, modern, responsive portfolio websites. You output only clean, production-ready HTML code with embedded CSS.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 8000,
      top_p: 1,
      stream: false,
    });

    const generatedHTML = completion.choices[0]?.message?.content || "";

    // Clean up the response - remove markdown code blocks if present
    let cleanHTML = generatedHTML.trim();
    if (cleanHTML.startsWith("```html")) {
      cleanHTML = cleanHTML.replace(/^```html\n/, "").replace(/\n```$/, "");
    } else if (cleanHTML.startsWith("```")) {
      cleanHTML = cleanHTML.replace(/^```\n/, "").replace(/\n```$/, "");
    }

    return NextResponse.json({
      html: cleanHTML,
      message: "Portfolio HTML generated successfully",
    });
  } catch (error) {
    console.error("AI Portfolio Generation Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to generate portfolio HTML";
    return NextResponse.json(
      {
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}

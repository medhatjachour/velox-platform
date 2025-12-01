import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { portfolioData } = body;

    if (!portfolioData) {
      return NextResponse.json(
        { error: "Portfolio data is required" },
        { status: 400 }
      );
    }

    // Extract personality and design preferences
    const personality = portfolioData.personality || {};
    const designPrefs = portfolioData.designPreferences || {};
    const goals = portfolioData.goals || "showcase professional work";
    const targetAudience = portfolioData.targetAudience || "employers and clients";
    const favoriteColors = portfolioData.favoriteColors || [];
    const interests = portfolioData.interests || [];
    const values = portfolioData.values || [];
    
    console.log("\n" + "=".repeat(80));
    console.log("🎨 PERSONALIZED PORTFOLIO GENERATION");
    console.log("=".repeat(80));
    console.log(`👤 ${portfolioData.title || 'User'}`);
    console.log(`💼 ${portfolioData.currentRole || 'Professional'}`);
    console.log(`🎯 Goal: ${goals}`);
    console.log(`👥 Audience: ${targetAudience}`);
    console.log(`🎨 Colors: ${favoriteColors.join(', ') || 'Default'}`);
    console.log(`✨ Personality:`, personality);
    console.log(`💡 Interests: ${interests.join(', ')}`);
    console.log("=".repeat(80) + "\n");

    // Build comprehensive AI prompt
    const prompt = `🚨 CRITICAL MISSION: Create a STUNNING, AWARD-WINNING portfolio website 🚨

You are a WORLD-CLASS UI/UX DESIGNER who has won Awwwards, CSS Design Awards, and creates $50,000+ custom portfolio websites for Fortune 500 executives.

**ABSOLUTE REQUIREMENTS:**
1. Generate ONE COMPLETE HTML file (<!DOCTYPE html> to </html>)
2. ALL CSS embedded in <style> tags
3. ALL JavaScript embedded in <script> tags
4. NO external dependencies, NO CDN links, NO placeholders
5. NO markdown formatting, NO code blocks, NO explanations - ONLY RAW HTML

**YOUR DESIGN PHILOSOPHY:**
- Every pixel matters - spacing, typography, colors must be PERFECT
- Tell a story through visual hierarchy and flow
- Create emotional connection through design
- Use whitespace masterfully
- Make it feel EXPENSIVE and PROFESSIONAL

**USER PERSONALITY PROFILE:**
${Object.keys(personality).length > 0 ? `
Personality Traits:
${Object.entries(personality).map(([key, value]) => `- ${key}: ${value}`).join('\n')}
` : ''}

**DESIGN PREFERENCES:**
${Object.keys(designPrefs).length > 0 ? `
${Object.entries(designPrefs).map(([key, value]) => `- ${key}: ${value}`).join('\n')}
` : ''}
- Favorite Colors: ${favoriteColors.join(', ') || 'Use professional palette'}
- Design Style: ${designPrefs.style || 'Modern, clean, professional'}
- Animation Preference: ${designPrefs.animations || 'Subtle and smooth'}
- Visual Complexity: ${designPrefs.complexity || 'Balanced'}

**PORTFOLIO PURPOSE:**
- Primary Goal: ${goals}
- Target Audience: ${targetAudience}
- Key Message: ${portfolioData.keyMessage || 'Professional excellence and innovation'}

**USER VALUES & INTERESTS:**
${values.length > 0 ? `Values: ${values.join(', ')}` : ''}
${interests.length > 0 ? `Interests: ${interests.join(', ')}` : ''}

**PROFESSIONAL DATA:**

Personal Information:
- Name: ${portfolioData.title || "Not provided"}
- Role: ${portfolioData.currentRole || "Not provided"}
- Company: ${portfolioData.company || "Not provided"}
- Experience: ${portfolioData.yearsOfExperience || "Not provided"} years
- Bio: ${portfolioData.bio || "Not provided"}

Contact:
- Email: ${portfolioData.email || "Not provided"}
- Phone: ${portfolioData.phone || "Not provided"}
- Location: ${portfolioData.location || "Not provided"}

Social Media:
- LinkedIn: ${portfolioData.linkedinUrl || "Not provided"}
- GitHub: ${portfolioData.githubUrl || "Not provided"}
- Twitter: ${portfolioData.twitterUrl || "Not provided"}
- Instagram: ${portfolioData.instagramUrl || "Not provided"}
- Dribbble: ${portfolioData.dribbbleUrl || "Not provided"}
- Behance: ${portfolioData.behanceUrl || "Not provided"}
- Website: ${portfolioData.websiteUrl || "Not provided"}

${portfolioData.cvData?.experience && portfolioData.cvData.experience.length > 0 ? `
Work Experience:
${portfolioData.cvData.experience.map((exp: any, i: number) => `
${i + 1}. ${exp.position} at ${exp.company}
   Period: ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}
   Description: ${exp.description}
   Achievements: ${exp.achievements?.join('; ') || 'N/A'}
`).join('\n')}
` : 'No work experience provided'}

${portfolioData.cvData?.education && portfolioData.cvData.education.length > 0 ? `
Education:
${portfolioData.cvData.education.map((edu: any) => `
- ${edu.degree} in ${edu.field}
  ${edu.institution} (${edu.startDate} - ${edu.endDate})
  ${edu.gpa ? `GPA: ${edu.gpa}` : ''}
`).join('\n')}
` : 'No education provided'}

${portfolioData.skills && portfolioData.skills.length > 0 ? `
Skills: ${portfolioData.skills.map((s: any) => s.name || s).join(', ')}
` : ''}

${portfolioData.projects && portfolioData.projects.length > 0 ? `
Projects:
${portfolioData.projects.map((p: any, i: number) => `
${i + 1}. ${p.title}
   ${p.description}
   ${p.url ? `URL: ${p.url}` : ''}
   ${p.technologies ? `Tech: ${p.technologies.join(', ')}` : ''}
   ${p.featured ? '⭐ Featured' : ''}
`).join('\n')}
` : 'No projects provided'}

${portfolioData.certifications && portfolioData.certifications.length > 0 ? `
Certifications:
${portfolioData.certifications.map((cert: any) => `
- ${cert.name} by ${cert.issuer} (${cert.date})
`).join('\n')}
` : ''}

${portfolioData.testimonials && portfolioData.testimonials.length > 0 ? `
Testimonials:
${portfolioData.testimonials.map((test: any) => `
"${test.content}"
- ${test.name}, ${test.role} (${test.rating}/5 stars)
`).join('\n')}
` : ''}

**🎨 VISUAL DESIGN SYSTEM - BE OBSESSIVELY DETAILED:**

**Color Palette** (Use these exact principles):
Primary Colors: ${favoriteColors.length > 0 ? favoriteColors.join(', ') : '#2563eb, #8b5cf6, #ec4899'}
- Create 7-color palette: primary, secondary, accent, dark, light, muted, highlight
- Use color psychology: ${personality.creative ? 'Bold, vibrant, energetic colors' : personality.professional ? 'Sophisticated navy, charcoal, gold accents' : personality.minimalist ? 'Monochromatic with one accent color' : 'Balanced, harmonious palette'}
- Gradients: Use modern CSS gradients (linear, radial, conic) with multiple stops
- Dark mode ready: All colors must work in both light/dark themes

**Typography System** (Copy Apple/Stripe level quality):
- Font pairing: ${personality.creative ? 'Display font for headers, clean sans-serif for body' : personality.technical ? 'Monospace accents, geometric sans-serif' : 'Elegant serif headlines, modern sans body'}
- Font sizes: Use fluid typography (clamp() for responsive sizing)
  - H1: clamp(2.5rem, 5vw, 4.5rem) - Hero headlines
  - H2: clamp(2rem, 4vw, 3.5rem) - Section titles
  - H3: clamp(1.5rem, 3vw, 2.5rem) - Subsections
  - Body: clamp(1rem, 1.5vw, 1.125rem) - Perfect readability
  - Small: clamp(0.875rem, 1.2vw, 1rem) - Labels, captions
- Line height: 1.6 for body, 1.2 for headlines
- Letter spacing: -0.02em for large text, 0.01em for body
- Font weights: Use 300, 400, 600, 700, 900 strategically

**Spacing System** (8px base unit):
- Micro: 4px, 8px (tight elements)
- Small: 12px, 16px (related content)
- Medium: 24px, 32px (section padding)
- Large: 48px, 64px (section margins)
- XL: 96px, 128px (major sections)
- Use CSS Grid with gap: 2rem for layouts
- Container max-width: 1280px with padding: clamp(1rem, 5vw, 3rem)

**Layout Architecture:**
${personality.minimalist ? `
- Clean single-column with generous whitespace
- Asymmetric layouts for visual interest
- Content max-width: 65ch for readability` : personality.bold ? `
- Full-width sections with edge-to-edge content
- Overlapping elements for depth
- Breakout sections that pop` : `
- Balanced grid system (12-column)
- Mix of full-width and contained sections
- Strategic use of sidebars and callouts`}

✨ **ANIMATIONS & MICRO-INTERACTIONS** (Make it feel ALIVE):

**Animation Levels:**
${designPrefs.animations === 'minimal' ? `
- Subtle: 200-300ms ease-out transitions
- Fade-in on scroll (opacity + translateY)
- Smooth color transitions on hover` : designPrefs.animations === 'dynamic' ? `
- Bold: 400-600ms spring animations
- Stagger animations for lists
- Parallax scrolling effects
- Scale + rotate on interaction` : `
- Smooth: 300-400ms cubic-bezier easing
- Slide-in reveals
- Floating elements
- Ripple effects on click`}

**Must-Have Interactions:**
1. **Scroll Animations**: Use Intersection Observer
   - Fade in + slide up when elements enter viewport
   - Stagger child elements (50ms delay each)
   - Progress indicator on long content
   
2. **Hover States**: Every clickable element needs:
   - Scale(1.05) or translateY(-2px)
   - Shadow elevation change
   - Color shift (not just opacity)
   - Cursor: pointer
   
3. **Loading States**: 
   - Skeleton screens (not spinners)
   - Progressive content reveal
   - Smooth page transitions

4. **3D Effects**: ${designPrefs.use3D ? `
   - Use CSS transform: perspective(), rotateX(), rotateY()
   - Card flip effects
   - Floating shapes with parallax
   - Glass morphism (backdrop-filter: blur())` : `
   - Subtle depth with shadows
   - Layered backgrounds
   - Elevated cards on hover`}

📱 **RESPONSIVE DESIGN** (Mobile = 60% of traffic):
**Breakpoints:**
- Mobile: 320px - 640px (stack everything, 16px padding)
- Tablet: 641px - 1024px (2-column grid, 24px padding)
- Desktop: 1025px+ (full layout, max 1280px container)

**Mobile Optimizations:**
- Touch targets: minimum 44x44px
- Font size: minimum 16px (prevents zoom on iOS)
- Simplified navigation (hamburger menu)
- Optimize images (srcset for retina)
- Reduce animations (prefers-reduced-motion)

📖 **CONTENT STRUCTURE** (Tell a compelling story):

**1. HERO SECTION** - First 3 seconds = make or break
${personality.creative ? `
- Full-screen creative background (animated gradient/particles)
- Large, bold name with text reveal animation
- Playful tagline that shows personality
- Interactive element (custom cursor, following shapes)` : personality.professional ? `
- Clean, sophisticated split-screen layout
- Professional headshot with elegant frame
- Concise value proposition
- Subtle parallax background
- Premium feel with gold/accent highlights` : personality.minimalist ? `
- Centered, lots of whitespace
- Simple typography, one accent color
- Fade-in name animation
- Clean sans-serif font
- Focus on the content, not decoration` : `
- Balanced hero with photo + text
- Smooth gradient background
- Animated typing effect for role
- Scroll indicator`}

**2. ABOUT SECTION** - Build trust & connection
- Opening paragraph: Hook them with your story
- ${portfolioData.bio ? `Use this bio: "${portfolioData.bio.substring(0, 200)}..."` : 'Create compelling narrative from available data'}
- Stats showcase: Years experience, projects completed, clients served
- Values/Interests: Show personality beyond work
- Call-out quote or personal mission statement

**3. EXPERIENCE SECTION** - Prove your expertise
${portfolioData.cvData?.experience?.length > 0 ? `
- Timeline layout (vertical on mobile, horizontal on desktop)
- Each job: Company name (bold), role, dates, location
- Bullet points for achievements (use icons)
- Highlight numbers/metrics (increased sales 40%, managed team of 12)
- Hover: Expand to show more details` : `
- If no experience data: Create "What I Do" section instead
- Service cards with icons
- Skills breakdown
- Work approach/methodology`}

**4. PROJECTS/PORTFOLIO** - Show, don't tell
${portfolioData.projects?.length > 0 ? `
- Grid layout: 2 columns mobile, 3 desktop
- Each card: Image thumbnail, title, tech stack
- Hover effect: Overlay with description + "View Details" button
- Click: Modal or expand with full details
- Add filters: "All", "Featured", by technology` : `
- Create placeholder project cards with:
  - Generic project ideas based on role
  - Use CSS-generated backgrounds (gradients, shapes)
  - Show potential, encourage to add real projects`}

**5. SKILLS SECTION** - Visualize capabilities
- Organize by category: Technical, Soft Skills, Tools, Languages
- Visual representation: ${personality.creative ? 'Creative skill graphs, animated bars' : personality.technical ? 'Console-style skill tree, terminal aesthetic' : 'Clean progress bars with percentages'}
- Make it interactive: Hover to see proficiency level
- Use icons for each skill

**6. EDUCATION/CERTIFICATIONS** - Credibility
${portfolioData.cvData?.education?.length > 0 ? `
- Card layout with institution logos/icons
- Degree, field, dates, GPA (if good)
- Honors/achievements highlighted` : `
- If no education: Skip section or show "Continuous Learning"
- Online courses, certifications, self-taught journey`}

**7. TESTIMONIALS** - Social proof (if available)
${portfolioData.testimonials?.length > 0 ? `
- Quote cards with 5-star ratings
- Client name, role, company
- Rotating carousel (auto-play)` : `
- Skip if no testimonials
- Or add "Let's work together" CTA instead`}

**8. CONTACT/CTA SECTION** - Make it easy to connect
- Prominent email button: ${portfolioData.email || 'contact@example.com'}
- Social media icons: ${portfolioData.linkedinUrl ? 'LinkedIn, ' : ''}${portfolioData.githubUrl ? 'GitHub, ' : ''}${portfolioData.twitterUrl ? 'Twitter, ' : ''}
- Download resume button (if CV uploaded)
- Contact form: Name, Email, Message with validation
- Location: ${portfolioData.location || 'Available globally'}
- "Let's create something amazing together" CTA

🎯 **Personality-Driven Features:**
${personality.creative ? '- Bold color choices, unique layouts, artistic elements' : ''}
${personality.minimalist ? '- Clean spaces, subtle colors, focused content' : ''}
${personality.professional ? '- Business-like, structured, corporate feel' : ''}
${personality.playful ? '- Fun animations, bright colors, interactive elements' : ''}
${personality.technical ? '- Code snippets, terminal aesthetics, tech vibes' : ''}
${personality.artistic ? '- Gallery layouts, image-heavy, creative typography' : ''}

**🎯 HANDLING MISSING DATA** (Make it look intentional, not empty):

If NO projects: 
- Show "Featured Work" with 3-4 placeholder cards
- Use beautiful CSS gradients as backgrounds
- "Coming Soon" badge
- Still show tech stack interests

If NO experience:
- "What I Do" section with service offerings
- "Skills & Expertise" focus
- "Available for" opportunities

If MINIMAL bio:
- Create compelling story from available data
- Use role/title to craft narrative
- "Passionate about X, specializing in Y"

**🚀 CSS ARCHITECTURE** (Production-ready code):

\`\`\`css
:root {
  /* Color System */
  --primary: ${favoriteColors[0] || '#2563eb'};
  --secondary: ${favoriteColors[1] || '#8b5cf6'};
  --accent: ${favoriteColors[2] || '#ec4899'};
  --dark: #0f172a;
  --light: #f8fafc;
  --muted: #64748b;
  
  /* Spacing Scale */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
  --space-xl: 6rem;
  
  /* Typography */
  --font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-heading: 'Inter', sans-serif;
  
  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
  --shadow-xl: 0 20px 25px rgba(0,0,0,0.15);
  
  /* Transitions */
  --transition-fast: 200ms ease-out;
  --transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { 
  font-family: var(--font-body);
  line-height: 1.6;
  color: var(--dark);
  overflow-x: hidden;
}

/* Utility Classes */
.container { max-width: 1280px; margin: 0 auto; padding: 0 clamp(1rem, 5vw, 3rem); }
.section { padding: var(--space-xl) 0; }
.fade-in { animation: fadeIn 0.8s ease-out forwards; opacity: 0; }

@keyframes fadeIn {
  to { opacity: 1; transform: translateY(0); }
  from { opacity: 0; transform: translateY(20px); }
}
\`\`\`

**⚡ JAVASCRIPT FEATURES** (Make it interactive):

1. **Intersection Observer** (scroll animations):
\`\`\`javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(el => observer.observe(el));
\`\`\`

2. **Smooth scroll navigation**
3. **Mobile menu toggle**
4. **Project filtering** (if projects exist)
5. **Form validation** (contact form)
6. **Typing animation** for hero tagline
7. **Parallax effects** (if not minimal personality)
8. **Theme toggle** (light/dark mode)

**♿ ACCESSIBILITY CHECKLIST:**
✅ Semantic HTML5 (header, nav, main, section, footer)
✅ ARIA labels on interactive elements
✅ Focus visible styles (outline: 2px solid var(--primary))
✅ Skip to content link
✅ Alt text on all images
✅ Color contrast ratio 4.5:1 minimum
✅ Keyboard navigation (Tab, Enter, Esc)
✅ Reduced motion support (@media (prefers-reduced-motion: reduce))

**🎨 FINAL DESIGN PRINCIPLES:**

1. **Personality First**: Every design decision reflects: ${Object.keys(personality).join(', ') || 'professional character'}
2. **Storytelling**: Guide visitors on a journey from "Who are you?" to "I want to work with you!"
3. **Attention to Detail**: Perfect spacing, typography, color harmony
4. **Mobile Excellence**: 60% of visitors are mobile - make it shine there
5. **Performance**: Fast loading, smooth animations, optimized everything
6. **Uniqueness**: This should feel custom-made, not templated

**QUALITY CHECKLIST:**
✅ Does every section have perfect spacing?
✅ Are colors harmonious and purposeful?
✅ Is typography hierarchy clear and readable?
✅ Do animations enhance (not distract)?
✅ Is mobile experience excellent?
✅ Does it tell their story effectively?
✅ Would YOU be proud to show this portfolio?

---

**NOW CREATE THE PORTFOLIO:**

Rules:
1. Output ONLY raw HTML (no markdown, no code blocks, no explanations)
2. Start with <!DOCTYPE html> and end with </html>
3. ALL CSS in <style> tags in <head>
4. ALL JavaScript in <script> tags before </body>
5. Make it production-ready and pixel-perfect
6. Handle missing data gracefully
7. Create something that looks like it cost $10,000+

Generate the HTML NOW:`;

    console.log("⏳ Generating personalized portfolio...");
    const startTime = Date.now();

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Generation timed out after 60 seconds")), 60000);
    });

    const completionPromise = groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a SENIOR UI/UX DESIGNER with 10+ years of experience creating award-winning, personalized portfolios. 

You excel at:
- Analyzing user personality and translating it to visual design
- Creating unique, memorable experiences
- Modern animations and interactions
- Storytelling through design
- Responsive, mobile-first development
- Accessibility and performance
- CSS art and creative effects
- 3D transforms and parallax
- Micro-interactions and smooth transitions

You NEVER use generic templates. Every portfolio you create is UNIQUE and reflects the individual's personality, values, and professional story. You understand color psychology, typography, layout principles, and how to create emotional connections through design.

Generate ONLY the complete HTML with embedded CSS and JavaScript. NO explanations, NO markdown blocks, pure HTML code.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 1.0, // Maximum creativity
      max_tokens: 32000, // Much longer responses
      top_p: 0.98,
      stream: false,
    });

    const completion = await Promise.race([completionPromise, timeoutPromise]) as Awaited<typeof completionPromise>;

    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    const generatedHTML = completion.choices[0]?.message?.content || "";

    console.log(`\n✅ Generated in ${duration}s`);
    console.log(`📏 Length: ${generatedHTML.length} characters`);
    console.log(`🔢 Tokens: ${completion.usage?.total_tokens || 'unknown'}`);
    console.log("=".repeat(80) + "\n");

    // Clean up markdown blocks if present
    let cleanHTML = generatedHTML.trim();
    if (cleanHTML.startsWith("```html")) {
      cleanHTML = cleanHTML.replace(/^```html\n/, "").replace(/\n```$/, "");
    } else if (cleanHTML.startsWith("```")) {
      cleanHTML = cleanHTML.replace(/^```\n/, "").replace(/\n```$/, "");
    }

    return NextResponse.json({
      html: cleanHTML,
      message: "Personalized portfolio generated successfully",
      metadata: {
        personality,
        designPreferences: designPrefs,
        goals,
        targetAudience,
        generationTime: duration + "s",
        htmlLength: cleanHTML.length,
        tokensUsed: completion.usage?.total_tokens || 0,
      }
    });
  } catch (error) {
    console.error("\n❌ GENERATION ERROR:");
    console.error("=".repeat(80));
    console.error(error);
    console.error("=".repeat(80) + "\n");
    const errorMessage = error instanceof Error ? error.message : "Failed to generate portfolio";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

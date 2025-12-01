# Advanced Portfolio Editor - Implementation Guide

## Overview

The portfolio editor has been significantly upgraded with powerful new features:

### ✨ Key Features

1. **Drag-and-Drop Section Reordering**
   - Sections can be reordered by dragging
   - Visual feedback during drag operations
   - Touch-friendly for mobile devices

2. **Everything is Editable**
   - All content fields are directly editable
   - Real-time preview of changes
   - No locked or AI-only content

3. **Structured JSON-Based Configuration**
   - Portfolio data stored as structured JSON
   - Easy to save, load, and modify
   - Separates content from presentation

4. **Section Management**
   - Add/remove sections dynamically
   - Show/hide sections without deleting
   - Each section has its own settings

5. **AI-Powered Content Generation**
   - Generate portfolio config from CV
   - Import from GitHub profile
   - AI returns structured JSON, not HTML

## Architecture

### New Files Created

1. **`/types/portfolio-editor.types.ts`**
   - Complete TypeScript type definitions
   - Section types (Hero, About, Experience, Projects, Skills, etc.)
   - Design preferences interface
   - Social links interface

2. **`/components/portfolio/AdvancedPortfolioEditor.tsx`**
   - Main editor component with drag-and-drop
   - Section-specific editors for each type
   - Live preview panel
   - Integrated with @dnd-kit for smooth dragging

3. **`/app/api/ai/generate-portfolio-config/route.ts`**
   - AI endpoint that returns JSON config instead of HTML
   - Parses CV or GitHub data
   - Generates structured section data
   - Retry logic for reliability

4. **`/app/dashboard/portfolio/editor/page.tsx`**
   - New page for the advanced editor
   - Save functionality
   - Integration with AI generation

### Dependencies Installed

```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

## Data Structure

### PortfolioConfig

```typescript
{
  id?: string;
  userId?: string;
  title: string;              // Portfolio title
  slug: string;               // URL slug
  published: boolean;         // Published status
  sections: PortfolioSection[]; // Array of sections
  design: DesignPreferences;  // Colors, fonts, layout
  seo: {...};                 // Meta tags
  analytics: {...};           // Tracking IDs
}
```

### Section Types

Each section has:
- `id`: Unique identifier
- `type`: Section type (hero, about, projects, etc.)
- `visible`: Whether section is shown
- `order`: Display order
- `settings`: Section-specific settings
- `data`: Section content (varies by type)

#### Hero Section
```typescript
{
  id: "hero-1",
  type: "hero",
  visible: true,
  order: 0,
  data: {
    name: string;
    tagline: string;
    description: string;
    image?: string;
    ctaText?: string;
    showSocialLinks: boolean;
    socialLinks: {...};
  }
}
```

#### Projects Section
```typescript
{
  id: "projects-1",
  type: "projects",
  visible: true,
  order: 3,
  data: {
    title: string;
    items: [{
      id: string;
      title: string;
      description: string;
      technologies: string[];
      url?: string;
      githubUrl?: string;
      featured: boolean;
    }]
  }
}
```

## Usage

### 1. Access the Advanced Editor

```
/dashboard/portfolio/editor
```

### 2. Using the Editor

#### Add Sections
- Click "Add Sections" buttons at the top
- Choose from: Hero, About, Experience, Projects, Skills, Education, Testimonials, Contact

#### Reorder Sections
- Drag the grip icon (⋮⋮) on any section
- Drop it in the desired position
- Order is saved automatically

#### Edit Section Content
- Click the expand arrow (▼) on any section
- Edit fields directly in the form
- Changes appear in the preview panel instantly

#### Show/Hide Sections
- Click the eye icon to toggle visibility
- Hidden sections stay in config but don't display

#### Delete Sections
- Click the trash icon to remove permanently

### 3. Generating with AI

#### Using the AI Config Generator

```typescript
// Call the API endpoint
const response = await fetch('/api/ai/generate-portfolio-config', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    cvText: "Your CV content...",
    githubData: {
      name: "John Doe",
      bio: "Developer",
      // ... more GitHub data
    },
    preferences: {
      template: "modern",
      personality: { creative: 8, professional: 7 }
    }
  })
});

const { config } = await response.json();
// Use config in the editor
```

#### Generate from CV
```typescript
// Upload CV and generate
const cvText = await readCVFile(file);
const response = await fetch('/api/ai/generate-portfolio-config', {
  method: 'POST',
  body: JSON.stringify({ cvText })
});
```

#### Import from GitHub
```typescript
// Fetch GitHub profile first
const githubData = await fetch('/api/ai/fetch-social-data', {
  method: 'POST',
  body: JSON.stringify({ platform: 'github', username: 'johndoe' })
});

// Generate config
const response = await fetch('/api/ai/generate-portfolio-config', {
  method: 'POST',
  body: JSON.stringify({ githubData: githubData.profile })
});
```

### 4. Saving the Portfolio

```typescript
const handleSave = async (config: PortfolioConfig) => {
  const response = await fetch('/api/portfolio', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data: config,
      template: config.design.template,
      published: config.published,
    }),
  });
  
  if (response.ok) {
    console.log('Portfolio saved!');
  }
};
```

## Extending the Editor

### Adding a New Section Type

1. **Add type to `/types/portfolio-editor.types.ts`:**

```typescript
export interface CustomSection extends BaseSection {
  type: 'custom-section';
  data: {
    title: string;
    content: string;
    // ... your fields
  };
}

// Update union type
export type PortfolioSection = 
  | HeroSection 
  | AboutSection 
  | CustomSection  // Add here
  | ...;
```

2. **Create editor component:**

```typescript
function CustomSectionEditor({ section, onUpdate }: any) {
  return (
    <div className="space-y-4">
      <input
        value={section.data.title}
        onChange={(e) => onUpdate({ 
          data: { ...section.data, title: e.target.value } 
        })}
      />
      {/* More fields */}
    </div>
  );
}
```

3. **Add to SectionEditor switch:**

```typescript
case "custom-section":
  return <CustomSectionEditor section={section} onUpdate={onUpdate} />;
```

4. **Add to AVAILABLE_SECTIONS:**

```typescript
{ type: "custom-section" as SectionType, label: "Custom Section" },
```

5. **Add preview component:**

```typescript
function SectionPreview({ section }: { section: PortfolioSection }) {
  switch (section.type) {
    case "custom-section":
      return <div>Your preview JSX</div>;
    // ...
  }
}
```

### Customizing Section Settings

Each section has a `settings` object for layout/styling:

```typescript
settings: {
  backgroundColor?: string;
  textColor?: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
  layout?: 'single' | 'two-column' | 'grid' | 'masonry';
  animation?: 'none' | 'fade' | 'slide' | 'scale';
}
```

To add settings UI, extend the section editor:

```typescript
<div>
  <label>Background Color</label>
  <input
    type="color"
    value={section.settings.backgroundColor}
    onChange={(e) => onUpdate({
      settings: { ...section.settings, backgroundColor: e.target.value }
    })}
  />
</div>
```

## Design Customization

### Updating Colors

```typescript
const updateColors = (colors: any) => {
  setConfig(prev => ({
    ...prev,
    design: {
      ...prev.design,
      colors: {
        ...prev.design.colors,
        ...colors
      }
    }
  }));
};
```

### Changing Typography

```typescript
const updateTypography = (typography: any) => {
  setConfig(prev => ({
    ...prev,
    design: {
      ...prev.design,
      typography: {
        ...prev.design.typography,
        ...typography
      }
    }
  }));
};
```

## AI Integration

### How AI Config Generation Works

1. **User provides CV text or GitHub username**
2. **API calls AI service with structured prompt**
3. **AI returns JSON matching PortfolioConfig structure**
4. **Response is parsed and validated**
5. **Config loaded into editor for user refinement**

### AI Prompt Structure

The prompt instructs the AI to:
- Extract personal information (name, email, location)
- Identify work experience and create experience section
- Find projects and create project cards
- Detect skills and organize into categories
- Generate professional summaries and bios
- Create appropriate section ordering

### Handling AI Errors

The API includes retry logic:
```typescript
let attempts = 0;
while (attempts < 3) {
  try {
    result = await aiService.generate({...});
    if (isValid(result)) break;
  } catch (error) {
    attempts++;
    await delay(1000);
  }
}
```

## Best Practices

### 1. Section IDs
- Always use unique IDs: `${type}-${Date.now()}`
- Never reuse IDs

### 2. State Management
- Keep config in a single state object
- Update immutably
- Avoid deep mutations

### 3. Preview Sync
- Preview updates automatically on config change
- No manual refresh needed

### 4. Validation
- Validate required fields before saving
- Show clear error messages
- Prevent invalid states

### 5. Performance
- Use React.memo for heavy components
- Debounce rapid updates
- Lazy load section editors

## Migration from Old Editor

To migrate existing portfolios:

```typescript
// Convert old format to new structure
function migratePortfolio(oldData: any): PortfolioConfig {
  return {
    title: oldData.title,
    slug: generateSlug(oldData.title),
    published: oldData.published || false,
    sections: [
      {
        id: 'hero-1',
        type: 'hero',
        visible: true,
        order: 0,
        settings: {},
        data: {
          name: oldData.title,
          tagline: oldData.headline,
          description: oldData.bio,
          socialLinks: {
            linkedin: oldData.linkedinUrl,
            github: oldData.githubUrl,
            // ...
          }
        }
      },
      // ... convert other sections
    ],
    design: createDefaultDesign(),
    seo: {},
    analytics: {},
  };
}
```

## Future Enhancements

Planned features:
- [ ] Section templates library
- [ ] Undo/redo functionality
- [ ] Version history
- [ ] Collaborative editing
- [ ] Export to various formats (PDF, HTML, Markdown)
- [ ] Import from LinkedIn
- [ ] AI-powered section suggestions
- [ ] A/B testing for different layouts
- [ ] Analytics dashboard
- [ ] Custom CSS per section

## Troubleshooting

### Drag and drop not working
- Check @dnd-kit is installed
- Verify sensors are configured
- Ensure unique IDs for all sections

### Preview not updating
- Check config state changes
- Verify preview component re-renders
- Console log config changes

### AI generation fails
- Check GROQ_API_KEY is set
- Verify CV text is not too long (< 10,000 chars)
- Check network connectivity
- Review API logs for errors

### Save fails
- Validate all required fields
- Check user authentication
- Verify API endpoint
- Check database connection

## Support

For issues or questions:
1. Check this documentation
2. Review TypeScript types in `/types/portfolio-editor.types.ts`
3. Inspect component props and state
4. Check browser console for errors
5. Review API response in Network tab

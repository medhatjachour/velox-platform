/**
 * Portfolio Editor Types
 * 
 * Advanced types for the drag-and-drop portfolio editor with full customization
 */

// Section type definitions
export type SectionType = 
  | 'hero' 
  | 'about' 
  | 'experience' 
  | 'projects' 
  | 'skills' 
  | 'education'
  | 'testimonials' 
  | 'contact'
  | 'custom';

// Base section interface
export interface BaseSection {
  id: string;
  type: SectionType;
  visible: boolean;
  order: number;
  settings: SectionSettings;
}

// Section settings (layout, styling, etc.)
export interface SectionSettings {
  backgroundColor?: string;
  textColor?: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
  layout?: 'single' | 'two-column' | 'grid' | 'masonry';
  animation?: 'none' | 'fade' | 'slide' | 'scale';
}

// Hero section
export interface HeroSection extends BaseSection {
  type: 'hero';
  data: {
    name: string;
    tagline: string;
    description: string;
    image?: string;
    backgroundImage?: string;
    ctaText?: string;
    ctaUrl?: string;
    showSocialLinks: boolean;
    socialLinks: SocialLinks;
  };
}

// About section
export interface AboutSection extends BaseSection {
  type: 'about';
  data: {
    title: string;
    bio: string;
    image?: string;
    highlights: string[];
    stats?: Array<{
      label: string;
      value: string;
    }>;
  };
}

// Experience section
export interface ExperienceSection extends BaseSection {
  type: 'experience';
  data: {
    title: string;
    items: Array<{
      id: string;
      company: string;
      position: string;
      startDate: string;
      endDate: string;
      current: boolean;
      description: string;
      achievements?: string[];
      location?: string;
      logo?: string;
    }>;
  };
}

// Projects section
export interface ProjectsSection extends BaseSection {
  type: 'projects';
  data: {
    title: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
      image?: string;
      technologies: string[];
      url?: string;
      githubUrl?: string;
      featured: boolean;
      status?: 'completed' | 'in-progress' | 'planned';
    }>;
  };
}

// Skills section
export interface SkillsSection extends BaseSection {
  type: 'skills';
  data: {
    title: string;
    categories: Array<{
      id: string;
      name: string;
      skills: Array<{
        id: string;
        name: string;
        level?: number; // 0-100
        yearsOfExperience?: number;
      }>;
    }>;
  };
}

// Education section
export interface EducationSection extends BaseSection {
  type: 'education';
  data: {
    title: string;
    items: Array<{
      id: string;
      institution: string;
      degree: string;
      field: string;
      startDate: string;
      endDate: string;
      gpa?: string;
      achievements?: string[];
      logo?: string;
    }>;
  };
}

// Testimonials section
export interface TestimonialsSection extends BaseSection {
  type: 'testimonials';
  data: {
    title: string;
    items: Array<{
      id: string;
      name: string;
      role: string;
      company: string;
      content: string;
      image?: string;
      rating?: number;
    }>;
  };
}

// Contact section
export interface ContactSection extends BaseSection {
  type: 'contact';
  data: {
    title: string;
    description: string;
    email: string;
    phone?: string;
    location?: string;
    showForm: boolean;
    socialLinks: SocialLinks;
  };
}

// Custom HTML section
export interface CustomSection extends BaseSection {
  type: 'custom';
  data: {
    title: string;
    html: string;
    css?: string;
  };
}

// Union type for all sections
export type PortfolioSection = 
  | HeroSection 
  | AboutSection 
  | ExperienceSection 
  | ProjectsSection 
  | SkillsSection 
  | EducationSection
  | TestimonialsSection 
  | ContactSection
  | CustomSection;

// Social links
export interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  instagram?: string;
  dribbble?: string;
  behance?: string;
  medium?: string;
  youtube?: string;
  website?: string;
}

// Design preferences
export interface DesignPreferences {
  template: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    fontSize: 'small' | 'medium' | 'large';
  };
  layout: {
    maxWidth: number;
    spacing: 'compact' | 'normal' | 'spacious';
    borderRadius: number;
  };
  animations: {
    enabled: boolean;
    speed: 'slow' | 'normal' | 'fast';
    style: 'minimal' | 'smooth' | 'dynamic';
  };
}

// Complete portfolio configuration
export interface PortfolioConfig {
  id?: string;
  userId?: string;
  title: string;
  slug: string;
  published: boolean;
  sections: PortfolioSection[];
  design: DesignPreferences;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
  };
  analytics: {
    googleAnalyticsId?: string;
    facebookPixelId?: string;
  };
  customDomain?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// AI generation request/response types
export interface AIPortfolioGenerationRequest {
  cvText?: string;
  githubUsername?: string;
  linkedinUrl?: string;
  preferences?: Partial<DesignPreferences>;
  personality?: {
    creative?: number;
    professional?: number;
    minimalist?: number;
    bold?: number;
    technical?: number;
  };
}

export interface AIPortfolioGenerationResponse {
  success: boolean;
  config?: PortfolioConfig;
  error?: string;
}

// Drag and drop types
export interface DragItem {
  id: string;
  type: SectionType;
  index: number;
}

export interface DropResult {
  draggedId: string;
  targetId: string;
  position: 'before' | 'after';
}

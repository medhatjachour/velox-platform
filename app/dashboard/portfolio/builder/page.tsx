"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Sparkles,
  Eye,
  Palette,
  Check,
  ChevronRight,
  Zap,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import TemplateCustomizer from "@/components/portfolio/TemplateCustomizer";
import { TemplatePreview } from "@/components/portfolio/TemplatePreview";

// Template definitions with previews
const TEMPLATES = [
  {
    id: "simple-default",
    name: "Simple Default",
    description: "Mobile-first single page with just essentials: photo, name, bio, email, and social links. Perfect for quick personal pages.",
    category: "Professional",
    image: "/templates/simple-default.jpg",
    colors: ["#3b82f6", "#8b5cf6", "#06b6d4"],
    features: ["Mobile-First", "Single Page", "Social Links", "Minimal Design"],
    bestFor: ["Quick Setup", "Personal Pages", "Link in Bio"],
    premium: false,
  },
  {
    id: "modern-minimal",
    name: "Modern Minimal",
    description: "Scroll-driven narrative with smooth section transitions. Full-height hero with scroll indicator leads to elegantly spaced content blocks.",
    category: "Professional",
    image: "/templates/modern-minimal.jpg",
    colors: ["#2563eb", "#8b5cf6", "#ec4899"],
    features: ["Scroll Narrative", "Section Transitions", "Timeline Layout", "Floating CTA"],
    bestFor: ["Developers", "Designers", "Consultants"],
    premium: false,
  },
  {
    id: "creative-bold",
    name: "Creative Bold",
    description: "Immersive dark theme with animated gradient blobs that respond to scroll. Floating glass-morphism cards reveal content on hover with parallax effects.",
    category: "Creative",
    image: "/templates/creative-bold.jpg",
    colors: ["#f59e0b", "#ec4899", "#8b5cf6"],
    features: ["Animated Gradients", "Glass Morphism", "Scroll Parallax", "Hover Reveals"],
    bestFor: ["Artists", "Photographers", "Creative Directors"],
    premium: true,
  },
  {
    id: "developer-pro",
    name: "Developer Pro",
    description: "Interactive terminal UI with command-line aesthetics. Type-writer animations, code block projects, and bash-style navigation create an immersive dev experience.",
    category: "Tech",
    image: "/templates/developer-pro.jpg",
    colors: ["#10b981", "#3b82f6", "#6366f1"],
    features: ["Terminal UI", "Type-writer Effect", "Code Blocks", "CLI Navigation"],
    bestFor: ["Software Engineers", "DevOps", "System Architects"],
    premium: false,
  },
  {
    id: "corporate-elite",
    name: "Corporate Elite",
    description: "Executive dashboard layout with metrics-driven storytelling. Split-screen sections, stats counters, and case study slides create authority and trust.",
    category: "Professional",
    image: "/templates/corporate-elite.jpg",
    colors: ["#1e40af", "#9333ea", "#dc2626"],
    features: ["Dashboard Layout", "Stats Counters", "Split Screens", "Case Study Slides"],
    bestFor: ["Executives", "C-Suite", "Business Leaders"],
    premium: true,
  },
  {
    id: "designer-showcase",
    name: "Designer Showcase",
    description: "Pinterest-style masonry grid with dynamic hover overlays. Projects load with staggered animations, lightbox galleries, and project detail modals.",
    category: "Creative",
    image: "/templates/designer-showcase.jpg",
    colors: ["#ec4899", "#f59e0b", "#8b5cf6"],
    features: ["Masonry Grid", "Staggered Load", "Lightbox Gallery", "Detail Modals"],
    bestFor: ["UI/UX Designers", "Visual Designers", "Illustrators"],
    premium: true,
  },
  {
    id: "freelancer-hub",
    name: "Freelancer Hub",
    description: "Service marketplace layout with pricing tiers and testimonials. Interactive service cards flip to show details, pricing calculators, and booking CTA.",
    category: "Business",
    image: "/templates/freelancer-hub.jpg",
    colors: ["#0ea5e9", "#8b5cf6", "#ec4899"],
    features: ["Service Cards", "Flip Animations", "Pricing Calc", "Testimonial Carousel"],
    bestFor: ["Freelancers", "Consultants", "Service Providers"],
    premium: false,
  },
  {
    id: "startup-founder",
    name: "Startup Founder",
    description: "Pitch deck narrative with animated metrics and venture highlights. Grid backgrounds, bold typography, and data visualization create startup energy.",
    category: "Business",
    image: "/templates/startup-founder.jpg",
    colors: ["#6366f1", "#ec4899", "#f59e0b"],
    features: ["Animated Metrics", "Pitch Sections", "Grid Backgrounds", "Data Viz"],
    bestFor: ["Founders", "Entrepreneurs", "Startup Teams"],
    premium: true,
  },
  {
    id: "influencer-brand",
    name: "Influencer Brand",
    description: "Personal branding with social media integration.",
    category: "Creative",
    image: "/templates/influencer-brand.jpg",
    colors: ["#ec4899", "#f59e0b", "#8b5cf6"],
    features: ["Social Feed", "Media Kit", "Brand Deals", "Analytics"],
    bestFor: ["Influencers", "Content Creators", "YouTubers"],
    premium: true,
  },
  {
    id: "academic-scholar",
    name: "Academic Scholar",
    description: "Research-focused with publications and citations.",
    category: "Academic",
    image: "/templates/academic-scholar.jpg",
    colors: ["#1e40af", "#059669", "#dc2626"],
    features: ["Publications", "Research", "CV Download", "Citations"],
    bestFor: ["Researchers", "Professors", "PhDs"],
    premium: false,
  },
  {
    id: "photography-gallery",
    name: "Photography Gallery",
    description: "Full-screen image galleries with minimal distractions.",
    category: "Creative",
    image: "/templates/photography-gallery.jpg",
    colors: ["#000000", "#ffffff", "#ef4444"],
    features: ["Fullscreen Gallery", "Albums", "Print Shop", "Exif Data"],
    bestFor: ["Photographers", "Videographers", "Visual Artists"],
    premium: true,
  },
];

const CATEGORIES = ["All", "Professional", "Creative", "Tech", "Business", "Academic"];

export default function PortfolioBuilderPage() {
  const router = useRouter();
  const [step, setStep] = useState<"select-template" | "customize" | "preview">("select-template");
  const [selectedTemplate, setSelectedTemplate] = useState<typeof TEMPLATES[0] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);

  const filteredTemplates = TEMPLATES.filter((template) => {
    const categoryMatch = selectedCategory === "All" || template.category === selectedCategory;
    const premiumMatch = !showPremiumOnly || template.premium;
    return categoryMatch && premiumMatch;
  });

  const handleTemplateSelect = (template: typeof TEMPLATES[0]) => {
    setSelectedTemplate(template);
    setStep("customize");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (step === "customize") {
                    setStep("select-template");
                    setSelectedTemplate(null);
                  } else if (step === "preview") {
                    setStep("customize");
                  } else {
                    router.push("/dashboard/portfolio");
                  }
                }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Portfolio Builder
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {step === "select-template" && "Choose your template"}
                  {step === "customize" && "Customize your portfolio"}
                  {step === "preview" && "Preview & publish"}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {step !== "select-template" && (
                <Button
                  variant="outline"
                  onClick={() => setStep("select-template")}
                >
                  Change Template
                </Button>
              )}
              {selectedTemplate && (
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              )}
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mt-6 flex items-center gap-2">
            {["Select Template", "Customize", "Preview"].map((label, index) => {
              const stepIndex = ["select-template", "customize", "preview"].indexOf(step);
              const isActive = index === stepIndex;
              const isCompleted = index < stepIndex;

              return (
                <div key={label} className="flex items-center flex-1">
                  <div className="flex items-center gap-2 flex-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isActive
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        isActive
                          ? "text-slate-900 dark:text-white"
                          : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {index < 2 && (
                    <ChevronRight className="w-5 h-5 text-slate-400 mx-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {step === "select-template" && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero Section */}
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mb-6"
                >
                  <Sparkles className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Choose Your Perfect Template
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                  Pick from 10 professionally designed templates. Customize everything with AI-powered personalization.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                <div className="flex flex-wrap items-center gap-2">
                  {CATEGORIES.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={
                        selectedCategory === category
                          ? "bg-gradient-to-r from-blue-600 to-purple-600"
                          : ""
                      }
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                <Button
                  variant={showPremiumOnly ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowPremiumOnly(!showPremiumOnly)}
                  className={
                    showPremiumOnly
                      ? "bg-gradient-to-r from-amber-500 to-orange-600"
                      : ""
                  }
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Premium Only
                </Button>
              </div>

              {/* Templates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className="group cursor-pointer overflow-hidden border-2 hover:border-purple-500 transition-all hover:shadow-2xl hover:shadow-purple-500/20"
                      onClick={() => handleTemplateSelect(template)}
                    >
                      {/* Template Preview Image */}
                      <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-900 group-hover:scale-[1.02] transition-transform duration-300">
                        <TemplatePreview 
                          templateId={template.id} 
                          colors={template.colors} 
                        />
                        {template.premium && (
                          <div className="absolute top-3 right-3 z-10">
                            <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                              <Crown className="w-3 h-3" />
                              PRO
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 z-10">
                          <Button
                            size="sm"
                            className="w-full bg-white text-black hover:bg-white/90 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                          >
                            <Zap className="w-4 h-4 mr-2" />
                            Use Template
                          </Button>
                        </div>
                      </div>

                      {/* Template Info */}
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-lg">{template.name}</h3>
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                            {template.category}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                          {template.description}
                        </p>

                        {/* Color Palette */}
                        <div className="flex items-center gap-2 mb-3">
                          <Palette className="w-4 h-4 text-slate-400" />
                          <div className="flex gap-1">
                            {template.colors.map((color) => (
                              <div
                                key={color}
                                className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Best For */}
                        <div className="flex flex-wrap gap-1">
                          {template.bestFor.slice(0, 2).map((role) => (
                            <span
                              key={role}
                              className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                            >
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {step === "customize" && selectedTemplate && (
            <TemplateCustomizer 
              key={selectedTemplate.id} 
              template={selectedTemplate} 
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

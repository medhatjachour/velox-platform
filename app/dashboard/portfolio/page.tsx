"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Save,
  Eye,
  Sparkles,
  Plus,
  Trash2,
  Loader2,
  Check,
  X,
  Globe,
  Upload,
  RefreshCw,
  Edit3,
  Layout,
  Palette,
  Code,
  ExternalLink,
  Settings,
  Zap,
  User,
  Mail,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePortfolio } from "@/hooks/use-portfolio";
import { useAI } from "@/hooks/use-ai";
import CVUploader from "@/components/portfolio/CVUploader";
import ComprehensivePortfolioForm from "@/components/portfolio/ComprehensivePortfolioForm";
import { Toast, ToastContainer } from "@/components/ui/toast";

type ToastType = {
  id: string;
  title: string;
  description?: string;
  type: "success" | "error" | "warning" | "info";
};

export default function PortfolioEditorPage() {
  const router = useRouter();
  const {
    portfolios,
    loading: portfolioLoading,
    fetchPortfolios,
    createPortfolio,
    updatePortfolio,
    togglePublish,
    addProject: apiAddProject,
    updateProject: apiUpdateProject,
    deleteProject: apiDeleteProject,
  } = usePortfolio();

  const { loading: aiLoading, generateBio, generateHeadline } = useAI();

  const [activeTab, setActiveTab] = useState<"info" | "projects" | "design" | "preview">("info");
  const [saving, setSaving] = useState(false);
  const [currentPortfolio, setCurrentPortfolio] = useState<any>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCVUploader, setShowCVUploader] = useState(false);
  const [showComprehensiveForm, setShowComprehensiveForm] = useState(false);
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const [previewMode, setPreviewMode] = useState<"split" | "full">("split");
  const [generatingAI, setGeneratingAI] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("modern-minimal");
  const [generationStyle, setGenerationStyle] = useState<string>("professional");

  // Template definitions for name lookup
  const templates = [
    { id: "modern-minimal", name: "Modern Minimal", desc: "Clean & professional like Brittany Chiang", icon: "🎯" },
    { id: "interactive-3d", name: "Interactive 3D", desc: "Immersive experience like Bruno Simon", icon: "🎮" },
    { id: "dark-elegant", name: "Dark Elegant", desc: "Sophisticated dark theme like Pierre Nel", icon: "🌙" },
    { id: "vintage-terminal", name: "Vintage Terminal", desc: "Command-line aesthetic like Edward Hinrichsen", icon: "💻" },
    { id: "bold-creative", name: "Bold & Creative", desc: "Artistic with animations like Rafael Caferati", icon: "🎨" },
    { id: "simple-effective", name: "Simple & Effective", desc: "Minimalist focus like Keita Yamada", icon: "✨" },
    { id: "professional-formal", name: "Professional Formal", desc: "Corporate elegance like Ram Maheshwari", icon: "💼" },
    { id: "portfolio-showcase", name: "Portfolio Showcase", desc: "Project-focused like Matt Farley", icon: "📁" },
    { id: "developer-focused", name: "Developer Focused", desc: "Technical showcase like Akshat Gupta", icon: "⚡" },
    { id: "award-winning", name: "Award Winning", desc: "Innovative UI like Awwwards winners", icon: "🏆" },
  ];

  const showToast = (title: string, description?: string, type: "success" | "error" | "warning" | "info" = "info") => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, title, description, type }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Fetch portfolios on mount
  useEffect(() => {
    fetchPortfolios();
  }, []);

  // Set first portfolio as current when loaded
  useEffect(() => {
    if (portfolios.length > 0 && !currentPortfolio) {
      setCurrentPortfolio(portfolios[0]);
    }
  }, [portfolios]);

  const handleSave = async () => {
    if (!currentPortfolio) return;
    
    // Validate title
    if (!currentPortfolio.title || currentPortfolio.title.trim() === "") {
      alert("Please enter a portfolio title");
      return;
    }

    setSaving(true);
    try {
      if (currentPortfolio.id) {
        // Update existing - include all fields
        await updatePortfolio(currentPortfolio.id, {
          title: currentPortfolio.title,
          bio: currentPortfolio.bio,
          headline: currentPortfolio.headline,
          email: currentPortfolio.email,
          phone: currentPortfolio.phone,
          location: currentPortfolio.location,
          linkedinUrl: currentPortfolio.linkedinUrl,
          githubUrl: currentPortfolio.githubUrl,
          websiteUrl: currentPortfolio.websiteUrl,
          twitterUrl: currentPortfolio.twitterUrl,
          instagramUrl: currentPortfolio.instagramUrl,
          youtubeUrl: currentPortfolio.youtubeUrl,
          facebookUrl: currentPortfolio.facebookUrl,
          theme: currentPortfolio.theme,
        });
      } else {
        // Create new - generate slug from title
        const baseSlug = currentPortfolio.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
        const slug = `${baseSlug}-${Date.now().toString().slice(-6)}`;
        
        const newPortfolio = await createPortfolio({
          title: currentPortfolio.title,
          bio: currentPortfolio.bio || "",
          headline: currentPortfolio.headline || "",
          slug,
          email: currentPortfolio.email,
          phone: currentPortfolio.phone,
          location: currentPortfolio.location,
          linkedinUrl: currentPortfolio.linkedinUrl,
          githubUrl: currentPortfolio.githubUrl,
          websiteUrl: currentPortfolio.websiteUrl,
          twitterUrl: currentPortfolio.twitterUrl,
          instagramUrl: currentPortfolio.instagramUrl,
          youtubeUrl: currentPortfolio.youtubeUrl,
          facebookUrl: currentPortfolio.facebookUrl,
          theme: currentPortfolio.theme || null,
        });
        setCurrentPortfolio(newPortfolio);
      }
      showToast(
        "Portfolio Saved!",
        currentPortfolio.id ? "Your changes have been saved successfully." : "Your portfolio has been created successfully.",
        "success"
      );
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      // Refresh portfolios list
      await fetchPortfolios();
    } catch (error: any) {
      console.error("Save error:", error);
      showToast(
        "Save Failed",
        error?.message || "We couldn't save your portfolio. Please try again.",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleAIGenerateBio = async () => {
    if (!currentPortfolio) return;

    try {
      const bio = await generateBio({
        name: currentPortfolio.title,
        title: currentPortfolio.title,
        skills: currentPortfolio.skills || [],
        experience: "5+ years",
      });
      setCurrentPortfolio({ ...currentPortfolio, bio });
      showToast("Bio Generated!", "AI has created a professional bio for you.", "success");
    } catch (error) {
      console.error("AI generate bio error:", error);
      showToast("Generation Failed", "Couldn't generate bio. Please try again.", "error");
    }
  };

  const handleAIGenerateHeadline = async () => {
    if (!currentPortfolio) return;

    try {
      const headline = await generateHeadline({
        name: currentPortfolio.title,
        title: currentPortfolio.title,
        keywords: currentPortfolio.skills,
      });
      setCurrentPortfolio({ ...currentPortfolio, headline });
      showToast("Headline Generated!", "AI has created a catchy headline for you.", "success");
    } catch (error) {
      console.error("AI generate headline error:", error);
      showToast("Generation Failed", "Couldn't generate headline. Please try again.", "error");
    }
  };

  // Helper function to calculate total years of experience
  const calculateTotalYears = (experience: any[]) => {
    if (!experience || experience.length === 0) return '';
    let totalMonths = 0;
    experience.forEach((job: any) => {
      const start = new Date(job.startDate);
      const end = job.current ? new Date() : new Date(job.endDate);
      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        totalMonths += (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
      }
    });
    return `${Math.round(totalMonths / 12)} years`;
  };

  // Helper function to extract services from experience
  const extractServices = (experience: any[]) => {
    if (!experience || experience.length === 0) return [];
    const services = new Set<string>();
    experience.forEach((job: any) => {
      const position = job.position.toLowerCase();
      if (position.includes('developer') || position.includes('engineer')) services.add('Software Development');
      if (position.includes('design')) services.add('UI/UX Design');
      if (position.includes('data')) services.add('Data Analysis');
      if (position.includes('product')) services.add('Product Management');
      if (position.includes('lead') || position.includes('manager')) services.add('Technical Leadership');
      if (position.includes('architect')) services.add('System Architecture');
    });
    return Array.from(services);
  };

  const handleGeneratePortfolioHTML = async () => {
    if (!currentPortfolio) return;

    setGeneratingAI(true);
    
    // Show detailed progress toast
    const templateName = templates.find(t => t.id === selectedTemplate)?.name || selectedTemplate;
    showToast(
      "🎨 AI Portfolio Generator Started",
      `Creating ${templateName} portfolio with ${generationStyle} style. This takes 10-20 seconds...`,
      "info"
    );

    try {
      const response = await fetch("/api/ai/generate-portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          portfolioData: currentPortfolio,
          template: selectedTemplate,
          style: generationStyle
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || "Failed to generate portfolio");
      }

      const data = await response.json();
      
      if (!data.html) {
        throw new Error("No HTML content received");
      }
      
      // Open the generated HTML in a new window for preview
      const blob = new Blob([data.html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const newWindow = window.open(url, "_blank");
      
      if (!newWindow) {
        showToast(
          "⚠️ Pop-up Blocked",
          "Please allow pop-ups and try again.",
          "error"
        );
        return;
      }

      showToast(
        "✨ Portfolio Generated Successfully!",
        `Your ${templateName} portfolio is now open in a new tab. Review and download if you like it!`,
        "success"
      );
    } catch (error) {
      console.error("Generate portfolio error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      showToast(
        "❌ Generation Failed",
        `Error: ${errorMessage}. Please check your data and try again.`,
        "error"
      );
    } finally {
      setGeneratingAI(false);
    }
  };

  const handleCVParsed = (data: any) => {
    const { parsed, generated } = data;
    
    // Map CV projects to portfolio projects format
    const mappedProjects = (generated.enhancedProjects || parsed.projects || []).map((proj: any, index: number) => ({
      id: `project-${Date.now()}-${index}`,
      title: proj.name || proj.title || `Project ${index + 1}`,
      description: proj.description || '',
      url: proj.url || proj.githubUrl || '',
      technologies: proj.technologies || [],
      featured: index < 3, // Mark first 3 as featured
    }));

    // Extract all skills from CV
    const allSkills = [
      ...(parsed.skills?.technical || []),
      ...(parsed.skills?.tools || []),
    ];

    // Create rich portfolio from ALL CV data
    const portfolioData = {
      title: parsed.personalInfo.fullName || "My Portfolio",
      headline: generated.headline || parsed.personalInfo.title || "Professional Portfolio",
      bio: generated.bio || parsed.personalInfo.summary || '',
      email: parsed.personalInfo.email || '',
      phone: parsed.personalInfo.phone || '',
      location: parsed.personalInfo.location || '',
      linkedinUrl: parsed.personalInfo.linkedin || '',
      githubUrl: parsed.personalInfo.github || '',
      website: parsed.personalInfo.website || '',
      twitterUrl: '',
      instagramUrl: '',
      currentRole: parsed.experience?.[0]?.position || parsed.personalInfo.title || '',
      company: parsed.experience?.[0]?.company || '',
      yearsOfExperience: calculateTotalYears(parsed.experience),
      skills: allSkills,
      services: extractServices(parsed.experience),
      interests: parsed.skills?.soft || [],
      projects: mappedProjects,
      // Store full journey data for story-telling
      cvData: {
        experience: parsed.experience || [],
        education: parsed.education || [],
        certifications: parsed.certifications || [],
        awards: parsed.awards || [],
        languages: parsed.languages || [],
      },
    };

    setCurrentPortfolio(portfolioData);
    setShowCVUploader(false);
    showToast(
      "CV Parsed Successfully!", 
      `Extracted ${parsed.experience?.length || 0} jobs, ${parsed.education?.length || 0} degrees, ${mappedProjects.length} projects, and ${allSkills.length} skills!`,
      "success"
    );
  };

  const handleFormComplete = (formData: any) => {
    const portfolioData = {
      title: formData.fullName,
      headline: formData.headline,
      bio: formData.bio,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      websiteUrl: formData.website,
      linkedinUrl: formData.linkedin,
      githubUrl: formData.github,
      twitterUrl: formData.twitter,
      instagramUrl: formData.instagram,
      youtubeUrl: formData.youtube,
      facebookUrl: formData.facebook,
      theme: formData.theme,
      projects: [],
      skills: formData.skills,
      services: formData.services,
      interests: formData.interests,
      currentRole: formData.currentRole,
      company: formData.company,
      yearsOfExperience: formData.yearsOfExperience,
    };

    setCurrentPortfolio(portfolioData);
    setShowComprehensiveForm(false);
    showToast("Portfolio Created!", "Now you can add projects and customize further.", "success");
  };

  const addProject = () => {
    if (!currentPortfolio) return;

    const newProject = {
      id: `temp-${Date.now()}`,
      title: "New Project",
      description: "",
      technologies: [],
      imageUrl: null,
      url: null,
      featured: false,
    };

    setCurrentPortfolio({
      ...currentPortfolio,
      projects: [...(currentPortfolio.projects || []), newProject],
    });
  };

  const updateProject = (projectId: string | number, updates: any) => {
    if (!currentPortfolio) return;

    setCurrentPortfolio({
      ...currentPortfolio,
      projects: currentPortfolio.projects.map((p: any) =>
        p.id === projectId ? { ...p, ...updates } : p
      ),
    });
  };

  const deleteProject = async (projectId: string | number) => {
    if (!currentPortfolio) return;

    // If it's a temp ID, just remove from state
    if (String(projectId).startsWith("temp-")) {
      setCurrentPortfolio({
        ...currentPortfolio,
        projects: currentPortfolio.projects.filter((p: any) => p.id !== projectId),
      });
    } else {
      // Delete from API
      try {
        await apiDeleteProject(String(projectId));
        setCurrentPortfolio({
          ...currentPortfolio,
          projects: currentPortfolio.projects.filter((p: any) => p.id !== projectId),
        });
        showToast("Project Deleted", "The project has been removed from your portfolio.", "success");
      } catch (error) {
        console.error("Delete project error:", error);
        showToast("Delete Failed", "Couldn't delete project. Please try again.", "error");
      }
    }
  };

  const handlePublishToggle = async () => {
    if (!currentPortfolio?.id) return;

    try {
      const updated = await togglePublish(
        currentPortfolio.id,
        !currentPortfolio.isPublished
      );
      setCurrentPortfolio(updated);
      showToast(
        updated.isPublished ? "Portfolio Published!" : "Portfolio Unpublished",
        updated.isPublished ? "Your portfolio is now live and visible to everyone." : "Your portfolio is now private.",
        "success"
      );
    } catch (error) {
      console.error("Publish toggle error:", error);
      showToast("Update Failed", "Couldn't update publish status. Please try again.", "error");
    }
  };

  const openPreview = () => {
    if (currentPortfolio?.slug) {
      window.open(`/p/${currentPortfolio.slug}`, "_blank");
    }
  };

  if (portfolioLoading && !currentPortfolio) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!currentPortfolio) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl w-full"
        >
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-linear-to-br from-[#06B6D4] to-[#3B82F6] flex items-center justify-center shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-[#06B6D4] to-[#3B82F6] bg-clip-text text-transparent">
            Create Your Portfolio
          </h2>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto leading-relaxed">
            Build a stunning portfolio in minutes with our guided setup or AI-powered CV parser.
          </p>
          
          <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
            <Button
              onClick={() => setShowComprehensiveForm(true)}
              className="h-auto py-5 px-6 bg-linear-to-r from-[#06B6D4] to-[#3B82F6] shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Sparkles className="w-6 h-6 mr-3 shrink-0" />
              <div className="text-left flex-1">
                <div className="font-bold text-base mb-1">Start Guided Setup</div>
                <div className="text-sm opacity-90 font-normal">5-step wizard to create your portfolio</div>
              </div>
            </Button>
            
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-4 text-sm text-muted-foreground">or</span>
              </div>
            </div>
            
            <Button
              onClick={() => setShowCVUploader(true)}
              variant="outline"
              className="h-auto py-5 px-6 border-2 hover:border-primary hover:bg-primary/5 transition-all"
            >
              <Upload className="w-6 h-6 mr-3 shrink-0" />
              <div className="text-left flex-1">
                <div className="font-semibold text-base mb-1">Upload Your CV</div>
                <div className="text-sm text-muted-foreground font-normal">AI will extract and populate your info</div>
              </div>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#06B6D4] to-[#3B82F6] flex items-center justify-center">
              <Layout className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Portfolio Editor</h1>
              <p className="text-xs text-muted-foreground">
                {currentPortfolio.title || "Untitled Portfolio"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setShowCVUploader(true)}
            variant="ghost"
            size="sm"
            className="gap-2"
          >
            <Upload className="w-4 h-4" />
            Import CV
          </Button>
          
          <Button
            onClick={() => setPreviewMode(previewMode === "split" ? "full" : "split")}
            variant="ghost"
            size="sm"
            className="gap-2"
          >
            <Eye className="w-4 h-4" />
            {previewMode === "split" ? "Full Preview" : "Split View"}
          </Button>

          {currentPortfolio.id && currentPortfolio.isPublished && (
            <Button
              onClick={openPreview}
              variant="ghost"
              size="sm"
              className="gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              View Live
            </Button>
          )}

          <div className="w-px h-6 bg-border mx-2" />

          <Button
            onClick={handleSave}
            disabled={saving}
            size="sm"
            className="gap-2 bg-linear-to-r from-[#06B6D4] to-[#3B82F6]"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving
              </>
            ) : showSuccess ? (
              <>
                <Check className="w-4 h-4" />
                Saved
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-border">
        <div className="flex gap-1">
          {[
            { id: "info", label: "Information", icon: Edit3 },
            { id: "projects", label: "Projects", icon: Layout },
            { id: "design", label: "Design", icon: Palette },
            { id: "preview", label: "Preview", icon: ExternalLink },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
                activeTab === tab.id
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area - Split Screen */}
      <div className={`flex gap-6 ${previewMode === "split" ? "" : ""}`}>
        {/* Editor Panel */}
        <div className={`transition-all overflow-y-auto max-h-[calc(100vh-200px)] pr-2 ${previewMode === "split" ? "w-1/2" : "w-full"}`}>
          {/* Info Tab */}
          {activeTab === "info" && (
            <div className="space-y-6">
              {/* Basic Information Card */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Basic Information
                  </h2>
                  <Button
                    onClick={handleAIGenerateBio}
                    disabled={aiLoading}
                    variant="outline"
                    size="sm"
                  >
                    {aiLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    AI Generate
                  </Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Title *</label>
                    <input
                      type="text"
                      value={currentPortfolio.title || ""}
                      onChange={(e) =>
                        setCurrentPortfolio({ ...currentPortfolio, title: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g., Full Stack Developer"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Headline *</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={currentPortfolio.headline || ""}
                        onChange={(e) =>
                          setCurrentPortfolio({ ...currentPortfolio, headline: e.target.value })
                        }
                        maxLength={100}
                        className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your professional tagline"
                      />
                      <Button
                        onClick={handleAIGenerateHeadline}
                        disabled={aiLoading}
                        variant="outline"
                        size="sm"
                      >
                        <Zap className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {(currentPortfolio.headline || "").length}/100 characters
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Bio *</label>
                    <textarea
                      value={currentPortfolio.bio || ""}
                      onChange={(e) =>
                        setCurrentPortfolio({ ...currentPortfolio, bio: e.target.value })
                      }
                      maxLength={500}
                      rows={6}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Tell your professional story in a few sentences..."
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {(currentPortfolio.bio || "").length}/500 characters
                    </p>
                  </div>
                </div>
              </Card>

              {/* Contact & Social Card */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Contact & Social Links
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <input
                      type="email"
                      value={currentPortfolio.email || ""}
                      onChange={(e) =>
                        setCurrentPortfolio({ ...currentPortfolio, email: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Phone</label>
                    <input
                      type="tel"
                      value={currentPortfolio.phone || ""}
                      onChange={(e) =>
                        setCurrentPortfolio({ ...currentPortfolio, phone: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Location</label>
                    <input
                      type="text"
                      value={currentPortfolio.location || ""}
                      onChange={(e) =>
                        setCurrentPortfolio({ ...currentPortfolio, location: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="City, Country"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Website</label>
                    <input
                      type="url"
                      value={currentPortfolio.website || ""}
                      onChange={(e) =>
                        setCurrentPortfolio({ ...currentPortfolio, website: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">LinkedIn</label>
                    <input
                      type="url"
                      value={currentPortfolio.linkedinUrl || ""}
                      onChange={(e) =>
                        setCurrentPortfolio({ ...currentPortfolio, linkedinUrl: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">GitHub</label>
                    <input
                      type="url"
                      value={currentPortfolio.githubUrl || ""}
                      onChange={(e) =>
                        setCurrentPortfolio({ ...currentPortfolio, githubUrl: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="https://github.com/username"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Twitter</label>
                    <input
                      type="url"
                      value={currentPortfolio.twitterUrl || ""}
                      onChange={(e) =>
                        setCurrentPortfolio({ ...currentPortfolio, twitterUrl: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="https://twitter.com/username"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Instagram</label>
                    <input
                      type="url"
                      value={currentPortfolio.instagramUrl || ""}
                      onChange={(e) =>
                        setCurrentPortfolio({ ...currentPortfolio, instagramUrl: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="https://instagram.com/username"
                    />
                  </div>
                </div>
              </Card>

              {/* Skills & Interests Card */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Skills & Interests
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Skills</label>
                    <input
                      type="text"
                      value={(currentPortfolio.skills || []).join(", ")}
                      onChange={(e) =>
                        setCurrentPortfolio({ 
                          ...currentPortfolio, 
                          skills: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean)
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="JavaScript, React, Node.js, etc. (comma-separated)"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Separate skills with commas
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Services</label>
                    <input
                      type="text"
                      value={(currentPortfolio.services || []).join(", ")}
                      onChange={(e) =>
                        setCurrentPortfolio({ 
                          ...currentPortfolio, 
                          services: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean)
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Web Development, UI/UX Design, etc."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Interests</label>
                    <input
                      type="text"
                      value={(currentPortfolio.interests || []).join(", ")}
                      onChange={(e) =>
                        setCurrentPortfolio({ 
                          ...currentPortfolio, 
                          interests: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean)
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Open Source, AI, Design, etc."
                    />
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Layout className="w-5 h-5" />
                  Projects
                </h2>
                <button
                  onClick={addProject}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Add Project
                </button>
              </div>
              <div className="space-y-4">
                {(currentPortfolio.projects || []).map((project: any) => (
                  <Card key={project.id} className="p-4 border hover:border-primary/50 transition-all">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) =>
                            updateProject(project.id, { title: e.target.value })
                          }
                          className="flex-1 font-bold text-lg bg-transparent border-b border-border focus:border-primary focus:outline-none pb-1"
                          placeholder="Project Title"
                        />
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <textarea
                        value={project.description}
                        onChange={(e) =>
                          updateProject(project.id, { description: e.target.value })
                        }
                        rows={3}
                        className="w-full text-sm bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        placeholder="Describe your project..."
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={project.url || ""}
                          onChange={(e) =>
                            updateProject(project.id, { url: e.target.value })
                          }
                          className="flex-1 text-sm bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Live URL or GitHub"
                        />
                        <label className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                          <input
                            type="checkbox"
                            checked={project.featured}
                            onChange={(e) =>
                              updateProject(project.id, { featured: e.target.checked })
                            }
                            className="w-4 h-4"
                          />
                          <span className="text-sm">Featured</span>
                        </label>
                      </div>
                    </div>
                  </Card>
                ))}
                {(currentPortfolio.projects || []).length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Layout className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No projects yet. Click "Add Project" to get started!</p>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Design Tab */}
          {activeTab === "design" && (
            <div className="space-y-6">
              {/* Template Selection */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Layout className="w-5 h-5" />
                  Choose Template
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`p-4 rounded-lg border-2 transition-all text-left hover:scale-105 ${
                        selectedTemplate === template.id
                          ? "border-primary bg-primary/10 shadow-lg"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{template.icon}</span>
                        <div className="font-medium">{template.name}</div>
                      </div>
                      <div className="text-xs text-muted-foreground">{template.desc}</div>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Generation Style Options */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Generation Style
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { id: "professional", name: "Professional", desc: "Clean & business-ready" },
                    { id: "creative", name: "Creative", desc: "Bold & artistic" },
                    { id: "interactive", name: "Interactive", desc: "Engaging animations" },
                    { id: "minimalist", name: "Minimalist", desc: "Simple & focused" },
                    { id: "technical", name: "Technical", desc: "Developer-centric" },
                    { id: "showcase", name: "Showcase", desc: "Project-focused" },
                  ].map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setGenerationStyle(style.id)}
                      className={`p-3 rounded-lg border transition-all text-center ${
                        generationStyle === style.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="font-medium text-sm">{style.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{style.desc}</div>
                    </button>
                  ))}
                </div>
              </Card>

              {/* AI Generate Full Portfolio Card */}
              <Card className="p-6 bg-linear-to-br from-primary/10 via-primary/5 to-transparent border-primary/30">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">AI Portfolio Generator</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Generate a complete, beautiful, responsive portfolio website using AI. 
                      Using <strong>{selectedTemplate}</strong> template with <strong>{generationStyle}</strong> style.
                    </p>
                    <Button
                      onClick={handleGeneratePortfolioHTML}
                      disabled={generatingAI || !currentPortfolio.title}
                      className="bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    >
                      {generatingAI ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate Full Portfolio
                        </>
                      )}
                    </Button>
                    {!currentPortfolio.title && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Please add your basic information first
                      </p>
                    )}
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Colors & Customization
                </h2>
                <div className="space-y-6">

                  {/* Color Picker */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">Primary Color</label>
                    <div className="flex items-center gap-4">
                      <input
                        type="color"
                        value={currentPortfolio.primaryColor || "#3B82F6"}
                        onChange={(e) =>
                          setCurrentPortfolio({ ...currentPortfolio, primaryColor: e.target.value })
                        }
                        className="w-20 h-20 rounded-lg cursor-pointer"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">
                          Choose a color that represents your brand
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Current: {currentPortfolio.primaryColor || "#3B82F6"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Publish Status Card */}
              {currentPortfolio.id && (
                <Card className="p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Publish Settings
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">
                          Status: {currentPortfolio.isPublished ? "Published" : "Draft"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {currentPortfolio.isPublished
                            ? `Live at /p/${currentPortfolio.slug}`
                            : "Publish to make it public"}
                        </p>
                      </div>
                      <Button
                        onClick={handlePublishToggle}
                        variant={currentPortfolio.isPublished ? "outline" : "default"}
                      >
                        {currentPortfolio.isPublished ? "Unpublish" : "Publish Now"}
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* Preview Tab */}
          {activeTab === "preview" && (
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ExternalLink className="w-5 h-5" />
                Live Preview
              </h2>
              <div className="text-center py-8 text-muted-foreground">
                <Code className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="mb-4">Preview feature coming soon!</p>
                <p className="text-sm">View your live portfolio at:</p>
                <a
                  href={`/p/${currentPortfolio.slug}`}
                  target="_blank"
                  className="text-primary hover:underline mt-2 inline-block"
                >
                  /p/{currentPortfolio.slug}
                </a>
              </div>
            </Card>
          )}
        </div>

        {/* Live Preview Panel - Split Screen */}
        {previewMode === "split" && (
          <div className="w-1/2 border-l border-border pl-6 overflow-y-auto max-h-[calc(100vh-200px)]">
            <div className="sticky top-0">
              <Card className="p-6 bg-muted/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Live Preview
                  </h3>
                  <Button
                    onClick={() => {
                      // Refresh preview
                      showToast(
                        "Preview Refreshed",
                        "Showing latest changes",
                        "info"
                      );
                    }}
                    variant="ghost"
                    size="sm"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
                <div className="bg-background border border-border rounded-lg p-8 min-h-[500px]">
                  {/* Preview Content */}
                  <div className="space-y-6">
                    <div className="text-center">
                      <h1 className="text-3xl font-bold mb-2">{currentPortfolio.title || "Your Name"}</h1>
                      <p className="text-lg text-muted-foreground mb-4">
                        {currentPortfolio.headline || "Your Professional Headline"}
                      </p>
                      <p className="text-sm">{currentPortfolio.bio || "Your bio will appear here..."}</p>
                    </div>

                    {currentPortfolio.projects && currentPortfolio.projects.length > 0 && (
                      <div>
                        <h2 className="text-xl font-bold mb-4">Projects</h2>
                        <div className="grid gap-4">
                          {currentPortfolio.projects.slice(0, 3).map((project: any) => (
                            <div key={project.id} className="border border-border rounded-lg p-4">
                              <h3 className="font-bold">{project.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="text-center pt-6 border-t border-border">
                      <p className="text-xs text-muted-foreground">
                        This is a simplified preview. View full portfolio at /p/{currentPortfolio.slug}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* CV Uploader Modal */}
      <AnimatePresence>
        {showCVUploader && (
          <CVUploader
            onParsed={handleCVParsed}
            onClose={() => setShowCVUploader(false)}
          />
        )}
      </AnimatePresence>

      {/* Comprehensive Form */}
      {showComprehensiveForm && (
        <div className="fixed inset-0 bg-background z-50 overflow-auto">
          <ComprehensivePortfolioForm
            onComplete={handleFormComplete}
            onCancel={() => setShowComprehensiveForm(false)}
          />
        </div>
      )}

      {/* Toast Notifications */}
      <ToastContainer>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            title={toast.title}
            description={toast.description}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </ToastContainer>
    </div>
  );
}

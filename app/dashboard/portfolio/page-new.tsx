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
  Globe,
  Upload,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  User,
  Mail,
  Phone,
  MapPin,
  Link as LinkIcon,
  Star,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePortfolio } from "@/hooks/use-portfolio";
import { useAI } from "@/hooks/use-ai";
import CVUploader from "@/components/portfolio/CVUploader";

type Section = "personal" | "experience" | "education" | "skills" | "projects" | "certifications" | "testimonials";

export default function ComprehensivePortfolioEditor() {
  const router = useRouter();
  const {
    portfolios,
    loading: portfolioLoading,
    fetchPortfolios,
    createPortfolio,
    updatePortfolio,
    togglePublish,
  } = usePortfolio();

  const { loading: aiLoading, generateBio, generateHeadline } = useAI();

  const [currentPortfolio, setCurrentPortfolio] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCVUploader, setShowCVUploader] = useState(false);
  const [expandedSection, setExpandedSection] = useState<Section | null>("personal");

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

  const handleCVParsed = (data: any) => {
    const { parsed, generated } = data;
    
    // Create or update portfolio with parsed data
    const portfolioData = {
      title: parsed.personalInfo.fullName || "My Portfolio",
      headline: generated.headline,
      bio: generated.bio,
      email: parsed.personalInfo.email,
      phone: parsed.personalInfo.phone,
      location: parsed.personalInfo.location,
      linkedinUrl: parsed.personalInfo.linkedin,
      githubUrl: parsed.personalInfo.github,
      websiteUrl: parsed.personalInfo.website,
      experience: parsed.experience,
      education: parsed.education,
      skills: [
        ...parsed.skills.technical.map((s: string) => ({ name: s, category: "technical" })),
        ...parsed.skills.soft.map((s: string) => ({ name: s, category: "soft" })),
        ...parsed.skills.languages.map((s: string) => ({ name: s, category: "language" })),
        ...parsed.skills.tools.map((s: string) => ({ name: s, category: "tool" })),
      ],
      projects: generated.enhancedProjects,
      certifications: parsed.certifications,
    };

    setCurrentPortfolio({ ...currentPortfolio, ...portfolioData });
    setShowCVUploader(false);
    setExpandedSection("personal");
  };

  const handleSave = async () => {
    if (!currentPortfolio) return;
    
    if (!currentPortfolio.title || currentPortfolio.title.trim() === "") {
      alert("Please enter a portfolio title");
      return;
    }

    setSaving(true);
    try {
      if (currentPortfolio.id) {
        await updatePortfolio(currentPortfolio.id, currentPortfolio);
      } else {
        const baseSlug = currentPortfolio.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
        const slug = `${baseSlug}-${Date.now().toString().slice(-6)}`;
        
        const newPortfolio = await createPortfolio({
          ...currentPortfolio,
          slug,
        });
        setCurrentPortfolio(newPortfolio);
      }
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      await fetchPortfolios();
    } catch (error: any) {
      console.error("Save error:", error);
      alert(error?.message || "Failed to save portfolio");
    } finally {
      setSaving(false);
    }
  };

  const toggleSection = (section: Section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const addItem = (section: string) => {
    const newItem: any = { id: `temp-${Date.now()}` };
    
    switch (section) {
      case "experience":
        newItem.company = "";
        newItem.position = "";
        newItem.startDate = "";
        newItem.current = false;
        newItem.description = "";
        newItem.achievements = [];
        break;
      case "education":
        newItem.institution = "";
        newItem.degree = "";
        newItem.field = "";
        newItem.startDate = "";
        break;
      case "skills":
        newItem.name = "";
        newItem.category = "technical";
        break;
      case "projects":
        newItem.title = "";
        newItem.description = "";
        newItem.technologies = [];
        newItem.highlights = [];
        break;
      case "certifications":
        newItem.name = "";
        newItem.issuer = "";
        newItem.date = "";
        break;
      case "testimonials":
        newItem.name = "";
        newItem.role = "";
        newItem.content = "";
        newItem.rating = 5;
        break;
    }
    
    setCurrentPortfolio({
      ...currentPortfolio,
      [section]: [...(currentPortfolio[section] || []), newItem],
    });
  };

  const removeItem = (section: string, id: string) => {
    setCurrentPortfolio({
      ...currentPortfolio,
      [section]: currentPortfolio[section].filter((item: any) => item.id !== id),
    });
  };

  const updateItem = (section: string, id: string, updates: any) => {
    setCurrentPortfolio({
      ...currentPortfolio,
      [section]: currentPortfolio[section].map((item: any) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    });
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
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Create Your Professional Portfolio</h2>
          <p className="text-muted-foreground mb-8">
            Upload your CV and let AI generate a stunning portfolio, or start from scratch
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={() => setShowCVUploader(true)}
              className="gap-2 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6]"
              size="lg"
            >
              <Upload className="w-5 h-5" />
              Upload CV (AI Powered)
            </Button>
            <Button
              onClick={() =>
                setCurrentPortfolio({
                  title: "",
                  bio: "",
                  headline: "",
                  experience: [],
                  education: [],
                  skills: [],
                  projects: [],
                  certifications: [],
                  testimonials: [],
                })
              }
              variant="outline"
              size="lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Start From Scratch
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-lg z-10 pb-4 border-b">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] bg-clip-text text-transparent">
              Portfolio Editor
            </h1>
            <p className="text-muted-foreground mt-1">
              Create your professional portfolio
            </p>
          </div>
          <div className="flex items-center gap-3">
            {!currentPortfolio.id && (
              <Button
                onClick={() => setShowCVUploader(true)}
                variant="outline"
                className="gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload CV
              </Button>
            )}
            {currentPortfolio.id && (
              <Button
                variant="outline"
                onClick={() => window.open(`/p/${currentPortfolio.slug}`, "_blank")}
                className="gap-2"
              >
                <Eye className="w-4 h-4" />
                Preview
              </Button>
            )}
            <Button
              onClick={handleSave}
              disabled={saving}
              className="gap-2 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6]"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : showSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  Saved!
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

        {/* Publish Status */}
        {currentPortfolio.id && (
          <Card className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">
                  Status: {currentPortfolio.isPublished ? "Published" : "Draft"}
                </p>
                {currentPortfolio.isPublished && (
                  <p className="text-sm text-muted-foreground">
                    Live at /p/{currentPortfolio.slug}
                  </p>
                )}
              </div>
            </div>
            <Button
              onClick={async () => {
                const updated = await togglePublish(
                  currentPortfolio.id,
                  !currentPortfolio.isPublished
                );
                setCurrentPortfolio(updated);
              }}
              variant={currentPortfolio.isPublished ? "outline" : "default"}
            >
              {currentPortfolio.isPublished ? "Unpublish" : "Publish"}
            </Button>
          </Card>
        )}

        {/* Editor Sections */}
        <div className="space-y-4">
          {/* Personal Info Section - Always render full content when expanded */}
          <SectionCard
            title="Personal Information"
            icon={User}
            expanded={expandedSection === "personal"}
            onToggle={() => toggleSection("personal")}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name *"
                value={currentPortfolio.title || ""}
                onChange={(e) => setCurrentPortfolio({ ...currentPortfolio, title: e.target.value })}
                placeholder="John Doe"
              />
              <Input
                label="Professional Title"
                value={currentPortfolio.headline || ""}
                onChange={(e) => setCurrentPortfolio({ ...currentPortfolio, headline: e.target.value })}
                placeholder="Senior Software Engineer"
                rightElement={
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={async () => {
                      const headline = await generateHeadline({
                        title: currentPortfolio.title,
                        skills: currentPortfolio.skills?.map((s: any) => s.name).slice(0, 5),
                      });
                      setCurrentPortfolio({ ...currentPortfolio, headline });
                    }}
                    disabled={aiLoading}
                  >
                    <Sparkles className="w-4 h-4" />
                  </Button>
                }
              />
              <Input
                label="Email"
                type="email"
                value={currentPortfolio.email || ""}
                onChange={(e) => setCurrentPortfolio({ ...currentPortfolio, email: e.target.value })}
                placeholder="john@example.com"
                icon={<Mail className="w-4 h-4" />}
              />
              <Input
                label="Phone"
                value={currentPortfolio.phone || ""}
                onChange={(e) => setCurrentPortfolio({ ...currentPortfolio, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                icon={<Phone className="w-4 h-4" />}
              />
              <Input
                label="Location"
                value={currentPortfolio.location || ""}
                onChange={(e) => setCurrentPortfolio({ ...currentPortfolio, location: e.target.value })}
                placeholder="San Francisco, CA"
                icon={<MapPin className="w-4 h-4" />}
              />
              <Input
                label="LinkedIn URL"
                value={currentPortfolio.linkedinUrl || ""}
                onChange={(e) => setCurrentPortfolio({ ...currentPortfolio, linkedinUrl: e.target.value })}
                placeholder="https://linkedin.com/in/..."
                icon={<LinkIcon className="w-4 h-4" />}
              />
              <Input
                label="GitHub URL"
                value={currentPortfolio.githubUrl || ""}
                onChange={(e) => setCurrentPortfolio({ ...currentPortfolio, githubUrl: e.target.value })}
                placeholder="https://github.com/..."
                icon={<LinkIcon className="w-4 h-4" />}
              />
              <Input
                label="Website URL"
                value={currentPortfolio.websiteUrl || ""}
                onChange={(e) => setCurrentPortfolio({ ...currentPortfolio, websiteUrl: e.target.value })}
                placeholder="https://..."
                icon={<LinkIcon className="w-4 h-4" />}
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Professional Bio</label>
              <div className="relative">
                <textarea
                  value={currentPortfolio.bio || ""}
                  onChange={(e) => setCurrentPortfolio({ ...currentPortfolio, bio: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Tell your professional story..."
                />
                <Button
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={async () => {
                    const bio = await generateBio({
                      name: currentPortfolio.title,
                      title: currentPortfolio.headline,
                      skills: currentPortfolio.skills?.map((s: any) => s.name).slice(0, 5),
                      experience: "5+ years",
                    });
                    setCurrentPortfolio({ ...currentPortfolio, bio });
                  }}
                  disabled={aiLoading}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Generate
                </Button>
              </div>
            </div>
          </SectionCard>

          {/* Experience Section - Similar pattern */}
          <SectionCard
            title="Work Experience"
            icon={Briefcase}
            expanded={expandedSection === "experience"}
            onToggle={() => toggleSection("experience")}
            onAdd={() => addItem("experience")}
            count={currentPortfolio.experience?.length || 0}
          >
            {currentPortfolio.experience?.map((exp: any, index: number) => (
              <ExperienceItem
                key={exp.id}
                data={exp}
                onChange={(updates) => updateItem("experience", exp.id, updates)}
                onRemove={() => removeItem("experience", exp.id)}
              />
            ))}
          </SectionCard>

          {/* Continue with other sections... */}
        </div>
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
    </>
  );
}

// Helper Components
function SectionCard({
  title,
  icon: Icon,
  expanded,
  onToggle,
  onAdd,
  count,
  children,
}: any) {
  return (
    <Card className="overflow-hidden">
      <div
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">{title}</h3>
            {count !== undefined && (
              <p className="text-sm text-muted-foreground">{count} items</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {onAdd && expanded && (
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onAdd();
              }}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          )}
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t"
          >
            <div className="p-6 space-y-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

function Input({ label, value, onChange, placeholder, type = "text", icon, rightElement }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-2 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary ${
            icon ? "pl-10" : ""
          } ${rightElement ? "pr-12" : ""}`}
        />
        {rightElement && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}

function ExperienceItem({ data, onChange, onRemove }: any) {
  return (
    <Card className="p-4 border hover:border-primary/50 transition-all">
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold">Experience Entry</h4>
        <Button size="sm" variant="ghost" onClick={onRemove} className="text-red-500">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input
          label="Company"
          value={data.company}
          onChange={(e: any) => onChange({ company: e.target.value })}
          placeholder="Google"
        />
        <Input
          label="Position"
          value={data.position}
          onChange={(e: any) => onChange({ position: e.target.value })}
          placeholder="Software Engineer"
        />
        <Input
          label="Start Date"
          value={data.startDate}
          onChange={(e: any) => onChange({ startDate: e.target.value })}
          placeholder="Jan 2020"
        />
        <Input
          label="End Date"
          value={data.endDate || ""}
          onChange={(e: any) => onChange({ endDate: e.target.value })}
          placeholder="Present"
        />
      </div>
      <div className="mt-3">
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
          rows={3}
          className="w-full px-4 py-2 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          placeholder="Describe your role and responsibilities..."
        />
      </div>
    </Card>
  );
}

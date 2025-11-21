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
  GripVertical,
  Loader2,
  Check,
  X,
  Globe,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePortfolio } from "@/hooks/use-portfolio";
import { useAI } from "@/hooks/use-ai";

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

  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [saving, setSaving] = useState(false);
  const [currentPortfolio, setCurrentPortfolio] = useState<any>(null);
  const [showSuccess, setShowSuccess] = useState(false);

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

    setSaving(true);
    try {
      if (currentPortfolio.id) {
        // Update existing
        await updatePortfolio(currentPortfolio.id, {
          title: currentPortfolio.title,
          bio: currentPortfolio.bio,
          headline: currentPortfolio.headline,
          theme: currentPortfolio.theme,
        });
      } else {
        // Create new
        const newPortfolio = await createPortfolio({
          title: currentPortfolio.title,
          bio: currentPortfolio.bio,
          headline: currentPortfolio.headline,
          slug: currentPortfolio.slug || `portfolio-${Date.now()}`,
          theme: currentPortfolio.theme,
        });
        setCurrentPortfolio(newPortfolio);
      }
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save portfolio");
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
    } catch (error) {
      console.error("AI generate bio error:", error);
      alert("Failed to generate bio");
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
    } catch (error) {
      console.error("AI generate headline error:", error);
      alert("Failed to generate headline");
    }
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
      } catch (error) {
        console.error("Delete project error:", error);
        alert("Failed to delete project");
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
    } catch (error) {
      console.error("Publish toggle error:", error);
      alert("Failed to update publish status");
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
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <p className="text-muted-foreground mb-4">No portfolio found. Create one to get started.</p>
        <Button
          onClick={() =>
            setCurrentPortfolio({
              title: "My Portfolio",
              bio: "",
              headline: "",
              theme: { id: "modern" },
              skills: [],
              projects: [],
              slug: `portfolio-${Date.now()}`,
            })
          }
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Portfolio
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] bg-clip-text text-transparent">
            Portfolio Editor ✨
          </h1>
          <p className="text-muted-foreground mt-2">
            Craft your perfect professional story
          </p>
        </div>
        <div className="flex items-center gap-3">
          {currentPortfolio.id && (
            <Button
              variant="outline"
              onClick={openPreview}
              className="gap-2"
            >
              <Eye className="w-4 h-4" />
              Preview Live
            </Button>
          )}
          <Button
            onClick={handleSave}
            disabled={saving}
            className="gap-2 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] hover:opacity-90"
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
                Save Changes
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
                Portfolio Status: {currentPortfolio.isPublished ? "Published" : "Draft"}
              </p>
              <p className="text-sm text-muted-foreground">
                {currentPortfolio.isPublished
                  ? `Live at /p/${currentPortfolio.slug}`
                  : "Save and publish to make it public"}
              </p>
            </div>
          </div>
          <Button
            onClick={handlePublishToggle}
            variant={currentPortfolio.isPublished ? "outline" : "default"}
          >
            {currentPortfolio.isPublished ? "Unpublish" : "Publish"}
          </Button>
        </Card>
      )}

      {/* Main Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Basic Information</h2>
              <button
                onClick={handleAIGenerateBio}
                disabled={aiLoading}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#F59E0B] to-[#06B6D4] text-white rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
              >
                {aiLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                AI Generate
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Title</label>
                <input
                  type="text"
                  value={currentPortfolio.title || ""}
                  onChange={(e) =>
                    setCurrentPortfolio({ ...currentPortfolio, title: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your professional title"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Headline</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentPortfolio.headline || ""}
                    onChange={(e) =>
                      setCurrentPortfolio({ ...currentPortfolio, headline: e.target.value })
                    }
                    className="flex-1 px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your catchy professional tagline"
                  />
                  <Button
                    onClick={handleAIGenerateHeadline}
                    disabled={aiLoading}
                    variant="outline"
                  >
                    <Sparkles className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Bio</label>
                <textarea
                  value={currentPortfolio.bio || ""}
                  onChange={(e) =>
                    setCurrentPortfolio({ ...currentPortfolio, bio: e.target.value })
                  }
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Tell your professional story..."
                />
              </div>
            </div>
          </Card>

          {/* Projects */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Projects</h2>
              <button
                onClick={addProject}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] text-white rounded-lg hover:opacity-90"
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
                        className="flex-1 font-bold text-lg bg-transparent border-none focus:outline-none"
                        placeholder="Project Title"
                      />
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <textarea
                      value={project.description}
                      onChange={(e) =>
                        updateProject(project.id, { description: e.target.value })
                      }
                      rows={2}
                      className="w-full text-sm bg-transparent border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Project description..."
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={project.url || ""}
                        onChange={(e) =>
                          updateProject(project.id, { url: e.target.value })
                        }
                        className="flex-1 text-sm bg-transparent border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Live URL"
                      />
                      <label className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
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
            </div>
          </Card>
        </div>

        {/* Right Column - Settings */}
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-[#F59E0B]/10 to-[#06B6D4]/10 border-[#F59E0B]/30">
            <h3 className="text-xl font-bold mb-3">💡 Pro Tips</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Use AI to generate professional copy</li>
              <li>• Add 3-5 best projects for impact</li>
              <li>• Keep bio under 3 sentences</li>
              <li>• Add live demo links when possible</li>
              <li>• Click Save to persist changes</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

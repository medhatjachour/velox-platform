"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save,
  Eye,
  Sparkles,
  Plus,
  Trash2,
  GripVertical,
  Image as ImageIcon,
  Link as LinkIcon,
  Code,
  Palette,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PortfolioEditorPage() {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [saving, setSaving] = useState(false);
  
  const [portfolio, setPortfolio] = useState({
    name: "John Doe",
    title: "Full Stack Developer",
    bio: "Passionate about creating beautiful user experiences with modern web technologies. 5+ years of experience building scalable applications.",
    headline: "Building the Future, One Line of Code at a Time",
    theme: "modern",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
    projects: [
      {
        id: 1,
        title: "E-commerce Platform",
        description: "Built a scalable e-commerce platform with Next.js, Stripe, and Prisma. Handles 10k+ daily transactions.",
        technologies: ["Next.js", "Stripe", "Prisma"],
        imageUrl: "",
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/example",
        featured: true,
      },
    ],
  });

  const user = {
    name: "John Doe",
    email: "john@example.com",
    role: "USER",
  };

  const themes = [
    { id: "modern", name: "Modern", gradient: "from-[#06B6D4] to-[#3B82F6]" },
    { id: "vibrant", name: "Vibrant", gradient: "from-[#F59E0B] to-[#EF4444]" },
    { id: "elegant", name: "Elegant", gradient: "from-[#8B5CF6] to-[#3B82F6]" },
    { id: "minimal", name: "Minimal", gradient: "from-[#6B7280] to-[#1F2937]" },
  ];

  const handleSave = async () => {
    setSaving(true);
    // TODO: API call to save portfolio
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSaving(false);
  };

  const handleAIGenerate = async (field: string) => {
    // TODO: Call AI generation API
    console.log("Generating AI content for:", field);
  };

  const addProject = () => {
    setPortfolio({
      ...portfolio,
      projects: [
        ...portfolio.projects,
        {
          id: Date.now(),
          title: "New Project",
          description: "",
          technologies: [],
          imageUrl: "",
          liveUrl: "",
          githubUrl: "",
          featured: false,
        },
      ],
    });
  };

  const deleteProject = (id: number) => {
    setPortfolio({
      ...portfolio,
      projects: portfolio.projects.filter((p) => p.id !== id),
    });
  };

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
            <Button
              variant="outline"
              onClick={() => window.open(`/p/${user.email.split("@")[0]}`, "_blank")}
              className="gap-2"
            >
              <Eye className="w-4 h-4" />
              Preview Live
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="gap-2 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] hover:opacity-90"
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 p-1 bg-card/50 rounded-xl border border-border w-fit">
          <button
            onClick={() => setActiveTab("edit")}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === "edit"
                ? "bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] text-white shadow-lg"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === "preview"
                ? "bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] text-white shadow-lg"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Preview
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "edit" ? (
            <motion.div
              key="edit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Main Editor */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Info */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-foreground">Basic Information</h2>
                    <button
                      onClick={() => handleAIGenerate("bio")}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#F59E0B] to-[#06B6D4] text-white rounded-lg hover:opacity-90 transition-all"
                    >
                      <Sparkles className="w-4 h-4" />
                      AI Generate
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={portfolio.name}
                        onChange={(e) => setPortfolio({ ...portfolio, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-[#06B6D4] transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Professional Title
                      </label>
                      <input
                        type="text"
                        value={portfolio.title}
                        onChange={(e) => setPortfolio({ ...portfolio, title: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-[#06B6D4] transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Headline
                      </label>
                      <input
                        type="text"
                        value={portfolio.headline}
                        onChange={(e) => setPortfolio({ ...portfolio, headline: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-[#06B6D4] transition-all"
                        placeholder="Your catchy professional tagline"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Bio
                      </label>
                      <textarea
                        value={portfolio.bio}
                        onChange={(e) => setPortfolio({ ...portfolio, bio: e.target.value })}
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-[#06B6D4] transition-all resize-none"
                        placeholder="Tell your professional story..."
                      />
                    </div>
                  </div>
                </Card>

                {/* Skills */}
                <Card className="p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Skills & Technologies</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {portfolio.skills.map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="px-4 py-2 bg-gradient-to-r from-[#06B6D4]/10 to-[#3B82F6]/10 border border-[#06B6D4]/30 rounded-full text-sm font-medium text-foreground flex items-center gap-2 group"
                      >
                        {skill}
                        <button
                          onClick={() => {
                            setPortfolio({
                              ...portfolio,
                              skills: portfolio.skills.filter((_, i) => i !== index),
                            });
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3 text-red-500" />
                        </button>
                      </motion.div>
                    ))}
                    <button
                      onClick={() => {
                        const skill = prompt("Enter skill name:");
                        if (skill) {
                          setPortfolio({ ...portfolio, skills: [...portfolio.skills, skill] });
                        }
                      }}
                      className="px-4 py-2 border-2 border-dashed border-border rounded-full text-sm font-medium text-muted-foreground hover:border-[#06B6D4] hover:text-[#06B6D4] transition-all"
                    >
                      <Plus className="w-4 h-4 inline mr-1" />
                      Add Skill
                    </button>
                  </div>
                </Card>

                {/* Projects */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-foreground">Projects</h2>
                    <button
                      onClick={addProject}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] text-white rounded-lg hover:opacity-90 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      Add Project
                    </button>
                  </div>
                  <div className="space-y-4">
                    {portfolio.projects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 border border-border rounded-xl hover:border-[#06B6D4]/50 transition-all group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-gradient-to-br from-[#06B6D4]/20 to-[#3B82F6]/20 rounded-lg cursor-move">
                            <GripVertical className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1 space-y-3">
                            <input
                              type="text"
                              value={project.title}
                              onChange={(e) => {
                                const newProjects = [...portfolio.projects];
                                newProjects[index].title = e.target.value;
                                setPortfolio({ ...portfolio, projects: newProjects });
                              }}
                              className="w-full font-bold text-lg bg-transparent border-none focus:outline-none focus:ring-0"
                              placeholder="Project Title"
                            />
                            <textarea
                              value={project.description}
                              onChange={(e) => {
                                const newProjects = [...portfolio.projects];
                                newProjects[index].description = e.target.value;
                                setPortfolio({ ...portfolio, projects: newProjects });
                              }}
                              rows={2}
                              className="w-full text-sm text-muted-foreground bg-transparent border-none focus:outline-none focus:ring-0 resize-none"
                              placeholder="Project description..."
                            />
                            <div className="flex items-center gap-2 flex-wrap">
                              {project.technologies.map((tech, techIndex) => (
                                <span
                                  key={techIndex}
                                  className="px-2 py-1 text-xs bg-[#06B6D4]/10 text-[#06B6D4] rounded"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                          <button
                            onClick={() => deleteProject(project.id)}
                            className="p-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/10 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Theme Selector */}
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Portfolio Theme
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {themes.map((theme) => (
                      <motion.button
                        key={theme.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPortfolio({ ...portfolio, theme: theme.id })}
                        className={`p-4 rounded-xl transition-all ${
                          portfolio.theme === theme.id
                            ? "ring-2 ring-[#06B6D4] shadow-lg"
                            : "hover:shadow-md"
                        }`}
                      >
                        <div className={`h-16 rounded-lg bg-gradient-to-br ${theme.gradient} mb-2`} />
                        <p className="text-sm font-medium text-foreground">{theme.name}</p>
                      </motion.button>
                    ))}
                  </div>
                </Card>

                {/* Quick Tips */}
                <Card className="p-6 bg-gradient-to-br from-[#F59E0B]/10 to-[#06B6D4]/10 border-[#F59E0B]/30">
                  <h3 className="text-xl font-bold text-foreground mb-3">💡 Pro Tips</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Use AI to generate professional copy</li>
                    <li>• Add 3-5 best projects for impact</li>
                    <li>• Keep bio under 3 sentences</li>
                    <li>• Use high-quality project images</li>
                    <li>• Add live demo links when possible</li>
                  </ul>
                </Card>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">Live Preview</h3>
                  <p className="text-muted-foreground mb-6">
                    Click "Preview Live" to see your portfolio in a new tab
                  </p>
                  <Button
                    onClick={() => window.open(`/p/${user.email.split("@")[0]}`, "_blank")}
                    className="gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Open Preview
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
}

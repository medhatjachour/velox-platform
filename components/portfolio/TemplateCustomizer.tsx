"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Palette, 
  Type, 
  Briefcase,
  FolderKanban,
  Sparkles,
  Save,
  Plus,
  Trash2,
  GripVertical,
  Mail,
  Phone,
  MapPin,
  Link as LinkIcon,
  Wand2,
  Eye,
  Download,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SimpleDefault from "./templates/SimpleDefault";
import ModernMinimal from "./templates/ModernMinimal";
import CreativeBold from "./templates/CreativeBold";
import DeveloperPro from "./templates/DeveloperPro";
import CorporateElite from "./templates/CorporateElite";
import DesignerShowcase from "./templates/DesignerShowcase";
import FreelancerHub from "./templates/FreelancerHub";
import StartupFounder from "./templates/StartupFounder";
import AIAssistant from "./AIAssistant";

interface Template {
  id: string;
  name: string;
  colors: string[];
}

interface TemplateCustomizerProps {
  template: Template;
}

export default function TemplateCustomizer({ template }: TemplateCustomizerProps) {
  const [activeTab, setActiveTab] = useState<"basics" | "colors" | "projects" | "experience">("basics");
  const [showPreview, setShowPreview] = useState(true);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  
  const [portfolioData, setPortfolioData] = useState({
    title: "John Doe",
    headline: "Full-Stack Developer & UI/UX Designer",
    bio: "I craft beautiful, functional digital experiences. With 5+ years of expertise in modern web technologies, I help businesses bring their ideas to life through clean code and intuitive design.",
    email: "hello@johndoe.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedinUrl: "https://linkedin.com",
    githubUrl: "https://github.com",
    twitterUrl: "https://twitter.com",
    currentRole: "Senior Developer",
    company: "Tech Corp",
    skills: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "Node.js" },
      { name: "Python" },
      { name: "UI/UX Design" },
      { name: "Figma" },
      { name: "PostgreSQL" },
      { name: "AWS" },
    ],
    projects: [
      {
        title: "E-Commerce Platform",
        description: "A modern e-commerce solution with real-time inventory management, secure payments, and beautiful UI.",
        technologies: ["React", "Node.js", "Stripe"],
        url: "https://example.com",
      },
      {
        title: "Task Management App",
        description: "Collaborative task management tool with real-time updates, team collaboration, and smart notifications.",
        technologies: ["Next.js", "Firebase", "Tailwind"],
        url: "https://example.com",
      },
      {
        title: "Analytics Dashboard",
        description: "Data visualization dashboard with interactive charts, real-time metrics, and export functionality.",
        technologies: ["Vue.js", "D3.js", "Python"],
        url: "https://example.com",
      },
      {
        title: "Mobile App",
        description: "Cross-platform mobile application with offline support, push notifications, and seamless sync.",
        technologies: ["React Native", "GraphQL", "MongoDB"],
        url: "https://example.com",
      },
    ],
    experience: [
      {
        company: "Tech Corp",
        position: "Senior Full-Stack Developer",
        startDate: "2021",
        endDate: "Present",
        current: true,
        description: "Leading development of enterprise web applications. Architected scalable microservices, mentored junior developers, and improved system performance by 40%.",
      },
      {
        company: "Startup Inc",
        position: "Full-Stack Developer",
        startDate: "2019",
        endDate: "2021",
        current: false,
        description: "Built and launched multiple SaaS products. Collaborated with designers and product managers to deliver user-centric solutions.",
      },
    ],
  });

  const [primaryColor, setPrimaryColor] = useState(template.colors[0]);
  const [secondaryColor, setSecondaryColor] = useState(template.colors[1]);
  const [accentColor, setAccentColor] = useState(template.colors[2]);

  const updateData = (field: string, value: any) => {
    setPortfolioData({ ...portfolioData, [field]: value });
  };

  const addProject = () => {
    setPortfolioData({
      ...portfolioData,
      projects: [
        ...(portfolioData.projects || []),
        {
          title: "New Project",
          description: "Description of your project",
          technologies: ["Technology"],
          url: "",
        },
      ],
    });
  };

  const updateProject = (index: number, field: string, value: any) => {
    const updated = [...(portfolioData.projects || [])];
    updated[index] = { ...updated[index], [field]: value };
    setPortfolioData({ ...portfolioData, projects: updated });
  };

  const deleteProject = (index: number) => {
    const updated = portfolioData.projects?.filter((_, i) => i !== index);
    setPortfolioData({ ...portfolioData, projects: updated });
  };

  const addExperience = () => {
    setPortfolioData({
      ...portfolioData,
      experience: [
        ...(portfolioData.experience || []),
        {
          company: "Company Name",
          position: "Job Title",
          startDate: "2024",
          endDate: "Present",
          current: true,
          description: "Description of your role and achievements",
        },
      ],
    });
  };

  const updateExperience = (index: number, field: string, value: any) => {
    const updated = [...(portfolioData.experience || [])];
    updated[index] = { ...updated[index], [field]: value };
    setPortfolioData({ ...portfolioData, experience: updated });
  };

  const deleteExperience = (index: number) => {
    const updated = portfolioData.experience?.filter((_, i) => i !== index);
    setPortfolioData({ ...portfolioData, experience: updated });
  };

  const handleAIDataGenerated = (data: any) => {
    setPortfolioData({
      ...portfolioData,
      ...data,
    });
    setShowAIAssistant(false);
  };

  const handleEnhanceHeadline = async () => {
    if (!portfolioData.title) return;
    
    setAiLoading(true);
    try {
      const response = await fetch("/api/ai/generate-headline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: portfolioData.title,
          currentRole: portfolioData.currentRole,
          skills: portfolioData.skills?.map(s => s.name).join(", "),
        }),
      });

      const result = await response.json();
      if (result.success && result.headline) {
        updateData("headline", result.headline);
      }
    } catch (error) {
      console.error("Failed to enhance headline:", error);
    } finally {
      setAiLoading(false);
    }
  };

  const handleEnhanceBio = async () => {
    if (!portfolioData.title) return;
    
    setAiLoading(true);
    try {
      const response = await fetch("/api/ai/generate-bio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: portfolioData.title,
          title: portfolioData.headline || portfolioData.currentRole,
          skills: portfolioData.skills?.map(s => s.name) || [],
          experience: portfolioData.experience?.length || 0,
        }),
      });

      const result = await response.json();
      if (result.success && result.bio) {
        updateData("bio", result.bio);
      }
    } catch (error) {
      console.error("Failed to enhance bio:", error);
    } finally {
      setAiLoading(false);
    }
  };

  const renderTemplate = () => {
    const props = {
      data: portfolioData,
      primaryColor,
      secondaryColor,
      accentColor,
    };

    switch (template.id) {
      case "simple-default":
        return <SimpleDefault {...props} />;
      case "modern-minimal":
        return <ModernMinimal {...props} />;
      case "creative-bold":
        return <CreativeBold {...props} />;
      case "developer-pro":
        return <DeveloperPro {...props} />;
      case "corporate-elite":
        return <CorporateElite {...props} />;
      case "designer-showcase":
        return <DesignerShowcase {...props} />;
      case "freelancer-hub":
        return <FreelancerHub {...props} />;
      case "startup-founder":
        return <StartupFounder {...props} />;
      default:
        return <SimpleDefault {...props} />;
    }
  };

  const tabs = [
    { id: "basics", label: "Basics", icon: Type },
    { id: "colors", label: "Colors", icon: Palette },
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "experience", label: "Experience", icon: Briefcase },
  ];

  return (
    <div className="flex h-[calc(100vh-200px)] gap-4">
      {/* Editor Panel */}
      <motion.div
        className="w-full lg:w-[400px] flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden"
        layout
        animate={{ width: showPreview ? 400 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-all relative ${
                  activeTab === tab.id
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {/* Basics Tab */}
            {activeTab === "basics" && (
              <motion.div
                key="basics"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={portfolioData.title}
                    onChange={(e) => updateData("title", e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Headline
                  </label>
                  <input
                    type="text"
                    value={portfolioData.headline}
                    onChange={(e) => updateData("headline", e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Full-Stack Developer"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-blue-600 hover:text-blue-700"
                    onClick={handleEnhanceHeadline}
                    disabled={aiLoading || !portfolioData.title}
                  >
                    {aiLoading ? (
                      <>
                        <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-3 h-3 mr-2" />
                        Improve with AI
                      </>
                    )}
                  </Button>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={portfolioData.bio}
                    onChange={(e) => updateData("bio", e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    rows={5}
                    placeholder="Tell your story..."
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-blue-600 hover:text-blue-700"
                    onClick={handleEnhanceBio}
                    disabled={aiLoading || !portfolioData.title}
                  >
                    {aiLoading ? (
                      <>
                        <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3 mr-2" />
                        Enhance with AI
                      </>
                    )}
                  </Button>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
                    Contact Information
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        value={portfolioData.email}
                        onChange={(e) => updateData("email", e.target.value)}
                        className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="Email"
                      />
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        value={portfolioData.phone}
                        onChange={(e) => updateData("phone", e.target.value)}
                        className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="Phone"
                      />
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={portfolioData.location}
                        onChange={(e) => updateData("location", e.target.value)}
                        className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="Location"
                      />
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <LinkIcon className="w-4 h-4 text-slate-400" />
                      <input
                        type="url"
                        value={portfolioData.githubUrl}
                        onChange={(e) => updateData("githubUrl", e.target.value)}
                        className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="GitHub URL"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Colors Tab */}
            {activeTab === "colors" && (
              <motion.div
                key="colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                    Primary Color
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-20 h-20 rounded-xl cursor-pointer border-4 border-white dark:border-slate-800 shadow-lg"
                    />
                    <div className="flex-1">
                      <input
                        type="text"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                      />
                      <p className="text-xs text-slate-500 mt-2">Main brand color for buttons and accents</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                    Secondary Color
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-20 h-20 rounded-xl cursor-pointer border-4 border-white dark:border-slate-800 shadow-lg"
                    />
                    <div className="flex-1">
                      <input
                        type="text"
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                      />
                      <p className="text-xs text-slate-500 mt-2">Supporting color for gradients and highlights</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                    Accent Color
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-20 h-20 rounded-xl cursor-pointer border-4 border-white dark:border-slate-800 shadow-lg"
                    />
                    <div className="flex-1">
                      <input
                        type="text"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                      />
                      <p className="text-xs text-slate-500 mt-2">Additional color for variety and emphasis</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Color Suggestions
                </Button>
              </motion.div>
            )}

            {/* Projects Tab */}
            {activeTab === "projects" && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {portfolioData.projects?.map((project, index) => (
                  <Card key={index} className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-start gap-3 mb-3">
                      <GripVertical className="w-5 h-5 text-slate-400 cursor-move mt-1" />
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => updateProject(index, "title", e.target.value)}
                        className="flex-1 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg font-semibold"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteProject(index)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <textarea
                      value={project.description}
                      onChange={(e) => updateProject(index, "description", e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm resize-none"
                      rows={3}
                      placeholder="Project description"
                    />
                  </Card>
                ))}
                <Button onClick={addProject} variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </motion.div>
            )}

            {/* Experience Tab */}
            {activeTab === "experience" && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {portfolioData.experience?.map((exp, index) => (
                  <Card key={index} className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-start gap-3 mb-3">
                      <GripVertical className="w-5 h-5 text-slate-400 cursor-move mt-1" />
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          value={exp.position}
                          onChange={(e) => updateExperience(index, "position", e.target.value)}
                          className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg font-semibold"
                          placeholder="Position"
                        />
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(index, "company", e.target.value)}
                          className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg"
                          placeholder="Company"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteExperience(index)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
                <Button onClick={addExperience} variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Experience
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="border-t border-slate-200 dark:border-slate-800 p-4 space-y-2 bg-slate-50 dark:bg-slate-900/50">
          <Button 
            onClick={() => setShowAIAssistant(true)}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            AI Generate Content
          </Button>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
            <Save className="w-4 h-4 mr-2" />
            Save Portfolio
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setShowPreview(!showPreview)}>
              <Eye className="w-4 h-4 mr-2" />
              {showPreview ? "Hide" : "Show"} Preview
            </Button>
            <Button variant="outline" className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </motion.div>

      {/* AI Assistant Modal */}
      {showAIAssistant && (
        <AIAssistant
          onDataGenerated={handleAIDataGenerated}
          onClose={() => setShowAIAssistant(false)}
        />
      )}

      {/* Preview Panel */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex-1 border rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-2xl"
          >
            <div className="h-full overflow-y-auto">
              {renderTemplate()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

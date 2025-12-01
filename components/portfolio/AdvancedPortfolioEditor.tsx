"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion, AnimatePresence } from "framer-motion";
import {
  GripVertical,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Settings,
  Save,
  Download,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  PortfolioSection, 
  PortfolioConfig,
  SectionType,
  DesignPreferences 
} from "@/types/portfolio-editor.types";

interface AdvancedPortfolioEditorProps {
  initialConfig?: Partial<PortfolioConfig>;
  onSave?: (config: PortfolioConfig) => void;
}

export default function AdvancedPortfolioEditor({
  initialConfig,
  onSave,
}: AdvancedPortfolioEditorProps) {
  const [config, setConfig] = useState<PortfolioConfig>({
    title: initialConfig?.title || "My Portfolio",
    slug: initialConfig?.slug || "my-portfolio",
    published: initialConfig?.published || false,
    sections: initialConfig?.sections || createDefaultSections(),
    design: initialConfig?.design || createDefaultDesign(),
    seo: initialConfig?.seo || {},
    analytics: initialConfig?.analytics || {},
  });

  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [showPreview, setShowPreview] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setConfig((prevConfig) => {
        const oldIndex = prevConfig.sections.findIndex((s) => s.id === active.id);
        const newIndex = prevConfig.sections.findIndex((s) => s.id === over.id);

        return {
          ...prevConfig,
          sections: arrayMove(prevConfig.sections, oldIndex, newIndex).map((s, i) => ({
            ...s,
            order: i,
          })),
        };
      });
    }
  };

  const toggleSection = (sectionId: string) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      sections: prevConfig.sections.map((s) =>
        s.id === sectionId ? { ...s, visible: !s.visible } : s
      ),
    }));
  };

  const deleteSection = (sectionId: string) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      sections: prevConfig.sections.filter((s) => s.id !== sectionId),
    }));
  };

  const addSection = (type: SectionType) => {
    const newSection = createNewSection(type, config.sections.length);
    setConfig((prevConfig) => ({
      ...prevConfig,
      sections: [...prevConfig.sections, newSection],
    }));
  };

  const updateSection = (sectionId: string, updates: Partial<PortfolioSection>) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      sections: prevConfig.sections.map((s) =>
        s.id === sectionId ? { ...s, ...updates } : s
      ),
    }));
  };

  const toggleExpanded = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  const handleSave = () => {
    if (onSave) {
      onSave(config);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Portfolio Editor
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Drag sections to reorder • Click to edit • Everything is customizable
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                {showPreview ? "Hide" : "Show"} Preview
              </Button>
              <Button
                variant="outline"
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </Button>
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-2"
              >
                <Save className="w-4 h-4" />
                Save Portfolio
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-4">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Add Sections</h2>
              <div className="grid grid-cols-2 gap-2">
                {AVAILABLE_SECTIONS.map((section) => (
                  <Button
                    key={section.type}
                    variant="outline"
                    size="sm"
                    onClick={() => addSection(section.type)}
                    className="justify-start"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {section.label}
                  </Button>
                ))}
              </div>
            </Card>

            {/* Sections List with Drag and Drop */}
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={config.sections.map((s) => s.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3">
                  {config.sections.map((section) => (
                    <SortableSection
                      key={section.id}
                      section={section}
                      isExpanded={expandedSections.has(section.id)}
                      onToggleExpanded={() => toggleExpanded(section.id)}
                      onToggleVisible={() => toggleSection(section.id)}
                      onDelete={() => deleteSection(section.id)}
                      onUpdate={(updates) => updateSection(section.id, updates)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>

          {/* Preview Panel */}
          {showPreview && (
            <div className="lg:sticky lg:top-32 h-fit">
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Preview</h2>
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                  <div className="bg-white dark:bg-slate-900 p-8 min-h-[600px]">
                    <PortfolioPreview config={config} />
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Sortable Section Component
function SortableSection({
  section,
  isExpanded,
  onToggleExpanded,
  onToggleVisible,
  onDelete,
  onUpdate,
}: {
  section: PortfolioSection;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onToggleVisible: () => void;
  onDelete: () => void;
  onUpdate: (updates: Partial<PortfolioSection>) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`${section.visible ? "" : "opacity-50"}`}
    >
      <div className="p-4">
        <div className="flex items-center gap-3">
          <button
            className="cursor-grab active:cursor-grabbing touch-none"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="w-5 h-5 text-slate-400" />
          </button>

          <div className="flex-1">
            <h3 className="font-medium capitalize">{section.type} Section</h3>
            <p className="text-sm text-slate-500">
              {section.visible ? "Visible" : "Hidden"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleVisible}
            >
              {section.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleExpanded}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700"
            >
              <SectionEditor section={section} onUpdate={onUpdate} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}

// Section-specific editor
function SectionEditor({
  section,
  onUpdate,
}: {
  section: PortfolioSection;
  onUpdate: (updates: Partial<PortfolioSection>) => void;
}) {
  // Render different editor based on section type
  switch (section.type) {
    case "hero":
      return <HeroSectionEditor section={section as any} onUpdate={onUpdate} />;
    case "about":
      return <AboutSectionEditor section={section as any} onUpdate={onUpdate} />;
    case "projects":
      return <ProjectsSectionEditor section={section as any} onUpdate={onUpdate} />;
    case "experience":
      return <ExperienceSectionEditor section={section as any} onUpdate={onUpdate} />;
    case "skills":
      return <SkillsSectionEditor section={section as any} onUpdate={onUpdate} />;
    case "contact":
      return <ContactSectionEditor section={section as any} onUpdate={onUpdate} />;
    default:
      return <div>Editor for {section.type} section</div>;
  }
}

// Hero Section Editor
function HeroSectionEditor({ section, onUpdate }: any) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Name</label>
        <input
          type="text"
          value={section.data.name}
          onChange={(e) => onUpdate({ data: { ...section.data, name: e.target.value } })}
          className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Tagline</label>
        <input
          type="text"
          value={section.data.tagline}
          onChange={(e) => onUpdate({ data: { ...section.data, tagline: e.target.value } })}
          className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Description</label>
        <textarea
          value={section.data.description}
          onChange={(e) => onUpdate({ data: { ...section.data, description: e.target.value } })}
          rows={3}
          className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg"
        />
      </div>
    </div>
  );
}

// About Section Editor
function AboutSectionEditor({ section, onUpdate }: any) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Title</label>
        <input
          type="text"
          value={section.data.title}
          onChange={(e) => onUpdate({ data: { ...section.data, title: e.target.value } })}
          className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Bio</label>
        <textarea
          value={section.data.bio}
          onChange={(e) => onUpdate({ data: { ...section.data, bio: e.target.value } })}
          rows={4}
          className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg"
        />
      </div>
    </div>
  );
}

// Projects Section Editor
function ProjectsSectionEditor({ section, onUpdate }: any) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Section Title</label>
        <input
          type="text"
          value={section.data.title}
          onChange={(e) => onUpdate({ data: { ...section.data, title: e.target.value } })}
          className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg"
        />
      </div>
      <div>
        <p className="text-sm text-slate-600">
          Projects: {section.data.items?.length || 0} items
        </p>
        <Button variant="outline" size="sm" className="mt-2">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>
    </div>
  );
}

// Experience Section Editor
function ExperienceSectionEditor({ section, onUpdate }: any) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Section Title</label>
        <input
          type="text"
          value={section.data.title}
          onChange={(e) => onUpdate({ data: { ...section.data, title: e.target.value } })}
          className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg"
        />
      </div>
      <div>
        <p className="text-sm text-slate-600">
          Experience: {section.data.items?.length || 0} items
        </p>
        <Button variant="outline" size="sm" className="mt-2">
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>
    </div>
  );
}

// Skills Section Editor
function SkillsSectionEditor({ section, onUpdate }: any) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Section Title</label>
        <input
          type="text"
          value={section.data.title}
          onChange={(e) => onUpdate({ data: { ...section.data, title: e.target.value } })}
          className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg"
        />
      </div>
      <div>
        <p className="text-sm text-slate-600">
          Skills: {section.data.categories?.length || 0} categories
        </p>
        <Button variant="outline" size="sm" className="mt-2">
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>
    </div>
  );
}

// Contact Section Editor
function ContactSectionEditor({ section, onUpdate }: any) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Title</label>
        <input
          type="text"
          value={section.data.title}
          onChange={(e) => onUpdate({ data: { ...section.data, title: e.target.value } })}
          className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Email</label>
        <input
          type="email"
          value={section.data.email}
          onChange={(e) => onUpdate({ data: { ...section.data, email: e.target.value } })}
          className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg"
        />
      </div>
    </div>
  );
}

// Preview Component
function PortfolioPreview({ config }: { config: PortfolioConfig }) {
  return (
    <div className="space-y-8">
      {config.sections
        .filter((s) => s.visible)
        .map((section) => (
          <div key={section.id} className="animate-fade-in">
            <SectionPreview section={section} />
          </div>
        ))}
    </div>
  );
}

function SectionPreview({ section }: { section: PortfolioSection }) {
  switch (section.type) {
    case "hero":
      return (
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold mb-4">{(section as any).data.name}</h1>
          <p className="text-xl text-slate-600 mb-2">{(section as any).data.tagline}</p>
          <p className="text-slate-500">{(section as any).data.description}</p>
        </div>
      );
    case "about":
      return (
        <div>
          <h2 className="text-2xl font-bold mb-4">{(section as any).data.title}</h2>
          <p className="text-slate-600">{(section as any).data.bio}</p>
        </div>
      );
    case "projects":
      return (
        <div>
          <h2 className="text-2xl font-bold mb-4">{(section as any).data.title}</h2>
          <div className="grid grid-cols-2 gap-4">
            {((section as any).data.items || []).map((project: any, i: number) => (
              <div key={i} className="border border-slate-200 rounded-lg p-4">
                <h3 className="font-semibold">{project.title}</h3>
                <p className="text-sm text-slate-500">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return <div className="text-slate-400">Preview for {section.type}</div>;
  }
}

// Helper functions
function createDefaultSections(): PortfolioSection[] {
  return [
    {
      id: "hero-1",
      type: "hero",
      visible: true,
      order: 0,
      settings: {},
      data: {
        name: "Your Name",
        tagline: "Your Professional Title",
        description: "A brief introduction about yourself",
        showSocialLinks: true,
        socialLinks: {},
      },
    } as any,
    {
      id: "about-1",
      type: "about",
      visible: true,
      order: 1,
      settings: {},
      data: {
        title: "About Me",
        bio: "Tell your story here...",
        highlights: [],
      },
    } as any,
  ];
}

function createDefaultDesign(): DesignPreferences {
  return {
    template: "modern",
    colors: {
      primary: "#2563eb",
      secondary: "#8b5cf6",
      accent: "#ec4899",
      background: "#ffffff",
      text: "#0f172a",
    },
    typography: {
      headingFont: "Inter",
      bodyFont: "Inter",
      fontSize: "medium",
    },
    layout: {
      maxWidth: 1280,
      spacing: "normal",
      borderRadius: 8,
    },
    animations: {
      enabled: true,
      speed: "normal",
      style: "smooth",
    },
  };
}

function createNewSection(type: SectionType, order: number): PortfolioSection {
  const base = {
    id: `${type}-${Date.now()}`,
    type,
    visible: true,
    order,
    settings: {},
  };

  switch (type) {
    case "hero":
      return {
        ...base,
        data: {
          name: "Your Name",
          tagline: "Your Title",
          description: "Description",
          showSocialLinks: true,
          socialLinks: {},
        },
      } as any;
    case "about":
      return {
        ...base,
        data: {
          title: "About",
          bio: "Your bio",
          highlights: [],
        },
      } as any;
    case "projects":
      return {
        ...base,
        data: {
          title: "Projects",
          items: [],
        },
      } as any;
    case "experience":
      return {
        ...base,
        data: {
          title: "Experience",
          items: [],
        },
      } as any;
    case "skills":
      return {
        ...base,
        data: {
          title: "Skills",
          categories: [],
        },
      } as any;
    case "contact":
      return {
        ...base,
        data: {
          title: "Get in Touch",
          description: "Let's work together",
          email: "",
          showForm: true,
          socialLinks: {},
        },
      } as any;
    default:
      return base as any;
  }
}

const AVAILABLE_SECTIONS = [
  { type: "hero" as SectionType, label: "Hero" },
  { type: "about" as SectionType, label: "About" },
  { type: "experience" as SectionType, label: "Experience" },
  { type: "projects" as SectionType, label: "Projects" },
  { type: "skills" as SectionType, label: "Skills" },
  { type: "education" as SectionType, label: "Education" },
  { type: "testimonials" as SectionType, label: "Testimonials" },
  { type: "contact" as SectionType, label: "Contact" },
];

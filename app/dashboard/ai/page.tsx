"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import {
  Sparkles,
  Wand2,
  FileText,
  Lightbulb,
  Zap,
  Copy,
  Check,
  RefreshCw,
  Download,
  MessageSquare,
} from "lucide-react"

type AITool =
  | "bio"
  | "headline"
  | "project"
  | "skills"
  | "social"
  | "email"

export default function AIStudioPage() {
  const [activeTool, setActiveTool] = useState<AITool>("bio")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [generatedContent, setGeneratedContent] = useState("")

  const tools = [
    {
      id: "bio",
      name: "Bio Generator",
      description: "Create compelling professional bios",
      icon: FileText,
      gradient: "from-[#06B6D4] to-[#3B82F6]",
      placeholder:
        "Describe yourself: your role, experience, passions, and what makes you unique...",
    },
    {
      id: "headline",
      name: "Headline Creator",
      description: "Craft attention-grabbing headlines",
      icon: Lightbulb,
      gradient: "from-[#F59E0B] to-[#06B6D4]",
      placeholder:
        "What's your profession and what value do you provide? e.g., 'Digital Marketer helping brands grow'",
    },
    {
      id: "project",
      name: "Project Description",
      description: "Write engaging project descriptions",
      icon: Wand2,
      gradient: "from-[#3B82F6] to-[#8B5CF6]",
      placeholder:
        "Describe your project: what it does, technologies used, challenges solved...",
    },
    {
      id: "skills",
      name: "Skills Formatter",
      description: "Organize and present your skills",
      icon: Zap,
      gradient: "from-[#10B981] to-[#06B6D4]",
      placeholder:
        "List your skills: programming languages, tools, frameworks, soft skills...",
    },
    {
      id: "social",
      name: "Social Media Post",
      description: "Generate engaging social posts",
      icon: MessageSquare,
      gradient: "from-[#F59E0B] to-[#EF4444]",
      placeholder:
        "What do you want to share? Achievements, insights, updates...",
    },
    {
      id: "email",
      name: "Email Template",
      description: "Create professional email templates",
      icon: Mail,
      gradient: "from-[#8B5CF6] to-[#06B6D4]",
      placeholder:
        "What's the purpose of the email? Follow-up, introduction, networking...",
    },
  ]

  const activToolData = tools.find((t) => t.id === activeTool)!

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setLoading(true)
    setGeneratedContent("")

    // Simulate API call
    setTimeout(() => {
      const mockResponses = {
        bio: `Passionate ${prompt.split(" ")[0] || "professional"} with 5+ years of experience in creating innovative solutions. Skilled in bridging the gap between technology and user needs, I specialize in building products that make a real impact. When I'm not coding, you'll find me exploring new technologies or sharing knowledge with the community.`,
        headline: `${prompt} | Transforming Ideas into Reality`,
        project: `This project revolutionizes the way users interact with ${prompt}. Built with cutting-edge technologies, it addresses key challenges in the industry while maintaining exceptional performance and user experience. The solution has been adopted by leading companies and continues to evolve based on user feedback.`,
        skills: `Core Skills:\n• ${prompt}\n• Problem Solving & Critical Thinking\n• Team Collaboration\n• Continuous Learning\n\nThese skills enable me to deliver high-quality solutions and adapt to evolving challenges.`,
        social: `Excited to share that ${prompt}! 🚀\n\nThis journey has been incredible, and I'm grateful for all the support. Here's to new challenges and opportunities ahead!\n\n#Growth #Innovation #Success`,
        email: `Subject: ${prompt}\n\nHi [Name],\n\nI hope this email finds you well. I wanted to reach out regarding ${prompt}.\n\n[Your personalized content here]\n\nLooking forward to connecting!\n\nBest regards,\n[Your Name]`,
      }

      setGeneratedContent(mockResponses[activeTool] || "Generated content here...")
      setLoading(false)
    }, 2000)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          AI{" "}
          <span className="bg-gradient-to-r from-[#F59E0B] via-[#06B6D4] to-[#3B82F6] bg-clip-text text-transparent">
            Studio
          </span>
        </h1>
        <p className="text-muted-foreground">
          Generate professional content with AI-powered tools
        </p>
      </div>

      {/* Usage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6"
        >
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-[#F59E0B] to-[#06B6D4]" />
          <div className="relative z-10">
            <div className="p-3 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#06B6D4] shadow-lg w-fit mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">
              AI Generations This Month
            </p>
            <p className="text-3xl font-bold">24 / 100</p>
            <div className="w-full h-2 bg-background/50 rounded-full mt-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "24%" }}
                className="h-full bg-gradient-to-r from-[#F59E0B] to-[#06B6D4]"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6"
        >
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-[#06B6D4] to-[#3B82F6]" />
          <div className="relative z-10">
            <div className="p-3 rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] shadow-lg w-fit mb-4">
              <Wand2 className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">
              Most Used Tool
            </p>
            <p className="text-2xl font-bold">Bio Generator</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6"
        >
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-[#10B981] to-[#06B6D4]" />
          <div className="relative z-10">
            <div className="p-3 rounded-xl bg-gradient-to-br from-[#10B981] to-[#06B6D4] shadow-lg w-fit mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">
              Upgrade for Unlimited
            </p>
            <button className="mt-2 text-sm font-medium text-[#06B6D4] hover:text-[#3B82F6] transition-colors">
              View Plans →
            </button>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tools Sidebar */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-4 sticky top-8"
          >
            <h3 className="text-lg font-semibold mb-4 px-2">AI Tools</h3>
            <div className="space-y-2">
              {tools.map((tool, index) => {
                const Icon = tool.icon
                return (
                  <button
                    key={tool.id}
                    onClick={() => {
                      setActiveTool(tool.id as AITool)
                      setGeneratedContent("")
                      setPrompt("")
                    }}
                    className={`w-full flex items-start gap-3 p-3 rounded-xl transition-all ${
                      activeTool === tool.id
                        ? `bg-gradient-to-r ${tool.gradient} text-white shadow-lg`
                        : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        activeTool === tool.id
                          ? "bg-white/20"
                          : "bg-gradient-to-br " + tool.gradient
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 ${
                          activeTool === tool.id ? "text-white" : "text-white"
                        }`}
                      />
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-medium text-sm">{tool.name}</p>
                      <p
                        className={`text-xs mt-0.5 ${
                          activeTool === tool.id
                            ? "text-white/80"
                            : "text-muted-foreground"
                        }`}
                      >
                        {tool.description}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Generator */}
        <div className="lg:col-span-2">
          <motion.div
            key={activeTool}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-8"
          >
            {/* Tool Header */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className={`p-4 rounded-2xl bg-gradient-to-br ${activToolData.gradient} shadow-lg`}
              >
                <activToolData.icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{activToolData.name}</h2>
                <p className="text-muted-foreground">
                  {activToolData.description}
                </p>
              </div>
            </div>

            {/* Input */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">
                Describe what you need
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={activToolData.placeholder}
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20 outline-none transition-all resize-none"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className={`w-full px-6 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mb-6 ${
                loading || !prompt.trim()
                  ? "bg-gray-600 cursor-not-allowed"
                  : `bg-gradient-to-r ${activToolData.gradient} text-white`
              }`}
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate with AI
                </>
              )}
            </button>

            {/* Output */}
            {generatedContent && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl bg-background border border-border/50 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Generated Content</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      className="p-2 rounded-lg hover:bg-card transition-all"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <button className="p-2 rounded-lg hover:bg-card transition-all">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {generatedContent}
                </div>
              </motion.div>
            )}

            {/* Tips */}
            {!generatedContent && (
              <div className="rounded-xl bg-gradient-to-r from-[#06B6D4]/10 to-[#3B82F6]/10 border border-[#06B6D4]/20 p-6">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-[#F59E0B] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Pro Tips</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Be specific about your goals and target audience</li>
                      <li>• Include relevant keywords for better results</li>
                      <li>• You can regenerate content multiple times</li>
                      <li>• Edit the output to match your personal style</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

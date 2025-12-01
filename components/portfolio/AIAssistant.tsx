"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Sparkles, 
  Upload, 
  Github, 
  Linkedin, 
  FileText,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Wand2,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface AIAssistantProps {
  onDataGenerated: (data: any) => void
  onClose?: () => void
}

export default function AIAssistant({ onDataGenerated, onClose }: AIAssistantProps) {
  const [step, setStep] = useState<"select" | "input" | "processing" | "success">("select")
  const [method, setMethod] = useState<"cv" | "github" | "manual" | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [cvText, setCvText] = useState("")
  const [githubUsername, setGithubUsername] = useState("")

  const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    setError("")

    try {
      // Read file as text
      const text = await file.text()
      setCvText(text)
      setStep("input")
    } catch (err) {
      setError("Failed to read CV file. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateFromCV = async () => {
    if (!cvText) {
      setError("Please provide CV text")
      return
    }

    setLoading(true)
    setError("")
    setStep("processing")

    try {
      const response = await fetch("/api/ai/generate-from-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvText })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to generate portfolio")
      }

      setStep("success")
      onDataGenerated(result.data)

      // Auto-close after success
      setTimeout(() => {
        onClose?.()
      }, 2000)

    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate portfolio")
      setStep("input")
    } finally {
      setLoading(false)
    }
  }

  const handleFetchFromGitHub = async () => {
    if (!githubUsername) {
      setError("Please provide GitHub username")
      return
    }

    setLoading(true)
    setError("")
    setStep("processing")

    try {
      const response = await fetch("/api/ai/fetch-social-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform: "github", username: githubUsername })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch GitHub data")
      }

      setStep("success")
      onDataGenerated({
        title: result.data.name || githubUsername,
        bio: result.data.bio || "",
        location: result.data.location || "",
        email: result.data.email || "",
        githubUrl: result.data.githubUrl || "",
        websiteUrl: result.data.websiteUrl || "",
        twitterUrl: result.data.twitterUrl || "",
        company: result.data.company || "",
      })

      setTimeout(() => {
        onClose?.()
      }, 2000)

    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch GitHub data")
      setStep("input")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl"
      >
        <Card className="p-6 relative">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <AnimatePresence mode="wait">
            {/* Step 1: Select Method */}
            {step === "select" && (
              <motion.div
                key="select"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">AI Portfolio Generator</h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    Choose how you'd like to generate your portfolio content
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => {
                      setMethod("cv")
                      setStep("input")
                    }}
                    className="p-6 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all text-center group"
                  >
                    <FileText className="w-10 h-10 mx-auto mb-3 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    <h3 className="font-semibold mb-1">Upload CV</h3>
                    <p className="text-xs text-slate-500">Parse your resume/CV</p>
                  </button>

                  <button
                    onClick={() => {
                      setMethod("github")
                      setStep("input")
                    }}
                    className="p-6 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all text-center group"
                  >
                    <Github className="w-10 h-10 mx-auto mb-3 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    <h3 className="font-semibold mb-1">From GitHub</h3>
                    <p className="text-xs text-slate-500">Import GitHub profile</p>
                  </button>

                  <button
                    onClick={() => {
                      setMethod("manual")
                      onClose?.()
                    }}
                    className="p-6 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all text-center group"
                  >
                    <Wand2 className="w-10 h-10 mx-auto mb-3 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    <h3 className="font-semibold mb-1">Manual Entry</h3>
                    <p className="text-xs text-slate-500">Fill in manually with AI help</p>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Input */}
            {step === "input" && method === "cv" && (
              <motion.div
                key="cv-input"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-2xl font-bold mb-6">Upload Your CV</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Upload CV File</label>
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 text-center hover:border-blue-500 transition-colors">
                      <input
                        type="file"
                        accept=".txt,.pdf,.doc,.docx"
                        onChange={handleCVUpload}
                        className="hidden"
                        id="cv-upload"
                      />
                      <label htmlFor="cv-upload" className="cursor-pointer">
                        <Upload className="w-12 h-12 mx-auto mb-3 text-slate-400" />
                        <p className="text-sm font-medium mb-1">Click to upload CV</p>
                        <p className="text-xs text-slate-500">TXT, PDF, DOC up to 10MB</p>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Or Paste CV Text</label>
                    <textarea
                      value={cvText}
                      onChange={(e) => setCvText(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg resize-none"
                      rows={10}
                      placeholder="Paste your CV content here..."
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setStep("select")}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleGenerateFromCV}
                      disabled={!cvText || loading}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate Portfolio
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === "input" && method === "github" && (
              <motion.div
                key="github-input"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-2xl font-bold mb-6">Import from GitHub</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">GitHub Username</label>
                    <div className="flex items-center gap-2">
                      <Github className="w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        value={githubUsername}
                        onChange={(e) => setGithubUsername(e.target.value)}
                        className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                        placeholder="username"
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      We'll import your name, bio, location, and links from your GitHub profile
                    </p>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setStep("select")}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleFetchFromGitHub}
                      disabled={!githubUsername || loading}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Fetching...
                        </>
                      ) : (
                        <>
                          <Github className="w-4 h-4 mr-2" />
                          Import Profile
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Processing */}
            {step === "processing" && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-12"
              >
                <Loader2 className="w-16 h-16 mx-auto mb-4 text-blue-600 animate-spin" />
                <h3 className="text-xl font-bold mb-2">Generating Your Portfolio</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  AI is analyzing your content and creating a beautiful portfolio...
                </p>
              </motion.div>
            )}

            {/* Step 4: Success */}
            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-12"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Portfolio Generated!</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Your portfolio content has been imported successfully
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </div>
  )
}

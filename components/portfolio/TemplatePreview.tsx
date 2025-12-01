"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  User, 
  Briefcase, 
  Code, 
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Github,
  Star,
  TrendingUp,
  Rocket
} from "lucide-react"

interface TemplatePreviewProps {
  templateId: string
  colors: string[]
}

/**
 * Generates a miniature preview of each template for the selection cards
 * Shows a scaled-down version with the template's key visual elements
 */
export function TemplatePreview({ templateId, colors }: TemplatePreviewProps) {
  const [primary, secondary, accent] = colors

  // Simple Default Preview
  if (templateId === "simple-default") {
    return (
      <div className="w-full h-full bg-white dark:bg-slate-950 overflow-hidden flex items-center justify-center p-4">
        <div className="w-full max-w-[200px] space-y-2">
          {/* Avatar */}
          <div 
            className="w-16 h-16 rounded-full mx-auto mb-3"
            style={{ background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)` }}
          />
          {/* Name */}
          <div className="h-2 w-20 bg-slate-300 dark:bg-slate-700 rounded mx-auto mb-2"></div>
          {/* Headline */}
          <div className="h-1 w-16 bg-slate-200 dark:bg-slate-800 rounded mx-auto mb-3"></div>
          {/* Social Links */}
          <div className="space-y-1.5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-6 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center gap-2 px-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: primary }} />
                <div className="flex-1 h-1 bg-slate-200 dark:bg-slate-800 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Modern Minimal Preview
  if (templateId === "modern-minimal") {
    return (
      <div className="w-full h-full bg-white dark:bg-slate-900 overflow-hidden">
        {/* Hero Section Preview */}
        <div className="h-24 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 p-3 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-1"></div>
            <div className="h-2 w-16 bg-slate-300 rounded mb-1 mx-auto"></div>
            <div className="h-1 w-12 bg-slate-200 rounded mx-auto"></div>
          </div>
        </div>
        {/* Projects Grid Preview */}
        <div className="p-2 space-y-1">
          <div className="grid grid-cols-2 gap-1">
            <div className="h-8 bg-slate-100 dark:bg-slate-800 rounded"></div>
            <div className="h-8 bg-slate-100 dark:bg-slate-800 rounded"></div>
          </div>
          <div className="h-6 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded"></div>
        </div>
      </div>
    )
  }

  // Creative Bold Preview
  if (templateId === "creative-bold") {
    return (
      <div className="w-full h-full bg-slate-950 overflow-hidden relative">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-50"
            style={{ background: `radial-gradient(circle, ${accent}, transparent)` }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-20 h-20 rounded-full blur-3xl opacity-50"
            style={{ background: `radial-gradient(circle, ${secondary}, transparent)` }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.6, 0.5],
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />
        </div>
        {/* Content */}
        <div className="relative z-10 p-3 h-full flex flex-col justify-between">
          <div>
            <div className="h-3 w-20 bg-gradient-to-r from-orange-500 to-pink-500 rounded mb-1"></div>
            <div className="h-1 w-16 bg-white/50 rounded"></div>
          </div>
          <div className="space-y-1">
            <div className="h-8 bg-white/10 backdrop-blur-sm rounded border border-white/20"></div>
            <div className="h-8 bg-white/10 backdrop-blur-sm rounded border border-white/20"></div>
          </div>
        </div>
      </div>
    )
  }

  // Developer Pro Preview
  if (templateId === "developer-pro") {
    return (
      <div className="w-full h-full bg-slate-950 overflow-hidden font-mono text-[6px]">
        {/* Terminal Header */}
        <div className="h-4 bg-slate-900 border-b border-slate-800 flex items-center px-2 gap-1">
          <div className="flex gap-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 text-center text-[5px] text-slate-500">~/.portfolio</div>
        </div>
        {/* Terminal Content */}
        <div className="p-2 space-y-1">
          <div className="flex items-center gap-1">
            <span className="text-green-400">$</span>
            <span className="text-blue-400">whoami</span>
          </div>
          <div className="h-6 bg-slate-900 rounded p-1 border border-slate-800">
            <div className="h-1 w-full bg-slate-700 rounded mb-0.5"></div>
            <div className="h-1 w-3/4 bg-slate-700 rounded"></div>
          </div>
          <div className="grid grid-cols-3 gap-0.5">
            <div className="h-4 bg-slate-900 rounded border border-green-500/30"></div>
            <div className="h-4 bg-slate-900 rounded border border-blue-500/30"></div>
            <div className="h-4 bg-slate-900 rounded border border-indigo-500/30"></div>
          </div>
        </div>
      </div>
    )
  }

  // Corporate Elite Preview
  if (templateId === "corporate-elite") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Header with Stats */}
        <div className="h-10 bg-gradient-to-r from-blue-950 to-slate-900 p-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-slate-700"></div>
            <div className="space-y-0.5">
              <div className="h-1 w-8 bg-slate-600 rounded"></div>
              <div className="h-0.5 w-6 bg-slate-700 rounded"></div>
            </div>
          </div>
          <div className="flex gap-0.5">
            <div className="w-6 h-6 bg-blue-900/50 rounded border border-blue-700/50"></div>
            <div className="w-6 h-6 bg-amber-900/50 rounded border border-amber-700/50"></div>
          </div>
        </div>
        {/* Content Grid */}
        <div className="p-2 space-y-1">
          <div className="grid grid-cols-4 gap-0.5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-5 bg-slate-800 rounded border border-slate-700 p-0.5">
                <div className="text-[5px] text-amber-400 font-bold">12+</div>
              </div>
            ))}
          </div>
          <div className="h-8 bg-gradient-to-r from-slate-800 to-slate-900 rounded border border-slate-700"></div>
        </div>
      </div>
    )
  }

  // Designer Showcase Preview
  if (templateId === "designer-showcase") {
    return (
      <div className="w-full h-full bg-slate-950 overflow-hidden relative">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-amber-500/20"></div>
        {/* Masonry Grid Preview */}
        <div className="relative z-10 p-2 h-full">
          <div className="grid grid-cols-3 gap-1 h-full">
            <div className="col-span-2 row-span-2 bg-gradient-to-br from-pink-600 to-purple-600 rounded-lg"></div>
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg"></div>
            <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-lg"></div>
            <div className="col-span-2 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-lg"></div>
            <div className="bg-gradient-to-br from-pink-600 to-rose-600 rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  // Freelancer Hub Preview
  if (templateId === "freelancer-hub") {
    return (
      <div className="w-full h-full bg-white dark:bg-slate-900 overflow-hidden">
        {/* Header */}
        <div className="h-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 p-2 flex items-center justify-center">
          <div className="text-center">
            <div className="h-1.5 w-12 bg-slate-300 rounded mb-0.5 mx-auto"></div>
            <div className="h-1 w-8 bg-slate-200 rounded mx-auto"></div>
          </div>
        </div>
        {/* Service Cards */}
        <div className="p-2 space-y-1">
          <div className="grid grid-cols-2 gap-1">
            <div className="h-10 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/20 dark:to-green-800/20 rounded border border-green-200 dark:border-green-800 p-1">
              <div className="h-1 w-8 bg-green-400 rounded mb-1"></div>
              <div className="text-[6px] font-bold text-green-600 dark:text-green-400">$150/hr</div>
            </div>
            <div className="h-10 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/20 rounded border border-blue-200 dark:border-blue-800 p-1">
              <div className="h-1 w-8 bg-blue-400 rounded mb-1"></div>
              <div className="text-[6px] font-bold text-blue-600 dark:text-blue-400">$200/hr</div>
            </div>
          </div>
          <div className="h-8 bg-amber-50 dark:bg-amber-900/20 rounded border border-amber-200 dark:border-amber-800 p-1 flex items-center justify-center">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
          </div>
        </div>
      </div>
    )
  }

  // Startup Founder Preview
  if (templateId === "startup-founder") {
    return (
      <div className="w-full h-full bg-slate-950 overflow-hidden relative">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(${primary} 1px, transparent 1px), linear-gradient(90deg, ${primary} 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        {/* Content */}
        <div className="relative z-10 p-2 h-full flex flex-col">
          <div className="flex items-center gap-1 mb-2">
            <Rocket className="w-3 h-3 text-indigo-400" />
            <div className="h-1.5 w-12 bg-gradient-to-r from-indigo-500 to-pink-500 rounded"></div>
          </div>
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-1 mb-2 flex-1">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded border border-indigo-500/30 p-1">
              <TrendingUp className="w-2 h-2 text-indigo-400 mb-0.5" />
              <div className="text-[6px] font-bold text-white">5</div>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-sm rounded border border-pink-500/30 p-1">
              <div className="text-[6px] font-bold text-white">$2M</div>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-sm rounded border border-amber-500/30 p-1">
              <div className="text-[6px] font-bold text-white">50+</div>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-sm rounded border border-purple-500/30 p-1">
              <div className="text-[6px] font-bold text-white">12</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Influencer Brand Preview
  if (templateId === "influencer-brand") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-pink-950 dark:to-purple-950 overflow-hidden">
        <div className="p-2 h-full flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 mb-2"></div>
          <div className="h-1.5 w-16 bg-slate-300 rounded mb-1"></div>
          <div className="flex gap-2 mb-2">
            <div className="text-center">
              <div className="text-[6px] font-bold">100K</div>
              <div className="h-0.5 w-6 bg-slate-200 rounded"></div>
            </div>
            <div className="text-center">
              <div className="text-[6px] font-bold">5M</div>
              <div className="h-0.5 w-6 bg-slate-200 rounded"></div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-0.5 w-full">
            <div className="aspect-square bg-pink-300 rounded"></div>
            <div className="aspect-square bg-purple-300 rounded"></div>
            <div className="aspect-square bg-blue-300 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  // Academic Scholar Preview
  if (templateId === "academic-scholar") {
    return (
      <div className="w-full h-full bg-slate-50 dark:bg-slate-900 overflow-hidden">
        <div className="p-2 space-y-1">
          <div className="flex items-center gap-1 mb-2">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <div className="flex-1">
              <div className="h-1 w-full bg-slate-300 rounded mb-0.5"></div>
              <div className="h-0.5 w-3/4 bg-slate-200 rounded"></div>
            </div>
          </div>
          {/* Publications List */}
          <div className="space-y-0.5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-6 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 p-1">
                <div className="h-0.5 w-full bg-slate-300 rounded mb-0.5"></div>
                <div className="h-0.5 w-2/3 bg-slate-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Photography Gallery Preview
  if (templateId === "photography-gallery") {
    return (
      <div className="w-full h-full bg-black overflow-hidden">
        <div className="h-full grid grid-cols-2 gap-0.5">
          <div className="bg-gradient-to-br from-slate-700 to-slate-800"></div>
          <div className="bg-gradient-to-br from-slate-600 to-slate-700"></div>
          <div className="col-span-2 bg-gradient-to-br from-slate-800 to-slate-900"></div>
          <div className="bg-gradient-to-br from-slate-600 to-slate-700"></div>
          <div className="bg-gradient-to-br from-slate-700 to-slate-800"></div>
        </div>
      </div>
    )
  }

  // Default fallback
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 bg-slate-300 dark:bg-slate-700 rounded-lg mb-2 mx-auto"></div>
        <div className="h-2 w-16 bg-slate-300 dark:bg-slate-700 rounded mx-auto"></div>
      </div>
    </div>
  )
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Mail, 
  Linkedin, 
  Github, 
  Twitter,
  Globe,
  Instagram
} from "lucide-react";

interface PortfolioData {
  title: string;
  headline?: string;
  bio?: string;
  email?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  twitterUrl?: string;
  websiteUrl?: string;
  instagramUrl?: string;
  profileImage?: string;
}

interface SimpleDefaultProps {
  data: PortfolioData;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
}

/**
 * SimpleDefault - A clean, mobile-first portfolio template
 * Perfect for quick personal pages with just the essentials
 * Focused on readability and simplicity
 */
export default function SimpleDefault({ 
  data, 
  primaryColor = "#3b82f6",
  secondaryColor = "#8b5cf6", 
  accentColor = "#06b6d4" 
}: SimpleDefaultProps) {
  
  const socialLinks = [
    { url: data.email, icon: Mail, label: "Email", href: `mailto:${data.email}` },
    { url: data.linkedinUrl, icon: Linkedin, label: "LinkedIn", href: data.linkedinUrl },
    { url: data.githubUrl, icon: Github, label: "GitHub", href: data.githubUrl },
    { url: data.twitterUrl, icon: Twitter, label: "Twitter", href: data.twitterUrl },
    { url: data.instagramUrl, icon: Instagram, label: "Instagram", href: data.instagramUrl },
    { url: data.websiteUrl, icon: Globe, label: "Website", href: data.websiteUrl },
  ].filter(link => link.url);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md mx-auto"
      >
        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6 flex justify-center"
        >
          <div 
            className="w-32 h-32 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-2xl"
            style={{ 
              background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)` 
            }}
          >
            {data.profileImage ? (
              <Image 
                src={data.profileImage} 
                alt={data.title}
                width={128}
                height={128}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span>{data.title.charAt(0).toUpperCase()}</span>
            )}
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-2 text-slate-900 dark:text-white"
        >
          {data.title}
        </motion.h1>

        {/* Headline */}
        {data.headline && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-center mb-6 text-slate-600 dark:text-slate-400"
          >
            {data.headline}
          </motion.p>
        )}

        {/* Bio */}
        {data.bio && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <p className="text-center text-slate-700 dark:text-slate-300 leading-relaxed">
              {data.bio}
            </p>
          </motion.div>
        )}

        {/* Social Links */}
        {socialLinks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-3"
          >
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.label !== "Email" ? "_blank" : undefined}
                  rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all hover:scale-[1.02] active:scale-[0.98] bg-white dark:bg-slate-900"
                  style={{
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                  }}
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900 dark:text-white">
                      {link.label}
                    </p>
                    {link.label === "Email" && (
                      <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                        {data.email}
                      </p>
                    )}
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        )}

        {/* Footer Credit */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-xs text-slate-400 dark:text-slate-600">
            Built with Velox Platform
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

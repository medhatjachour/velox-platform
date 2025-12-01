"use client";

import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Twitter,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Award,
  ArrowRight
} from "lucide-react";

interface PortfolioData {
  title: string;
  headline?: string;
  bio?: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  twitterUrl?: string;
  websiteUrl?: string;
  currentRole?: string;
  company?: string;
  skills?: Array<{ name: string; category?: string }>;
  projects?: Array<{
    title: string;
    description: string;
    technologies?: string[];
    url?: string;
    imageUrl?: string;
  }>;
  experience?: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
    description: string;
  }>;
  education?: Array<{
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
  }>;
}

interface ModernMinimalProps {
  data: PortfolioData;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
}

export default function ModernMinimal({ 
  data, 
  primaryColor = "#2563eb",
  secondaryColor = "#8b5cf6", 
  accentColor = "#ec4899" 
}: ModernMinimalProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
        {/* Subtle background gradient */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            background: `radial-gradient(circle at 30% 50%, ${primaryColor} 0%, transparent 50%),
                        radial-gradient(circle at 70% 50%, ${secondaryColor} 0%, transparent 50%)`
          }}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          {/* Small greeting */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm uppercase tracking-widest mb-6"
            style={{ color: primaryColor }}
          >
            Hello, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-8xl font-bold mb-6 tracking-tight"
          >
            {data.title}
          </motion.h1>

          {/* Headline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl md:text-3xl text-slate-600 dark:text-slate-400 mb-8 font-light"
          >
            {data.headline || data.currentRole || "Creative Professional"}
          </motion.p>

          {/* Bio */}
          {data.bio && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              {data.bio}
            </motion.p>
          )}

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="px-8 py-4 rounded-full font-medium transition-all hover:scale-105"
                style={{ 
                  backgroundColor: primaryColor,
                  color: 'white'
                }}
              >
                Get in Touch
              </a>
            )}
            <a
              href="#projects"
              className="px-8 py-4 rounded-full border-2 font-medium transition-all hover:scale-105"
              style={{ 
                borderColor: primaryColor,
                color: primaryColor
              }}
            >
              View Work
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center justify-center gap-6 mt-12"
          >
            {data.linkedinUrl && (
              <a 
                href={data.linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            )}
            {data.githubUrl && (
              <a 
                href={data.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
            )}
            {data.twitterUrl && (
              <a 
                href={data.twitterUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            opacity: { delay: 1 },
            y: { repeat: Infinity, duration: 1.5 }
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-slate-300 dark:border-slate-700 rounded-full p-1">
            <div 
              className="w-1 h-3 rounded-full mx-auto"
              style={{ backgroundColor: primaryColor }}
            />
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      {data.projects && data.projects.length > 0 && (
        <section id="projects" className="py-32 px-4 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm uppercase tracking-widest mb-4" style={{ color: primaryColor }}>
                Portfolio
              </p>
              <h2 className="text-5xl font-bold mb-16">Featured Work</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.projects.slice(0, 4).map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300">
                    {/* Project Image */}
                    <div 
                      className="h-64 relative overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}20 0%, ${secondaryColor}20 100%)`
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                        <Briefcase className="w-16 h-16" />
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-8">
                      <h3 className="text-2xl font-bold mb-3 group-hover:translate-x-2 transition-transform">
                        {project.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      
                      {/* Technologies */}
                      {project.technologies && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 3).map((tech, i) => (
                            <span
                              key={i}
                              className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 font-medium group-hover:gap-3 transition-all"
                          style={{ color: primaryColor }}
                        >
                          View Project
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {data.skills && data.skills.length > 0 && (
        <section className="py-32 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-sm uppercase tracking-widest mb-4" style={{ color: primaryColor }}>
                Expertise
              </p>
              <h2 className="text-5xl font-bold">Skills & Technologies</h2>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-4">
              {data.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="px-6 py-3 rounded-full border-2 hover:scale-105 transition-transform cursor-default"
                  style={{ borderColor: primaryColor }}
                >
                  <span className="font-medium">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {data.experience && data.experience.length > 0 && (
        <section className="py-32 px-4 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <p className="text-sm uppercase tracking-widest mb-4" style={{ color: primaryColor }}>
                Journey
              </p>
              <h2 className="text-5xl font-bold">Experience</h2>
            </motion.div>

            <div className="space-y-12">
              {data.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800"
                >
                  <div 
                    className="absolute left-0 top-0 w-4 h-4 rounded-full -translate-x-[9px]"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <p className="text-sm text-slate-500 mb-2">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </p>
                  <h3 className="text-2xl font-bold mb-1">{exp.position}</h3>
                  <p className="text-lg mb-3" style={{ color: primaryColor }}>
                    {exp.company}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {exp.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Let's Work Together
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
              Have a project in mind? Let's create something amazing together.
            </p>

            {/* Contact Methods */}
            <div className="flex flex-wrap items-center justify-center gap-8 mb-12">
              {data.email && (
                <a 
                  href={`mailto:${data.email}`}
                  className="flex items-center gap-3 text-lg hover:scale-105 transition-transform"
                  style={{ color: primaryColor }}
                >
                  <Mail className="w-6 h-6" />
                  {data.email}
                </a>
              )}
              {data.phone && (
                <a 
                  href={`tel:${data.phone}`}
                  className="flex items-center gap-3 text-lg hover:scale-105 transition-transform"
                  style={{ color: primaryColor }}
                >
                  <Phone className="w-6 h-6" />
                  {data.phone}
                </a>
              )}
              {data.location && (
                <div className="flex items-center gap-3 text-lg text-slate-600">
                  <MapPin className="w-6 h-6" />
                  {data.location}
                </div>
              )}
            </div>

            <a
              href={`mailto:${data.email || ''}`}
              className="inline-block px-12 py-5 rounded-full text-white font-medium text-lg hover:scale-105 transition-all shadow-lg"
              style={{ backgroundColor: primaryColor }}
            >
              Send Message
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 dark:text-slate-400">
            © {new Date().getFullYear()} {data.title}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {data.linkedinUrl && (
              <a href={data.linkedinUrl} className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {data.githubUrl && (
              <a href={data.githubUrl} className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            )}
            {data.twitterUrl && (
              <a href={data.twitterUrl} className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}

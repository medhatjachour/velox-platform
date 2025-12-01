"use client";

import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Twitter,
  Code2,
  Terminal,
  Cpu,
  ArrowRight,
  ExternalLink
} from "lucide-react";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  url?: string;
  image?: string;
}

interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
}

interface Skill {
  name: string;
  level?: number;
}

interface PortfolioData {
  title: string;
  headline: string;
  bio: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  twitterUrl?: string;
  currentRole?: string;
  company?: string;
  skills?: Skill[];
  projects?: Project[];
  experience?: Experience[];
}

interface DeveloperProProps {
  data: PortfolioData;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
}

export default function DeveloperPro({
  data,
  primaryColor = "#10b981",
  secondaryColor = "#3b82f6",
  accentColor = "#8b5cf6"
}: DeveloperProProps) {
  
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Terminal-like Header */}
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-slate-500 font-mono text-sm">
              ~/portfolio/{data.title.toLowerCase().replace(/\s+/g, '-')}
            </span>
          </div>
        </div>
      </div>

      {/* Hero - Terminal Style */}
      <section className="relative px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Terminal className="w-5 h-5" style={{ color: primaryColor }} />
                <span className="text-slate-500 font-mono text-sm">bash</span>
              </div>

              <div className="space-y-4 font-mono">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start gap-2"
                >
                  <span style={{ color: primaryColor }}>$</span>
                  <div>
                    <span className="text-slate-400">whoami</span>
                    <div className="text-3xl md:text-5xl font-bold text-white mt-2">
                      {data.title}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-start gap-2"
                >
                  <span style={{ color: primaryColor }}>$</span>
                  <div>
                    <span className="text-slate-400">cat role.txt</span>
                    <div className="text-xl md:text-2xl text-slate-300 mt-2">
                      {data.headline}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-start gap-2"
                >
                  <span style={{ color: primaryColor }}>$</span>
                  <div>
                    <span className="text-slate-400">cat about.md</span>
                    <p className="text-slate-400 mt-2 max-w-3xl leading-relaxed">
                      {data.bio}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center gap-2 pt-4"
                >
                  <span style={{ color: primaryColor }}>$</span>
                  <span className="text-white animate-pulse">_</span>
                </motion.div>
              </div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-slate-800"
              >
                <button 
                  className="px-6 py-3 rounded-lg font-mono text-sm transition-all hover:scale-105"
                  style={{ backgroundColor: primaryColor, color: 'white' }}
                >
                  ./view-projects.sh
                </button>
                <button className="px-6 py-3 rounded-lg font-mono text-sm bg-slate-800 text-white hover:bg-slate-700 transition-all">
                  ./contact.sh
                </button>
                
                <div className="flex-1" />
                
                {data.githubUrl && (
                  <a 
                    href={data.githubUrl}
                    className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-5 h-5 text-white" />
                  </a>
                )}
                {data.linkedinUrl && (
                  <a 
                    href={data.linkedinUrl}
                    className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-5 h-5 text-white" />
                  </a>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack - Grid Layout */}
      {data.skills && data.skills.length > 0 && (
        <section className="relative px-4 py-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-12"
            >
              <Code2 className="w-8 h-8" style={{ color: primaryColor }} />
              <h2 className="text-4xl font-bold text-white font-mono">
                {'<TechStack />'}
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {data.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-slate-700 rounded-xl p-6 text-center transition-all group"
                >
                  <Cpu className="w-8 h-8 mx-auto mb-3 text-slate-600 group-hover:text-white transition-colors" 
                    style={{ color: `${primaryColor}80` }} 
                  />
                  <p className="text-white font-mono text-sm">{skill.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects - Code Blocks Style */}
      {data.projects && data.projects.length > 0 && (
        <section className="relative px-4 py-20 bg-slate-900/30">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-12"
            >
              <Terminal className="w-8 h-8" style={{ color: secondaryColor }} />
              <h2 className="text-4xl font-bold text-white font-mono">
                {'<Projects />'}
              </h2>
            </motion.div>

            <div className="space-y-6">
              {data.projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all group"
                >
                  <div className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                      </div>
                      <span className="text-slate-500 font-mono text-sm">
                        {project.title.toLowerCase().replace(/\s+/g, '-')}.tsx
                      </span>
                    </div>
                    {project.url && (
                      <a
                        href={project.url}
                        className="flex items-center gap-2 text-sm font-mono opacity-0 group-hover:opacity-100 transition-all hover:text-white"
                        style={{ color: primaryColor }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        view <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <div className="p-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-4 font-mono">
                          {project.title}
                        </h3>
                        
                        <p className="text-slate-400 mb-6 leading-relaxed">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 rounded-md text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="lg:w-48 flex items-center justify-center">
                        <div 
                          className="w-full aspect-square rounded-xl flex items-center justify-center text-6xl font-bold text-slate-700"
                          style={{ backgroundColor: `${primaryColor}15` }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Timeline */}
      {data.experience && data.experience.length > 0 && (
        <section className="relative px-4 py-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-12"
            >
              <Cpu className="w-8 h-8" style={{ color: accentColor }} />
              <h2 className="text-4xl font-bold text-white font-mono">
                {'<Experience />'}
              </h2>
            </motion.div>

            <div className="space-y-8">
              {data.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-8 hover:border-slate-700 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2 font-mono">
                        {exp.position}
                      </h3>
                      <p className="text-lg" style={{ color: primaryColor }}>
                        {exp.company}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-300 font-mono text-sm">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                  </div>

                  {exp.description && (
                    <p className="text-slate-400 leading-relaxed border-l-2 pl-4" 
                      style={{ borderColor: `${primaryColor}40` }}
                    >
                      {exp.description}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="relative px-4 py-20 bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-12 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Terminal className="w-8 h-8" style={{ color: primaryColor }} />
              <h2 className="text-4xl font-bold text-white font-mono">
                {'<Contact />'}
              </h2>
            </div>

            <p className="text-xl text-slate-400 mb-8 font-mono">
              Let&apos;s build something amazing together
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              {data.email && (
                <a 
                  href={`mailto:${data.email}`}
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-all"
                >
                  <Mail className="w-5 h-5" style={{ color: primaryColor }} />
                  <span className="font-mono text-sm">{data.email}</span>
                </a>
              )}
              {data.phone && (
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-5 h-5" style={{ color: secondaryColor }} />
                  <span className="font-mono text-sm">{data.phone}</span>
                </div>
              )}
              {data.location && (
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-5 h-5" style={{ color: accentColor }} />
                  <span className="font-mono text-sm">{data.location}</span>
                </div>
              )}
            </div>

            <button
              className="group px-8 py-4 rounded-lg font-mono transition-all hover:scale-105 flex items-center gap-2 mx-auto"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              ./start-conversation.sh
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-4 py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-500 font-mono text-sm">
            © 2024 {data.title} · Built with {'<code />'} and ❤️
          </p>
        </div>
      </footer>
    </div>
  );
}

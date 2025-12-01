"use client";

import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  Dribbble,
  Figma,
  Palette,
  Layers,
  Sparkles,
  ArrowUpRight
} from "lucide-react";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  url?: string;
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
  skills?: Skill[];
  projects?: Project[];
  experience?: Experience[];
}

interface DesignerShowcaseProps {
  data: PortfolioData;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
}

export default function DesignerShowcase({
  data,
  primaryColor = "#ec4899",
  secondaryColor = "#8b5cf6",
  accentColor = "#f59e0b"
}: DesignerShowcaseProps) {
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero - Visual Impact */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-30"
            style={{ backgroundColor: primaryColor }}
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-30"
            style={{ backgroundColor: secondaryColor }}
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
              scale: [1.2, 1, 1.2],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block mb-8"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div 
                className="w-24 h-24 rounded-3xl flex items-center justify-center mb-8"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                }}
              >
                <Palette className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            <h1 
              className="text-7xl md:text-9xl font-black mb-6"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor}, ${accentColor})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {data.title}
            </h1>

            <p className="text-2xl md:text-4xl text-white/80 mb-8 font-light">
              {data.headline}
            </p>

            <p className="text-xl text-white/60 max-w-3xl mx-auto mb-12 leading-relaxed">
              {data.bio}
            </p>

            <div className="flex gap-4 justify-center">
              <button 
                className="px-8 py-4 rounded-full font-bold text-white hover:scale-105 transition-transform"
                style={{ backgroundColor: primaryColor }}
              >
                View Portfolio
              </button>
              <button className="px-8 py-4 rounded-full font-bold bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all">
                Get in Touch
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Work - Masonry Grid */}
      {data.projects && data.projects.length > 0 && (
        <section className="py-32 px-4 bg-zinc-950">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 
                className="text-6xl md:text-7xl font-black mb-6"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Featured Work
              </h2>
              <p className="text-xl text-white/60">
                Crafting memorable experiences through design
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`group relative rounded-3xl overflow-hidden ${
                    index % 3 === 0 ? "md:col-span-2" : ""
                  }`}
                >
                  <div 
                    className={`relative ${
                      index % 3 === 0 ? "aspect-[21/9]" : "aspect-square"
                    } bg-gradient-to-br from-zinc-900 to-zinc-800 overflow-hidden`}
                  >
                    <div 
                      className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Layers className="w-24 h-24 text-white/20" />
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <div className="text-center px-8">
                        <h3 className="text-3xl font-bold mb-3">{project.title}</h3>
                        <p className="text-white/80 mb-6">{project.description}</p>
                        <div className="flex flex-wrap gap-2 justify-center mb-6">
                          {project.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-4 py-2 rounded-full text-sm font-semibold bg-white/10 border border-white/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        {project.url && (
                          <a
                            href={project.url}
                            className="inline-flex items-center gap-2 font-bold hover:gap-4 transition-all"
                            style={{ color: primaryColor }}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Project <ArrowUpRight className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills - Creative Display */}
      {data.skills && data.skills.length > 0 && (
        <section className="py-32 px-4 relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${primaryColor}, transparent 70%)`,
            }}
          />
          
          <div className="max-w-7xl mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 
                className="text-6xl md:text-7xl font-black mb-6"
                style={{
                  background: `linear-gradient(135deg, ${secondaryColor}, ${accentColor})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Design Arsenal
              </h2>
            </motion.div>

            <div className="flex flex-wrap gap-4 justify-center">
              {data.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1, rotate: [-5, 0, 5][index % 3] }}
                  className="px-8 py-4 rounded-full font-bold text-lg border-2 backdrop-blur-sm cursor-pointer"
                  style={{
                    borderColor: [primaryColor, secondaryColor, accentColor][index % 3],
                    color: [primaryColor, secondaryColor, accentColor][index % 3],
                    backgroundColor: `${[primaryColor, secondaryColor, accentColor][index % 3]}15`,
                  }}
                >
                  {skill.name}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience - Timeline */}
      {data.experience && data.experience.length > 0 && (
        <section className="py-32 px-4 bg-zinc-950">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 
                className="text-6xl md:text-7xl font-black mb-6"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}, ${primaryColor})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Experience
              </h2>
            </motion.div>

            <div className="space-y-12">
              {data.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-8 border-l-2 border-white/20"
                >
                  <div 
                    className="absolute -left-3 top-0 w-6 h-6 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                  />
                  
                  <h3 className="text-2xl font-bold mb-2">{exp.position}</h3>
                  <p className="text-xl mb-2" style={{ color: primaryColor }}>
                    {exp.company}
                  </p>
                  <p className="text-white/50 mb-4">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </p>
                  {exp.description && (
                    <p className="text-white/70 leading-relaxed">{exp.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact - Bold CTA */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}20, ${secondaryColor}20, ${accentColor}20)`,
          }}
        />
        
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-8">
              <Sparkles className="w-16 h-16" style={{ color: accentColor }} />
            </div>

            <h2 className="text-5xl md:text-7xl font-black mb-8">
              Let&apos;s Create Something Amazing
            </h2>

            <p className="text-2xl text-white/70 mb-12">
              Available for freelance projects and collaborations
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              {data.email && (
                <a 
                  href={`mailto:${data.email}`}
                  className="flex items-center gap-3 text-lg hover:text-pink-400 transition-colors"
                >
                  <Mail className="w-6 h-6" />
                  <span>{data.email}</span>
                </a>
              )}
              {data.phone && (
                <div className="flex items-center gap-3 text-lg">
                  <Phone className="w-6 h-6" />
                  <span>{data.phone}</span>
                </div>
              )}
            </div>

            <div className="flex gap-4 justify-center">
              <button
                className="px-10 py-5 rounded-full font-bold text-xl text-white hover:scale-110 transition-transform shadow-2xl"
                style={{ backgroundColor: primaryColor }}
              >
                Start a Project
              </button>
              
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Dribbble className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Figma className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/50">
            © 2024 {data.title}. Designed with passion.
          </p>
        </div>
      </footer>
    </div>
  );
}

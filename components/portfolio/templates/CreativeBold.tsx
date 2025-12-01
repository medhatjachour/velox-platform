"use client";

import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Twitter,
  Briefcase,
  Calendar,
  ArrowUpRight
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

interface CreativeBoldProps {
  data: PortfolioData;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
}

export default function CreativeBold({
  data,
  primaryColor = "#f59e0b",
  secondaryColor = "#ec4899",
  accentColor = "#8b5cf6"
}: CreativeBoldProps) {
  
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: primaryColor }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: secondaryColor }}
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      {/* Hero Section - Bold & Creative */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block mb-6"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div 
                className="text-7xl md:text-9xl font-black mb-4 relative"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor}, ${accentColor})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {data.title}
              </div>
            </motion.div>

            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-8 text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {data.headline}
            </motion.h2>

            <motion.p
              className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {data.bio}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <button
                className="px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105"
                style={{ backgroundColor: primaryColor }}
              >
                View My Work
              </button>
              <button className="px-8 py-4 rounded-full font-bold text-lg border-2 border-white/20 hover:border-white/40 transition-all hover:scale-105">
                Get In Touch
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex gap-6 justify-center mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {data.githubUrl && (
                <a 
                  href={data.githubUrl}
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-6 h-6" />
                </a>
              )}
              {data.linkedinUrl && (
                <a 
                  href={data.linkedinUrl}
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              )}
              {data.twitterUrl && (
                <a 
                  href={data.twitterUrl}
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-2 rounded-full"
              style={{ backgroundColor: primaryColor }}
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Projects - Bold Grid */}
      {data.projects && data.projects.length > 0 && (
        <section className="relative py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 
                className="text-6xl md:text-8xl font-black mb-6"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Featured Work
              </h2>
              <div className="h-2 w-32 rounded-full" style={{ backgroundColor: primaryColor }} />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {data.projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="group relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden">
                    <div 
                      className="absolute inset-0 opacity-40"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl font-black text-white/20">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-3xl font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text transition-all" 
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {project.title}
                    </h3>
                    
                    <p className="text-lg text-white/70 mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
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
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills - Bold Typography */}
      {data.skills && data.skills.length > 0 && (
        <section className="relative py-32 px-4 bg-white/5">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 
                className="text-6xl md:text-8xl font-black mb-6"
                style={{
                  background: `linear-gradient(135deg, ${secondaryColor}, ${accentColor})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Expertise
              </h2>
              <div className="h-2 w-32 rounded-full" style={{ backgroundColor: secondaryColor }} />
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {data.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 text-center group cursor-pointer"
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}20, ${secondaryColor}20)`,
                    }}
                  />
                  <p className="relative text-2xl font-bold">{skill.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Timeline */}
      {data.experience && data.experience.length > 0 && (
        <section className="relative py-32 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 
                className="text-6xl md:text-8xl font-black mb-6"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}, ${primaryColor})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Journey
              </h2>
              <div className="h-2 w-32 rounded-full" style={{ backgroundColor: accentColor }} />
            </motion.div>

            <div className="space-y-12">
              {data.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-12 border-l-4 border-white/20 hover:border-white/40 transition-all"
                >
                  <div 
                    className="absolute -left-4 top-0 w-8 h-8 rounded-full border-4 border-slate-950"
                    style={{ backgroundColor: primaryColor }}
                  />
                  
                  <div className="flex items-center gap-3 mb-2">
                    <Briefcase className="w-5 h-5" style={{ color: primaryColor }} />
                    <h3 className="text-2xl font-bold">{exp.position}</h3>
                  </div>
                  
                  <p className="text-xl text-white/70 mb-2">{exp.company}</p>
                  
                  <div className="flex items-center gap-2 text-white/50 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>

                  {exp.description && (
                    <p className="text-white/70 leading-relaxed">{exp.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section - Bold CTA */}
      <section className="relative py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl p-16 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}20, ${secondaryColor}20, ${accentColor}20)`,
              border: `2px solid ${primaryColor}40`,
            }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6 text-white">
              Let&apos;s Create Something Bold
            </h2>
            
            <p className="text-2xl text-white/70 mb-12">
              Ready to bring your ideas to life? Drop me a message.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              {data.email && (
                <div className="flex items-center gap-3 text-lg">
                  <Mail className="w-6 h-6" style={{ color: primaryColor }} />
                  <span>{data.email}</span>
                </div>
              )}
              {data.phone && (
                <div className="flex items-center gap-3 text-lg">
                  <Phone className="w-6 h-6" style={{ color: secondaryColor }} />
                  <span>{data.phone}</span>
                </div>
              )}
              {data.location && (
                <div className="flex items-center gap-3 text-lg">
                  <MapPin className="w-6 h-6" style={{ color: accentColor }} />
                  <span>{data.location}</span>
                </div>
              )}
            </div>

            <button
              className="px-12 py-5 rounded-full font-bold text-xl text-white transition-all hover:scale-110 shadow-2xl"
              style={{ backgroundColor: primaryColor }}
            >
              Start a Conversation
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/50">
            © 2024 {data.title}. Crafted with passion.
          </p>
        </div>
      </footer>
    </div>
  );
}

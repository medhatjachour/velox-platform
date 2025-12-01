"use client";

import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Award,
  Briefcase,
  Building2,
  TrendingUp,
  Users,
  Calendar,
  ChevronRight
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
  currentRole?: string;
  company?: string;
  skills?: Skill[];
  projects?: Project[];
  experience?: Experience[];
}

interface CorporateEliteProps {
  data: PortfolioData;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
}

export default function CorporateElite({
  data,
  primaryColor = "#1e40af",
  secondaryColor = "#0f172a",
  accentColor = "#d97706"
}: CorporateEliteProps) {
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero - Corporate Professional */}
      <section className="relative bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="inline-block mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-200">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
                  <span className="text-sm font-medium text-slate-700">Available for opportunities</span>
                </div>
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                {data.title}
              </h1>

              <h2 className="text-2xl md:text-3xl text-slate-600 mb-8 font-light">
                {data.headline}
              </h2>

              <p className="text-lg text-slate-600 leading-relaxed mb-10">
                {data.bio}
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  className="px-8 py-4 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  style={{ backgroundColor: primaryColor }}
                >
                  Schedule Consultation
                </button>
                <button className="px-8 py-4 rounded-lg font-semibold text-slate-700 bg-white border-2 border-slate-300 hover:border-slate-400 transition-all hover:scale-105">
                  Download Resume
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-slate-200">
                <div>
                  <div className="text-3xl font-bold" style={{ color: primaryColor }}>
                    {data.experience?.length || 0}+
                  </div>
                  <div className="text-sm text-slate-600 mt-1">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold" style={{ color: primaryColor }}>
                    {data.projects?.length || 0}+
                  </div>
                  <div className="text-sm text-slate-600 mt-1">Major Projects</div>
                </div>
                <div>
                  <div className="text-3xl font-bold" style={{ color: primaryColor }}>
                    {data.skills?.length || 0}+
                  </div>
                  <div className="text-sm text-slate-600 mt-1">Expertise Areas</div>
                </div>
              </div>
            </motion.div>

            {/* Right - Professional Photo Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Building2 className="w-32 h-32 text-slate-400" />
                </div>
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, transparent)`,
                  }}
                />
              </div>

              {/* Floating Contact Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-8 -left-8 bg-white rounded-xl shadow-xl p-6 border border-slate-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${primaryColor}15` }}
                  >
                    <Award className="w-6 h-6" style={{ color: primaryColor }} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Certified Professional</div>
                    <div className="text-sm text-slate-600">Industry Leader</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      {data.skills && data.skills.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Areas of Expertise
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Delivering exceptional results through specialized knowledge and proven experience
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all group cursor-pointer"
                >
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${primaryColor}15` }}
                  >
                    <TrendingUp className="w-6 h-6" style={{ color: primaryColor }} />
                  </div>
                  <h3 className="font-semibold text-slate-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                    {skill.name}
                  </h3>
                  <div className="text-sm text-slate-600">Expert Level</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Professional Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Professional Journey
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                A track record of leadership and achievement across leading organizations
              </p>
            </motion.div>

            <div className="space-y-8">
              {data.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex gap-6">
                      <div 
                        className="w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: `${primaryColor}15` }}
                      >
                        <Building2 className="w-8 h-8" style={{ color: primaryColor }} />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">
                          {exp.position}
                        </h3>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="font-semibold" style={{ color: primaryColor }}>
                            {exp.company}
                          </span>
                          <span className="text-slate-400">•</span>
                          <div className="flex items-center gap-2 text-slate-600">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                            </span>
                          </div>
                        </div>
                        {exp.description && (
                          <p className="text-slate-600 leading-relaxed">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {exp.current && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white whitespace-nowrap" style={{ backgroundColor: accentColor }}>
                        Current Role
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Notable Projects */}
      {data.projects && data.projects.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Notable Projects
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Strategic initiatives that drove measurable business impact
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {data.projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all"
                >
                  <div 
                    className="h-48 flex items-center justify-center relative overflow-hidden"
                    style={{ backgroundColor: `${primaryColor}10` }}
                  >
                    <Users className="w-20 h-20 text-slate-300" />
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                      style={{ backgroundColor: primaryColor }}
                    />
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-white border border-slate-200 text-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {project.url && (
                      <a
                        href={project.url}
                        className="inline-flex items-center gap-2 font-semibold transition-colors group-hover:gap-3"
                        style={{ color: primaryColor }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Case Study <ChevronRight className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let&apos;s Discuss Your Next Initiative
            </h2>
            
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
              Available for strategic consulting, advisory roles, and executive positions
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              {data.email && (
                <a 
                  href={`mailto:${data.email}`}
                  className="flex items-center gap-3 text-white hover:text-blue-400 transition-colors"
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${primaryColor}40` }}
                  >
                    <Mail className="w-6 h-6" />
                  </div>
                  <span className="font-medium">{data.email}</span>
                </a>
              )}
              {data.phone && (
                <div className="flex items-center gap-3 text-white">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${primaryColor}40` }}
                  >
                    <Phone className="w-6 h-6" />
                  </div>
                  <span className="font-medium">{data.phone}</span>
                </div>
              )}
              {data.location && (
                <div className="flex items-center gap-3 text-white">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${primaryColor}40` }}
                  >
                    <MapPin className="w-6 h-6" />
                  </div>
                  <span className="font-medium">{data.location}</span>
                </div>
              )}
            </div>

            <button
              className="px-10 py-5 rounded-lg font-semibold text-lg text-white shadow-2xl hover:scale-105 transition-transform"
              style={{ backgroundColor: primaryColor }}
            >
              Schedule a Meeting
            </button>

            {data.linkedinUrl && (
              <div className="mt-8">
                <a 
                  href={data.linkedinUrl}
                  className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-5 h-5" />
                  Connect on LinkedIn
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400">
            © 2024 {data.title}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

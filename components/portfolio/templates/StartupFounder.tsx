"use client";

import { motion } from "framer-motion";
import { 
  Mail, 
  Rocket,
  TrendingUp,
  Users,
  Target,
  Zap,
  BarChart3,
  Globe,
  Linkedin,
  Twitter
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
}

interface PortfolioData {
  title: string;
  headline: string;
  bio: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  skills?: Skill[];
  projects?: Project[];
  experience?: Experience[];
}

interface StartupFounderProps {
  data: PortfolioData;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
}

export default function StartupFounder({
  data,
  primaryColor = "#6366f1",
  secondaryColor = "#ec4899",
  accentColor = "#f59e0b"
}: StartupFounderProps) {
  
  const metrics = [
    { label: "Companies Founded", value: "3+", icon: Rocket },
    { label: "Total Funding", value: "$10M+", icon: TrendingUp },
    { label: "Team Members", value: "50+", icon: Users },
    { label: "Markets", value: "12", icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Hero - Bold Vision */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Rocket className="w-5 h-5" style={{ color: accentColor }} />
              <span className="font-semibold">Serial Entrepreneur</span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-black mb-6">
              {data.title}
            </h1>

            <p className="text-3xl md:text-4xl font-light text-white/90 mb-8">
              {data.headline}
            </p>

            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed">
              {data.bio}
            </p>

            <div className="flex gap-4 justify-center mb-16">
              <button
                className="px-10 py-5 rounded-full font-bold text-lg text-white hover:scale-105 transition-transform shadow-2xl"
                style={{ backgroundColor: primaryColor }}
              >
                Explore Ventures
              </button>
              <button className="px-10 py-5 rounded-full font-bold text-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all">
                Get in Touch
              </button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                  >
                    <Icon className="w-8 h-8 mx-auto mb-3" style={{ color: primaryColor }} />
                    <div className="text-4xl font-bold mb-2" style={{ color: accentColor }}>
                      {metric.value}
                    </div>
                    <div className="text-sm text-white/60">{metric.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ventures */}
      {data.projects && data.projects.length > 0 && (
        <section className="py-32 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                Ventures & Projects
              </h2>
              <p className="text-xl text-white/70">
                Building the future, one company at a time
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {data.projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all overflow-hidden"
                >
                  <div 
                    className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"
                    style={{ backgroundColor: primaryColor }}
                  />
                  
                  <div className="relative">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                      style={{ backgroundColor: `${primaryColor}30` }}
                    >
                      <Zap className="w-8 h-8" style={{ color: primaryColor }} />
                    </div>

                    <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                    <p className="text-white/70 mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 rounded-full text-sm font-medium bg-white/10 border border-white/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-white/50 text-sm">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        <span>Growing</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>50+ users</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Vision & Mission */}
      <section className="py-32 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Target className="w-16 h-16 mx-auto mb-8" style={{ color: accentColor }} />
            
            <h2 className="text-5xl font-black mb-8">Our Mission</h2>
            
            <p className="text-2xl text-white/80 leading-relaxed mb-12">
              To revolutionize industries through innovative technology and empower the next generation of entrepreneurs to build sustainable, impactful businesses.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <BarChart3 className="w-10 h-10 mx-auto mb-4" style={{ color: primaryColor }} />
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p className="text-white/60">Pushing boundaries with cutting-edge solutions</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <Users className="w-10 h-10 mx-auto mb-4" style={{ color: primaryColor }} />
                <h3 className="text-xl font-bold mb-2">Impact</h3>
                <p className="text-white/60">Creating meaningful change in communities</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <Globe className="w-10 h-10 mx-auto mb-4" style={{ color: primaryColor }} />
                <h3 className="text-xl font-bold mb-2">Scale</h3>
                <p className="text-white/60">Building global solutions for everyone</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-8">
              Let&apos;s Build Together
            </h2>
            
            <p className="text-2xl text-white/70 mb-12">
              Interested in partnerships, investments, or advisory opportunities?
            </p>

            {data.email && (
              <a 
                href={`mailto:${data.email}`}
                className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-lg mb-8 hover:scale-105 transition-transform"
                style={{ backgroundColor: primaryColor }}
              >
                <Mail className="w-6 h-6" />
                {data.email}
              </a>
            )}

            <div className="flex gap-4 justify-center">
              {data.linkedinUrl && (
                <a
                  href={data.linkedinUrl}
                  className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:scale-110 transition-transform"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              )}
              {data.twitterUrl && (
                <a
                  href={data.twitterUrl}
                  className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:scale-110 transition-transform"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/50">
            © 2024 {data.title}. Building the future.
          </p>
        </div>
      </footer>
    </div>
  );
}

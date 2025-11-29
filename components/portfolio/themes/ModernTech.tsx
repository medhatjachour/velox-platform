import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award, Code, Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";

interface ThemeProps {
  portfolio: any;
  experience: any[];
  education: any[];
  skills: any[];
  projects: any[];
  certifications: any[];
}

export default function ModernTech({ portfolio, experience, education, skills, projects, certifications }: ThemeProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/10 to-pink-500/10 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                {portfolio.title}
              </h1>
              <p className="text-3xl md:text-4xl text-gray-300 mb-8 font-light">
                {portfolio.headline}
              </p>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                {portfolio.bio}
              </p>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-6 mt-12"
            >
              {portfolio.email && (
                <a href={`mailto:${portfolio.email}`} className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors">
                  <Mail className="w-5 h-5" />
                  {portfolio.email}
                </a>
              )}
              {portfolio.phone && (
                <a href={`tel:${portfolio.phone}`} className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors">
                  <Phone className="w-5 h-5" />
                  {portfolio.phone}
                </a>
              )}
              {portfolio.location && (
                <span className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-5 h-5" />
                  {portfolio.location}
                </span>
              )}
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex items-center justify-center gap-4 mt-8"
            >
              {portfolio.linkedinUrl && (
                <a
                  href={portfolio.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 flex items-center justify-center transition-all hover:scale-110"
                >
                  <Linkedin className="w-5 h-5 text-cyan-400" />
                </a>
              )}
              {portfolio.githubUrl && (
                <a
                  href={portfolio.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 flex items-center justify-center transition-all hover:scale-110"
                >
                  <Github className="w-5 h-5 text-cyan-400" />
                </a>
              )}
              {portfolio.websiteUrl && (
                <a
                  href={portfolio.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 flex items-center justify-center transition-all hover:scale-110"
                >
                  <Globe className="w-5 h-5 text-cyan-400" />
                </a>
              )}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-20"
            >
              <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex items-start justify-center p-2 mx-auto">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        {experience && experience.length > 0 && (
          <section className="py-32 px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Briefcase className="w-8 h-8 text-cyan-400" />
                  <h2 className="text-5xl font-bold">Experience</h2>
                </div>
                <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-400" />
              </motion.div>

              <div className="space-y-12">
                {experience.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-4 before:h-4 before:bg-cyan-400 before:rounded-full before:ring-4 before:ring-cyan-400/20"
                  >
                    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 hover:border-cyan-400/50 transition-all">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white">{exp.position}</h3>
                          <p className="text-xl text-cyan-400 mt-1">{exp.company}</p>
                          {exp.location && (
                            <p className="text-gray-400 mt-1">{exp.location}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-gray-400">
                            {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                          </p>
                        </div>
                      </div>
                      {exp.description && (
                        <p className="text-gray-300 leading-relaxed mb-4">{exp.description}</p>
                      )}
                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement: string, i: number) => (
                            <li key={i} className="flex items-start gap-3 text-gray-300">
                              <span className="text-cyan-400 mt-1">▸</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Skills Section */}
        {skills && skills.length > 0 && (
          <section className="py-32 px-6 bg-slate-900/30">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Code className="w-8 h-8 text-cyan-400" />
                  <h2 className="text-5xl font-bold">Skills</h2>
                </div>
                <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-400" />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {["technical", "soft", "language", "tool"].map((category) => {
                  const categorySkills = skills.filter((s) => s.category === category);
                  if (categorySkills.length === 0) return null;

                  return (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6"
                    >
                      <h3 className="text-lg font-semibold text-cyan-400 mb-4 capitalize">
                        {category}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {categorySkills.map((skill) => (
                          <span
                            key={skill.id}
                            className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm text-gray-300 hover:bg-cyan-500/20 transition-colors"
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <section className="py-32 px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Code className="w-8 h-8 text-cyan-400" />
                  <h2 className="text-5xl font-bold">Projects</h2>
                </div>
                <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-400" />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all group"
                  >
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">{project.description}</p>
                      
                      {project.highlights && project.highlights.length > 0 && (
                        <ul className="space-y-2 mb-4">
                          {project.highlights.map((highlight: string, i: number) => (
                            <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                              <span className="text-cyan-400 mt-1">▸</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech: string, i: number) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded text-xs text-gray-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-3">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                          >
                            View Code →
                          </a>
                        )}
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                          >
                            Live Demo →
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

        {/* Education Section */}
        {education && education.length > 0 && (
          <section className="py-32 px-6 bg-slate-900/30">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <div className="flex items-center gap-4 mb-4">
                  <GraduationCap className="w-8 h-8 text-cyan-400" />
                  <h2 className="text-5xl font-bold">Education</h2>
                </div>
                <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-400" />
              </motion.div>

              <div className="space-y-8">
                {education.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white">{edu.degree}</h3>
                        <p className="text-xl text-cyan-400 mt-1">{edu.institution}</p>
                        {edu.field && (
                          <p className="text-gray-400 mt-1">{edu.field}</p>
                        )}
                        {edu.gpa && (
                          <p className="text-gray-400 mt-1">GPA: {edu.gpa}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400">
                          {edu.startDate} - {edu.endDate}
                        </p>
                      </div>
                    </div>
                    {edu.achievements && edu.achievements.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {edu.achievements.map((achievement: string, i: number) => (
                          <li key={i} className="flex items-start gap-3 text-gray-300">
                            <span className="text-cyan-400 mt-1">▸</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Certifications Section */}
        {certifications && certifications.length > 0 && (
          <section className="py-32 px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Award className="w-8 h-8 text-cyan-400" />
                  <h2 className="text-5xl font-bold">Certifications</h2>
                </div>
                <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-400" />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6"
                  >
                    <h3 className="text-xl font-bold text-white mb-2">{cert.name}</h3>
                    <p className="text-cyan-400 mb-2">{cert.issuer}</p>
                    <p className="text-gray-400 text-sm mb-3">{cert.date}</p>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        View Credential →
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="py-16 px-6 border-t border-slate-800">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} {portfolio.title}. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Powered by <span className="text-cyan-400">Velox</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

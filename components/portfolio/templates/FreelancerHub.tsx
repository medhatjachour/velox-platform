"use client";

import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin,
  Clock,
  CheckCircle2,
  Star,
  Calendar,
  DollarSign,
  MessageSquare,
  Award
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

interface FreelancerHubProps {
  data: PortfolioData;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
}

export default function FreelancerHub({
  data,
  primaryColor = "#10b981",
  secondaryColor = "#3b82f6",
  accentColor = "#f59e0b"
}: FreelancerHubProps) {
  
  const services = [
    { name: "Consulting", rate: "$150/hr", icon: MessageSquare },
    { name: "Development", rate: "$120/hr", icon: CheckCircle2 },
    { name: "Design", rate: "$100/hr", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero - Service-Focused */}
      <section className="relative bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-3 h-3 rounded-full animate-pulse"
                  style={{ backgroundColor: primaryColor }}
                />
                <span className="text-slate-600 font-medium">Available for hire</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                {data.title}
              </h1>

              <p className="text-2xl text-slate-600 mb-8">
                {data.headline}
              </p>

              <p className="text-lg text-slate-600 leading-relaxed mb-10">
                {data.bio}
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <button
                  className="px-8 py-4 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Calendar className="w-5 h-5" />
                  Book a Call
                </button>
                <button className="px-8 py-4 rounded-lg font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all">
                  View Services
                </button>
              </div>

              <div className="flex items-center gap-8 pt-8 border-t border-slate-200">
                <div>
                  <div className="text-3xl font-bold text-slate-900">98%</div>
                  <div className="text-sm text-slate-600">Client Satisfaction</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900">{data.projects?.length || 0}+</div>
                  <div className="text-sm text-slate-600">Projects Completed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900">5+</div>
                  <div className="text-sm text-slate-600">Years Experience</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-6 h-6" style={{ color: primaryColor }} />
                  <h3 className="text-xl font-bold text-slate-900">Quick Response</h3>
                </div>
                
                <div className="space-y-4 mb-6">
                  {data.email && (
                    <div className="flex items-center gap-3 text-slate-700">
                      <Mail className="w-5 h-5" style={{ color: primaryColor }} />
                      <span>{data.email}</span>
                    </div>
                  )}
                  {data.phone && (
                    <div className="flex items-center gap-3 text-slate-700">
                      <Phone className="w-5 h-5" style={{ color: primaryColor }} />
                      <span>{data.phone}</span>
                    </div>
                  )}
                  {data.location && (
                    <div className="flex items-center gap-3 text-slate-700">
                      <MapPin className="w-5 h-5" style={{ color: primaryColor }} />
                      <span>{data.location}</span>
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600">
                    &quot;Exceptional work quality and professionalism. Highly recommended!&quot;
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services & Pricing */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Services & Rates
            </h2>
            <p className="text-lg text-slate-600">
              Flexible pricing to match your project needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:shadow-xl transition-all"
                >
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${primaryColor}20` }}
                  >
                    <Icon className="w-8 h-8" style={{ color: primaryColor }} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {service.name}
                  </h3>
                  
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl font-bold" style={{ color: primaryColor }}>
                      {service.rate}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2 text-slate-700">
                      <CheckCircle2 className="w-5 h-5" style={{ color: primaryColor }} />
                      Fast delivery
                    </li>
                    <li className="flex items-center gap-2 text-slate-700">
                      <CheckCircle2 className="w-5 h-5" style={{ color: primaryColor }} />
                      Unlimited revisions
                    </li>
                    <li className="flex items-center gap-2 text-slate-700">
                      <CheckCircle2 className="w-5 h-5" style={{ color: primaryColor }} />
                      24/7 support
                    </li>
                  </ul>

                  <button className="w-full py-3 rounded-lg font-semibold text-slate-700 bg-slate-200 hover:bg-slate-300 transition-all">
                    Get Started
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Technical Skills
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl p-6 text-center border border-slate-200 hover:shadow-lg transition-all"
                >
                  <Award className="w-8 h-8 mx-auto mb-3" style={{ color: primaryColor }} />
                  <p className="font-semibold text-slate-900">{skill.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Portfolio */}
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
                Recent Work
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all"
                >
                  <div 
                    className="h-48 flex items-center justify-center"
                    style={{ backgroundColor: `${primaryColor}15` }}
                  >
                    <CheckCircle2 className="w-16 h-16 text-slate-300" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-slate-200 text-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section 
        className="py-20"
        style={{ backgroundColor: `${primaryColor}10` }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <DollarSign className="w-16 h-16 mx-auto mb-6" style={{ color: primaryColor }} />
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Ready to Start Your Project?
            </h2>
            
            <p className="text-xl text-slate-600 mb-10">
              Let&apos;s discuss how I can help bring your ideas to life
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-10 py-5 rounded-lg font-semibold text-white text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
                style={{ backgroundColor: primaryColor }}
              >
                Schedule Free Consultation
              </button>
              <button className="px-10 py-5 rounded-lg font-semibold text-slate-700 bg-white border-2 border-slate-300 hover:border-slate-400 transition-all">
                View Availability
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400">
            © 2024 {data.title}. Professional freelance services.
          </p>
        </div>
      </footer>
    </div>
  );
}

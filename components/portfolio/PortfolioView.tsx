"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Globe, 
  ExternalLink,
  Briefcase,
  Code,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PortfolioViewProps {
  portfolio: {
    id: string;
    title: string;
    bio: string | null;
    headline: string | null;
    heroImageUrl: string | null;
    theme: any;
    user: {
      fullName: string | null;
      username: string;
      avatarUrl: string | null;
    };
    projects: Array<{
      id: string;
      title: string;
      description: string;
      imageUrl: string | null;
      url: string | null;
      technologies: string[];
    }>;
  };
}

export default function PortfolioView({ portfolio }: PortfolioViewProps) {
  const theme = portfolio.theme as any || {};
  const gradient = theme.gradient || "from-[#06B6D4] to-[#3B82F6]";
  
  // Track view on mount
  useEffect(() => {
    const trackView = async () => {
      try {
        await fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ portfolioId: portfolio.id }),
        });
      } catch (error) {
        // Silently fail - don't block the UI
        console.error("Failed to track view:", error);
      }
    };
    
    trackView();
  }, [portfolio.id]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10`} />
        
        <div className="container max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            {/* Avatar */}
            {portfolio.user.avatarUrl && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <img
                  src={portfolio.user.avatarUrl}
                  alt={portfolio.user.fullName || portfolio.user.username}
                  className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-xl"
                />
              </motion.div>
            )}

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
            >
              {portfolio.user.fullName || portfolio.user.username}
            </motion.h1>

            {/* Headline */}
            {portfolio.headline && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl text-muted-foreground mb-6"
              >
                {portfolio.headline}
              </motion.p>
            )}

            {/* Bio */}
            {portfolio.bio && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-foreground/80 max-w-3xl mx-auto mb-8"
              >
                {portfolio.bio}
              </motion.p>
            )}

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-4 flex-wrap"
            >
              <Button
                size="lg"
                className={`gap-2 bg-gradient-to-r ${gradient} hover:opacity-90`}
              >
                <Mail className="w-4 h-4" />
                Get in Touch
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2"
              >
                <Briefcase className="w-4 h-4" />
                View Resume
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <Sparkles className="w-12 h-12 text-primary" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-20">
          <Code className="w-12 h-12 text-primary" />
        </div>
      </section>

      {/* Projects Section */}
      {portfolio.projects.length > 0 && (
        <section className="py-16 px-4">
          <div className="container max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-12 text-center"
            >
              Featured Projects
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                    {/* Project Image */}
                    {project.imageUrl && (
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}

                    <div className="p-6 flex-1 flex flex-col">
                      {/* Title */}
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>

                      {/* Description */}
                      <p className="text-muted-foreground mb-4 flex-1">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className={`px-3 py-1 text-xs rounded-full bg-gradient-to-r ${gradient} bg-opacity-10 text-primary`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Link */}
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary hover:underline"
                        >
                          View Project
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="container max-w-6xl mx-auto text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} {portfolio.user.fullName || portfolio.user.username}. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Powered by <span className={`font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>Velox Platform</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

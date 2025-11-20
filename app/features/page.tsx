"use client";
import { motion } from "framer-motion";
import { Brain, Zap, BarChart3, Shield, Globe, Smartphone, CreditCard, Users, CheckCircle2, ArrowRight, Sparkles, Clock } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Brain,
    title: "AI Resume Parser",
    description: "Upload your PDF resume. Our AI extracts skills, experience, projects, and generates professional copy in seconds.",
    color: "from-[#06B6D4] to-[#3B82F6]",
    benefits: ["Extracts 40+ data points", "Understands context & role", "Multi-language support"],
  },
  {
    icon: Zap,
    title: "Instant Portfolio Generation",
    description: "Choose from 10+ modern templates. Everything is responsive, SEO-optimized, and ready to share immediately.",
    color: "from-[#3B82F6] to-[#8B5CF6]",
    benefits: ["30-second setup", "10+ premium templates", "One-click publish"],
  },
  {
    icon: CreditCard,
    title: "NFC Smart Cards",
    description: "Tap your card on any phone—iOS or Android. No app required. Your portfolio opens in {'<'}100ms.",
    color: "from-[#F59E0B] to-[#EF4444]",
    benefits: ["iOS & Android ready", "Sub-100ms load time", "Unlimited taps"],
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "See who viewed your portfolio, how long they stayed, and which sections they focused on. Session replays included.",
    color: "from-[#10B981] to-[#06B6D4]",
    benefits: ["Live visitor tracking", "Geolocation data", "CRM integration"],
  },
  {
    icon: Users,
    title: "Lead Capture",
    description: "Visitors can instantly share their contact info. Auto-syncs to your dashboard or CRM (HubSpot, Salesforce).",
    color: "from-[#EF4444] to-[#F59E0B]",
    benefits: ["98% capture rate", "Auto-sync to CRM", "GDPR compliant"],
  },
  {
    icon: Globe,
    title: "Custom Domains",
    description: "Use your own domain (yourname.com) or get a free velox.to/yourname subdomain.",
    color: "from-[#8B5CF6] to-[#EC4899]",
    benefits: ["Free SSL certificates", "Auto DNS setup", "No technical skills"],
  },
  {
    icon: Smartphone,
    title: "Progressive Web App",
    description: "Works offline after the first load. Visitors can install it on their home screen like a native app.",
    color: "from-[#06B6D4] to-[#10B981]",
    benefits: ["Offline access", "Native app UX", "No app store needed"],
  },
  {
    icon: Shield,
    title: "Enterprise Controls",
    description: "Brand locking, team management, SSO, compliance reports—everything large orgs need.",
    color: "from-[#3B82F6] to-[#06B6D4]",
    benefits: ["SSO & SAML", "Team permissions", "Audit logs"],
  },
];

const useCases = [
  {
    icon: Sparkles,
    title: "Conference Networking",
    scenario: "You meet 50 people at a conference. With Velox, all 50 have your portfolio. Zero cards lost.",
    color: "#06B6D4",
  },
  {
    icon: Clock,
    title: "Investor Meetings",
    scenario: "Context-aware portfolios. Show financials to investors, case studies to clients—automatically.",
    color: "#3B82F6",
  },
  {
    icon: Shield,
    title: "Sales Teams",
    scenario: "Track every prospect interaction. Know who's interested, who needs follow-up, who's ready to close.",
    color: "#F59E0B",
  },
];

export default function FeaturesPage() {
  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#06B6D4]/20 to-[#3B82F6]/20 blur-3xl"
        />
        
        <div className="mx-auto max-w-7xl relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-block p-4 rounded-2xl bg-gradient-to-br from-[#06B6D4]/20 to-[#3B82F6]/20 mb-8"
            >
              <Sparkles className="w-10 h-10 text-[#06B6D4]" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Everything You Need.{" "}
              <span className="bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] bg-clip-text text-transparent">
                Nothing You Don{'\''} t.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Velox combines AI, NFC, and analytics into one seamless platform. No complexity. Just results.
            </p>
          </motion.div>

          {/* Use Cases */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative group"
              >
                <div className="p-8 rounded-2xl bg-card border border-border hover:border-[#06B6D4]/50 transition-all hover:shadow-2xl">
                  <div 
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 group-hover:scale-110 transition-transform"
                    style={{ background: `linear-gradient(135deg, ${useCase.color}20, ${useCase.color}40)` }}
                  >
                    <useCase.icon className="w-8 h-8" style={{ color: useCase.color }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{useCase.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{useCase.scenario}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-background to-primary/5">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Built for <span className="text-[#06B6D4]">Performance</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every feature designed to make networking faster, smarter, and more effective.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-2xl"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />
                <div className="relative">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-12 h-12 rounded-xl bg-linear-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{feature.description}</p>
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#06B6D4] mt-0.5 shrink-0" />
                        <span className="text-xs text-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="relative py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 md:p-16 rounded-3xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] border border-[#06B6D4]/20 text-center shadow-2xl"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-block p-4 rounded-2xl bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] mb-8"
            >
              <Globe className="w-12 h-12 text-white" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Plays Well With Others
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Velox integrates with your existing tools. Salesforce, HubSpot, Zapier, Slack—if you use it, we connect to it.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {["Salesforce", "HubSpot", "Zapier", "Slack", "Google Workspace", "Microsoft Teams"].map((tool, index) => (
                <motion.div
                  key={tool}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="px-6 py-3 rounded-full bg-white/10 text-white font-medium backdrop-blur-sm border border-white/20"
                >
                  {tool}
                </motion.div>
              ))}
            </div>
            <Link href="/auth/onboarding">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] px-10 py-5 text-xl font-bold text-white shadow-2xl shadow-[#06B6D4]/30"
              >
                <span>Start Your Free Trial</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </motion.button>
            </Link>
            <p className="text-sm text-gray-400 mt-6">No credit card required · 14-day free trial · Cancel anytime</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

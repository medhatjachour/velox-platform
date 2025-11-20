"use client";
import { motion } from "framer-motion";
import { Check, Zap, Crown, Building2, ArrowRight } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying Velox",
    icon: Zap,
    gradient: "from-gray-400 to-gray-600",
    features: [
      "1 AI portfolio generation",
      "Basic templates (3 designs)",
      "Velox subdomain",
      "NFC tap tracking",
      "Email support",
      "Velox branding",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "per month",
    description: "For professionals who network",
    icon: Crown,
    gradient: "from-[#06B6D4] to-[#3B82F6]",
    features: [
      "Unlimited AI generations",
      "10+ premium templates",
      "Custom domain (yourname.com)",
      "Advanced analytics & session replays",
      "Lead capture & CRM sync",
      "Remove Velox branding",
      "Priority support",
      "API access",
    ],
    cta: "Start 14-Day Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$49",
    period: "per month + $5/user",
    description: "For teams and organizations",
    icon: Building2,
    gradient: "from-[#F59E0B] to-[#EF4444]",
    features: [
      "Everything in Pro",
      "Team management (unlimited users)",
      "Brand locking & white-label",
      "SSO & SAML authentication",
      "Bulk NFC card ordering",
      "Dedicated account manager",
      "Custom integrations",
      "SLA & compliance reports",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 0],
        }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute -top-60 -left-60 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#06B6D4]/10 to-[#3B82F6]/10 blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, -180, 0],
        }}
        transition={{ duration: 30, repeat: Infinity }}
        className="absolute -bottom-60 -right-60 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#F59E0B]/10 to-[#EF4444]/10 blur-3xl"
      />

      <section className="relative py-32 px-6">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
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
              className="inline-block p-4 rounded-2xl bg-gradient-to-br from-[#06B6D4]/20 to-[#F59E0B]/20 mb-8"
            >
              <Crown className="w-10 h-10 text-[#06B6D4]" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Simple, Transparent{" "}
              <span className="bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Start free. Upgrade when you{'\''} re ready. Cancel anytime. No hidden fees.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className={`relative p-8 rounded-3xl bg-card border-2 transition-all ${
                  plan.popular
                    ? "border-[#06B6D4] shadow-2xl shadow-[#06B6D4]/20"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="px-6 py-2 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] text-white font-bold text-sm shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">{plan.period}</span>
                </div>

                <Link href={plan.name === "Enterprise" ? "/contact" : "/auth/onboarding"}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all mb-8 ${
                      plan.popular
                        ? "bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] text-white shadow-lg shadow-[#06B6D4]/30"
                        : "bg-card border-2 border-border hover:border-primary/50"
                    }`}
                  >
                    {plan.cta}
                  </motion.button>
                </Link>

                <div className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 mt-0.5 shrink-0 ${plan.popular ? 'text-[#06B6D4]' : 'text-muted-foreground'}`} />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-center mb-12">
              Frequently Asked <span className="text-[#06B6D4]">Questions</span>
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "Can I switch plans anytime?",
                  a: "Yes. Upgrade or downgrade instantly. Changes take effect immediately.",
                },
                {
                  q: "Do you offer discounts for annual billing?",
                  a: "Yes! Get 2 months free when you pay annually. That's 20% off.",
                },
                {
                  q: "What happens if I cancel?",
                  a: "Your portfolio stays live until the end of your billing period. Export your data anytime.",
                },
                {
                  q: "Can I try Pro features before paying?",
                  a: "Absolutely. 14-day free trial. No credit card required. Cancel anytime.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-[#06B6D4]/50 transition-all"
                >
                  <h3 className="text-xl font-bold mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-24 p-12 md:p-16 rounded-3xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] border border-[#06B6D4]/20 text-center shadow-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Our team is here to help. Book a demo or chat with us directly.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] px-10 py-5 text-xl font-bold text-white shadow-2xl shadow-[#06B6D4]/30"
              >
                <span>Contact Sales</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

"use client";
import Hero from "../components/marketing/Hero";
import { motion } from "framer-motion";
import { Brain, Zap, TrendingUp, Users, Clock, Award, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <Hero />

      {/* The Story Section - Why we built this */}
      <section id="story" className="relative py-32 px-6 bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-block p-3 rounded-2xl bg-gradient-to-br from-[#06B6D4]/20 to-[#3B82F6]/20 mb-6"
            >
              <Sparkles className="w-8 h-8 text-[#06B6D4]" />
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              The Problem We Solved
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Picture this: You{'\''}re at a conference. You meet 47 people. You exchange 47 paper cards. You get home, and 42 of them are in your pocket, crumpled. 5 made it to your desk. You remember... 2 names.
            </p>
          </motion.div>

          {/* Pain Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                problem: "Paper cards get lost",
                solution: "Digital never dies",
                stat: "89% of cards are thrown away within a week",
              },
              {
                problem: "LinkedIn requests get ignored",
                solution: "NFC tap = instant connection",
                stat: "3x higher response rate vs traditional methods",
              },
              {
                problem: "Your story gets forgotten",
                solution: "AI keeps it fresh & relevant",
                stat: "Portfolios updated in 30 seconds, not 3 hours",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative group"
              >
                <div className="p-8 rounded-2xl bg-card border border-border hover:border-[#06B6D4]/50 transition-all hover:shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4]/5 to-[#3B82F6]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="text-red-500 font-semibold mb-2 line-through">{item.problem}</div>
                    <div className="text-2xl font-bold text-[#06B6D4] mb-4">✓ {item.solution}</div>
                    <div className="text-sm text-muted-foreground">{item.stat}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* The Velox Way - Storytelling Journey */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#06B6D4] via-[#3B82F6] to-[#F59E0B] -translate-x-1/2 hidden md:block" />
            
            <div className="space-y-24">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                <div className="order-2 md:order-1">
                  <motion.div
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    className="relative p-8 rounded-3xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] border border-[#06B6D4]/20 shadow-2xl"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4]/10 to-transparent rounded-3xl" />
                    <div className="relative">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] flex items-center justify-center">
                          <Brain className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-white">
                          <div className="font-bold text-2xl">Upload Resume</div>
                          <div className="text-gray-400">AI analyzes instantly</div>
                        </div>
                      </div>
                      <motion.div
                        animate={{ width: ["0%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                        className="h-2 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] rounded-full"
                      />
                    </div>
                  </motion.div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#06B6D4]/10 text-[#06B6D4] font-bold mb-4">
                    Step 1 · 10 seconds
                  </div>
                  <h3 className="text-3xl font-bold mb-4">AI Reads Your Story</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Our AI doesn{'\''}t just scan—it <span className="text-foreground font-semibold">understands</span>. Skills, experience, achievements, personality. In 10 seconds, it knows your professional DNA better than your LinkedIn profile ever did.
                  </p>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#06B6D4] mt-1 flex-shrink-0" />
                    <span className="text-foreground">Extracts 40+ data points from your resume automatically</span>
                  </div>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] font-bold mb-4">
                    Step 2 · 15 seconds
                  </div>
                  <h3 className="text-3xl font-bold mb-4">AI Writes Your Portfolio</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Not templates. Not copy-paste. <span className="text-foreground font-semibold">Original, compelling copy</span> that tells YOUR story. Investor pitch? Case study? Cover letter? Done. Done. Done.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#3B82F6] mt-1 flex-shrink-0" />
                      <span className="text-foreground">Professional bio + project descriptions + pitch deck</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#3B82F6] mt-1 flex-shrink-0" />
                      <span className="text-foreground">SEO-optimized for discoverability</span>
                    </div>
                  </div>
                </div>
                <div>
                  <motion.div
                    whileHover={{ scale: 1.05, rotateY: -5 }}
                    className="relative p-8 rounded-3xl bg-card border border-border shadow-2xl"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="space-y-4">
                      <motion.div
                        animate={{ width: ["60%", "90%", "60%"] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="h-4 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] rounded-full"
                      />
                      <motion.div
                        animate={{ width: ["40%", "70%", "40%"] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                        className="h-4 bg-gradient-to-r from-[#06B6D4] to-[#F59E0B] rounded-full"
                      />
                      <motion.div
                        animate={{ width: ["70%", "85%", "70%"] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                        className="h-4 bg-gradient-to-r from-[#F59E0B] to-[#3B82F6] rounded-full"
                      />
                      <div className="pt-4">
                        <div className="text-2xl font-bold text-foreground">✨ Content Generated</div>
                        <div className="text-muted-foreground mt-2">Professional. Unique. Yours.</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                <div className="order-2 md:order-1">
                  <motion.div
                    animate={{
                      rotateY: [0, 5, 0, -5, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="relative p-8 rounded-3xl bg-gradient-to-br from-[#F59E0B]/20 to-[#06B6D4]/20 border border-[#F59E0B]/30 shadow-2xl"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="text-center">
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 360],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="inline-block w-32 h-32 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#06B6D4] flex items-center justify-center mb-6 shadow-2xl shadow-[#F59E0B]/30"
                      >
                        <Zap className="w-16 h-16 text-white" />
                      </motion.div>
                      <div className="text-3xl font-bold text-foreground mb-2">Tap. Share. Done.</div>
                      <div className="text-muted-foreground">Works on iOS & Android</div>
                    </div>
                  </motion.div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] font-bold mb-4">
                    Step 3 · 1 second
                  </div>
                  <h3 className="text-3xl font-bold mb-4">NFC Magic Happens</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    No QR codes. No {'"'}Add me on LinkedIn.{'"'} Just tap your Velox card on any phone. <span className="text-foreground font-semibold">Boom. Your portfolio. Their screen. Instant.</span>
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#F59E0B] mt-1 flex-shrink-0" />
                      <span className="text-foreground">No app download required</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#F59E0B] mt-1 flex-shrink-0" />
                      <span className="text-foreground">Opens in {'<'}100ms (faster than a QR scan)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#F59E0B] mt-1 flex-shrink-0" />
                      <span className="text-foreground">Every tap tracked with location & time data</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-background to-primary/5">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Trusted by <span className="bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] bg-clip-text text-transparent">Modern Professionals</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From freelancers to Fortune 500 teams—everyone who networks seriously uses Velox.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            {[
              { icon: Users, stat: "12,000+", label: "Active Users" },
              { icon: Zap, stat: "300K+", label: "Connections Made" },
              { icon: TrendingUp, stat: "98%", label: "Lead Capture Rate" },
              { icon: Award, stat: "4.9/5", label: "User Rating" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="p-8 rounded-2xl bg-card border border-border text-center hover:border-[#06B6D4]/50 transition-all hover:shadow-2xl"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#06B6D4]/20 to-[#3B82F6]/20 mb-4">
                  <item.icon className="w-8 h-8 text-[#06B6D4]" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] bg-clip-text text-transparent mb-2">
                  {item.stat}
                </div>
                <div className="text-muted-foreground font-medium">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4]/10 via-background to-[#F59E0B]/10" />
        <div className="mx-auto max-w-4xl text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-12 rounded-3xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] border border-[#06B6D4]/20 shadow-2xl"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-block p-4 rounded-2xl bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] mb-6"
            >
              <Clock className="w-12 h-12 text-white" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Your Network Is Waiting
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Every day without Velox is a missed connection. A lost lead. A forgotten story. Start now. It takes 30 seconds.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/auth/onboarding"
                className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] px-10 py-5 text-xl font-bold text-white shadow-2xl shadow-[#06B6D4]/30 transition-all"
              >
                <span>Create Your Portfolio — Free</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
            <p className="text-sm text-gray-400 mt-6">No credit card required · Cancel anytime · 14-day free trial</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

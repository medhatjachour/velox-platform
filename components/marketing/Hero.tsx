"use client";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-background via-background to-primary/5">
      {/* Animated 3D background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      
      {/* Floating 3D orbs with exact logo colors */}
      <motion.div
        style={{ y }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-20 right-20 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] opacity-20 blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]) }}
        animate={{
          scale: [1, 1.3, 1],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-20 left-20 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-[#F59E0B] to-[#06B6D4] opacity-15 blur-3xl"
      />

      <motion.div style={{ opacity }} className="relative mx-auto max-w-7xl px-6 py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left side - The Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#06B6D4]/10 to-[#3B82F6]/10 border border-[#06B6D4]/20"
            >
              <Sparkles className="w-4 h-4 text-[#06B6D4]" />
              <span className="text-sm font-semibold bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] bg-clip-text text-transparent">
                AI + NFC Technology
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight"
            >
              Meet Once.
              <br />
              <span className="bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent animate-gradient">
                Remember Forever.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl leading-relaxed text-foreground/80"
            >
              You work hard. Your network matters. But paper cards get lost, LinkedIn gets ignored, and your story gets forgotten.
              <br /><br />
              <span className="font-semibold text-foreground">Velox changes everything.</span> One tap. Instant portfolio. Captured leads. No app. No friction. Just pure, professional impact.
            </motion.p>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-6 pt-4"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#06B6D4]" />
                <span className="text-sm font-medium text-foreground/90">No app required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#06B6D4]" />
                <span className="text-sm font-medium text-foreground/90">Works on all phones</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#06B6D4]" />
                <span className="text-sm font-medium text-foreground/90">Ready in 30 seconds</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/auth/onboarding"
                  className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] px-8 py-5 text-lg font-bold text-white shadow-2xl shadow-[#06B6D4]/25 transition-all"
                >
                  <span>Start Free in 30s</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="#story"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl border-2 border-[#06B6D4]/30 bg-card/50 backdrop-blur-sm px-8 py-5 text-lg font-bold text-foreground hover:border-[#06B6D4] hover:bg-[#06B6D4]/5 transition-all"
                >
                  See Our Story
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-border"
            >
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] bg-clip-text text-transparent">12K+</div>
                <div className="text-sm text-muted-foreground mt-1">Professionals</div>
              </div>
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] bg-clip-text text-transparent">300K+</div>
                <div className="text-sm text-muted-foreground mt-1">Connections Made</div>
              </div>
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] bg-clip-text text-transparent">98%</div>
                <div className="text-sm text-muted-foreground mt-1">Lead Capture Rate</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - 3D Animated Card Demo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            {/* 3D Card with perspective */}
            <motion.div
              animate={{
                rotateY: [0, 5, 0, -5, 0],
                rotateX: [0, -5, 0, 5, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transformStyle: "preserve-3d", perspective: 1000 }}
              className="relative"
            >
              {/* NFC Card Mockup */}
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 10 }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative w-[340px] h-[540px] rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] p-8 shadow-2xl border border-[#06B6D4]/20"
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#06B6D4]/10 via-transparent to-[#F59E0B]/10" />
                
                {/* Content */}
                <div className="relative h-full flex flex-col justify-between text-white">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] flex items-center justify-center text-2xl font-bold">
                        V
                      </div>
                      <div>
                        <div className="font-bold text-lg">John Doe</div>
                        <div className="text-sm text-gray-400">Product Designer</div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-8">
                      <motion.div
                        animate={{ width: ["70%", "90%", "70%"] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="h-3 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] rounded-full"
                      />
                      <motion.div
                        animate={{ width: ["50%", "75%", "50%"] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                        className="h-3 bg-gradient-to-r from-[#3B82F6] to-[#F59E0B] rounded-full"
                      />
                    </div>
                  </div>

                  {/* NFC Chip Animation */}
                  <div className="flex justify-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        boxShadow: [
                          "0 0 0 0 rgba(6, 182, 212, 0.4)",
                          "0 0 0 20px rgba(6, 182, 212, 0)",
                          "0 0 0 0 rgba(6, 182, 212, 0)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] flex items-center justify-center"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full"
                      />
                    </motion.div>
                  </div>

                  <div className="text-center text-sm text-gray-400">
                    Tap to connect
                  </div>
                </div>

                {/* Shine effect */}
                <motion.div
                  animate={{ x: [-100, 400], opacity: [0, 0.5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                />
              </motion.div>

              {/* Floating elements around card */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-8 -right-8 bg-[#F59E0B] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
              >
                +127 Leads
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, -10, 0],
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-8 -left-8 bg-[#06B6D4] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
              >
                3.2K Views
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-current rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

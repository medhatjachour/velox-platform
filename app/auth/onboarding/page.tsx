"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Upload, Brain, Sparkles, CheckCircle2, ArrowRight, ArrowLeft, Loader2, AlertCircle, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [existingUser, setExistingUser] = useState<any>(null);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    firstName: "",
    lastName: "",
    resumeFile: null as File | null,
  });

  const checkEmailExists = async (email: string) => {
    if (!email || !email.includes("@")) return;
    
    setCheckingEmail(true);
    setError("");
    setExistingUser(null);

    try {
      const response = await fetch("/api/auth/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.exists) {
        setExistingUser(data.user);
      }
    } catch (err) {
      console.error("Error checking email:", err);
    } finally {
      setCheckingEmail(false);
    }
  };

  const handleEmailBlur = () => {
    if (formData.email) {
      checkEmailExists(formData.email);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, resumeFile: file });
      setTimeout(() => setStep(3), 1000); // Auto-advance
    }
  };

  const handleContinue = async () => {
    // Check email one more time before proceeding
    if (existingUser) {
      setError("This email is already registered. Please sign in instead.");
      return;
    }

    setStep(2);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          username: formData.username,
          firstName: formData.firstName,
          lastName: formData.lastName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setStep(4);
    } catch (err: any) {
      setError(err.message || "An error occurred during registration");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* Progress bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    i <= step
                      ? "bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] text-white"
                      : "bg-card border border-border text-muted-foreground"
                  }`}
                >
                  {i < step ? <CheckCircle2 className="w-5 h-5" /> : i}
                </motion.div>
                {i < 4 && (
                  <div
                    className={`h-1 w-20 mx-2 rounded-full transition-all ${
                      i < step ? "bg-gradient-to-r from-[#06B6D4] to-[#3B82F6]" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Account</span>
            <span>Upload Resume</span>
            <span>AI Magic</span>
            <span>Done!</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Account Creation */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8 md:p-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block p-3 rounded-2xl bg-gradient-to-br from-[#06B6D4]/20 to-[#3B82F6]/20 mb-6"
                >
                  <Sparkles className="w-8 h-8 text-[#06B6D4]" />
                </motion.div>
                <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
                <p className="text-muted-foreground mb-8">Join 12,000+ professionals already on Velox</p>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">First Name</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Last Name</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Username</label>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
                      placeholder="johndoe"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Your portfolio URL: velox.ai/{formData.username || "username"}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <div className="relative">
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          setExistingUser(null);
                          setError("");
                        }}
                        onBlur={handleEmailBlur}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          existingUser ? "border-amber-500" : "border-border"
                        } bg-card focus:outline-none focus:ring-2 focus:ring-[#06B6D4]`}
                        placeholder="john@example.com"
                      />
                      {checkingEmail && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <Loader2 className="w-4 h-4 animate-spin text-[#06B6D4]" />
                        </div>
                      )}
                    </div>
                    {existingUser && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-start gap-2"
                      >
                        <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
                            This email is already registered
                          </p>
                          <p className="text-xs text-amber-600/80 dark:text-amber-400/80 mt-1">
                            Account created on {new Date(existingUser.createdAt).toLocaleDateString()}
                          </p>
                          <Link
                            href="/auth/login"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 mt-2"
                          >
                            <LogIn className="w-4 h-4" />
                            Sign in instead
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Password</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
                      placeholder="••••••••"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Minimum 8 characters
                    </p>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-2"
                    >
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </motion.div>
                  )}

                  <Button
                    onClick={handleContinue}
                    disabled={!formData.email || !formData.password || !formData.username || !!existingUser || checkingEmail}
                    className="w-full py-6 text-lg font-bold rounded-xl bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {checkingEmail ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Checking...
                      </>
                    ) : (
                      <>
                        Continue
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="text-[#06B6D4] font-semibold hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Resume Upload */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8 md:p-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block p-3 rounded-2xl bg-gradient-to-br from-[#06B6D4]/20 to-[#3B82F6]/20 mb-6"
                >
                  <Upload className="w-8 h-8 text-[#06B6D4]" />
                </motion.div>
                <h1 className="text-3xl font-bold mb-2">Upload Your Resume</h1>
                <p className="text-muted-foreground mb-8">
                  Our AI will analyze it and create your portfolio in seconds
                </p>

                <label className="block">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="border-2 border-dashed border-border hover:border-[#06B6D4] rounded-2xl p-16 text-center cursor-pointer transition-all group"
                  >
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="inline-block p-6 rounded-full bg-gradient-to-br from-[#06B6D4]/10 to-[#3B82F6]/10 mb-4 group-hover:from-[#06B6D4]/20 group-hover:to-[#3B82F6]/20"
                    >
                      <Upload className="w-12 h-12 text-[#06B6D4]" />
                    </motion.div>
                    <p className="text-lg font-semibold mb-2">Drop your resume here</p>
                    <p className="text-sm text-muted-foreground">
                      or click to browse · PDF, DOC, DOCX
                    </p>
                  </motion.div>
                </label>

                <div className="mt-8 flex items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="px-6 py-3 rounded-xl"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    variant="ghost"
                    className="text-muted-foreground"
                  >
                    Skip for now
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 3: AI Processing */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8 md:p-12 text-center">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-block p-6 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] mb-8"
                >
                  <Brain className="w-16 h-16 text-white" />
                </motion.div>
                <h1 className="text-3xl font-bold mb-2">AI is Creating Your Portfolio</h1>
                <p className="text-muted-foreground mb-12">
                  Analyzing your experience, generating compelling copy...
                </p>

                <div className="space-y-6 max-w-md mx-auto">
                  {[
                    { text: "Extracting skills & experience", delay: 0 },
                    { text: "Writing professional bio", delay: 1000 },
                    { text: "Generating project descriptions", delay: 2000 },
                    { text: "Optimizing for SEO", delay: 3000 },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: item.delay / 1000 }}
                      className="flex items-center gap-4 text-left"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: item.delay / 1000 + 0.5 }}
                      >
                        <CheckCircle2 className="w-6 h-6 text-[#06B6D4]" />
                      </motion.div>
                      <span className="text-foreground">{item.text}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 4 }}
                >
                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="mt-12 px-8 py-6 text-lg font-bold rounded-xl bg-gradient-to-r from-[#06B6D4] to-[#3B82F6]"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        Complete Setup
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </Card>
            </motion.div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 md:p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="inline-block p-6 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] mb-8"
                >
                  <CheckCircle2 className="w-16 h-16 text-white" />
                </motion.div>
                <h1 className="text-4xl font-bold mb-4">🎉 You're All Set!</h1>
                <p className="text-xl text-muted-foreground mb-12">
                  Your professional portfolio is ready to share
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  <Card className="p-6 text-left border-[#06B6D4]/30">
                    <h3 className="font-bold text-lg mb-2">Your Portfolio URL</h3>
                    <p className="text-[#06B6D4] font-mono">
                      velox.ai/{formData.username}
                    </p>
                  </Card>
                  <Card className="p-6 text-left border-[#3B82F6]/30">
                    <h3 className="font-bold text-lg mb-2">NFC Card</h3>
                    <p className="text-muted-foreground">
                      Order yours to start networking
                    </p>
                  </Card>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => (window.location.href = "/dashboard")}
                    className="px-8 py-6 text-lg font-bold rounded-xl bg-gradient-to-r from-[#06B6D4] to-[#3B82F6]"
                  >
                    Go to Dashboard
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    onClick={() => (window.location.href = "/shop")}
                    variant="outline"
                    className="px-8 py-6 text-lg font-bold rounded-xl"
                  >
                    Order NFC Card
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

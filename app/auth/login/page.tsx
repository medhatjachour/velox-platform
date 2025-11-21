"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in cookie
        document.cookie = `auth-token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}`;
        window.location.href = "/dashboard";
      } else {
        alert(data.error || "Login failed");
      }
    } catch {
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 md:p-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block p-3 rounded-2xl bg-gradient-to-br from-[#06B6D4]/20 to-[#3B82F6]/20 mb-6"
            >
              <Sparkles className="w-8 h-8 text-[#06B6D4]" />
            </motion.div>

            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground mb-8">
              Sign in to continue to your Velox dashboard
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
                  placeholder="••••••••"
                  required
                />
                <div className="text-right mt-2">
                  <a href="#" className="text-sm text-[#06B6D4] hover:underline">
                    Forgot password?
                  </a>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full py-6 text-lg font-bold rounded-xl bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] hover:shadow-2xl transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/auth/onboarding" className="text-[#06B6D4] font-semibold hover:underline">
                  Create one for free
                </Link>
              </p>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import Sidebar from "@/components/dashboard/Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  user: {
    name: string;
    email: string;
    role: string;
    avatarUrl?: string;
  };
}

export default function DashboardLayout({ children, user }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-[#06B6D4]/5">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 5 }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-[#F59E0B] to-[#06B6D4] rounded-full blur-3xl"
        />
      </div>

      <Sidebar user={user} />
      
      <main className="lg:ml-[280px] min-h-screen">
        <div className="p-6 md:p-8 lg:p-12">
          {children}
        </div>
      </main>
    </div>
  );
}

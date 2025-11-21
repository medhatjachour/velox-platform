"use client";
import { motion } from "framer-motion";
import { 
  Eye, 
  Users, 
  Zap, 
  TrendingUp, 
  ArrowUpRight, 
  Sparkles,
  CreditCard,
  Calendar
} from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function DashboardPage() {
  // Mock user data - in real app, get from auth
  const user = {
    name: "John Doe",
    email: "john@example.com",
    role: "USER",
  };

  const stats = [
    {
      label: "Portfolio Views",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: Eye,
      color: "#06B6D4",
      gradient: "from-[#06B6D4] to-[#3B82F6]",
    },
    {
      label: "NFC Card Taps",
      value: "384",
      change: "+8.2%",
      trend: "up",
      icon: Zap,
      color: "#F59E0B",
      gradient: "from-[#F59E0B] to-[#06B6D4]",
    },
    {
      label: "Connections Made",
      value: "156",
      change: "+24.1%",
      trend: "up",
      icon: Users,
      color: "#3B82F6",
      gradient: "from-[#3B82F6] to-[#06B6D4]",
    },
    {
      label: "Engagement Rate",
      value: "68%",
      change: "+5.3%",
      trend: "up",
      icon: TrendingUp,
      color: "#10B981",
      gradient: "from-[#10B981] to-[#06B6D4]",
    },
  ];

  const recentActivity = [
    { type: "view", user: "Sarah Chen", action: "viewed your portfolio", time: "2 min ago", avatar: "S" },
    { type: "tap", user: "Michael Ross", action: "tapped your NFC card", time: "15 min ago", avatar: "M" },
    { type: "connection", user: "Emma Wilson", action: "connected with you", time: "1 hour ago", avatar: "E" },
    { type: "view", user: "David Kim", action: "viewed your projects", time: "2 hours ago", avatar: "D" },
  ];

  const quickActions = [
    {
      title: "Generate AI Content",
      description: "Create bio, headline, or project descriptions",
      icon: Sparkles,
      href: "/dashboard/ai",
      color: "#F59E0B",
      gradient: "from-[#F59E0B] to-[#06B6D4]",
    },
    {
      title: "Order NFC Cards",
      description: "Get physical cards to share your portfolio",
      icon: CreditCard,
      href: "/dashboard/cards",
      color: "#06B6D4",
      gradient: "from-[#06B6D4] to-[#3B82F6]",
    },
    {
      title: "View Analytics",
      description: "Deep dive into your performance metrics",
      icon: TrendingUp,
      href: "/dashboard/analytics",
      color: "#3B82F6",
      gradient: "from-[#3B82F6] to-[#06B6D4]",
    },
  ];

  return (
    <DashboardLayout user={user}>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] to-[#F59E0B] bg-clip-text text-transparent">
                Welcome back, {user.name.split(" ")[0]}! 👋
              </h1>
              <p className="text-muted-foreground mt-2">
                Here's what's happening with your portfolio today
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="relative p-6 bg-card/50 backdrop-blur-sm border-border hover:border-[#06B6D4]/50 transition-all overflow-hidden group">
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
                  
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} bg-opacity-10`}>
                        <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                      </div>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-center gap-1 text-sm font-semibold text-green-500"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                        {stat.change}
                      </motion.div>
                    </div>
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="text-3xl font-bold text-foreground mb-1"
                    >
                      {stat.value}
                    </motion.h3>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="lg:col-span-2 space-y-4"
          >
            <h2 className="text-2xl font-bold text-foreground">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <Link key={action.title} href={action.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card className="relative p-6 bg-card/50 backdrop-blur-sm border-border hover:border-[#06B6D4]/50 transition-all overflow-hidden group cursor-pointer">
                      <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
                      <div className="relative">
                        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${action.gradient} mb-4`}>
                          <action.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-bold text-foreground mb-2">{action.title}</h3>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                        <motion.div
                          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                          whileHover={{ x: 4 }}
                        >
                          <ArrowUpRight className="w-5 h-5 text-[#06B6D4]" />
                        </motion.div>
                      </div>
                    </Card>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-foreground">Recent Activity</h2>
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                    className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] flex items-center justify-center text-white font-bold flex-shrink-0">
                      {activity.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">
                        <span className="font-semibold">{activity.user}</span>{" "}
                        <span className="text-muted-foreground">{activity.action}</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Link href="/dashboard/analytics">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 py-2 text-sm font-medium text-[#06B6D4] hover:text-[#3B82F6] transition-colors"
                >
                  View All Activity →
                </motion.button>
              </Link>
            </Card>
          </motion.div>
        </div>

        {/* Portfolio Preview CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <Card className="relative p-8 bg-gradient-to-r from-[#06B6D4]/10 via-[#3B82F6]/10 to-[#F59E0B]/10 border-[#06B6D4]/30 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] to-[#F59E0B] opacity-5" />
            <div className="relative flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Your portfolio is live! 🎉
                </h3>
                <p className="text-muted-foreground mb-4">
                  Share it with the world and start making connections
                </p>
                <div className="flex items-center gap-4">
                  <Link href={`/p/${user.email.split("@")[0]}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                      View Portfolio
                    </motion.button>
                  </Link>
                  <Link href="/dashboard/portfolio">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-card border border-border text-foreground font-bold rounded-xl hover:border-[#06B6D4]/50 transition-all"
                    >
                      Edit Portfolio
                    </motion.button>
                  </Link>
                </div>
              </div>
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="hidden lg:block"
              >
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] flex items-center justify-center text-white text-6xl">
                  🚀
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

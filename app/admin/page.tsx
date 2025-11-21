"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  DollarSign,
  Briefcase,
  CreditCard,
  TrendingUp,
  Shield,
  Activity,
  Settings,
  AlertCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AdminStats {
  users: {
    total: number;
    active: number;
    recentSignups: number;
    bySubscription: Array<{ tier: string; count: number }>;
  };
  portfolios: {
    total: number;
    published: number;
  };
  teams: {
    total: number;
  };
  nfcCards: {
    total: number;
  };
  orders: {
    total: number;
    revenue: number;
  };
  growth: {
    daily: Array<{ date: string; count: number }>;
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-muted-foreground">Failed to load statistics</p>
          <Button onClick={fetchStats} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats.users.total,
      change: `+${stats.users.recentSignups} this month`,
      icon: Users,
      gradient: "from-[#06B6D4] to-[#3B82F6]",
    },
    {
      title: "Active Users",
      value: stats.users.active,
      change: `${Math.round((stats.users.active / stats.users.total) * 100)}% of total`,
      icon: Activity,
      gradient: "from-[#10B981] to-[#06B6D4]",
    },
    {
      title: "Total Revenue",
      value: `$${stats.orders.revenue.toLocaleString()}`,
      change: `${stats.orders.total} orders`,
      icon: DollarSign,
      gradient: "from-[#F59E0B] to-[#EF4444]",
    },
    {
      title: "Portfolios",
      value: stats.portfolios.total,
      change: `${stats.portfolios.published} published`,
      icon: Briefcase,
      gradient: "from-[#8B5CF6] to-[#3B82F6]",
    },
    {
      title: "Teams",
      value: stats.teams.total,
      change: "Active teams",
      icon: Shield,
      gradient: "from-[#EC4899] to-[#8B5CF6]",
    },
    {
      title: "NFC Cards",
      value: stats.nfcCards.total,
      change: "Total cards",
      icon: CreditCard,
      gradient: "from-[#06B6D4] to-[#10B981]",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Platform overview and management
            </p>
          </div>
          <Button className="gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} bg-opacity-10`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  {stat.title}
                </h3>
                <p className="text-3xl font-bold mb-2">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.change}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Subscription Distribution */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Subscription Distribution</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.users.bySubscription.map((sub) => (
              <div
                key={sub.tier}
                className="p-4 bg-card/50 rounded-xl border border-border"
              >
                <p className="text-sm text-muted-foreground mb-1">{sub.tier}</p>
                <p className="text-2xl font-bold">{sub.count}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.round((sub.count / stats.users.total) * 100)}% of users
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-6 flex-col gap-2">
              <Users className="w-6 h-6" />
              Manage Users
            </Button>
            <Button variant="outline" className="h-auto py-6 flex-col gap-2">
              <Briefcase className="w-6 h-6" />
              View Portfolios
            </Button>
            <Button variant="outline" className="h-auto py-6 flex-col gap-2">
              <DollarSign className="w-6 h-6" />
              Orders
            </Button>
            <Button variant="outline" className="h-auto py-6 flex-col gap-2">
              <Settings className="w-6 h-6" />
              System Config
            </Button>
          </div>
        </Card>

        {/* Recent Growth */}
        {stats.growth.daily.length > 0 && (
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">User Growth (Last 7 Days)</h2>
            <div className="flex items-end gap-2 h-40">
              {stats.growth.daily.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="flex-1 w-full flex items-end">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(day.count / Math.max(...stats.growth.daily.map(d => d.count))) * 100}%` }}
                      transition={{ delay: index * 0.1 }}
                      className="w-full bg-gradient-to-t from-[#06B6D4] to-[#3B82F6] rounded-t-lg"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </p>
                  <p className="text-sm font-bold">{day.count}</p>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

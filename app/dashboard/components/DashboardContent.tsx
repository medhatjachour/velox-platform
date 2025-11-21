'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Plus, Eye, TrendingUp, Users, Zap, Sparkles, CreditCard, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CountUp from 'react-countup';

interface Stats {
  portfolios: number;
  totalViews: number;
  nfcCards: number;
  leads: number;
}

export default function DashboardContent({ stats }: { stats: Stats }) {
  const statCards = [
    { 
      name: 'Total Portfolios', 
      value: stats.portfolios, 
      change: '+2 this month', 
      icon: Eye, 
      gradient: 'from-[#06B6D4] to-[#3B82F6]',
      glowColor: 'shadow-[#06B6D4]/20'
    },
    { 
      name: 'Total Views', 
      value: stats.totalViews, 
      change: '+18% from last month', 
      icon: TrendingUp, 
      gradient: 'from-[#3B82F6] to-[#8B5CF6]',
      glowColor: 'shadow-[#3B82F6]/20'
    },
    { 
      name: 'NFC Cards', 
      value: stats.nfcCards, 
      change: '2 active', 
      icon: Zap, 
      gradient: 'from-[#F59E0B] to-[#EF4444]',
      glowColor: 'shadow-[#F59E0B]/20'
    },
    { 
      name: 'Leads Captured', 
      value: stats.leads, 
      change: '+12 this week', 
      icon: Users, 
      gradient: 'from-[#10B981] to-[#06B6D4]',
      glowColor: 'shadow-[#10B981]/20'
    },
  ];

  const quickActions = [
    { name: 'Create Portfolio', href: '/dashboard/portfolios/new', icon: Plus, color: 'from-[#06B6D4] to-[#3B82F6]' },
    { name: 'AI Content', href: '/dashboard/ai-tools', icon: Sparkles, color: 'from-[#8B5CF6] to-[#06B6D4]' },
    { name: 'Order NFC Card', href: '/shop', icon: CreditCard, color: 'from-[#F59E0B] to-[#EF4444]' },
  ];

  const checklistItems = [
    { title: 'Create your first portfolio', completed: true },
    { title: 'Upload your resume for AI analysis', completed: true },
    { title: 'Customize your theme', completed: false },
    { title: 'Share your portfolio link', completed: false },
    { title: 'Order your NFC card', completed: false },
  ];

  return (
    <div className="space-y-8">
      {/* Header with Animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
      >
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            Welcome back! 👋
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mt-2 text-lg"
          >
            Here's what's happening with your portfolios
          </motion.p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <Link href="/dashboard/portfolios/new">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-linear-to-r from-[#06B6D4] to-[#3B82F6] hover:from-[#06B6D4]/90 hover:to-[#3B82F6]/90 text-white px-6 py-6 text-base shadow-lg shadow-[#06B6D4]/30">
                <Plus className="w-5 h-5 mr-2" />
                New Portfolio
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>

      {/* Animated Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className={`relative group rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 overflow-hidden shadow-xl ${stat.glowColor} hover:shadow-2xl transition-all`}>
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-linear-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-linear-to-br ${stat.gradient} shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2, delay: index * 0.2 }}
                      className={`w-2 h-2 rounded-full bg-linear-to-r ${stat.gradient}`}
                    />
                  </div>
                  
                  <p className="text-gray-400 text-sm font-medium mb-2">{stat.name}</p>
                  
                  <div className="flex items-end gap-2">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                      className="text-3xl font-bold text-white"
                    >
                      <CountUp end={stat.value} duration={2} delay={0.3 + index * 0.1} />
                    </motion.div>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-2">{stat.change}</p>
                </div>

                {/* Shine Effect on Hover */}
                <motion.div
                  className={`absolute inset-0 bg-linear-to-r ${stat.gradient} opacity-0 group-hover:opacity-20`}
                  initial={false}
                  whileHover={{
                    opacity: [0, 0.2, 0],
                    transition: { duration: 1.5, repeat: Infinity }
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={action.href}>
                  <div className={`relative group p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all cursor-pointer overflow-hidden`}>
                    <div className={`absolute inset-0 bg-linear-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                    <div className="relative z-10 flex items-center gap-4">
                      <div className={`p-4 rounded-xl bg-linear-to-br ${action.color} shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg">{action.name}</h3>
                      </div>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Getting Started Checklist */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-linear-to-br from-[#06B6D4] to-[#3B82F6]">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Getting Started</h2>
            <p className="text-gray-400">Complete these steps to unlock your full potential</p>
          </div>
        </div>

        <div className="space-y-4">
          {checklistItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ x: 4 }}
              className={`flex items-center gap-4 p-4 rounded-xl ${
                item.completed
                  ? 'bg-[#10B981]/10 border border-[#10B981]/20'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              } transition-all`}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1, type: "spring" }}
                className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                  item.completed
                    ? 'bg-[#10B981]'
                    : 'bg-white/10 border border-white/20'
                }`}
              >
                {item.completed && <CheckCircle2 className="w-4 h-4 text-white" />}
              </motion.div>
              <span className={`flex-1 ${item.completed ? 'text-gray-300' : 'text-gray-400'}`}>
                {item.title}
              </span>
              {!item.completed && (
                <span className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full">
                  Pending
                </span>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-6 flex items-center gap-2 text-sm text-gray-400"
        >
          <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(checklistItems.filter(i => i.completed).length / checklistItems.length) * 100}%` }}
              transition={{ duration: 1, delay: 1.3 }}
              className="h-full bg-linear-to-r from-[#06B6D4] to-[#3B82F6]"
            />
          </div>
          <span className="font-semibold text-white">
            {checklistItems.filter(i => i.completed).length}/{checklistItems.length}
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}

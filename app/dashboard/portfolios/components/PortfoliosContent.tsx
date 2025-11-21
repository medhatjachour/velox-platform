'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Plus, Eye, Edit, Globe, ExternalLink, Sparkles, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Portfolio {
  id: string;
  title: string;
  slug: string;
  bio?: string;
  isPublished: boolean;
  viewCount: number;
}

export default function PortfoliosContent({ portfolios }: { portfolios: Portfolio[] }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

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
            className="text-4xl font-bold text-white"
          >
            Your Portfolios
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mt-2 text-lg"
          >
            Create and manage your professional portfolios
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
                Create Portfolio
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>

      {/* Portfolios Grid or Empty State */}
      {portfolios.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-12 overflow-hidden"
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-linear-to-br from-[#06B6D4]/5 to-[#3B82F6]/5" />
          
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="relative mb-8"
            >
              <div className="w-24 h-24 rounded-3xl bg-linear-to-br from-[#06B6D4] to-[#3B82F6] flex items-center justify-center shadow-2xl shadow-[#06B6D4]/30">
                <Globe className="w-12 h-12 text-white" />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-full border-2 border-dashed border-[#06B6D4]/30"
              />
            </motion.div>
            
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-3xl font-bold text-white mb-4"
            >
              No portfolios yet
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-gray-400 text-lg mb-8 max-w-lg"
            >
              Create your first portfolio to showcase your work, skills, and achievements to the world
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link href="/dashboard/portfolios/new">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-linear-to-r from-[#06B6D4] to-[#3B82F6] text-white px-8 py-6 text-lg shadow-xl shadow-[#06B6D4]/30">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Create Your First Portfolio
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {portfolios.map((portfolio) => (
            <motion.div
              key={portfolio.id}
              variants={item}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className="relative group h-full rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 overflow-hidden shadow-xl hover:shadow-2xl hover:border-[#06B6D4]/30 transition-all">
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-linear-to-br from-[#06B6D4]/5 to-[#3B82F6]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-white truncate mb-1">
                        {portfolio.title}
                      </h3>
                      <p className="text-sm text-gray-400 flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        /{portfolio.slug}
                      </p>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        portfolio.isPublished
                          ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30'
                          : 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30'
                      }`}
                    >
                      {portfolio.isPublished ? 'Live' : 'Draft'}
                    </motion.div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-1">
                    {portfolio.bio || 'No description yet. Add one to make your portfolio stand out!'}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2 text-gray-400">
                      <div className="p-2 rounded-lg bg-[#06B6D4]/10">
                        <Eye className="w-4 h-4 text-[#06B6D4]" />
                      </div>
                      <span className="text-sm font-medium">{portfolio.viewCount || 0} views</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Link href={`/dashboard/portfolios/${portfolio.id}/edit`} className="flex-1">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button variant="outline" size="sm" className="w-full bg-white/5 border-white/10 hover:bg-white/10 hover:border-[#06B6D4]/30 text-white">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </motion.div>
                    </Link>
                    {portfolio.isPublished && (
                      <Link href={`/${portfolio.slug}`} target="_blank">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                          <Button size="sm" className="bg-linear-to-r from-[#06B6D4] to-[#3B82F6] hover:from-[#06B6D4]/90 hover:to-[#3B82F6]/90 text-white shadow-lg shadow-[#06B6D4]/20">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                  initial={false}
                  whileHover={{
                    x: ['-100%', '100%'],
                    transition: { duration: 1, ease: "easeInOut" }
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Quota Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative rounded-2xl bg-linear-to-br from-[#F59E0B]/10 to-[#EF4444]/10 backdrop-blur-xl border border-[#F59E0B]/20 p-6 overflow-hidden"
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #F59E0B 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="p-3 rounded-xl bg-linear-to-br from-[#F59E0B] to-[#EF4444] shadow-lg"
            >
              <Crown className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Portfolio Quota</h3>
              <p className="text-gray-400 text-sm">
                Free Plan: <span className="text-white font-semibold">{portfolios.length}/1</span> portfolios used
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Pro: 3 portfolios • Premium: Unlimited
              </p>
            </div>
          </div>
          
          <Link href="/dashboard/settings">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-linear-to-r from-[#F59E0B] to-[#EF4444] hover:from-[#F59E0B]/90 hover:to-[#EF4444]/90 text-white shadow-lg shadow-[#F59E0B]/30">
                <Crown className="w-4 h-4 mr-2" />
                Upgrade Plan
              </Button>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

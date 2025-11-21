'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { UserButton } from '@clerk/nextjs';
import { Zap, LayoutDashboard, FolderOpen, Sparkles, CreditCard, BarChart3, Settings } from 'lucide-react';

interface NavigationItem {
  name: string;
  href: string;
  icon: string;
}

const iconMap = {
  LayoutDashboard,
  FolderOpen,
  Sparkles,
  CreditCard,
  BarChart3,
  Settings,
};

export default function DashboardSidebar({ navigation }: { navigation: NavigationItem[] }) {
  const pathname = usePathname();

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-y-0 left-0 z-50 w-72 px-4 py-6"
    >
      {/* Glassmorphism Container */}
      <div className="h-full rounded-3xl backdrop-blur-2xl bg-white/5 border border-white/10 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Logo Section with 3D Effect */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="px-6 py-6 border-b border-white/10"
        >
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] flex items-center justify-center shadow-lg shadow-[#06B6D4]/30"
            >
              <Zap className="w-7 h-7 text-white" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] blur opacity-50 group-hover:opacity-75 transition-opacity" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] bg-clip-text text-transparent">
                Velox
              </h1>
              <p className="text-xs text-gray-400">Pro Dashboard</p>
            </div>
          </Link>
        </motion.div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item, index) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            
            return (
              <motion.div
                key={item.name}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <Link href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      relative group flex items-center gap-3 px-4 py-3.5 rounded-xl
                      transition-all duration-300 cursor-pointer overflow-hidden
                      ${isActive 
                        ? 'bg-linear-to-r from-[#06B6D4]/20 to-[#3B82F6]/20 text-white shadow-lg shadow-[#06B6D4]/10' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }
                    `}
                  >
                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-xl bg-linear-to-r from-[#06B6D4]/20 to-[#3B82F6]/20 border border-[#06B6D4]/30"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    
                    {/* Icon with Glow Effect */}
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="relative z-10"
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-[#06B6D4]' : ''}`} />
                      {isActive && (
                        <motion.div
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="absolute inset-0 bg-[#06B6D4] rounded-full blur-lg"
                        />
                      )}
                    </motion.div>
                    
                    <span className="relative z-10 font-medium">{item.name}</span>
                    
                    {/* Hover Shine Effect */}
                    <motion.div
                      className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* User Profile Section with Glassmorphism */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="px-4 py-4 border-t border-white/10"
        >
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
            <div className="relative">
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-11 h-11 ring-2 ring-[#06B6D4] ring-offset-2 ring-offset-transparent"
                  }
                }}
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1E293B]"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                Dashboard
              </p>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#3B82F6]" />
                Free Plan
              </p>
            </div>
          </div>

          {/* Upgrade CTA */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 p-4 rounded-xl bg-gradient-to-br from-[#06B6D4]/10 to-[#3B82F6]/10 border border-[#06B6D4]/20 cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-white mb-1">Upgrade to Pro</h4>
                <p className="text-xs text-gray-400">Unlock all features</p>
              </div>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Zap className="w-5 h-5 text-[#F59E0B]" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.aside>
  );
}

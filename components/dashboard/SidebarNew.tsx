"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  User, 
  Sparkles, 
  CreditCard, 
  Users, 
  Settings, 
  TrendingUp,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
  Home,
  Zap,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface SidebarProps {
  user: {
    name: string;
    email: string;
    role: string;
    avatarUrl?: string;
  };
}

// Organized by user journey and storytelling
const navSections = [
  {
    label: "Your Impact",
    items: [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        gradient: "from-[#06B6D4] to-[#3B82F6]",
        description: "See your performance",
      },
      {
        name: "Analytics",
        href: "/dashboard/analytics",
        icon: TrendingUp,
        gradient: "from-[#3B82F6] to-[#06B6D4]",
        description: "Dive into insights",
      },
    ],
  },
  {
    label: "Build Your Story",
    items: [
      {
        name: "Portfolio",
        href: "/dashboard/portfolio",
        icon: User,
        gradient: "from-[#06B6D4] to-[#3B82F6]",
        description: "Craft your identity",
      },
      {
        name: "AI Studio",
        href: "/dashboard/ai",
        icon: Sparkles,
        gradient: "from-[#F59E0B] to-[#06B6D4]",
        badge: "AI",
        description: "Generate in seconds",
      },
    ],
  },
  {
    label: "Connect & Share",
    items: [
      {
        name: "NFC Cards",
        href: "/dashboard/cards",
        icon: CreditCard,
        gradient: "from-[#06B6D4] to-[#3B82F6]",
        description: "Physical presence",
      },
      {
        name: "Team",
        href: "/dashboard/team",
        icon: Users,
        gradient: "from-[#3B82F6] to-[#8B5CF6]",
        roles: ["SUPER_ADMIN", "TEAM_LEADER"],
        description: "Collaborate together",
      },
    ],
  },
  {
    label: "Manage",
    items: [
      {
        name: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
        gradient: "from-gray-600 to-gray-500",
        description: "Preferences & security",
      },
    ],
  },
];

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const filteredSections = navSections.map(section => ({
    ...section,
    items: section.items.filter(item => 
      !item.roles || item.roles.includes(user.role)
    ),
  })).filter(section => section.items.length > 0);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 p-3 rounded-xl bg-card border border-border/50 shadow-lg"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 z-40 h-screen w-[280px] border-r border-border/50 bg-card/50 backdrop-blur-xl lg:z-30"
          >
            <div className="flex h-full flex-col">
              {/* Logo & Brand */}
              <div className="flex h-20 items-center gap-3 border-b border-border/50 px-6">
                <Link href="/" className="flex items-center gap-3 group">
                  <div className="relative w-10 h-10 transition-transform group-hover:scale-110 group-hover:rotate-12">
                    <Image
                      src="/logo.svg"
                      alt="Velox"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-bold text-xl bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] to-[#F59E0B] bg-clip-text text-transparent">
                    Velox
                  </span>
                </Link>
              </div>

              {/* User Profile */}
              <div className="border-b border-border/50 p-4">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="w-full group"
                >
                  <div className="flex items-center gap-3 rounded-xl p-3 transition-all hover:bg-muted/50">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] flex items-center justify-center text-white font-bold shadow-lg">
                      {user.name?.[0] || user.email[0].toUpperCase()}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-sm font-semibold truncate">{user.name || user.email}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 space-y-1 overflow-hidden"
                    >
                      <Link
                        href="/"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all"
                      >
                        <Home className="w-4 h-4" />
                        Visit Homepage
                      </Link>
                      <button
                        className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-all"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation by sections */}
              <nav className="flex-1 overflow-y-auto px-4 py-6 scrollbar-thin">
                <div className="space-y-8">
                  {filteredSections.map((section, sectionIdx) => (
                    <div key={section.label}>
                      <h3 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {section.label}
                      </h3>
                      <div className="space-y-1">
                        {section.items.map((item) => {
                          const Icon = item.icon;
                          const isActive = pathname === item.href;

                          return (
                            <Link key={item.href} href={item.href}>
                              <motion.div
                                whileHover={{ scale: 1.02, x: 4 }}
                                whileTap={{ scale: 0.98 }}
                                className="relative"
                              >
                                <div
                                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all ${
                                    isActive
                                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                  }`}
                                >
                                  <div
                                    className={`p-1.5 rounded-lg transition-all ${
                                      isActive
                                        ? "bg-white/20"
                                        : `bg-gradient-to-br ${item.gradient} opacity-80`
                                    }`}
                                  >
                                    <Icon
                                      className={`w-4 h-4 ${
                                        isActive ? "text-white" : "text-white"
                                      }`}
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-medium truncate">
                                        {item.name}
                                      </span>
                                      {item.badge && (
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                          isActive ? "bg-white/20 text-white" : "bg-[#F59E0B]/20 text-[#F59E0B]"
                                        }`}>
                                          {item.badge}
                                        </span>
                                      )}
                                    </div>
                                    <p className={`text-[10px] truncate ${
                                      isActive ? "text-white/70" : "text-muted-foreground"
                                    }`}>
                                      {item.description}
                                    </p>
                                  </div>
                                </div>

                                {/* Active indicator */}
                                {isActive && (
                                  <motion.div
                                    layoutId="activeTab"
                                    className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-white"
                                    transition={{
                                      type: "spring",
                                      stiffness: 500,
                                      damping: 30,
                                    }}
                                  />
                                )}
                              </motion.div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </nav>

              {/* Bottom CTA */}
              <div className="border-t border-border/50 p-4">
                <Link href="/dashboard/cards">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#06B6D4] p-4 text-white shadow-lg"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-5 h-5" />
                      <span className="font-bold text-sm">Order NFC Cards</span>
                    </div>
                    <p className="text-xs text-white/80">
                      Start sharing your portfolio with a tap
                    </p>
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

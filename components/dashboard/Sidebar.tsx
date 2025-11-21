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
  ChevronDown
} from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  user: {
    name: string;
    email: string;
    role: string;
    avatarUrl?: string;
  };
}

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard, color: "#06B6D4" },
    { name: "Portfolio", href: "/dashboard/portfolio", icon: User, color: "#3B82F6" },
    { name: "AI Studio", href: "/dashboard/ai", icon: Sparkles, color: "#F59E0B" },
    { name: "NFC Cards", href: "/dashboard/cards", icon: CreditCard, color: "#06B6D4" },
    { name: "Analytics", href: "/dashboard/analytics", icon: TrendingUp, color: "#3B82F6" },
    { name: "Team", href: "/dashboard/team", icon: Users, color: "#F59E0B", roles: ["SUPER_ADMIN", "TEAM_LEADER"] },
    { name: "Settings", href: "/dashboard/settings", icon: Settings, color: "#6B7280" },
  ];

  const filteredNav = navigation.filter(item => 
    !item.roles || item.roles.includes(user.role)
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-3 rounded-xl bg-card border border-border shadow-lg lg:hidden"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </motion.button>

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-screen w-[280px] bg-card/80 backdrop-blur-xl border-r border-border z-40 flex flex-col"
          >
            {/* Logo */}
            <div className="p-6 border-b border-border">
              <Link href="/" className="flex items-center gap-3 group">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] flex items-center justify-center shadow-lg"
                >
                  <span className="text-white font-bold text-xl">V</span>
                </motion.div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] bg-clip-text text-transparent">
                    Velox
                  </h1>
                  <p className="text-xs text-muted-foreground">Dashboard</p>
                </div>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {filteredNav.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== "/dashboard" && pathname.startsWith(item.href));
                
                return (
                  <Link key={item.name} href={item.href}>
                    <motion.div
                      whileHover={{ x: 4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                        isActive
                          ? "bg-gradient-to-r from-[#06B6D4]/10 to-[#3B82F6]/10 text-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-card hover:text-foreground"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#06B6D4] to-[#3B82F6] rounded-r-full"
                        />
                      )}
                      <div
                        className={`p-2 rounded-lg transition-colors ${
                          isActive
                            ? "bg-gradient-to-br from-[#06B6D4]/20 to-[#3B82F6]/20"
                            : "group-hover:bg-gradient-to-br group-hover:from-[#06B6D4]/10 group-hover:to-[#3B82F6]/10"
                        }`}
                      >
                        <item.icon className="w-5 h-5" style={{ color: isActive ? item.color : undefined }} />
                      </div>
                      <span className="font-medium">{item.name}</span>
                      {item.name === "AI Studio" && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="ml-auto w-2 h-2 rounded-full bg-[#F59E0B]"
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-border">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-[#06B6D4]/5 to-[#3B82F6]/5 hover:from-[#06B6D4]/10 hover:to-[#3B82F6]/10 transition-all"
              >
                <div className="relative">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] flex items-center justify-center text-white font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-card"
                  />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showUserMenu ? "rotate-180" : ""}`} />
              </motion.button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-2 p-2 rounded-xl bg-card border border-border shadow-lg space-y-1"
                  >
                    <Link href="/dashboard/settings">
                      <motion.div
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-[#06B6D4]/10 hover:to-[#3B82F6]/10 transition-all"
                      >
                        <Settings className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Settings</span>
                      </motion.div>
                    </Link>
                    <Link href="/dashboard/notifications">
                      <motion.div
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-[#06B6D4]/10 hover:to-[#3B82F6]/10 transition-all"
                      >
                        <Bell className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Notifications</span>
                        <span className="ml-auto text-xs px-2 py-0.5 bg-[#F59E0B] text-white rounded-full">3</span>
                      </motion.div>
                    </Link>
                    <hr className="border-border" />
                    <button
                      onClick={() => {
                        document.cookie = "auth-token=; max-age=0; path=/";
                        window.location.href = "/";
                      }}
                      className="w-full"
                    >
                      <motion.div
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-all"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm">Logout</span>
                      </motion.div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

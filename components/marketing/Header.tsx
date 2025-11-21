import Link from "next/link";
import Image from "next/image";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { ThemeToggle } from "./ThemeToggle";
import { User, LayoutDashboard, Sparkles, Menu } from "lucide-react";

export default async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
              <Image
                src="/logo.svg"
                alt="Velox"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] to-[#F59E0B] bg-clip-text text-transparent">
              Velox
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            <Link
              href="/#story"
              className="px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
            >
              Our Story
            </Link>
            <Link
              href="/features"
              className="px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
            >
              Pricing
            </Link>
            <Link
              href="/shop"
              className="px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
            >
              NFC Cards
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
            >
              Contact
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2 rounded-xl hover:bg-muted/50 transition-colors">
              <Menu className="w-5 h-5" />
            </button>

            {user ? (
              /* Logged In User */
              <div className="hidden lg:flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="group flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] text-white shadow-lg hover:shadow-xl hover:shadow-[#06B6D4]/30 transition-all hover:scale-105"
                >
                  <LayoutDashboard className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="p-2.5 rounded-xl bg-gradient-to-br from-[#06B6D4]/10 to-[#3B82F6]/10 border border-[#06B6D4]/20 hover:border-[#06B6D4]/40 transition-all hover:scale-105"
                  title={user.name || user.email}
                >
                  <User className="w-5 h-5 text-[#06B6D4]" />
                </Link>
              </div>
            ) : (
              /* Guest User */
              <div className="hidden lg:flex items-center gap-3">
                <Link
                  href="/auth/login"
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-muted/50 transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/onboarding"
                  className="group flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] to-[#F59E0B] text-white shadow-lg hover:shadow-xl hover:shadow-[#06B6D4]/30 transition-all hover:scale-105"
                >
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  Start Free
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

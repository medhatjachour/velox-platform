/**
 * Dashboard Layout - Professional Modern Design
 * 
 * Features: Glassmorphism, Gradient backgrounds, Smooth animations
 */

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import DashboardSidebar from './components/DashboardSidebar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect('/');
  }

  const navigation = [
    { name: 'Overview', href: '/dashboard', icon: 'LayoutDashboard' },
    { name: 'Portfolios', href: '/dashboard/portfolios', icon: 'FolderOpen' },
    { name: 'AI Tools', href: '/dashboard/ai-tools', icon: 'Sparkles' },
    { name: 'NFC Cards', href: '/dashboard/nfc', icon: 'CreditCard' },
    { name: 'Analytics', href: '/dashboard/analytics', icon: 'BarChart3' },
    { name: 'Settings', href: '/dashboard/settings', icon: 'Settings' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] -z-10" />
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.03] -z-10" />
      
      {/* Animated Gradient Orbs */}
      <div className="fixed top-0 -left-40 w-96 h-96 bg-[#06B6D4] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob -z-10" />
      <div className="fixed top-0 -right-40 w-96 h-96 bg-[#3B82F6] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000 -z-10" />
      <div className="fixed -bottom-40 left-1/2 w-96 h-96 bg-[#F59E0B] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob animation-delay-4000 -z-10" />

      {/* Glassmorphism Sidebar */}
      <DashboardSidebar navigation={navigation} />

      {/* Main Content Area */}
      <div className="lg:pl-72">
        <main className="min-h-screen p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

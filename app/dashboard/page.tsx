/**
 * Dashboard Home Page - Professional Modern Design
 * 
 * Features: Animated stats, gradient cards, micro-interactions
 */

import { auth } from '@clerk/nextjs/server';
import DashboardContent from './components/DashboardContent';

export default async function DashboardPage() {
  const { userId } = await auth();

  // TODO: Fetch actual data from API
  const stats = {
    portfolios: 3,
    totalViews: 1247,
    nfcCards: 5,
    leads: 89,
  };

  return <DashboardContent stats={stats} />;
}

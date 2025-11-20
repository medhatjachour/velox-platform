/**
 * Dashboard Home Page
 * 
 * Overview of user's portfolio, analytics, and quick actions
 */

import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { Plus, Eye, TrendingUp, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function DashboardPage() {
  const { userId } = await auth();

  // TODO: Fetch actual data from API
  const stats = {
    portfolios: 0,
    totalViews: 0,
    nfcCards: 0,
    leads: 0,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back! Here's your portfolio overview.
          </p>
        </div>
        <Link href="/dashboard/portfolios/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Portfolio
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Portfolios
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.portfolios}</div>
            <p className="text-xs text-muted-foreground">
              {stats.portfolios === 0 ? 'Create your first portfolio' : 'Active portfolios'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Views
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews}</div>
            <p className="text-xs text-muted-foreground">
              All-time portfolio views
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              NFC Cards
            </CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.nfcCards}</div>
            <p className="text-xs text-muted-foreground">
              Active NFC cards
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Leads Captured
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.leads}</div>
            <p className="text-xs text-muted-foreground">
              Total leads from NFC taps
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Get started with common tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/dashboard/portfolios/new" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Create New Portfolio
              </Button>
            </Link>
            <Link href="/dashboard/ai-tools" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Zap className="w-4 h-4 mr-2" />
                Generate AI Content
              </Button>
            </Link>
            <Link href="/dashboard/nfc" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Create NFC Card
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              Complete these steps to set up your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Create your first portfolio
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Add your bio, skills, and projects
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-gray-600 dark:text-gray-400">2</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Use AI to enhance your content
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Generate professional bios and descriptions
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-gray-600 dark:text-gray-400">3</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Create an NFC card
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Share your portfolio with a tap
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Your latest portfolio views and interactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No activity yet</p>
            <p className="text-sm mt-1">
              Create and publish a portfolio to start tracking views
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

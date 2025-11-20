/**
 * Portfolios List Page
 * 
 * View and manage all user portfolios
 */

import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { Plus, Eye, Edit, Trash2, Globe, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default async function PortfoliosPage() {
  const { userId } = await auth();

  // TODO: Fetch portfolios from API
  const portfolios: any[] = [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Portfolios
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Create and manage your portfolios
          </p>
        </div>
        <Link href="/dashboard/portfolios/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Portfolio
          </Button>
        </Link>
      </div>

      {/* Portfolios List */}
      {portfolios.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <Globe className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No portfolios yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-6 max-w-md">
              Create your first portfolio to showcase your work and share it with the world
            </p>
            <Link href="/dashboard/portfolios/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Portfolio
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((portfolio) => (
            <Card key={portfolio.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="truncate">{portfolio.title}</CardTitle>
                    <CardDescription className="mt-1">
                      /{portfolio.slug}
                    </CardDescription>
                  </div>
                  <Badge variant={portfolio.isPublished ? 'default' : 'secondary'}>
                    {portfolio.isPublished ? 'Published' : 'Draft'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {portfolio.bio || 'No bio added yet'}
                </p>
                
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <Eye className="w-4 h-4" />
                  <span>{portfolio.viewCount || 0} views</span>
                </div>

                <div className="flex items-center gap-2">
                  <Link href={`/dashboard/portfolios/${portfolio.id}/edit`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  {portfolio.isPublished && (
                    <Link href={`/${portfolio.slug}`} target="_blank">
                      <Button variant="outline" size="sm">
                        <LinkIcon className="w-4 h-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Quota Info */}
      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-blue-900 dark:text-blue-100">
            Portfolio Quota
          </CardTitle>
          <CardDescription className="text-blue-700 dark:text-blue-300">
            Free Plan: 1 portfolio • Pro Plan: 3 portfolios • Premium: Unlimited
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-900 dark:text-blue-100">
                {portfolios.length} of 1 portfolios used
              </p>
            </div>
            <Link href="/dashboard/settings">
              <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-100 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900">
                Upgrade Plan
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

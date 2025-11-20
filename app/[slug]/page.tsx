/**
 * Public Portfolio View
 * 
 * Public-facing portfolio page accessible via slug
 */

import { notFound } from 'next/navigation';
import { Github, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PublicPortfolioPage({ params }: PageProps) {
  const { slug } = await params;

  // TODO: Fetch portfolio from API by slug
  // For now, return 404
  const portfolio = null;

  if (!portfolio) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          {/* Avatar */}
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-4xl font-bold text-white">
              {/* {portfolio.title?.charAt(0) || 'U'} */}
            </span>
          </div>

          {/* Title & Headline */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {/* {portfolio.title} */}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {/* {portfolio.headline} */}
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-3 mt-6">
            {/* {portfolio.socialLinks?.github && ( */}
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon">
                  <Github className="w-5 h-5" />
                </Button>
              </a>
            {/* )} */}
            {/* Add more social links */}
          </div>
        </div>

        {/* Bio Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              About
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {/* {portfolio.bio} */}
            </p>
          </CardContent>
        </Card>

        {/* Skills Section Placeholder */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {/* Skills badges would go here */}
              <Badge>React</Badge>
              <Badge>TypeScript</Badge>
              <Badge>Node.js</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Projects Section Placeholder */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Projects
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              No projects added yet
            </p>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Get In Touch
            </h2>
            <div className="space-y-3">
              {/* {portfolio.contactInfo?.email && ( */}
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <Mail className="w-5 h-5" />
                  <a href="#" className="hover:text-blue-600">
                    {/* {portfolio.contactInfo.email} */}
                  </a>
                </div>
              {/* )} */}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-gray-500 dark:text-gray-400">
          <p>Powered by Velox</p>
        </div>
      </div>
    </div>
  );
}

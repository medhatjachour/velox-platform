import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import PortfolioView from "@/components/portfolio/PortfolioView";

// Dynamic page that renders at request time
export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    slug: string;
  };
}

async function getPortfolio(slug: string) {
  const portfolio = await prisma.portfolio.findUnique({
    where: { slug },
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          username: true,
          avatarUrl: true
        }
      },
      projects: {
        where: { featured: true },
        orderBy: { order: 'asc' },
        take: 10
      }
    }
  });

  return portfolio;
}

async function trackView(portfolioId: string, request: any) {
  try {
    // Get request metadata
    const ipAddress = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referrer = request.headers.get('referer') || null;

    // Create view record
    await prisma.portfolioView.create({
      data: {
        portfolioId,
        ipAddress,
        userAgent,
        referrer
      }
    });

    // Increment view count
    await prisma.portfolio.update({
      where: { id: portfolioId },
      data: {
        viewCount: { increment: 1 }
      }
    });
  } catch (error) {
    console.error("Track view error:", error);
    // Don't fail the request if tracking fails
  }
}

export default async function PublicPortfolioPage({ params }: PageProps) {
  const { slug } = params;
  
  const portfolio = await getPortfolio(slug);

  if (!portfolio || !portfolio.isPublished) {
    notFound();
  }

  // Track view asynchronously (don't await)
  // In production, you might want to do this client-side or via an API route
  // to avoid blocking the render
  
  return <PortfolioView portfolio={portfolio} />;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = params;
  const portfolio = await getPortfolio(slug);

  if (!portfolio) {
    return {
      title: 'Portfolio Not Found',
    };
  }

  return {
    title: portfolio.metaTitle || `${portfolio.title} - Portfolio`,
    description: portfolio.metaDescription || portfolio.bio || `View ${portfolio.title}'s professional portfolio`,
    openGraph: {
      title: portfolio.metaTitle || portfolio.title,
      description: portfolio.metaDescription || portfolio.bio || '',
      images: portfolio.heroImageUrl ? [portfolio.heroImageUrl] : [],
    },
  };
}

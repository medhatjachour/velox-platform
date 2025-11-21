import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/features',
  '/pricing',
  '/contact',
  '/shop',
  '/sign-in(.*)',       // Sign in pages
  '/sign-up(.*)',       // Sign up pages
  '/api/nfc/tap/(.*)',  // Public NFC tap endpoint
  '/api/nfc/leads',     // Public lead capture
]);

export default clerkMiddleware(async (auth, request) => {
  const { pathname } = request.nextUrl;
  
  // Redirect /auth/login to /sign-in (Clerk's default behavior)
  if (pathname === '/auth/login') {
    const url = request.nextUrl.clone();
    url.pathname = '/sign-in';
    return Response.redirect(url);
  }
  
  // Allow public portfolio pages (e.g., /john-doe)
  // These are single-segment paths that aren't in our known routes
  const isPortfolioSlug = 
    pathname !== '/' && 
    !pathname.startsWith('/dashboard') &&
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/sign-in') &&
    !pathname.startsWith('/sign-up') &&
    !pathname.startsWith('/features') &&
    !pathname.startsWith('/pricing') &&
    !pathname.startsWith('/contact') &&
    !pathname.startsWith('/shop') &&
    pathname.split('/').length === 2; // Only /slug format
  
  // Protect all routes except public ones and portfolio slugs
  if (!isPublicRoute(request) && !isPortfolioSlug) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

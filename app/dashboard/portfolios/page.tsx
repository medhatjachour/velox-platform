/**
 * Portfolios List Page - Professional Modern Design
 * 
 * Features: Staggered animations, 3D card effects, modern grid
 */

import { auth } from '@clerk/nextjs/server';
import PortfoliosContent from './components/PortfoliosContent';

export default async function PortfoliosPage() {
  const { userId } = await auth();

  // TODO: Fetch portfolios from API
  const portfolios: any[] = [];

  return <PortfoliosContent portfolios={portfolios} />;
}

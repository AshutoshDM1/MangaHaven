import { MetadataRoute } from 'next';
import siteUrl from '@/lib/site';
import prisma from '@/db/db';

export const revalidate = 3600; // Revalidate sitemap every hour at runtime

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteUrl;
  console.log('🔍 Sitemap: Starting generation...');

  // Static routes
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dashboard/search`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ];

  // Fetch all manga for dynamic routes
  let mangaRoutes: MetadataRoute.Sitemap = [];
  
  try {
    // Direct database query - no network calls during build
    const allManga = await prisma.manga.findMany({
      select: {
        id: true,
        slug: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
    
    console.log(`✅ Sitemap: Successfully fetched ${allManga.length} manga(s)`);

    // Generate manga detail pages
    const mangaDetailRoutes = allManga.map((manga) => ({
      url: `${baseUrl}/read/${manga.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }));

    mangaRoutes = [...mangaDetailRoutes];
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    console.error('⚠️ Returning static routes only');
    // Return static routes only if database fetch fails
  }

  console.log(`✅ Sitemap: Generated ${staticRoutes.length + mangaRoutes.length} total routes`);
  return [...staticRoutes, ...mangaRoutes];
}


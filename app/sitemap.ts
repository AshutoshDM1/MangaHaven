import { MetadataRoute } from 'next';
import siteUrl from '@/lib/site';
import prisma from '@/db/db';

export const revalidate = 86400; // Revalidate sitemap every 24 hours

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteUrl;

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
    const allManga = await prisma.manga.findMany({
      select: {
        id: true,
        slug: true,
        mangaChapters: {
          select: {
            id: true,
            chapterNumber: true,
          },
          orderBy: {
            chapterNumber: 'desc',
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });

    // Generate manga detail pages
    const mangaDetailRoutes = allManga.map((manga) => ({
      url: `${baseUrl}/read/${manga.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }));


    mangaRoutes = [...mangaDetailRoutes];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return static routes only if database fetch fails
  }

  return [...staticRoutes, ...mangaRoutes];
}


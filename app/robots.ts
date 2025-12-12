import { MetadataRoute } from 'next';
import siteUrl from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteUrl;

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/dashboard',
          '/dashboard/search',
          '/read',
          '/login',
          '/signup',
        ],
        disallow: [
          '/admin/',
          '/api/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}


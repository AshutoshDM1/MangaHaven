import { Metadata } from 'next';
import siteUrl from './site';

export async function generateMetadata(
  pageName: string,
  route: string,
  description?: string
): Promise<Metadata> {
  const canonicalUrl = `${siteUrl}/${route}`;
  return {
    title: `${pageName}`,
    description:
      description ||
      'Manage your manga collection, track reading progress, and discover new titles. Access your personalized manga dashboard and seamless reading experience.',
    keywords: [
      'MangaHaven',
      `${pageName}`,
      `${pageName} Reading`,
      'Manga Collection',
      'Manga Library',
      'Online Manga Reader',
      'Manga Tracking',
      'Reading Progress',
      `Admin Panel`,
      `Management`,
      'Read Manga Online',
      'Manga Platform',
      'Anime',
      'Japanese Comics',
      'Manga Community',
    ],
    authors: [{ name: 'MangaHaven' }],
    creator: 'MangaHaven',
    publisher: 'MangaHaven',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    metadataBase: new URL(siteUrl),
    openGraph: {
      url: canonicalUrl,
      type: 'website',
      title: `${pageName} | MangaHaven - Your Ultimate Manga Reading Destination`,
      description:
        'Manage your manga collection, track reading progress, and discover new titles. Access your personalized manga dashboard with advanced features and seamless reading experience.',
      siteName: 'MangaHaven',
      locale: 'en_IN',
      images: [
        {
          url: '/og-image.webp',
          width: 1200,
          height: 630,
          alt: `${pageName} | MangaHaven - Your Ultimate Manga Reading Destination`,
          type: 'image/webp',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@MangaHaven',
      creator: '@MangaHaven',
      title: `${pageName} | MangaHaven - Your Ultimate Manga Reading Destination`,
      description:
        'Manage your manga collection, track reading progress, and discover new titles. Access your personalized manga dashboard with advanced features.',
      images: [`${siteUrl}/og-image.webp`],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-IN': canonicalUrl,
        en: canonicalUrl,
        'x-default': canonicalUrl,
      },
    },
    category: 'Entertainment & Comics',
    // Add structured data for better SEO
    other: {
      'application-name': 'MangaHaven',
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
    },
  };
}

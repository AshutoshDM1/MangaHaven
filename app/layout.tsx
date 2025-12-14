import type React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { Suspense } from 'react';
import { SUSE , Rubik} from 'next/font/google';
import { Providers } from '@/lib/Providers';
import siteUrl from '@/lib/site';

const suse = SUSE({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-suse',
});

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-rubik',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'MangaHaven - Read Manga Online Free',
    template: '%s | MangaHaven - Ultimate Manga Reading Destination',
  },
  description:
    'Read your favorite manga online for free at MangaHaven. Discover thousands of manga with high-quality scans, regular updates, and a seamless reading experience.',
  keywords: [
    'MangaHaven',
    'manga',
    'read manga online',
    'manga online',
    'free manga',
    'manga reader',
    'manga website',
    'Japanese manga',
    'manga scans',
    'manga updates',
    'shounen manga',
    'shoujo manga',
    'seinen manga',
    'manhwa',
    'manhua',
    'webtoon',
    'manga chapters',
    'latest manga',
    'popular manga',
    'manga library',
    'online manga reader',
    'manga community',
    'read manga free',
    'manga streaming',
    'manga collection',
    'manga database',
    'manga genres',
    'action manga',
    'romance manga',
    'fantasy manga',
    'comedy manga',
    'adventure manga',
    'manga series',
  ],
  authors: [{ name: 'MangaHaven', url: siteUrl }],
  creator: 'MangaHaven',
  publisher: 'MangaHaven',
  applicationName: 'MangaHaven',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code', // Replace with actual verification code
    // yandex: "your-yandex-verification-code", // Uncomment and add if needed
    // bing: "your-bing-verification-code", // Uncomment and add if needed
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16', type: 'image/ico' }, 
      { url: '/favicon.ico', sizes: '32x32', type: 'image/ico' },
      { url: '/favicon.ico', sizes: '96x96', type: 'image/ico' },
    ],
    apple: [
      { url: '/favicon.ico', sizes: '57x57', type: 'image/ico' },
      { url: '/favicon.ico', sizes: '60x60', type: 'image/ico' },
      { url: '/favicon.ico', sizes: '72x72', type: 'image/png' },
      { url: '/favicon.ico', sizes: '76x76', type: 'image/ico' },
      { url: '/favicon.ico', sizes: '114x114', type: 'image/ico' },
      { url: '/favicon.ico', sizes: '120x120', type: 'image/png' },
      { url: '/favicon.ico', sizes: '144x144', type: 'image/ico' },
      { url: '/favicon.ico', sizes: '152x152', type: 'image/ico' },
      { url: '/favicon.ico', sizes: '180x180', type: 'image/ico' },
    ],
    shortcut: '/favicon.ico',
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon.ico',
        color: '#000000',
      },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    title: 'MangaHaven - Read Manga Online Free',
    description:
      'Your ultimate destination for reading manga online. Access thousands of manga titles with high-quality scans, daily updates, and an amazing reading experience. Read shounen, shoujo, seinen, manhwa, and more!',
    siteName: 'MangaHaven',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'MangaHaven - Read Manga Online Free',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MangaHaven - Read Manga Online Free',
    description:
      'Read your favorite manga online for free. Thousands of titles, daily updates, and seamless reading experience on MangaHaven.',
    site: '@mangahaven',
    creator: '@mangahaven',
    images: [
      {
        url: '/og-image.webp',
        alt: 'MangaHaven - Read Manga Online Free',
        type: 'image/webp', 
      },
    ],
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'en-IN': siteUrl,
      'en-EN': siteUrl,
      'en-US': siteUrl,
      'en-GB': siteUrl,
      'en-CA': siteUrl,
      'en-AU': siteUrl,
      'en-NZ': siteUrl,
      'en-ZA': siteUrl,
      'en-ZM': siteUrl,
      'x-default': siteUrl,
    },
  },
  category: 'Entertainment',
  classification: 'Manga Reading Platform',
  other: {
    'theme-color': '#000000',
    'color-scheme': 'dark light',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'MangaHaven',
    'application-name': 'MangaHaven',
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/browserconfig.xml',
  },
};

// Structured Data for SEO
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'MangaHaven',
  description:
    'Read your favorite manga online for free at MangaHaven. Discover thousands of manga titles with high-quality scans, regular updates, and a seamless reading experience.',
  url: siteUrl,
  publisher: {
    '@type': 'Organization',
    name: 'MangaHaven',
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/favicon.ico`,
    },
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteUrl}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
  genre: [
    'Manga',
    'Shounen',
    'Shoujo',
    'Seinen',
    'Josei',
    'Action',
    'Adventure',
    'Romance',
    'Fantasy',
    'Comedy',
    'Drama',
    'Horror',
    'Mystery',
    'Slice of Life',
    'Sports',
    'Supernatural',
  ],
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': siteUrl,
  },
  inLanguage: 'en-IN',
  audience: {
    '@type': 'Audience',
    audienceType: 'Manga Readers',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
      </head>
      <body className={`${suse.variable} ${rubik.variable} scroll-smooth bg-[#070707] `}>
        <Suspense>
          <Providers>{children}</Providers>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}

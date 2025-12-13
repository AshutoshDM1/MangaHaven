import { Metadata } from 'next';
import { getAllManga, getMangaById, getMangaBySlug, getMangaChapterById } from '@/services/apiv2';
import siteUrl from './site';
import { Manga } from '@prisma/client';

interface MangaMetadataOptions {
  mangaId: string;
  chapterId?: string;
}

/**
 * Generate dynamic metadata for manga pages (both manga detail and chapter pages)
 * @param options - Object containing slug and optional chapterId
 * @returns Promise<Metadata> - Next.js metadata object
 */
export async function generateMangaMetadata({
  mangaId,
  chapterId,
}: MangaMetadataOptions): Promise<Metadata> {
  try {
    // Fetch manga data
    const manga = await getMangaBySlug(mangaId) as unknown as Manga;

    if (!manga) {
      return {
        title: 'Manga Not Found | MangaHaven',
        description: 'The requested manga could not be found.',
      };
    }

    const mangaTitle = manga.title;
    const mangaDescription = manga.description;
    const genresString = manga.genres.join(', ');

    // If chapterId is provided, fetch chapter data for chapter-specific metadata
    let chapterData = null;
    if (chapterId) {
      try {
        const chapterResponse = await getMangaChapterById(
          manga.id,
          Number(chapterId)
        );
        chapterData = chapterResponse.data;
      } catch (error) {
        console.error('Error fetching chapter data:', error);
      }
    }

    // Generate URLs
    const canonicalUrl = chapterId
      ? `${siteUrl}/read/${mangaId}/${chapterId}`
      : `${siteUrl}/read/${mangaId}`;

    // Generate title and description based on whether this is a chapter page
    const title = chapterData
      ? `${mangaTitle} - Chapter ${chapterData.chapterNumber}`
      : `${mangaTitle} | Read Manga Online`;

    const description = chapterData
      ? `Read ${mangaTitle} Chapter ${chapterData.chapterNumber}: ${chapterData.chapterTitle} online at MangaHaven. ${genresString}.`
      : mangaDescription ||
        `Read ${mangaTitle} manga online. ${genresString}. ${manga.totalChapter} chapters available.`;

    // Generate keywords
    const keywords = [
      'MangaHaven',
      mangaTitle,
      `${mangaTitle} manga`,
      `Read ${mangaTitle}`,
      `${mangaTitle} online`,
      ...manga.genres,
      'Manga',
      'Read Manga Online',
      'Manga Reader',
      'Online Manga',
      'Japanese Comics',
      'Manga Community',
    ];

    if (chapterData) {
      keywords.push(
        `${mangaTitle} Chapter ${chapterData.chapterNumber}`,
        `Chapter ${chapterData.chapterNumber}`,
        chapterData.chapterTitle
      );
    }

    // Open Graph title
    const ogTitle = chapterData
      ? `${mangaTitle} - Chapter ${chapterData.chapterNumber} | MangaHaven`
      : `${mangaTitle} | Read Manga Online - MangaHaven`;

    // Open Graph description
    const ogDescription = chapterData
      ? `Read ${mangaTitle} Chapter ${chapterData.chapterNumber}: ${chapterData.chapterTitle} online at MangaHaven.`
      : mangaDescription ||
        `Read ${mangaTitle} manga online. ${genresString}. ${manga.totalChapter} chapters available on MangaHaven.`;

    return {
      title,
      description,
      keywords,
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
        title: ogTitle,
        description: ogDescription,
        siteName: 'MangaHaven',
        locale: 'en_US',
        images: [
          {
            url: manga.coverImageUrl,
            width: 1200,
            height: 630,
            alt: `${mangaTitle} - Cover Image`,
            type: 'image/jpeg',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        site: '@MangaHaven',
        creator: '@MangaHaven',
        title: ogTitle,
        description: ogDescription,
        images: [manga.coverImageUrl],
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
      other: {
        'application-name': 'MangaHaven',
        'mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'default',
        'og:type': 'book',
        'book:author': manga.genres.join(', '),
        'book:tag': manga.genres.join(', '),
        ...(chapterData && {
          'article:published_time': chapterData.createdAt,
        }),
      },
    };
  } catch (error) {
    console.error('Error generating manga metadata:', error);
    return {
      title: 'Read Manga | MangaHaven',
      description: 'Read your favorite manga online at MangaHaven.',
    };
  }
}


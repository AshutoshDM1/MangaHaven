import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://mangahaven.elitedev.tech'
  
  // Base routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/profile`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
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
  ]

  // TODO: Add dynamic manga pages when you have a way to fetch manga list
  // Example:
  // const mangaRoutes = await fetchMangaList().then(mangas => 
  //   mangas.map(manga => ({
  //     url: `${baseUrl}/read/${manga.id}`,
  //     lastModified: new Date(manga.updatedAt),
  //     changeFrequency: 'weekly' as const,
  //     priority: 0.8,
  //   }))
  // )

  return routes
} 
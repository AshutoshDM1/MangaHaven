import { Suspense } from 'react';
import Home from '@/modules/Home/Home';
import prisma from '@/db/db';

// Use ISR instead of force-static - data fetched at runtime, cached for 1 hour
export const revalidate = 3600; // Revalidate every hour

export default async function HomePage() {
  try {
    console.log('🔍 HomePage: Fetching manga data...');

    const mangas = await prisma.manga.findMany({
      where: {
        mangaCategories: {
          some: { categoryId: 6 },
        },
      },
    });

    console.log(`✅ HomePage: Fetched ${mangas.length} manga(s)`);

    return (
      <Suspense>
        <Home mangas={mangas} />
      </Suspense>
    );
  } catch (error) {
    console.error('❌ Error fetching manga:', error);
    return (
      <Suspense>
        <Home mangas={[]} />
      </Suspense>
    );
  }
}

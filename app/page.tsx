import { Suspense } from 'react';
import Home from '@/modules/Home/Home';
import axios from 'axios';

export const dynamic = 'force-static';
export const revalidate = 86400;

export default async function HomePage() {
  try {
    const featuredManga = async () => {
      const response = await axios.get('https://mangaheaven.app/api/v2/manga/addmanga?categoryId=6');
      return response.data;
    };
    const mangas = await featuredManga();

    if (mangas.length > 0) {
      console.log("✅ Manga fetched successfully");
    }
    else {
      console.error('❌ No manga fetched');
    }
    return (
      <Suspense>
        <Home mangas={mangas} />
      </Suspense>
    );
  } catch (error) {
    console.error('Error fetching manga:', error);
    return (
      <Suspense>
        <Home mangas={[]} />
      </Suspense>
    );
  }
}

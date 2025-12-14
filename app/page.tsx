import Home from "@/modules/Home/Home";
import prisma from "@/db/db";

export const dynamic = 'force-static';
export const revalidate = 86400;

export default async function HomePage() {
  try {
    const mangas = await prisma.manga.findMany({
      where: { 
        mangaCategories: { 
          some: { categoryId: 6 } 
        } 
      },
    });
    return <Home mangas={mangas} />;
  } catch (error) {
    console.error('Error fetching manga:', error);
    return <Home mangas={[]} />;
  }
}

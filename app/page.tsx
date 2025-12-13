import { Suspense } from "react";
import Home from "@/modules/Home/Home";
import prisma from "@/db/db";
import { Manga } from "@prisma/client";

export const dynamic = 'force-static';
export const revalidate = 86400;

export default async function HomePage() {
  try {
    // Fetch manga by category directly from Prisma (works during build time)
    const mangas = await prisma.manga.findMany({
      where: { 
        mangaCategories: { 
          some: { categoryId: 6 } 
        } 
      },
    });
    
    return (
      <Suspense>
        <Home mangas={mangas} />
      </Suspense>
    );
  } catch (error) {
    console.error('Error fetching manga:', error);
    // Return empty array on error to allow build to continue
    return (
      <Suspense>
        <Home mangas={[]} />
      </Suspense>
    );
  }
}

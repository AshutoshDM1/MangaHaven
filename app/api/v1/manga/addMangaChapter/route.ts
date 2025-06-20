import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/db";

type MangaChapter = {
  chapterNumber: number;
  mangaId: number;
};

const POST = async (request: NextRequest) => {
  const body: MangaChapter[] = await request.json();

  try {
    const result = await prisma.$transaction(async (tx) => {
      const mangaChapter = await tx.mangaChapter.createMany({
        data: body.map((item) => ({
          chapterNumber: item.chapterNumber,
          mangaId: item.mangaId,
        }))
      });
      
      const mangaTotalChapter = await tx.manga.update({
        where: { id: body[0].mangaId },
        data: { totalChapter: { increment: body.length } }
      });
      
      return { mangaChapter, mangaTotalChapter };
    });
    
    return NextResponse.json({ message: "Manga chapter added", ...result });
  } catch (error) {
    console.error('Error adding manga chapters:', error);
    return NextResponse.json({ error: "Failed to add manga chapters" }, { status: 500 });
  }
};

export { POST };
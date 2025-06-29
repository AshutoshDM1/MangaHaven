import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/db";

type MangaChapter = {
  chapterNumber: number;
  chapterTitle: string;
  mangaId: number;
};

const GET = async (request: NextRequest) => {
  const mangaId = request.nextUrl.searchParams.get("mangaId");
  const mangaChapterId = request.nextUrl.searchParams.get("mangaChapterId");
  try {
    if (mangaChapterId) {
      const result = await prisma.mangaChapter.findUnique({
        where: { mangaId: Number(mangaId), id: Number(mangaChapterId) },
      });
      return NextResponse.json(result);
    }
    if (mangaId) {
      const result = await prisma.mangaChapter.findMany({
        where: { mangaId: Number(mangaId) },
      });
      return NextResponse.json(result);
    }
  } catch (error) {
    console.error("Error fetching manga chapters:", error);
    return NextResponse.json(
      { error: "Failed to fetch manga chapters", errorData: error },
      { status: 500 }
    );
  }
};

const POST = async (request: NextRequest) => {
  const body: MangaChapter = await request.json();

  try {
    const result = await prisma.$transaction(async (tx) => {
      const mangaChapter = await tx.mangaChapter.create({
        data: {
          chapterNumber: body.chapterNumber,
          chapterTitle: body.chapterTitle,
          mangaId: body.mangaId,
        },
      });

      const mangaTotalChapter = await tx.manga.update({
        where: { id: body.mangaId },
        data: { totalChapter: { increment: 1 } },
      });

      return { mangaChapter, mangaTotalChapter };
    });

    return NextResponse.json({ message: "Manga chapter added", ...result });
  } catch (error) {
    console.error("Error adding manga chapters:", error);
    return NextResponse.json(
      { error: "Failed to add manga chapters", errorData: error },
      { status: 500 }
    );
  }
};

export { GET, POST };

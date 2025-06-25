import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/db";

type MangaChapterImage = {
  imageUrl: string;
  mangaChapterId: number;
};

const GET = async (request: NextRequest) => {
  const mangaChapterId = request.nextUrl.searchParams.get("mangaChapterId");
  try {
    const result = await prisma.mangaChapterImage.findMany({
      where: { mangaChapterId: Number(mangaChapterId) },
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching manga images:", error);
    return NextResponse.json({ error: "Failed to fetch manga images" , errorData: error }, { status: 500 });
  }
};

const POST = async (request: NextRequest) => {
  const body: MangaChapterImage[] = await request.json();
  try {
    const result = await prisma.mangaChapterImage.createMany({
      data: body
    });
    return NextResponse.json({ message: "Manga images added", result });
  } catch (error) {
    console.error('Error adding manga images:', error);
    return NextResponse.json({ error: "Failed to add manga images", errorData: error }, { status: 500 });
  }
};

export { GET, POST };
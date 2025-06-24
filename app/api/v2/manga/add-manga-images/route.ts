import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/db";

type MangaChapterImage = {
  imageUrl: string;
  mangaChapterId: number;
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
    return NextResponse.json({ error: "Failed to add manga images", success: false }, { status: 500 });
  }
};

export { POST };
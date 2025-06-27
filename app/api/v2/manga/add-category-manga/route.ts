import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/db";

interface CategoryManga {
  name: string;
  mangaId: number[];
  categoryId: number;
}

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        mangas: {
          select: {
            id: true,
            title: true,
            coverImageUrl: true,
            description: true,
            totalChapter: true,
            totalAvailableChapter: true,
            genres: true,
          }
        }
      }
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name }: CategoryManga = await request.json();
    const manga = await prisma.category.create({
      data: { name },
    });
    return NextResponse.json(manga);
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { mangaId, categoryId }: CategoryManga = await request.json();
    const manga = await prisma.category.update({
      where: { id: categoryId },
      data: { mangas: { connect: mangaId.map((id) => ({ id })) } },
    });
    return NextResponse.json(manga);
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


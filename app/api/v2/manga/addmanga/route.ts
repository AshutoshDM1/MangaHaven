import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

type Manga = {
  id: number;
  title: string;
  coverImageUrl: string;
  description: string;
  totalChapter: number;
  totalAvailableChapter: number;
  genres: string[];
};

const GET = async (request: NextRequest) => {
  try {
    const mangaId = request.nextUrl.searchParams.get("mangaId");
    const categoryId = request.nextUrl.searchParams.get("categoryId");
    if (mangaId) {
      const manga = await prisma.manga.findUnique({
        where: { id: Number(mangaId) },
      });
      return NextResponse.json(manga);
    } else if (categoryId) {
      const mangas = await prisma.manga.findMany({
        where: { mangaCategories: { some: { categoryId: Number(categoryId) } } },
      });
      return NextResponse.json(mangas);
    } else {
      const mangas = await prisma.manga.findMany();
      return NextResponse.json(mangas);
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch manga entries" },
      { status: 500 }
    );
  }
};

const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const result = await prisma.manga.createMany({
      data: body.map((item: Manga) => ({
        title: item.title,
        coverImageUrl: item.coverImageUrl,
        description: item.description,
        totalChapter: item.totalChapter,
        totalAvailableChapter: item.totalAvailableChapter,
        genres: item.genres,
      })),
    });
    return NextResponse.json(
      { message: "Manga added successfully", result },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create manga entries" },
      { status: 500 }
    );
  }
};

const DELETE = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const result = await prisma.manga.deleteMany({
      where: { id: body.id },
    });
    return NextResponse.json(
      { message: "Manga deleted successfully", result },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to delete manga entries" },
      { status: 500 }
    );
  }
};

const PUT = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const result = await prisma.manga.update({
      where: { id: body.id },
      data: {
        title: body.title,
        coverImageUrl: body.coverImageUrl,
        description: body.description,
        totalChapter: body.totalChapter,
        totalAvailableChapter: body.totalAvailableChapter,
        genres: body.genres,
      },
    });
    return NextResponse.json(
      { message: "Manga updated successfully", result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update manga entries" },
      { status: 500 }
    );
  }
};

export { GET, POST, DELETE, PUT };

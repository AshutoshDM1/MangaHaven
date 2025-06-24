import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json(
        { error: "Search query is required" },
        { status: 400 }
      );
    }

    // Search manga by title (case-insensitive partial match)
    const mangas = await prisma.manga.findMany({
      where: {
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        title: true,
        coverImageUrl: true,
        description: true,
        totalChapter: true,
        totalAvailableChapter: true,
        genres: true,
      },
      take: 10, // Limit results to 10 for performance
    });

    return NextResponse.json(mangas);
  } catch (error) {
    console.error("Error searching manga:", error);
    return NextResponse.json(
      { error: "Failed to search manga" },
      { status: 500 }
    );
  }
} 
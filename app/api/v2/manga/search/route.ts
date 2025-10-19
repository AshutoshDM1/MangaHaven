import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const genre = searchParams.get("genre");

    if (!query && !genre) {
      return NextResponse.json(
        { error: "Search query or genre is required" },
        { status: 400 }
      );
    }

    // Build where clause based on provided parameters
    let whereClause: any = {};
    if (query && genre) {
      // Search by both title and genre
      whereClause = {
        AND: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            genres: {
              has: genre,
            },
          },
        ],
      };
    } else if (query) {
      // Search by title only
      whereClause = {
        title: {
          contains: query,
          mode: "insensitive",
        },
      };
    } else if (genre) {
      // Search by genre only
      whereClause = {
        genres: {
          has: genre,
        },
      };
    }

    const mangas = await prisma.manga.findMany({
      where: whereClause,
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
      orderBy: {
        title: "asc",
      },
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
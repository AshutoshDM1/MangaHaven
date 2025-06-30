import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q"); // Search query (title)
    const genre = searchParams.get("genre"); // Genre filter
    const type = searchParams.get("type"); // Type filter (will be used for future manga type filtering)
    const character = searchParams.get("character"); // A-Z character filter
    const limit = searchParams.get("limit"); // Results limit
    const page = searchParams.get("page"); // Pagination

    // Convert parameters
    const limitNum = limit ? parseInt(limit) : 20;
    const pageNum = page ? parseInt(page) : 1;
    const offset = (pageNum - 1) * limitNum;

    // Build where clause based on provided parameters
    let whereClause: any = {};
    const conditions: any[] = [];

    // Title search
    if (query && query.trim()) {
      conditions.push({
        title: {
          contains: query.trim(),
          mode: "insensitive",
        },
      });
    }

    // Genre filter
    if (genre) {
      conditions.push({
        genres: {
          has: genre,
        },
      });
    }

    // Alphabetical filter
    if (character) {
      conditions.push({
        title: {
          startsWith: character.toUpperCase(),
          mode: "insensitive",
        },
      });
    }

    // Type filter (placeholder for future use - could be used with a manga type field)
    if (type) {
      // For now, we'll add this as a comment since there's no type field in the schema
      // In the future, you could add a `type` field to the Manga model
      // conditions.push({
      //   type: {
      //     equals: type,
      //     mode: "insensitive",
      //   },
      // });
    }

    // Combine conditions
    if (conditions.length > 0) {
      whereClause = {
        AND: conditions,
      };
    }

    // If no search parameters provided, return all manga with pagination
    if (!query && !genre && !character && !type) {
      // Return all manga with basic pagination
    }

    // Execute search query
    const [mangas, totalCount] = await Promise.all([
      prisma.manga.findMany({
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
        take: limitNum,
        skip: offset,
        orderBy: {
          title: "asc",
        },
      }),
      prisma.manga.count({
        where: whereClause,
      }),
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limitNum);
    const hasNextPage = pageNum < totalPages;
    const hasPreviousPage = pageNum > 1;

    return NextResponse.json({
      data: mangas,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalCount,
        limit: limitNum,
        hasNextPage,
        hasPreviousPage,
      },
      filters: {
        query: query || null,
        genre: genre || null,
        type: type || null,
        character: character || null,
      },
    });
  } catch (error) {
    console.error("Error searching manga:", error);
    return NextResponse.json(
      { error: "Failed to search manga" },
      { status: 500 }
    );
  }
} 
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
        mangaCategories: {
          include: {
            manga: {
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
        }
      }
    });

    // Transform the data to match the expected format
    const transformedCategories = categories.map(category => ({
      ...category,
      mangas: category.mangaCategories.map(mc => mc.manga)
    }));

    return NextResponse.json(transformedCategories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name }: CategoryManga = await request.json();
    const category = await prisma.category.create({
      data: { name },
    });
    return NextResponse.json(category);
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
    
    // Create MangaCategory relationships for each manga
    const mangaCategoryData = mangaId.map(id => ({
      mangaId: id,
      categoryId: categoryId
    }));

    // Use createMany to create multiple relationships at once
    // Use skipDuplicates to avoid errors if relationship already exists
    await prisma.mangaCategory.createMany({
      data: mangaCategoryData,
      skipDuplicates: true
    });

    // Fetch the updated category with its manga relationships
    const updatedCategory = await prisma.category.findUnique({
      where: { id: categoryId },
      include: {
        mangaCategories: {
          include: {
            manga: {
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
        }
      }
    });

    if (!updatedCategory) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    // Transform the data to match the expected format
    const transformedCategory = {
      ...updatedCategory,
      mangas: updatedCategory.mangaCategories.map(mc => mc.manga)
    };

    return NextResponse.json(transformedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Add DELETE method to remove manga from category
export async function DELETE(request: NextRequest) {
  try {
    const { mangaId, categoryId }: CategoryManga = await request.json();
    
    // Delete the MangaCategory relationships
    await prisma.mangaCategory.deleteMany({
      where: {
        categoryId: categoryId,
        mangaId: {
          in: mangaId
        }
      }
    });

    // Fetch the updated category
    const updatedCategory = await prisma.category.findUnique({
      where: { id: categoryId },
      include: {
        mangaCategories: {
          include: {
            manga: {
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
        }
      }
    });

    if (!updatedCategory) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    // Transform the data to match the expected format
    const transformedCategory = {
      ...updatedCategory,
      mangas: updatedCategory.mangaCategories.map(mc => mc.manga)
    };

    return NextResponse.json(transformedCategory);
  } catch (error) {
    console.error("Error removing manga from category:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


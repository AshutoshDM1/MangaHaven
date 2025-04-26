import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newMangaDeshBoard = await prisma.mangaDeshBoard.create({
      data: {
        title: body.title,
        imageUrl: body.imageUrl,
        description: body.description,
        chapter: body.chapter,
        volume: body.volume,
        status: body.status,
      },
    });

    return NextResponse.json(newMangaDeshBoard, { status: 201 });
  } catch (error) {
    console.error("Error creating manga dashboard entry:", error);
    if (error instanceof Error && "code" in error && error.code === "P2002") {
      return NextResponse.json(
        { error: "A manga with this title already exists" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "Failed to create manga dashboard entry" },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Existing GET function
export async function GET() {
  try {
    const mangaDeshBoardData = await prisma.mangaDeshBoard.findMany();
    return NextResponse.json(mangaDeshBoardData);
  } catch (error) {
    console.error("Error fetching manga dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch manga dashboard data" },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}

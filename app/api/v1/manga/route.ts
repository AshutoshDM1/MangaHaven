import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

type Manga = {
  title: string;
  imageUrl: string;
  genres: string[];
};

// GET request handler
const GET = async () => {
  try {
    const mangas = await prisma.manga.findMany();
    return NextResponse.json(mangas);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch manga entries" },
      { status: 500 },
    );
  }
};

// POST request handler
const POST = async (request: NextRequest) => {
  try {
    const body: Manga[] = await request.json();
    const result = await prisma.manga.createMany({
      data: body.map((item) => ({
        title: item.title,
        genres: item.genres,
        imageUrl: item.imageUrl,
      })),
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create manga entries" },
      { status: 500 },
    );
  }
};

export { GET, POST };

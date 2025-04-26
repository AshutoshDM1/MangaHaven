import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  const { title: string } = await req.json();
  try {
    const mangaCover = await prisma.mangaCover.findFirst({
      where: { title: string },
    });
    return NextResponse.json(mangaCover);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch manga Image" },
      { status: 500 },
    );
  }
};

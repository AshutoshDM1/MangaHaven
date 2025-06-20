import { NextRequest, NextResponse } from "next/server";
import { MangaChapterImage } from "@prisma/client";

const POST = async (request: NextRequest) => {
  const body: MangaChapterImage[] = await request.json();
  console.log(body);
  return NextResponse.json({ message: "Manga images added" });
};

export { POST };
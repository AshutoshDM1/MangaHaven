import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

const Post = async (req: Request) => {
  const { email, name, image } = await req.json();
  try {
    const result = await prisma.user.update({
      where: { email },
      data: { name, image },
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 },
    );
  }
};

const Get = async (req: Request) => {
  try {
    const result = await prisma.user.findMany();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
};

export { Post as POST, Get as GET };

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/db";

const GET = async (request: NextRequest) => {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: "Failed to fetch users", success: false }, { status: 500 });
  }
};

export { GET };
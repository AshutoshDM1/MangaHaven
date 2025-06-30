import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/db";

const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    if (email) {
      const user = await prisma.user.findFirst({
        where: { email },
      });
      return NextResponse.json(user);
    } else {
        return NextResponse.json({ error: "Email is required", success: false }, { status: 400 });
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: "Failed to fetch users", success: false }, { status: 500 });
  }
};

export { GET };

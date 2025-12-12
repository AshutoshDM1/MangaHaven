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


export const DELETE = async (request: NextRequest) => {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required", success: false }, { status: 400 });
    }

    const deletedUser = await prisma.user.delete({
      where: { email },
    });

    return NextResponse.json({ message: "User deleted successfully", user: deletedUser, success: true });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Failed to delete user", success: false }, { status: 500 });
  }
};


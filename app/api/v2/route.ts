/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";

const GET = async (request: NextRequest) => {
  return NextResponse.json({ message: "Hello to mangaHaven API v2" });
};

export { GET };
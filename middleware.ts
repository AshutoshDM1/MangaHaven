import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const response = NextResponse.next();

  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE",
  );
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return new NextResponse(null, { headers: response.headers });
  }

  return response;
}

export const config = {
  matcher: "/api/:path*",
};

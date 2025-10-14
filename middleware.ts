import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const response = NextResponse.next();

  // CORS headers for API routes
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE",
  );
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return new NextResponse(null, { headers: response.headers });
  }

  // Admin route protection
  if (req.nextUrl.pathname.startsWith("/admin")) {
    try {
      const token = await getToken({ 
        req, 
        secret: process.env.NEXTAUTH_SECRET 
      });

      // If no token, redirect to login
      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      // Check if the user has admin email
      if (token.email !== "mangahaven.admin@gmail.com" && token.email !== "downlodemaster1@gmail.com") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    } catch (error) {
      console.error("Admin middleware error:", error);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/api/:path*", "/admin/:path*"],
};

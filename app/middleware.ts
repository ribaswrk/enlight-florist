import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

interface UserToken {
  user: {
    id: string;
    role: string;
  };
}
export async function middleware(req: NextRequest) {
  const token = (await getToken({ req })) as UserToken | null;

  const isApiRoute = req.nextUrl.pathname.startsWith("/api");

  // ✅ 1. Allow public access to landing pages
  if (!isApiRoute && req.nextUrl.pathname === "/") {
    return NextResponse.next();
  }

  // ✅ 2. Protect API routes (POST, PUT, DELETE)
  if (isApiRoute && req.method !== "GET") {
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Attach user ID to headers
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", token.user.id);

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  // ✅ 3. Protect Admin Pages
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!token || token.user.role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

// ✅ Apply middleware to API and admin routes
export const config = {
  matcher: ["/api/:path*", "/admin/:path*"],
};

import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  console.log("Middleware Token:", token); // 🔍 Debugging

  const isApiRoute = req.nextUrl.pathname.startsWith("/api");

  // ✅ Public Access
  if (!isApiRoute && req.nextUrl.pathname === "/") {
    return NextResponse.next();
  }

  // ✅ Protect API routes (POST, PUT, DELETE)
  if (isApiRoute && req.method !== "GET") {
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Attach user ID to headers
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", token.id as string);

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  // ✅ Protect Admin Pages
  if (
    req.nextUrl.pathname.startsWith("/admin") &&
    req.nextUrl.pathname !== "/admin/login"
  ) {
    console.log("Checking admin access:", token); // 🔍 Debugging

    if (!token || token.role !== "admin") {
      console.log("Unauthorized access to admin, redirecting..."); // 🔍 Debugging
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};

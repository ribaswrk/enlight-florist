import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  console.log("MIDDDLWEEE");
  const token = await getToken({ req });

  // ✅ Protect API routes (POST, PUT, DELETE)
  if (req.method !== "GET") {
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized Middleware" },
        { status: 401 }
      );
    }
    const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
    console.log("current time", currentTime);
    if (token.exp && Number(token.exp) > currentTime) {
      return NextResponse.json({ error: "Session expired" }, { status: 401 });
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
    const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
    console.log("current time", currentTime);
    if (token.exp && Number(token.exp) > currentTime) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};

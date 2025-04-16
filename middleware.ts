import { NextRequest, NextResponse } from "next/server";

const protectedPaths = ["/profile", "/admin", "/doctor"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // run check only on the selected routes
  const isProtected = protectedPaths.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtected) {
    return NextResponse.next(); // continue if the route is not part of the protected routes
  }

  //   get access token
  const accessToken = request.cookies.get("access_token")?.value;

  if (!accessToken) {
    // redirect to home page if there is no token
    const homeUrl = new URL("/", request.url);
    homeUrl.searchParams.set("authError", "true");

    return NextResponse.redirect(homeUrl);
  }

  // if there is token, user can proceed
  return NextResponse.next();
}

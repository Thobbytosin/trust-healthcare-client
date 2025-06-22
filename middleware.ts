import { NextRequest, NextResponse } from "next/server";

const protectedPaths = ["/profile", "/admin", "/doctor", "/find-doctors"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("Middleware cookies:", request.cookies.getAll());

  // run check only on the selected routes
  const isProtected = protectedPaths.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtected) {
    return NextResponse.next(); // continue if the route is not part of the protected routes
  }

  //   get access token
  const TR_HOST_X = request.cookies.get("TR_HOST_X")?.value;

  if (!TR_HOST_X) {
    // redirect to home page if there is no token
    const homeUrl = new URL("/", request.url);
    homeUrl.searchParams.set("authError", "true");

    return NextResponse.redirect(homeUrl);
  }

  // if there is token, user can proceed
  return NextResponse.next();
}

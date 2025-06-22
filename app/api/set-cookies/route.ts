import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { accessToken, refreshToken, loggedInToken } = await req.json();

  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: "TR_HOST_X",
    value: accessToken,
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 30, // 30 minutes
  });

  response.cookies.set({
    name: "TC_AGENT_X",
    value: refreshToken,
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60 * 24 * 5, // 7 days
  });

  response.cookies.set({
    name: "_XUR_CR_HOST",
    value: loggedInToken,
    httpOnly: false,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60 * 24 * 5, // 7 days
  });

  return response;
}

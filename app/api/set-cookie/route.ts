import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ message: "Cookie set!" });

  // Set a cookie named `tc_agent_x`
  response.cookies.set({
    name: "tc_agentt_xxx",
    value: "yourTokenValue",
    httpOnly: false, // must be false if you want JS to access it
    secure: true, // required if SameSite=None
    sameSite: "none", // needed for cross-site
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });

  response.cookies.set({
    name: "tc_agenttt_x",
    value: "yourSecureRefreshToken",
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}

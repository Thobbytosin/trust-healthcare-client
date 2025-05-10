import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json(
      { message: "Missing coordinates" },
      { status: 400 }
    );
  }

  const BASE_URL = process.env.NEXT_PUBLIC_OPENCAGE_BASE_URL;
  const API_KEY = process.env.OPENCAGE_API_KEY;

  if (!API_KEY) {
    return NextResponse.json({ message: "Missing API key" }, { status: 500 });
  }
  // 6.4299529,3.4162174
  const url = `${BASE_URL}?q=${lat}+${lon}&key=${API_KEY}&pretty=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const city =
      data?.results?.[0]?.components?._normalized_city ||
      data?.results?.[0]?.components?.state;
    const town = data?.results?.[0]?.components?.county;
    const road = data?.results?.[0]?.components?.road;

    return NextResponse.json({
      // results: data?.results?.[0],
      city,
      town,
      road,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to reverse geocode" },
      { status: 500 }
    );
  }
}

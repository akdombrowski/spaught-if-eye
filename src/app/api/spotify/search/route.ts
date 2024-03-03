import { type NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { auth } from "~/auth";
import search from "~/spotify/search";
import { SpotifySearchRes } from "~/types/search";
import SearchResponse from "~/types/search";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session) {
    console.error("need to sign in");
    const signInURL = new URL("/api/auth/signin", request.nextUrl);
    redirect(signInURL.href);
  }
  const formData = await request.formData();
  const q = formData.get("q");
  const type = formData.get("type");
  const market = formData.get("market");
  const limit = formData.get("limit");
  const offset = formData.get("offset");
  const include_external = formData.get("include_external");
  const searchRequest = { q, type, market, offset, include_external };
  const topTracks: SpotifySearchRes | null = await search(searchRequest);
  if (!topTracks) {
    console.error("no top tracks");
  }
  return NextResponse.json({ topTracks }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const session = (await auth())!;
  const token = await getToken(session?.user?.id);
  if (!token) {
    console.error("need to sign in");
    const signInURL = new URL("/api/auth/signin", request.nextUrl);
    redirect(signInURL.href);
  }

  const topTracks: Track[] | null = await getTopTracks(token);
  if (!topTracks) {
    console.error("no top tracks");
    return NextResponse.error();
  }
  return NextResponse.json({ topTracks }, { status: 200 });
}

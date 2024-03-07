import { type NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { auth } from "~/auth";
import search from "~/spotify/search";
import type { SpotifySearchRes, SpotifySearchReq } from "~/types/search";
import SearchResponse from "~/types/search";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session) {
    console.error("need to sign in");
    const signInURL = new URL("/api/auth/signin", request.nextUrl);
    redirect(signInURL.href);
  }
  console.log("");
  console.log("");
  console.log("");
  console.log("get form data");
  const formData = await request.formData();
  console.log("");
  console.log("");
  console.log("form data:");
  console.log("");
  console.log("");
  console.log("");
  console.log(formData);
  const q = formData.get("q");
  const type = formData.get("type");
  const market = formData.get("market");
  const limit = formData.get("limit");
  const offset = formData.get("offset");
  const include_external = formData.get("include_external");
  // const searchRequest = { q, type, market, offset, include_external };
  // const topTracks: SpotifySearchRes | null = await search(searchRequest);
  // if (!topTracks) {
  //   console.error("no top tracks");
  // }
  return NextResponse.json({ success: "yest" }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    console.error("need to sign in");
    const signInURL = new URL("/api/auth/signin", request.nextUrl);
    redirect(signInURL.href);
  }
  console.log("");
  console.log("");
  console.log("");
  console.log("get form data");
  // const formData = await request.formData();
  const body = await request.json();
  console.log("");
  console.log("");
  // console.log("form data:");
  // console.log(formData);
  console.log("");
  console.log("");
  console.log("body:");
  console.log(body);
  console.log("");
  console.log("");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const keywords = body.keywords;
  console.log("keywords");
  console.log(keywords);
  console.log("");
  console.log("");
  console.log("");
  const q = keywords;
  const type = "track";
  // const market = formData.get("market");
  // const limit = formData.get("limit");
  // const offset = formData.get("offset");
  // const include_external = formData.get("include_external");
  const searchRequest: SpotifySearchReq = {
    q,
    type,
  };
  const searchResults: SpotifySearchRes | null = await search({
    searchRequest,
  });
  // if (!topTracks) {
  //   console.error("no top tracks");
  // }
  return NextResponse.json({ success: "yest" }, { status: 200 });
}

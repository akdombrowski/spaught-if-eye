/* eslint-disable @typescript-eslint/no-unused-vars */
import { type NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { auth } from "~/auth";

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
  const body = (await request.json()) as {
    keywords: string;
    artist: string;
    album: string;
    genre: string;
    year: number;
    hipster: boolean;
    newRelease: boolean;
    recent: boolean;
  };
  const { keywords, artist, album, genre, year, hipster, newRelease, recent } =
    body;
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
  console.log("keywords");
  console.log(keywords);
  console.log("");
  console.log("");
  console.log("");
  const query = keywords;
  const q = { query };
  let searchType = "track";
  if (artist) {
    searchType = "artist";
  } else if (album) {
    searchType = "album";
  }
  console.log("");
  console.log("");
  console.log("searchType");
  console.log(searchType);
  console.log("");
  console.log("");
  console.log("");
  // const market = formData.get("market");
  // const limit = formData.get("limit");
  // const offset = formData.get("offset");
  // const include_external = formData.get("include_external");
  // const searchRequest: SpotifySearchReq = {
  //   q,
  //   searchType,
  // };
  // const searchResults: SpotifySearchRes | null = await search({
  //   searchRequest,
  // });
  // if (!topTracks) {
  //   console.error("no top tracks");
  // }
  return NextResponse.json({ success: "yes" }, { status: 200 });
}

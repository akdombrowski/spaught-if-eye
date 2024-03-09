/* eslint-disable @typescript-eslint/no-unused-vars */
import { type Track, type SpotifyAPIUserTopResponse } from "~/types/SpotifyAPI";
import { type NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { auth } from "~/auth";

const DEBUG = false;

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session) {
    console.error("need to sign in");
    const signInURL = new URL("/api/auth/signin/spotify", request.nextUrl);
    redirect(signInURL.href);
  }

  const accessToken = session.accessToken as string;
  const accessTokenUpdatedAt = session.accessTokenUpdatedAt as number;

  if (!accessToken) {
    throw new Error("No token");
  }

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${accessToken}`);
  const res = await fetch("https://api.spotify.com/v1/me/top/tracks", {
    headers,
  });

  if (res.ok) {
    const topTracksRes = (await res.json()) as SpotifyAPIUserTopResponse;

    if (DEBUG) {
      console.log("spotify api response");
      console.log(topTracksRes);
    }

    const topTracks = topTracksRes?.items;
    if (!topTracks) {
      console.error("no tracks");
      throw new Error("No tracks");
    }

    if (DEBUG) {
      console.log("spotify api response topTracks");
      console.log(topTracks);
    }

    if (topTracks.length) {
      if (topTracks[0]?.type === "album") {
        console.error("Got albums instead of tracks back");
        throw new Error("Got albums instead of tracks back", {
          cause: topTracks,
        });
      }
    }
    return NextResponse.json({ topTracks }, { status: 200 });
  } else {
    const status = res.status;
    const statusText = res.statusText;
    console.error("failed to fetch top tracks from spotify api");
    return NextResponse.json(
      {
        error: "Unauthorized to use spotify api to fetch top tracks",
        cause: { accessToken, accessTokenUpdatedAt, status, statusText },
      },
      { status: 500 },
    );
  }
}

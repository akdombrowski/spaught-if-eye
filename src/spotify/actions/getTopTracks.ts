import { type Track, type SpotifyAPIUserTopResponse } from "~/types/SpotifyAPI";
import { auth } from "~/auth";
import { redirect } from "next/navigation";

const DEBUG = false;

export default async function getTopTracks(): Promise<{
  topTracks: Track[] | null;
}> {
  const session = await auth();
  if (!session) {
    console.error("need to sign in");
    redirect("/api/auth/signin");
  }

  const accessToken = session.accessToken as string;
  const accessTokenUpdatedAt = session.accessTokenUpdatedAt as number;

  if (!accessToken) {
    console.log("no access token to use with spotify api");
    return { topTracks: null };
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
      return { topTracks: null };
    }

    if (DEBUG) {
      console.log("spotify api response topTracks");
      console.log(topTracks);
    }

    if (topTracks.length) {
      if (topTracks[0]?.type === "album") {
        console.error("Got albums instead of tracks back");
        console.error(topTracks);
      }
    }

    return { topTracks };
  } else {
    const status = res.status;
    const statusText = res.statusText;
    console.error("failed to fetch top tracks from spotify api");
    console.error("Unauthorized to use spotify api to fetch top tracks");
    console.error({ accessToken, accessTokenUpdatedAt, status, statusText });
    return { topTracks: null };
  }
}

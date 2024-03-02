import { type Track, type SpotifyAPIUserTopResponse } from "@/types/SpotifyAPI";
import { auth } from "@/server/auth";

export default async function getTopTracks(): Promise<Track[]> {
  const session = await auth();
  const accessToken = session?.accessToken as string;
  const accessTokenUpdatedAt = session?.accessTokenUpdatedAt as number;

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

    console.log("spotify api response");
    console.log(topTracksRes);

    const topTracks = topTracksRes?.items;
    if (!topTracks) {
      console.error("no tracks");
      throw new Error("No tracks");
    }

    console.log("spotify api response topTracks");
    console.log(topTracks);

    if (topTracks.length) {
      if (topTracks[0]?.type === "album") {
        console.error("Got albums instead of tracks back");
        throw new Error("Got albums instead of tracks back", {
          cause: topTracks,
        });
      }
    }
    return topTracks as Track[];
  } else {
    const status = res.status;
    const statusText = res.statusText;
    console.error("failed to fetch top tracks from spotify api");
    console.error("status");
    console.error(status);
    console.error("statusText");
    console.error(statusText);
    throw new Error("Unauthorized to use spotify api to fetch top tracks", {
      cause: { accessToken, accessTokenUpdatedAt, status, statusText },
    });
  }
}

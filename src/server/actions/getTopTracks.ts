import { type Track, type SpotifyAPIUserTopResponse } from "@/types/SpotifyAPI";
import { getTokenFromDB, deleteSiteSessionFromDB } from "./spotifyToken";
import { auth } from "@/server/auth";

export default async function getTopTracks(): Promise<
  Track[] | "Unauthorized" | null
> {
  let session = await auth();
  let user = session?.user;
  let token = await getTokenFromDB(user?.id);
  if (!token) {
    console.log("no token found in gettoptracks");
    await deleteSiteSessionFromDB(user?.id);

    session = await auth();
    user = session?.user;
    token = await getTokenFromDB(user?.id);
    if (!token) {
      console.error("tried refreshing token but still can't get one");
      throw new Error("can't get a token for some reason");
    }
  }

  const headers = new Headers();
  headers.append("Authorization", "Bearer " + token);
  const res = await fetch("https://api.spotify.com/v1/me/top/tracks");

  if (res.ok) {
    const topTracksRes = (await res.json()) as SpotifyAPIUserTopResponse;

    console.log("spotify api response");
    console.log(topTracksRes);

    const topTracks = topTracksRes?.items;
    if (!topTracks) {
      console.error("no tracks");
      return null;
    }

    console.log("spotify api response topTracks");
    console.log(topTracks);

    if (topTracks.length) {
      if (topTracks[0]?.type === "album") {
        console.error("Got albums instead of tracks back");
        return null;
      }
    }
    return topTracks as Track[];
  } else {
    console.error("failed to fetch top tracks from spotify api");
    console.error("res.statusText");
    console.error(res.statusText);
    return "Unauthorized";
  }
}

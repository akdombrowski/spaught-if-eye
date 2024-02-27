import {
  type Track,
  type SpotifyAPIUserTopResponse,
  type ItemType,
} from "@/types/SpotifyAPI";

export default async function getTopTracks(
  token: string,
): Promise<Track[] | string | null> {
  const headers = new Headers();
  headers.append("Authorization", "Bearer " + token);
  const res = await fetch("https://api.spotify.com/v1/me/top/tracks");

  if (res.ok) {
    const topTracksRes = (await res.json()) as SpotifyAPIUserTopResponse;
    const topTracks = topTracksRes?.items;
    if (!topTracks) {
      return null;
    }
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

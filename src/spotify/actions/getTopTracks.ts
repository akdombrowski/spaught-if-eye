import { type Track, type SpotifyAPIUserTopResponse } from "~/types/SpotifyAPI";
import { auth } from "~/auth";
import { redirect } from "next/navigation";

const DEBUG = false;

export interface GetTracksResponse {
  topTracks?: Track[] | null;
  error?: {
    msg: string;
    [key: string]: string;
  };
}

export default async function getTopTracks(): Promise<GetTracksResponse> {
  const session = await auth();
  if (!session) {
    console.error("need to sign in");
    redirect("/api/auth/signin/spotify");
  }

  const accessToken = session.accessToken as string;
  const accessTokenUpdatedAt = session.accessTokenUpdatedAt as number;

  if (!accessToken) {
    console.log("no access token to use with spotify api");
    return { error: { msg: "no access token to use with spotify api" } };
  }

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${accessToken}`);
  const res = await fetch("https://api.spotify.com/v1/me/top/tracks", {
    headers,
  });

  if (res.ok) {
    const spotifySearchResBody =
      (await res.json()) as SpotifyAPIUserTopResponse;

    if (DEBUG) {
      console.log("spotify api search response");
      console.log(spotifySearchResBody);
    }

    const searchResultsItems = spotifySearchResBody?.items;
    if (!searchResultsItems) {
      console.error("no search results");

      return { error: { msg: "no search results" } };
    }

    if (DEBUG) {
      console.log("spotify api search results items");
      console.log(searchResultsItems);
    }

    if (searchResultsItems.length) {
      if (searchResultsItems[0]?.type === "album") {
        console.error("Got albums instead of tracks back");
        console.error(searchResultsItems);
        console.error(spotifySearchResBody);
        return {
          error: {
            msg: "no search results",
            searchResultsItems: JSON.stringify(searchResultsItems),
            spotifySearchResBody: JSON.stringify(spotifySearchResBody),
          },
        };
      }

      const topTracks = searchResultsItems as Track[];
      return { topTracks };
    }
  } else {
    const status = res.status;
    const statusText = res.statusText;
    console.error("failed to fetch top tracks from spotify api");
    console.error("Unauthorized to use spotify api to fetch top tracks");
    console.error({ accessToken, accessTokenUpdatedAt, status, statusText });

    return {
      error: {
        msg: "failed to fetch top tracks from spotify api",
        params: JSON.stringify({
          accessToken,
          accessTokenUpdatedAt,
          status,
          statusText,
        }),
      },
    };
  }
  return { topTracks: null, error: { msg: "vurt?!???" } };
}

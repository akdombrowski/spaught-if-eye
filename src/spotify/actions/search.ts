/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */

import type {
  SpotifySearchReq,
  SpotifySearchRes,
  SpotifySearchFilterTag,
  SpotifySearchTypes,
  SpotifySearchQueryFilters,
} from "~/types/search";
import type { Session } from "next-auth";

import { auth } from "~/auth";

import Grid from "@mui/material/Unstable_Grid2";

export const SPOTIFY_SEARCH_API_ENDPOINT = "https://api.spotify.com/v1/search";

const session = await auth();

export const search = async ({
  searchRequest,
}: {
  searchRequest: SpotifySearchReq;
}): Promise<SpotifySearchTypes> => {
  const { album, artist, track, year, upc, tags, isrc, genre } =
    searchRequest.q;
  const session: Session | null = await auth();
  const accessToken = session?.accessToken as string;
  const accessTokenUpdatedAt = session?.accessTokenUpdatedAt as number;

  if (!accessToken) {
    throw new Error("No token", { cause: searchRequest });
  }

  if (album && genre) {
    throw new Error(
      "Can't use album and genre filters together. album with albums and tracks. genre with artists and tracks.",
      { cause: searchRequest },
    );
  }

  if ((upc || tags) && (genre || isrc || track || artist)) {
    throw new Error("upc and/or tags can only be used with album filter.", {
      cause: searchRequest,
    });
  }

  if (year && genre) {
    throw new Error(
      "Can't use year and genre filter together. year with albums, artists, and tracks only. genre with artists and tracks.",
      { cause: searchRequest },
    );
  }
  if (isrc && (artist || genre || album)) {
    throw new Error("isrc can only be used while searching for tracks.", {
      cause: searchRequest,
    });
  }
  if (track && (artist || genre || album)) {
    throw new Error("isrc can only be used while searching for tracks.", {
      cause: searchRequest,
    });
  }

  let query = "";
  const params = Object.entries(searchRequest).filter((p) => p[0] !== "q");
  for (const param of Object.values(params)) {
    if (query.length) {
      query += "&";
    }
    query += String(param);
  }

  for (const f of Object.values(searchRequest.q)) {
    if (query.length) {
      query += "&";
    }
    query += String(f);
  }

  const url = SPOTIFY_SEARCH_API_ENDPOINT + "?" + query;
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${accessToken}`);
  const res = await fetch(url, {
    headers,
  });

  if (res.ok) {
    const topTracksRes = (await res.json()) as SpotifySearchTypes;
    return topTracksRes;
  } else {
    throw new Error("response not ok", {
      cause: {
        status: res.status,
        statusText: res.statusText,
        token: accessToken,
      },
    });
  }
};

export default search;

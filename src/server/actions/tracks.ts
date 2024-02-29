import { redirect } from "next/navigation";
import type { Track } from "../../types/SpotifyAPI";
import { auth } from "@/server/auth";
import getTopTracks from "./getTopTracks";
import {
  deleteSiteSessionFromDB,
  getTokenFromDB,
} from "./spotifyTokens/spotifyToken";

const tracks = async (): Promise<Track[] | "Unauthorized" | null> => {
  const session = (await auth())!;
  if (!session) {
    // void fetch("http://localhost:3000/api/auth/signin");
    redirect("/api/auth/signin");
  }
  const token = await getTokenFromDB(session?.user?.id);
  if (!token) {
    console.log("need to sign in");
    redirect("/api/auth/signin");
  }
  try {
    const tracks = await getTopTracks(token);

    if (!tracks) {
      throw new Error("failed to fetch top tracks", { cause: tracks });
    }

    if (tracks === "Unauthorized") {
      console.log("Unauthorized: from spotify API");
      throw new Error("Unauthorized at spotify API");
    }

    console.log("tracks:");
    console.log(tracks);

    return tracks;
  } catch (error) {
    console.error("failed to fetch top tracks");
    console.error(error);
  }

  await deleteSiteSessionFromDB(session?.user?.id);
  redirect("/api/auth/signin");
};

const topTracks = (await tracks()) as Track[];

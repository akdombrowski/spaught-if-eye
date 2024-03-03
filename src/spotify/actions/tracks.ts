import { redirect } from "next/navigation";
import type { Track } from "../../types/SpotifyAPI";
import { auth } from "~/auth";
import getTopTracks from "./getTopTracks";
import { deleteSiteSessionFromDB, getTokenFromDB } from "~/auth-spotify";

const DEBUG = false;

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
    const tracks = await getTopTracks();

    if (!tracks) {
      throw new Error("failed to fetch top tracks", { cause: tracks });
    }

    // if (tracks === "Unauthorized") {
    //   console.log("Unauthorized: from spotify API");
    //   throw new Error("Unauthorized at spotify API");
    // }

    if (!tracks.length) {
      console.log("api success response but no top tracks returned:");
    }

    if (DEBUG) {
      console.log("tracks:");
      console.log(tracks);
    }

    return tracks;
  } catch (error) {
    console.error("failed to fetch top tracks");
    console.error(error);
  }

  await deleteSiteSessionFromDB(session?.user?.id);
  redirect("/api/auth/signin");
};

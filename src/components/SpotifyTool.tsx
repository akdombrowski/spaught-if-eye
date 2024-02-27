import { redirect } from "next/navigation";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Tracks from "./Tracks";

import getToken, { refreshToken } from "@/server/actions/spotifyToken";
import getTopTracks from "@/server/actions/getTopTracks";

import { auth } from "@/server/auth";

import type { Track } from "@/types/SpotifyAPI";

const tracks = async (): Promise<Track[] | "Unaouthorized" | null> => {
  const session = (await auth())!;
  if (!session) {
    redirect("/api/auth/signin");
  }
  const token = await getToken(session?.user?.id);
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
      await refreshToken(session?.user?.id);
      redirect("/api/auth/signin");
    }

    console.log("tracks:");
    console.log(tracks);

    return tracks;
  } catch (error) {
    console.error("failed to fetch top tracks");
    console.error(error);

    return null;
  }
};

const topTracks = (await tracks()) as Track[];

export default function SpotifyTool() {
  return (
    <Grid xs={12}>
      <Grid xs={12}>
        <Typography>Top Tracks</Typography>
        {topTracks && <Tracks songs={topTracks} />}
      </Grid>
    </Grid>
  );
}

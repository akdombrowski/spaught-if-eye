"use server";
import "server-only";

import { signIn } from "next-auth/react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Tracks, { type Track } from "./Tracks";
import { getTopTracks } from "../server/actions/getTopTracks";

export default async function SpotifyTool() {
  const topTracks = async () => {
    const res = await getTopTracks();
    const tracks = await res.json();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return tracks.items as Track[];
  };

  const songs = await topTracks();

  return (
    <Grid container>
      <Grid xs={12}>
        <Typography>Top Tracks</Typography>
        <Tracks {...songs} />
      </Grid>
      <Grid xs={12}>
        <Button
          size="large"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => {
            void signIn("spotify");
          }}>
          Sign In
        </Button>
      </Grid>
    </Grid>
  );
}

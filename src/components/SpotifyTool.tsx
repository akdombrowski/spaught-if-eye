"use server";
import "server-only";

import { signIn } from "next-auth/react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Tracks from "./Tracks";
import { getTopTracks } from "@/server/actions/getTopTracks";

export default async function SpotifyTool() {
  const topTracks = await getTopTracks();

  return (
    <Grid container>
      <Grid xs={12}>
        <Typography>Top Tracks</Typography>
        <Tracks songs={topTracks} />
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

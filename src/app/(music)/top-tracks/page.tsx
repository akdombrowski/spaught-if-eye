import Grid from "@mui/material/Unstable_Grid2";
import SpotifyTool from "~/components/SpotifyTool";
import getTopTracks from "~/spotify/getTopTracks";
import type { Track } from "~/types/SpotifyAPI.d.ts";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DEBUG = false;

const topTracks: { topTracks: Track[] | null } = await getTopTracks();

export default async function TopTracks(_props) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call

  return (
    <Grid
      id="SpotifyToolGridContainer"
      container
      justifyContent="center"
      alignItems="center"
      spacing={6}>
      {topTracks?.length && <SpotifyTool topTracks={topTracks} />}
    </Grid>
  );
}

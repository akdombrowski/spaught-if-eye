import Grid from "@mui/material/Unstable_Grid2";
import Tracks from "./Tracks";

import type { Track } from "~/types/SpotifyAPI";

export default function SpotifyTool({
  topTracks,
}: {
  topTracks: Track[] | null;
}) {
  return (
    // <Container maxWidth={false}>

    <Grid container justifyContent="center" alignItems="center">
      <Grid xs={12}>{topTracks && <Tracks songs={topTracks} />}</Grid>
    </Grid>

    // </Container>
  );
}

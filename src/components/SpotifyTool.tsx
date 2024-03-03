import Grid from "@mui/material/Unstable_Grid2";
import Tracks from "./Tracks";

import type { Track } from "~/types/SpotifyAPI";
import type { Session } from "next-auth";

export default function SpotifyTool({
  topTracks,
  session,
}: {
  topTracks: Track[];
  session: Session;
}) {
  return (
    // <Container maxWidth={false}>

    <Grid container justifyContent="center" alignItems="center">
      <Grid xs={12}>{topTracks && <Tracks songs={topTracks} />}</Grid>
    </Grid>

    // </Container>
  );
}

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Tracks from "./Tracks";

import type { Track } from "@/types/SpotifyAPI";

export default function SpotifyTool(props: { topTracks: Track[] }) {
  return (
    <Grid xs={12}>
      <Grid xs={12}>
        <Typography>Top Tracks</Typography>
        {props.topTracks && <Tracks songs={props.topTracks} />}
      </Grid>
    </Grid>
  );
}

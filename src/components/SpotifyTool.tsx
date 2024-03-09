import Tracks from "./Tracks";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { type GetTracksResponse } from "../spotify/actions/getTopTracks";

export default function SpotifyTool({ topTracks, error }: GetTracksResponse) {
  if (error) {
    return (
      <Grid container justifyContent="center" alignItems="center">
        <Typography variant="h3">Error:</Typography>
        <Typography variant="body1">{JSON.stringify(error)}</Typography>
      </Grid>
    );
  }

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid xs={12}>{topTracks && <Tracks songs={topTracks} />}</Grid>
    </Grid>
  );
}

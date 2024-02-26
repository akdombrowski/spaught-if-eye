import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Tracks from "./Tracks";
import type { Track } from "../types/SpotifyAPI";
import SignInButton from "./SignInButton";

export default async function SpotifyTool() {
  const tracks = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/spotify/user/top-tracks",
      );

      const { topTracks } = await res.json();

      console.log("topTracks:");
      console.log(topTracks);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return topTracks;
    } catch (error) {
      return <Typography>ERROR fetching</Typography>;
    }
    return <></>;
  };
  const topTracks = await tracks();

  return (
    <Grid xs={12}>
      <Grid xs={12}>
        <Typography>Top Tracks</Typography>
        <Tracks songs={tracks()} />
      </Grid>
    </Grid>
  );
}

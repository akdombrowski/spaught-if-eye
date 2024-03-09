import Grid from "@mui/material/Unstable_Grid2";
import SpotifyTool from "~/components/SpotifyTool";
import getTopTracks from "~/spotify/getTopTracks";
import type { Track } from "~/types/SpotifyAPI.d.ts";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DEBUG = false;

const getTracks = async (): Promise<Track[] | null> => {
  const searchResults = await getTopTracks();

  if (searchResults?.topTracks) {
    return searchResults.topTracks;
  }

  return null;
};

export default async function TopTracks(_props) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const topTracks = await getTracks();

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

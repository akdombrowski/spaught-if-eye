import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import type { Track } from "@/types/SpotifyAPI";
import Artists from "./Artists";
// import Link from "next/link";

export default function TopTracks({ songs }: { songs: Track[] }) {
  const tracks = songs.map((song: Track, i: number) => {
    // const { name, preview_url, external_urls, duration_ms, artists } = song;
    return (
      <Grid
        id="topTracksGridContainer"
        container
        spacing={3}
        key={song.name + "_" + i + "-grid-container"}>
        <Grid xs={10}>
          <Typography id={"song-" + song.name}>{song.name}</Typography>
        </Grid>
        <Grid xs={2}>
          <Typography id={"duration_ms-" + song.name}>
            {song.duration_ms}ms
          </Typography>
        </Grid>
        <Grid id="spotifyLinkGridItem" xs={12}>
          <Typography id={"spotify-url-" + song.name}>
            <Link href={song.external_urls.spotify}>
              {song.external_urls.spotify}
            </Link>
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Grid container id={"artists-" + song.name}>
            <Artists artists={song.artists} />
          </Grid>
        </Grid>
        {song.preview_url && (
          <Grid xs={12}>
            <Link href={song.preview_url}>Preview</Link>
          </Grid>
        )}
      </Grid>
    );
  });

  return (
    <Grid container>
      <Grid xs={12}>{tracks}</Grid>
    </Grid>
  );
}

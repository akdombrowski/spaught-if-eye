import type { Artist } from "../types/SpotifyAPI";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

export default function Artists({ artists }: { artists: Artist[] }) {
  return artists.map((artist, j) => {
    const name = artist.name;
    const artistPopularity = artist.popularity;
    return (
      <Grid container xs={12} key={`artist-${j}-${name}`}>
        <Grid xs={artistPopularity ? 10 : 12}>
          <Typography id={"artist-name-" + name}>name: {name}</Typography>
        </Grid>
        {artistPopularity && (
          <Grid xs={2}>
            <Typography id={"artist-popularity-" + name}>
              Popularity: {artistPopularity}
            </Typography>
          </Grid>
        )}
      </Grid>
    );
  });
}

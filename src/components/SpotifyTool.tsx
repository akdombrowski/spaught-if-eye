import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Avatar from "@mui/material/Avatar";
import LibraryMusicSharpIcon from "@mui/icons-material/LibraryMusicSharp";
import Tracks from "./Tracks";

import type { Track } from "@/types/SpotifyAPI";
import SignOutButton from "./SignOutButton";
import { auth } from "@/server/auth";
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

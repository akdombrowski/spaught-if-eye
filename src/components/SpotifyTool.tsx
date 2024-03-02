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
    <Grid container spacing={6}>
      <Grid xs={12}>
        <Grid container spacing={6} justifyContent="center" alignItems="center">
          <Grid
            xs={1}
            display="flex"
            justifyContent="center"
            alignItems="center">
            {session?.user?.image && (
              <Avatar
                alt={session?.user?.name ?? ""}
                src={session?.user?.image}
              />
            )}
          </Grid>
          <Grid
            xs={10}
            display="flex"
            justifyContent="center"
            alignItems="center">
            <Typography variant="h1">Top Tracks</Typography>
          </Grid>
          <Grid
            xs={1}
            display="flex"
            justifyContent="center"
            alignItems="center">
            <LibraryMusicSharpIcon fontSize="large" />
          </Grid>
          <Grid
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center">
            <SignOutButton />
          </Grid>
        </Grid>
        <Grid xs={12}>{topTracks && <Tracks songs={topTracks} />}</Grid>
      </Grid>
    </Grid>
    // </Container>
  );
}

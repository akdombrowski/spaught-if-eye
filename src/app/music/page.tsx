import { Container, Grid } from "@mui/material";
import SignOutButton from "@/components/SignOutButton";
import SpotifyTool from "@/components/SpotifyTool";
import { auth } from "@/server/auth";
import { getToken, refreshToken } from "@/server/actions/spotifyToken";
import getTopTracks from "../../server/actions/getTopTracks";
import type { Track } from "@/types/SpotifyAPI";

const session = await auth();
const topTracks = (await getTopTracks()) as Track[];
export default function Music(_props) {
  return (
    <Container maxWidth={false}>
      <Grid container spacing={2}>
        <Grid xs={8}>
          <h3>live session found</h3>
          {session?.user && <code>{JSON.stringify(session.user)}</code>}
        </Grid>
        <Grid container xs={12}>
          <SpotifyTool topTracks={topTracks} />
        </Grid>
        <Grid xs={12}>
          <SignOutButton />
        </Grid>
      </Grid>
    </Container>
  );
}

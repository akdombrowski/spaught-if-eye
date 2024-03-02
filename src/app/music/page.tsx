import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import LibraryMusicSharpIcon from "@mui/icons-material/LibraryMusicSharp";
import SignOutButton from "@/components/SignOutButton";
import SpotifyTool from "@/components/SpotifyTool";
import { auth } from "@/server/auth";
import getTopTracks from "@/server/actions/getTopTracks";
import { redirect } from "next/navigation";

const DEBUG = false;

const session = await auth();

const red = async () => {
  try {
    const tracks = await getTopTracks();
    if (DEBUG) {
      // console.log();
      // console.log();
      // console.log();
      // console.log("tracks");
      // console.log(tracks);
      // console.log();
      // console.log();
      // console.log();
    }
    return tracks;
  } catch (error) {
    console.error("couldn't get tracks:", error);
    return null;
  }
};

export default async function Music(_props) {
  const topTracks = await red();

  if (!topTracks) {
    redirect("/api/auth/signin");
  }

  return (
    <Container maxWidth={false}>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Grid
            container
            spacing={6}
            justifyContent="center"
            alignItems="center">
            <Grid
              xs={10}
              display="flex"
              justifyContent="center"
              alignItems="center">
              <Typography variant="h1">Top Tracks</Typography>
            </Grid>
            <Grid
              xs={2}
              display="flex"
              justifyContent="center"
              alignItems="center">
              <LibraryMusicSharpIcon fontSize="large" />
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={8}>
          {session?.user && <code>{JSON.stringify(session.user)}</code>}
        </Grid>
        <Grid container>
          {topTracks?.length && <SpotifyTool topTracks={topTracks} />}
        </Grid>
        <Grid xs={12}>
          <SignOutButton />
        </Grid>
      </Grid>
    </Container>
  );
}

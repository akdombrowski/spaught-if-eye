import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Avatar from "@mui/material/Avatar";
import LibraryMusicSharpIcon from "@mui/icons-material/LibraryMusicSharp";
import SignOutButton from "~/components/SignOutButton";
import SpotifyTool from "~/components/SpotifyTool";
import { auth } from "~/auth";
import getTopTracks from "~/spotify/getTopTracks";
import { redirect } from "next/navigation";

const DEBUG = false;

const red = async () => {
  try {
    const topTracks = await getTopTracks();
    if (DEBUG) {
      console.log();
      console.log();
      console.log();
      console.log("topTracks");
      console.log(topTracks);
      console.log();
      console.log();
      console.log();
    }
    return topTracks;
  } catch (error) {
    console.error("couldn't get tracks:", error);
    return null;
  }
};

export default async function TopTracks(_props) {
  const topTracks = await red();
  const session = await auth();

  if (!topTracks || !session) {
    redirect("/api/auth/signin");
  }

  return (
    <Container maxWidth={false}>
      <Grid container spacing={3}>
        <Grid xs={1} display="flex" justifyContent="center" alignItems="center">
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
          <Typography variant="h3" component="h1" textAlign="center">
            Top Tracks
          </Typography>
        </Grid>
        <Grid xs={1} display="flex" justifyContent="center" alignItems="center">
          <LibraryMusicSharpIcon fontSize="large" />
        </Grid>
        <Grid
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center">
          <SignOutButton />
        </Grid>
        <Grid id="signOutBtnGridRow" xs={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={6}>
            {topTracks?.length && (
              <SpotifyTool topTracks={topTracks} session={session} />
            )}
          </Grid>
        </Grid>
        <Grid
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center">
          <SignOutButton />
        </Grid>
      </Grid>
    </Container>
  );
}

import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Avatar from "@mui/material/Avatar";
import LibraryMusicSharpIcon from "@mui/icons-material/LibraryMusicSharp";
import SignOutButton from "@/components/SignOutButton";
import SpotifyTool from "@/components/SpotifyTool";
import { auth } from "@/server/auth";
import getTopTracks from "@/server/actions/getTopTracks";
import { redirect } from "next/navigation";
import { Coffee, Food } from "mdi-material-ui";

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

export default async function Music(_props) {
  const topTracks = await red();
  const session = await auth();

  if (!topTracks || !session) {
    redirect("/api/auth/signin");
  }

  return (
    <Container maxWidth={false}>
      <Grid container spacing={6}>
        <Grid xs={12}>
          {topTracks?.length && (
            <SpotifyTool topTracks={topTracks} session={session} />
          )}
        </Grid>
        <Grid xs={12}>
          <SignOutButton />
        </Grid>
      </Grid>
    </Container>
  );
}

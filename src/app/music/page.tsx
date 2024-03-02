import { Container, Grid } from "@mui/material";
import SignOutButton from "@/components/SignOutButton";
import SpotifyTool from "@/components/SpotifyTool";
import { auth } from "@/server/auth";
import getTopTracks from "@/server/actions/getTopTracks";
import { redirect } from "next/navigation";

const session = await auth();

const red = async () => {
  try {
    const tracks = await getTopTracks();
    console.log();
    console.log();
    console.log();
    console.log("tracks");
    console.log(tracks);
    console.log();
    console.log();
    console.log();
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
        <Grid xs={8}>
          <h3>live session found</h3>
          {session?.user && <code>{JSON.stringify(session.user)}</code>}
        </Grid>
        <Grid container xs={12}>
          {topTracks?.length && <SpotifyTool topTracks={topTracks} />}
        </Grid>
        <Grid xs={12}>
          <SignOutButton />
        </Grid>
      </Grid>
    </Container>
  );
}

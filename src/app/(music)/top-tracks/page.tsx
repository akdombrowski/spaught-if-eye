import { Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Avatar from "@mui/material/Avatar";
import LibraryMusicSharpIcon from "@mui/icons-material/LibraryMusicSharp";
import SignOutButton from "~/components/SignOutButton";
import SpotifyTool from "~/components/SpotifyTool";
import { auth } from "~/auth";
import getTopTracks from "~/spotify/getTopTracks";
import { redirect } from "next/navigation";
import Link from "next/link";

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
    <Grid container spacing={3}>
      {/**
       *
       * SpotifyTool
       */}
      <Grid id="SpotifyToolGridRow" xs={12}>
        <Grid
          id="SpotifyToolGridContainer"
          container
          justifyContent="center"
          alignItems="center"
          spacing={6}>
          {topTracks?.length && (
            <SpotifyTool topTracks={topTracks} session={session} />
          )}
        </Grid>
      </Grid>
      {/**
       * SpotifyTool
       *
       */}
    </Grid>
  );
}

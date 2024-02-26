"use server";
import "server-only";

import { auth } from "@/server/auth";

import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import SignInPage from "../components/SignInPage";
import SignOutButton from "../components/SignOutButton";
import SpotifyTool from "../components/SpotifyTool";

export default async function Home() {
  const session = await auth();

  if (!session) {
    return <SignInPage />;
  }

  return (
    <Container maxWidth={false}>
      <Grid container spacing={2}>
        <Grid xs={8}>
          <h3>live session found</h3>
          <code>{JSON.stringify(session.user)}</code>
        </Grid>
        <Grid xs={12}>
          <SpotifyTool />
        </Grid>
        <Grid xs={12}>
          <SignOutButton />
        </Grid>
      </Grid>
    </Container>
  );
}

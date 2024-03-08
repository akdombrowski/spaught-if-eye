"use server";
import "server-only";

import { auth } from "~/auth";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import SignInPage from "~/components/SignInPage";

export default async function Home() {
  const session = await auth();

  if (!session) {
    return <SignInPage />;
  }

  return (
    <Grid id="Videos Container" container>
      <Grid xs={12}>
        <Typography variant="h1">YouTube Videos to come....</Typography>
      </Grid>
    </Grid>
  );
}

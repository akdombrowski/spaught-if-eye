import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Avatar from "@mui/material/Avatar";
import LibraryMusicSharpIcon from "@mui/icons-material/LibraryMusicSharp";
import SignOutButton from "~/components/SignOutButton";
import SearchForm from "~/components/form/SearchForm";
import { auth } from "~/auth";
import getTopTracks from "~/spotify/getTopTracks";
import { redirect } from "next/navigation";

const DEBUG = false;

export default async function Search(_props) {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <Container maxWidth={false}>
      <Grid container spacing={6}>
        <Grid
          id="signOutBtnGridRow"
          display="flex"
          justifyContent="center"
          alignItems="center"
          xs={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={6}>
            <SearchForm />
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

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
    <Grid
      id="searchForm"
      display="flex"
      justifyContent="center"
      alignItems="center"
      xs={12}>
      <SearchForm />
    </Grid>
  );
}

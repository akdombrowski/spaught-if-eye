import Grid from "@mui/material/Unstable_Grid2";
import SearchForm from "~/components/form/SearchForm";
import { auth } from "~/auth";
import { redirect } from "next/navigation";

export default async function Search(_props) {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin/spotify");
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

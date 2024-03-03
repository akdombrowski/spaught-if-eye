import { auth } from "~/auth";
import Grid from "@mui/material/Unstable_Grid2";

export const SPOTIFY_SEARCH_API_ENDPOINT = "https://api.spotify.com/v1/search";

const session = await auth();

export const search = async () => {
  return "";
};

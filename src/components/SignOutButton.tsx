"use client";
import "client-only";

import Button from "@mui/material/Button";
import { signOut } from "next-auth/react";
import { Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

export default function SignOutButton() {
  return (
    <Grid container display="flex" justifyContent="center" alignItems="center">
      <Button
        variant="contained"
        onClick={() => {
          void signOut();
        }}>
        Sign Out
      </Button>
    </Grid>
  );
}

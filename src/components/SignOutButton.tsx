"use client";
import "client-only";

import Button from "@mui/material/Button";
import { signOut } from "next-auth/react";
import { Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

export default function SignOutButton(props) {
  return (
    <Button
      {...props}
      sx={{ fontSize: ".75rem" }}
      variant="text"
      onClick={() => {
        void signOut();
      }}>
      Sign Out
    </Button>
  );
}

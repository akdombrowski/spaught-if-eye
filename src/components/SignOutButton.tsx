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
      sx={{ backgroundColor: "rgba(186, 222, 254, 0.9)" }}
      variant="contained"
      onClick={() => {
        void signOut();
      }}>
      Sign Out
    </Button>
  );
}

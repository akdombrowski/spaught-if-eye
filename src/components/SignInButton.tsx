"use client";
import "client-only";

import { signIn } from "next-auth/react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";

export default function SignInButton() {
  return (
    <Button
      size="large"
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      onClick={() => {
        void signIn("spotify");
      }}>
      Sign In
    </Button>
  );
}

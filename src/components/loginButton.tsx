"use client";
import "client-only";

import Button from "@mui/material/Button";
import { signIn } from "next-auth/react";

export default function LoginButton() {
  return (
    <Button
      variant="contained"
      onClick={() => {
        void signIn("spotify");
      }}>
      Login
    </Button>
  );
}

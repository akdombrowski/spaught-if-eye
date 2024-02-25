"use client";
import "client-only";

import Button from "@mui/material/Button";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <Button
      variant="contained"
      onClick={() => {
        void signOut();
      }}>
      Sign Out
    </Button>
  );
}

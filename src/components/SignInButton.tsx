"use client";
import "client-only";

import { signIn } from "next-auth/react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import { useRouter } from "next/navigation";

export default function SignInButton() {
  const router = useRouter();

  return (
    <Button
      size="large"
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      onClick={() => router.push("/api/auth/signin")}>
      Sign In
    </Button>
    // <Link href="/api/auth/signin/spotify">Sign In</Link>
  );
}

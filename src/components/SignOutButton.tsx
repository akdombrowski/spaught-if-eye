"use client";
import "client-only";

import Button from "@mui/material/Button";
import { signOut } from "next-auth/react";
import Box from "@mui/material/Box";

export default function SignOutButton(props) {
  return (
    <Box
      sx={[
        {
          "&:hover": {
            color: "red",
            backgroundColor: "green",
          },
        },
      ]}>
      <Button
        {...props}
        sx={{ fontSize: ".75rem" }}
        variant="text"
        onClick={() => {
          void signOut();
        }}>
        Sign Out
      </Button>
    </Box>
  );
}

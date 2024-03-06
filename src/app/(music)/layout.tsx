import type { ReactNode } from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LibraryMusicSharpIcon from "@mui/icons-material/LibraryMusicSharp";
import SignOutButton from "~/components/SignOutButton";
import TabNavigation from "~/components/header/tabNavigation";

import { auth } from "~/auth";

export default async function MusicLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  return (
    <Container maxWidth={false}>
      <Grid container spacing={3}>
        {/**
         *
         * HEADER
         */}
        <Grid xs={10}>
          <Grid container spacing={1} justifyContent="center">
            <Grid
              xs={11}
              display="flex"
              justifyContent="center"
              alignItems="center">
              {session?.user?.image && (
                <Avatar
                  alt={session?.user?.name ?? ""}
                  src={session?.user?.image}
                />
              )}
            </Grid>
            <Grid
              xs={6}
              display="flex"
              justifyContent="center"
              alignItems="center">
              <Typography variant="h3" component="h1" textAlign="center">
                Top Tracks
              </Typography>
            </Grid>
            <Grid
              xs={1}
              display="flex"
              justifyContent="center"
              alignItems="center">
              <LibraryMusicSharpIcon fontSize="large" />
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={2} display="flex" justifyContent="center" alignItems="center">
          <SignOutButton />
        </Grid>
        {/**
         * HEADER
         *
         */}

        {/**
         *
         * TAB NAV
         */}
        <Grid xs={12}>
          <TabNavigation />
        </Grid>
        {/**
         * TAB NAV
         *
         */}

        <Grid>{children}</Grid>
      </Grid>
    </Container>
  );
}

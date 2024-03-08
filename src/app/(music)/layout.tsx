import type { ReactNode } from "react";
import type { PageByPathnameType } from "~/types/pages";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Avatar from "@mui/material/Avatar";
import LibraryMusicSharpIcon from "@mui/icons-material/LibraryMusicSharp";
import TabNavigation from "~/components/pageHeader/TabNavigation";
import PageTitle from "~/components/pageHeader/PageTitle";

import { auth } from "~/auth";

const PAGES: PageByPathnameType = {
  "/top-tracks": { title: "Top Tracks" },
  "/search": { title: "Search" },
  "/videos": { title: "Videos" },
  "/api/auth/signout": { title: "sign out" },
  "/": { title: "Home" },
};

export default async function MusicLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  return (
    <Container maxWidth={false} disableGutters>
      <Grid container justifyContent="center" alignItems="center" spacing={1}>
        <Grid container spacing={1} justifyContent="center" alignItems="center">
          {/**
           *
           * TAB NAV
           */}
          <Grid xs={12} width="100vw">
            <TabNavigation pages={PAGES} />
          </Grid>
          {/**
           * TAB NAV
           *
           */}

          {/**
           *
           * PAGE TITLE
           */}
          <Grid
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
            <Grid
              container
              spacing={6}
              alignItems="center"
              justifyContent="center">
              <Grid
                xs={2}
                display="flex"
                justifyContent="flex-start"
                alignItems="center">
                {session?.user?.image && (
                  <Avatar
                    alt={session?.user?.name ?? ""}
                    src={session?.user?.image}
                  />
                )}
              </Grid>
              <Grid xs={8}>
                <PageTitle pages={PAGES} />
              </Grid>
              <Grid
                xs={2}
                display="flex"
                justifyContent="flex-end"
                alignItems="center">
                <LibraryMusicSharpIcon fontSize="large" />
              </Grid>
            </Grid>
          </Grid>
          {/**
           * PAGE TITLE
           *
           */}
        </Grid>

        <Grid xs={12}>{children}</Grid>
      </Grid>
    </Container>
  );
}

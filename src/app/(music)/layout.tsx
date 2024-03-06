import type { ReactNode } from "react";
import type { PageByPathnameType } from "~/types/pages";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Avatar from "@mui/material/Avatar";
import LibraryMusicSharpIcon from "@mui/icons-material/LibraryMusicSharp";
import SignOutButton from "~/components/SignOutButton";
import TabNavigation from "~/components/pageHeader/tabNavigation";
import PageTitle from "~/components/pageHeader/pageTitle";

import { auth } from "~/auth";

const PAGES: PageByPathnameType = {
  "/top-tracks": { title: "Top Tracks" },
  "/search": { title: "Search" },
  "/videos": { title: "Videos" },
  "/": { title: "Home" },
};

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
            <PageTitle pages={PAGES} />
            <Grid
              xs={1}
              display="flex"
              justifyContent="center"
              alignItems="center">
              <LibraryMusicSharpIcon fontSize="large" />
              pa
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
          <TabNavigation pages={PAGES} />
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

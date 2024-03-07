import type { ReactNode } from "react";
import type { PageByPathnameType } from "~/types/pages";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Avatar from "@mui/material/Avatar";
import LibraryMusicSharpIcon from "@mui/icons-material/LibraryMusicSharp";
import SignOutButton from "~/components/SignOutButton";
import TabNavigation from "~/components/pageHeader/TabNavigation";
import PageTitle from "~/components/pageHeader/PageTitle";

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
      <Grid container justifyContent="center" alignItems="center" spacing={6}>
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
           * HEADER
           */}
          <Grid
            display="flex"
            marginRight="-5rem"
            justifyContent="center"
            alignItems="center"
            xs={10}>
            <Grid
              container
              spacing={1}
              alignItems="center"
              justifyContent="center">
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
              </Grid>
            </Grid>
          </Grid>
          <Grid
            xs={2}
            display="flex"
            justifyContent="center"
            alignItems="center">
            <SignOutButton />
          </Grid>
          {/**
           * HEADER
           *
           */}
        </Grid>

        <Grid xs={12}>{children}</Grid>
      </Grid>
    </Container>
  );
}

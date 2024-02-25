"use client";
import "client-only";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import SignInButton from "./SignInButton";
import Link from "next/link";

export default function SignInSide() {
  return (
    <Grid container sx={{ height: "100vh" }}>
      {/* START Grid Image Side */}
      <Grid
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* END Grid Image Side */}

      {/* START Grid Sign In Form Side */}
      {/* <Link href="api/auth/signin"> */}
      <Grid
        xs={12}
        sm={8}
        md={5}
        display="flex"
        justifyContent="center"
        alignItems="center">
        {/* START Grid Container for form side components*/}
        <Grid container xs={12} spacing={2} columns={12}>
          {/* Avatar  */}
          <Grid
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexGrow={1}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
          </Grid>

          {/* Title */}
          <Grid
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexGrow={1}>
            <Typography component="h1" variant="h2">
              Sign in
            </Typography>
          </Grid>

          {/* Spacer */}
          <Grid xs={12}></Grid>

          {/* Form */}
          <Grid
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexGrow={1}>
            <SignInButton />
          </Grid>
        </Grid>
        {/* END Grid Container for form side components */}
      </Grid>
      {/* END Grid Sign In Form Side */}
      {/* </Link> */}
    </Grid>
  );
}

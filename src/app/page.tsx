"use server";
import "server-only";

import styles from "./index.module.css";

import { auth } from "src/server/auth";
import type { Session } from "next-auth";

import Link from "next/link";

import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import LoginButton from "../components/loginButton";

export default async function Home() {
  const session = (await auth()) as Session;

  if (!session) {
    return (
      <Container maxWidth={false}>
        <Grid container>
          <Grid xs={12}>
            <LoginButton></LoginButton>
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <main className={styles.main}>
      <Container maxWidth={false}>
        <Grid container spacing={2}>
          <Grid xs={8}>
            <h3>live session found</h3>
            <code>{JSON.stringify(session.user)}</code>
          </Grid>

          <div className={styles.container}>
            <h1 className={styles.title}>
              Create <span className={styles.pinkSpan}>T3</span> App
            </h1>
            <div className={styles.cardRow}>
              <div className={styles.card}>
                <h3>live session found</h3>
                <code>{JSON.stringify(session.user)}</code>
              </div>
            </div>
            <div className={styles.cardRow}>
              <Link
                className={styles.card}
                href="https://create.t3.gg/en/usage/first-steps"
                target="_blank">
                <h3 className={styles.cardTitle}>First Steps →</h3>
                <div className={styles.cardText}>description</div>
              </Link>
              <Link
                className={styles.card}
                href="https://create.t3.gg/en/introduction"
                target="_blank">
                <h3 className={styles.cardTitle}>Documentation →</h3>
                <div className={styles.cardText}>
                  Learn more about Create T3 App, the libraries it uses, and how
                  to deploy it.
                </div>
              </Link>
            </div>
          </div>
        </Grid>
      </Container>
    </main>
  );
}

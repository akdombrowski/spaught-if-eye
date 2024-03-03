"use server";
import "server-only";

import { auth } from "~/auth";

import SignInPage from "~/components/SignInPage";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) {
    return <SignInPage />;
  }

  redirect("/music");
}

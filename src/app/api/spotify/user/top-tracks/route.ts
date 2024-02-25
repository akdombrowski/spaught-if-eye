import { Session, User } from "next-auth";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { accounts, users } from "~/server/db/schema";
import { eq, lt, gte, ne } from "drizzle-orm";
import { auth } from "src/server/auth";

export async function ReadFormData(request: NextRequest) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  return { name, email };
}

const getToken = async (userId: User["id"]) => {
  if (!userId) {
    return null;
  }

  const usersTokens = await db.query.accounts.findMany({
    where: eq(users.id, userId),
  });
  const token = usersTokens[0]?.access_token;

  return token;
};

export async function GET(request: NextRequest) {
  const session = (await auth())!;
  const token = await getToken(session?.user?.id);
  if (!token) {
    const signinURL = new URL("/api/auth/signin", request.nextUrl.basePath);
    return NextResponse.redirect(signinURL);
  }

  const headers = new Headers();
  headers.append("Authorization", "Bearer " + token);
  const topTracks = await fetch("https://api.spotify.com/v1/me/top/tracks");
  return NextResponse.json(topTracks, { status: 200 });
}

export async function POST(request: NextRequest) {
  const session = (await auth())!;
  const token = await getToken(session?.user?.id);
  if (!token) {
    const signinURL = new URL("/api/auth/signin", request.nextUrl.basePath);
    return NextResponse.redirect(signinURL);
  }

  const headers = new Headers();
  headers.append("Authorization", "Bearer " + token);
  const topTracks = await fetch("https://api.spotify.com/v1/me/top/tracks");
  return NextResponse.json(topTracks, { status: 200 });
}

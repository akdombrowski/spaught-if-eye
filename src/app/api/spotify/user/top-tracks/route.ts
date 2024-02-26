import { Session, User } from "next-auth";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { accounts, users } from "@/server/db/schema";
import { eq, lt, gte, ne } from "drizzle-orm";
import { auth } from "@/server/auth";
import { SpotifyAPIUserTopResponse, Track } from "@/types/SpotifyAPI";
import { redirect } from "next/navigation";

const getToken = async (userId: User["id"]): Promise<string | null> => {
  if (!userId) {
    return null;
  }
  try {
    const usersTokens = await db.query.accounts.findMany({
      where: eq(users.id, userId),
    });
    const token = usersTokens[0]?.access_token;

    return token as string | null;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export async function getTopTracks(token: string): Promise<Track[]> {
  const headers = new Headers();
  headers.append("Authorization", "Bearer " + token);
  const res = await fetch("https://api.spotify.com/v1/me/top/tracks");
  const topTracksRes = (await res.json()) as SpotifyAPIUserTopResponse;
  const topTracks = topTracksRes?.items;

  return topTracks as Track[];
}

export async function GET(request: NextRequest) {
  const session = (await auth())!;
  const token = await getToken(session?.user?.id);
  if (!token) {
    const signInURL = new URL("app/api/auth/signin", request.nextUrl.basePath);
    redirect(signInURL.href);
  }
  const topTracks: Track[] = await getTopTracks(token);
  return NextResponse.json(topTracks, { status: 200 });
}

export async function POST(request: NextRequest) {
  const session = (await auth())!;
  const token = await getToken(session?.user?.id);
  if (!token) {
    const signinURL = new URL("/api/auth/signin", request.nextUrl.basePath);
    return NextResponse.redirect(signinURL);
  }

  const topTracks: Track[] = await getTopTracks(token);
  return NextResponse.json(topTracks, { status: 200 });
}

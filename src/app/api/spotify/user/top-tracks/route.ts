import type { User } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "~/db";
import { users } from "~/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "~/auth";
import type { SpotifyAPIUserTopResponse, Track } from "~/types/SpotifyAPI";
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

async function getTopTracks(token: string): Promise<Track[] | null> {
  const headers = new Headers();
  headers.append("Authorization", "Bearer " + token);
  const res = await fetch("https://api.spotify.com/v1/me/top/tracks");
  const topTracksRes = (await res.json()) as SpotifyAPIUserTopResponse;
  const topTracks = topTracksRes?.items;
  if (!topTracks) {
    return null;
  }
  return topTracks as Track[];
}

export async function GET(request: NextRequest) {
  const session = (await auth())!;
  const token = await getToken(session?.user?.id);
  if (!token) {
    console.error("need to sign in");
    const signInURL = new URL("/api/auth/signin", request.nextUrl);
    redirect(signInURL.href);
  }
  const topTracks: Track[] | null = await getTopTracks(token);
  if (!topTracks) {
    console.error("no top tracks");
  }
  return NextResponse.json({ topTracks }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const session = (await auth())!;
  const token = await getToken(session?.user?.id);
  if (!token) {
    console.error("need to sign in");
    const signInURL = new URL("/api/auth/signin", request.nextUrl);
    redirect(signInURL.href);
  }

  const topTracks: Track[] | null = await getTopTracks(token);
  if (!topTracks) {
    console.error("no top tracks");
    return NextResponse.error();
  }
  return NextResponse.json({ topTracks }, { status: 200 });
}

import type { SpotifyAPIUserTopResponse, Track } from "@/types/SpotifyAPI";
import type { User } from "next-auth";
import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/server/auth";
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

export async function getTopTracks(): Promise<Track[]> {
  const session = (await auth())!;
  const token = await getToken(session?.user?.id);
  if (!token) {
    redirect("app/api/auth/signin");
  }

  const headers = new Headers();
  headers.append("Authorization", "Bearer " + token);
  const res = await fetch("https://api.spotify.com/v1/me/top/tracks");
  const topTracksRes = (await res.json()) as SpotifyAPIUserTopResponse;
  const topTracks = topTracksRes?.items;

  return topTracks as Track[];
}

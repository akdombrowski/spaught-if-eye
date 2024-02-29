import { eq } from "drizzle-orm";
import type { User } from "next-auth";
import { db } from "@/server/db";
import { accounts } from "@/server/db/schema";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { getTokenFromDB } from "@/server/actions/spotifyTokens";

import { ErrorFetchTokenFromDB, resetTokens } from "./dbTokens";

export interface SpotifyRefreshTokenAPIResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export const getUserIdFromSession = async (): Promise<string> => {
  const session = await auth();
  if (!session) {
    console.error("couldn't auth and get a session");
    throw new Error(
      "missing userId, tried to get session but couldn't retrieve from auth",
      { cause: { inServerAction: "getUserIdFromSession" } },
    );
  }
  if (!session.user) {
    console.error("got session but no user available in it");
    throw new Error("missing userId, got session but no user available in it", {
      cause: { session, inServerAction: "getUserIdFromSession" },
    });
  }
  if (!session.user.id) {
    console.error("got session but no user available in it");
    throw new Error(
      "missing userId, got session with a user but id available in it",
      { cause: { session, inServerAction: "getUserIdFromSession" } },
    );
  }

  const userId = session.user.id;
  return userId;
};

export const getUserIdFromActiveSession = async (
  userId: User["id"] | null,
): Promise<string> => {
  if (!userId) {
    try {
      userId = await getUserIdFromSession();
      if (!userId) {
        throw new Error("couldn't get user id");
      }
      return userId;
    } catch (err) {
      throw new Error("couldn't get userId via auth session", { cause: err });
    }
  } else {
    const session = await auth();
    if (userId !== session?.user?.id) {
      throw new Error(
        "userId given doesn't match the one from the active session",
        { cause: { userId, session } },
      );
    }
  }

  return userId;
};

export const getToken = async (userId: User["id"] | null): Promise<string> => {
  try {
    userId = await getUserIdFromActiveSession(userId);
    const token = await getTokenFromDB(userId);

    if (token in ErrorFetchTokenFromDB) {
      console.log(
        "didn't find token in database. redirect to sign in get a new one",
      );
      redirect("/api/auth/signin");
    }

    return token;
  } catch (error) {
    throw new Error("failed to get a spotify access token", { cause: error });
  }
};

export const deleteRefreshAndAccessTokensFromUserIdAccount = async (
  userId: User["id"] | null,
) => {
  try {
    if (!userId) {
      userId = await getUserIdFromSession();
    }

    // all of userid's accts where there are tokens
    const acct = await db.query.accounts.findMany({
      columns: {
        userId: true,
        refresh_token: true,
        access_token: true,
        expires_at: true,
        scope: true,
      },
      where: eq(accounts.userId, userId),
    });

    if (acct.length) {
      console.log(
        `${acct.length} accounts found. Deleting refresh and access tokens on this account...`,
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const __reset = await resetTokens(userId);
    }
    console.log(
      `Success.\n reset ${userId}'s account spotify refresh and access tokens along with expiry and scope`,
    );
  } catch (error) {
    console.log(
      `couldn't delete spotify refresh and access tokens for ${userId}'s`,
    );
    console.log(error);
  }
};

export const refreshSpotifyTokenWithSpotifyAPI = async (
  userId: User["id"],
): Promise<boolean> => {
  try {
    if (!userId) {
      userId = await getUserIdFromSession();
    }

    const acct = await db.query.accounts.findFirst({
      columns: {
        userId: true,
        refresh_token: true,
      },
      where: eq(accounts.userId, userId),
    });

    if (acct) {
      console.log(
        `account found. Refreshing refresh and access tokens on this account ${JSON.stringify(
          acct,
        )}...`,
      );
      const refreshToken = acct.refresh_token;
      console.log(`using refresh token: '${refreshToken}'`);
      if (!refreshToken) {
        throw new Error(
          `no refresh token avail. have the user re-auth. for userId: ${userId} `,
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _res = await spotifyRefreshToken(userId, refreshToken);

      await db
        .update(accounts)
        .set({ refresh_token: "", access_token: "" })
        .where(eq(accounts.userId, userId));
    }
    console.log(
      `Success.\n deleted ${userId}'s account spotify refresh and access tokens session(s)`,
    );
    return true;
  } catch (error) {
    console.error(error);
  } finally {
    return false;
  }
};

export const spotifyRefreshToken = async (
  userId: string,
  refreshToken: string,
) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append(
    "Authorization",
    "Basic NzM0ZWQzNGI1NjQwNDNhNGIxYTIwYzhjMzFlNjIzNWE6N2ZhNDUyYzVlMGQwNGExMGI4MTBmZjU4MGVlMGRmYWI=",
  );

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
    cache: "no-store",
  };

  try {
    const url = `https://accounts.spotify.com/api/token?grant_type=refresh_token&refresh_token=${refreshToken}`;
    const res = await fetch(url, requestOptions);
    if (!res.ok) {
      throw new Error("failed to use refresh token at spotify api", {
        cause: {
          userId,
          refreshToken,
          res,
        },
      });
    }
    const result = (await res.json()) as SpotifyRefreshTokenAPIResponse;
    console.log("refreshing token response");
    console.log(result);

    const { access_token, refresh_token, scope, expires_in } = result;
    return { access_token, refresh_token, scope, expires_in };
  } catch (error) {
    throw new Error("couldn't refresh", { cause: error });
  }
};

export default getTokenFromDB;

import { eq } from "drizzle-orm";
import { Account, type User } from "next-auth";
import { db } from "@/server/db";
import { accounts, users, sessions } from "../../db/schema";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { getTokenFromDB } from "@/server/actions/spotifyTokens";

import { ErrorFetchTokenFromDB, resetTokens } from "./dbTokens";

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

export const refreshSpotifyToken = async (userId: User["id"] | null) => {
  try {
    if (!userId) {
      userId = await getUserIdFromSession();
    }

    const acct = await db.query.accounts.findMany({
      columns: {
        userId: true,
        refresh_token: true,
      },
      where: eq(accounts.userId, userId),
    });

    if (acct.length) {
      console.log(
        `${acct.length} accounts found. Deleting refresh and access tokens on this account...`,
      );
      await db
        .update(accounts)
        .set({ refresh_token: "", access_token: "" })
        .where(eq(accounts.userId, userId));
    }
    console.log(
      `Success.\n deleted ${userId}'s account spotify refresh and access tokens session(s)`,
    );
  } catch (error) {}
};

export default getTokenFromDB;

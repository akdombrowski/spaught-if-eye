import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { accounts, sessions } from "@/server/db/schema";

export enum ErrorFetchTokenFromDB {
  noAcct = "NO_ACCT_FOUND",
  noAccessToken = "NO_ACCESS_TOKEN_ON_ACCT",
}
export const getTokenFromDB = async (
  userId: string,
): Promise<ErrorFetchTokenFromDB | string> => {
  try {
    const acct = await db.query.accounts.findFirst({
      where: eq(accounts.userId, userId),
    });

    if (!acct) {
      return ErrorFetchTokenFromDB.noAcct;
    }

    const token = acct.access_token;

    if (!token) {
      return ErrorFetchTokenFromDB.noAccessToken;
    }

    return token;
  } catch (error) {
    // console.log("didn't find token in database");
    // console.log(error);
    return ErrorFetchTokenFromDB.noAcct;
    // throw new Error("didn't find token in database", { cause: error });
  }
};

export const fetchSpotifyRefreshTokenFromDB = async (userId: string) => {
  try {
    const acct = await db.query.accounts.findMany({
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
  } catch (error) {
    console.log(
      `couldn't delete spotify refresh and access tokens for ${userId}'s`,
    );
    console.log(error);
  }
};

export async function resetTokens(userId: string) {
  try {
    await db
      .update(accounts)
      .set({
        refresh_token: null,
        access_token: null,
        expires_at: null,
        scope: null,
      })
      .where(eq(accounts.userId, userId));
    return true;
  } catch (error) {
    return false;
  }
}

export async function resetSession(userId: string) {
  try {
    const usersSessions = await db.query.sessions.findMany({
      where: eq(sessions.userId, userId),
    });
    if (usersSessions.length) {
      console.log(`${usersSessions.length} sessions found. Resetting...`);
      await db
        .update(sessions)
        .set({
          sessionToken: undefined,
          expires: undefined,
        })
        .where(eq(accounts.userId, userId));
    }
    console.log(`reset user's ${userId} session(s)`);
    return true;
  } catch (error) {
    return false;
  }
}

export const deleteSiteSessionFromDB = async (
  userId: string,
): Promise<boolean> => {
  try {
    const usersSessions = await db.query.sessions.findMany({
      where: eq(sessions.userId, userId),
    });
    if (usersSessions.length) {
      console.log(`${usersSessions.length} sessions found. Deleting...`);
      await db.delete(sessions).where(eq(sessions.userId, userId));
    }
    console.log(`deleted user's ${userId} session(s)`);
    return true;
  } catch (error) {
    console.log("didn't find token in database");
    console.log(error);
  }
  return false;
};

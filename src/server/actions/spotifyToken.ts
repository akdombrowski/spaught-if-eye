import { eq } from "drizzle-orm";
import { Account, type User } from "next-auth";
import { db } from "../db";
import { accounts, users, sessions } from "../db/schema";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";

const getUserIdFromSession = async (): Promise<string> => {
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

export const getToken = async (userId: User["id"] | null): Promise<string> => {
  try {
    userId = await getUserIdFromActiveSession(userId);
    const token = await getTokenFromDB(userId);

    if (token in ErrorFetchTokenFromDB) {
      console.log("didn't find token in database. get a new one");
      redirect("/api/auth/signin");
    }

    return token;
  } catch (error) {
    throw new Error("failed to get a spotify access token", { cause: error });
  }
};

export const deleteSiteSessionFromDB = async (
  userId: User["id"] | null,
): Promise<string | null> => {
  if (!userId) {
    try {
      userId = await getUserIdFromSession();
    } catch (err) {
      throw new Error("couldn't get userId via auth session", { cause: err });
    }
  }
  try {
    const usersSessions = await db.query.sessions.findMany({
      where: eq(sessions.userId, userId),
    });
    if (usersSessions.length) {
      console.log(`${usersSessions.length} sessions found. Deleting...`);
      await db.delete(sessions).where(eq(sessions.userId, userId));
    }
    console.log("deleted current session(s)");
    console.log("redirecting to signin to get fresh session");
  } catch (error) {
    console.log("didn't find token in database");
    console.log(error);
  }

  redirect("/api/auth/signin");
};

export const fetchSpotifyRefreshToken = async (userId: User["id"] | null) => {
  try {
    if (!userId) {
      userId = await getUserIdFromSession();
    }
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
      await db
        .update(accounts)
        .set({
          refresh_token: null,
          access_token: null,
          expires_at: null,
          scope: null,
        })
        .where(eq(accounts.userId, userId));
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

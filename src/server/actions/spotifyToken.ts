import { eq } from "drizzle-orm";
import { type User } from "next-auth";
import { db } from "../db";
import { accounts, users, sessions } from "../db/schema";
import { redirect } from "next/navigation";

export const getToken = async (userId: User["id"]): Promise<string | null> => {
  if (!userId) {
    return null;
  }
  try {
    const usersTokens = await db.query.accounts.findMany({
      where: eq(accounts.userId, userId),
    });
    const token = usersTokens[0]?.access_token;

    return token as string | null;
  } catch (error) {
    console.log("didn't find token in database");
    console.log(error);
  }
  return null;
};

export const refreshToken = async (
  userId: User["id"],
): Promise<string | null> => {
  if (!userId) {
    console.log("no userid given. redirecting to signin to get fresh session");
    redirect("/api/auth/signin");
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

export default getToken;

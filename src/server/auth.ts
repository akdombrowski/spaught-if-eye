import type { JWT } from "next-auth/jwt";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq, lt, gte, ne } from "drizzle-orm";
import type { NextAuthConfig, DefaultSession, Session, User } from "next-auth";

import NextAuth from "next-auth";
// import DiscordProvider from "next-auth/providers/discord";
import SpotifyProvider from "next-auth/providers/spotify";
// import GithubProvider from "next-auth/providers/github";

import { env } from "~/env";
import { db } from "~/server/db";
import { createTable, users, tokens } from "~/server/db/schema";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig: NextAuthConfig = {
  callbacks: {
    session: async ({
      session,
      user,
    }: // token,
    {
      session: Session;
      user: User;
      token: JWT;
    }): Promise<Session> => {
      const sesh = {
        ...session,
        user: { ...session.user, id: user.id },
      } as Session;
      return sesh;
    },
    jwt: async ({ token, account }) => {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        if (account.userId) {
          const usersTokens = await db.query.tokens.findMany({
            where: eq(users.id, account.userId),
          });
          if (usersTokens.length > 1) {
            console.error("why does this user have more than one token???");
            throw new Error("why does this user have more than one token???");
          } else if (usersTokens.length) {
            const userToken = usersTokens[0];
            await db
              .update(tokens)
              .set({ accessToken: token.accessToken as string })
              .where(eq(users.id, account.userId));
          } else {
            await db.insert(tokens).values({
              userId: account.id as string,
              accessToken: token.accessToken as string,
              service: "spotify",
              expires: new Date(Date.now() + 5 * 60 * 1000), // 5min default for now
            });
          }
        }
      }

      return token;
    },
  },
  adapter: DrizzleAdapter(db, createTable),
  providers: [
    // GithubProvider({
    //   clientId: env.GITHUB_CLIENT_ID,
    //   clientSecret: env.GITHUB_CLIENT_SECRET,
    // }),
    SpotifyProvider({
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
// export const getServerAuthSession = () => getServerSession(authOptions);

// next-auth (authjs) v5
export const {
  handlers: { GET, POST },
  auth,
} = NextAuth(authConfig);

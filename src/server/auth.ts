import type { JWT } from "next-auth/jwt";
import type { NextAuthConfig, DefaultSession, Session, User } from "next-auth";
import NextAuth from "next-auth";
// import SpotifyProvider from "next-auth/providers/spotify";
import SpotifyProvider from "@auth/core/providers/spotify";
// import DiscordProvider from "next-auth/providers/discord";
// import GithubProvider from "next-auth/providers/github";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { env } from "@/env";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { db } from "@/server/db";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createTable } from "@/server/db/schema";

const DEBUG_CALLBACKS = false;

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken: string | JWT;
    accessTokenUpdatedAt: number | string;
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
declare module "next-auth/JWT" {
  interface JWT extends DefaultJWT {
    accessToken: string | JWT;
    accessTokenUpdatedAt: number | string;
  }
}

const scopes =
  "user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-read-playback-position playlist-modify-public playlist-modify-private playlist-read-collaborative playlist-read-private user-read-currently-playing user-read-playback-state";

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig: NextAuthConfig = {
  session: {
    maxAge: 3000,
    updateAge: 3000,
    strategy: "jwt",
  },
  callbacks: {
    signIn: async ({ user, account, profile, email, credentials }) => {
      if (DEBUG_CALLBACKS) {
        console.log();
        console.log("***************");
        console.log("===============");
        console.log("SIGNIN CALLBACK");
        console.log("===============");
        console.log();
        console.log("account:", account);
        console.log();
        console.log("credentials:", credentials);
        console.log();
        console.log("***************");
        console.log();
      }

      // const userId = account?.userId;
      // const accessToken = account?.access_token;
      // if (userId && accessToken) {
      //   const usersTokens = await db.query.tokens.findMany({
      //     where: eq(users.id, userId),
      //   });
      //   if (DEBUG_CALLBACKS) {
      //     console.log(`found tokens for user ${userId}`);
      //     console.log(usersTokens);
      //   }
      //   if (usersTokens.length > 1) {
      //     console.error("why does this user have more than one token???");
      //     throw new Error("why does this user have more than one token???");
      //   } else if (usersTokens.length) {
      //     // const userToken = usersTokens[0];
      //     await db
      //       .update(tokens)
      //       .set({ providerAccessToken: accessToken })
      //       .where(eq(users.id, userId));
      //     if (DEBUG_CALLBACKS) {
      //       console.log("updated access token in tokens table");
      //     }
      //   } else {
      //     await db.insert(tokens).values({
      //       userId: userId,
      //       providerAccessToken: accessToken,
      //       provider: "spotify",
      //       expires: new Date(1708896426 - 60 * 60 * 1000), // 1min early
      //     });
      //     if (DEBUG_CALLBACKS) {
      //       console.log("updated access token in tokens table");
      //     }
      //   }
      // }

      return true;
    },
    jwt: async ({ token, account }) => {
      if (DEBUG_CALLBACKS) {
        console.log();
        console.log("****************");
        console.log("================");
        console.log("JWT CALLBACK");
        console.log("================");
        console.log();
        console.log("account:", account);
        console.log();
        console.log("token:", token);
        console.log();
        console.log("****************");
        console.log();
      }

      if (account) {
        token.accessToken = account.access_token;
        token.accessTokenUpdatedAt = Date();
      }

      return token;
    },
    session: async ({
      session,
      user, // only returned if using database strategy (not JWT)
      token, // only returned if using JWT strategy (not database)
    }: {
      session: Session;
      user: User; // only returned if using database strategy (not JWT)
      token: JWT; // only returned if using JWT strategy (not database)
    }): Promise<Session> => {
      // const sesh = {
      //   ...session,
      //   user: { ...session.user, id: token.id },
      // } as Session;
      const sesh = {
        ...session,
        accessToken: token.accessToken,
        accessTokenUpdatedAt: Date(),
      } as Session;
      //

      if (DEBUG_CALLBACKS) {
        console.log();
        console.log("****************");
        console.log("================");
        console.log("SESSION CALLBACK");
        console.log("================");
        console.log();
        console.log("session:", session);
        console.log();
        console.log("token:", token);
        console.log();
        console.log("****************");
        console.log();
      }

      return sesh;
    },
  },
  //
  //
  //
  // adapter: DrizzleAdapter(db, createTable),
  providers: [
    SpotifyProvider({
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
      authorization:
        "https://accounts.spotify.com/authorize?scope=" +
        encodeURIComponent(scopes),
      // authorization: {
      //   url: "https://example.com/spotify",
      //   // url: "https://accounts.spotify.com/authorize/DIFFERENT=TRUE",
      //   params: {
      //     // https://developer.spotify.com/documentation/web-api/concepts/scopes#user-read-playback-position
      //     scope:
      //       "user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-read-playback-position playlist-modify-public playlist-modify-private playlist-read-collaborative playlist-read-private user-read-currently-playing user-read-playback-state",
      //   },
      // },
      // account: (account) => {
      //   return {
      //     access_token: account.access_token,
      //     expires_at: account.expires_at,
      //     refresh_token: account.refresh_token,
      //   };
      // },
    }),
    /**
     * ...add more providers here.
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

import type {
  NextAuthConfig,
  DefaultSession,
  Session,
  User,
  Account,
  Profile,
} from "next-auth";
import NextAuth from "next-auth";
import type { JWT } from "next-auth/jwt";
// import SpotifyProvider from "next-auth/providers/spotify";
import SpotifyProvider from "@auth/core/providers/spotify";
import type { SpotifyProfile } from "@auth/core/providers/spotify";
// import DiscordProvider from "next-auth/providers/discord";
// import GithubProvider from "next-auth/providers/github";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { env } from "~/env";

const DEBUG_CALLBACKS = false;

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  export interface Session extends DefaultSession {
    accessToken: string | undefined | JWT;
    accessTokenUpdatedAt: number | undefined | string;
    refreshToken: string | undefined | JWT;
    refreshTokenUpdatedAt: number | undefined | string;
    user?: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface Profile extends SpotifyProfile {
    accessToken: string | undefined | JWT;
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
declare module "@auth/core/jwt" {
  interface JWT extends DefaultJWT {
    accessToken: string | undefined | JWT;
    refreshToken: string | undefined | JWT;
    accessTokenUpdatedAt: number | string;
    refreshTokenUpdatedAt: number | string;
    displayName: string;
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

        if (user) {
          // right now user has id, name, email (*can't trust*), image
          console.log();
          console.log("***************");
          console.log("user");
          console.log(user);
          console.log("***************");
          console.log();
        }

        if (profile) {
          console.log();
          console.log("***************");
          console.log("profile");
          console.log(profile);
          console.log("***************");
          console.log();
        }

        if (account) {
          console.log();
          console.log("***************");
          console.log("account");
          console.log(account);
          console.log("***************");
          console.log();
        }

        if (email) {
          console.log();
          console.log("***************");
          console.log("email:", email);
          console.log("***************");
          console.log();
        }
        console.log();
      }

      return true;
    },
    // jwt: async (props) => {
    //   const account = props.account;
    //   const token = props.token;
    jwt: async ({
      token,
      account,
      user,
      profile,
    }: {
      token: JWT;
      account: Account | null;
      user: User | null;
      profile?: Profile | undefined;
    }) => {
      if (DEBUG_CALLBACKS) {
        console.log();
        console.log("****************");
        console.log("================");
        console.log("JWT CALLBACK");
        console.log("================");
        console.log();
        console.log("account:", account);
        console.log();
        console.log("JWT", token);
        console.log();
        console.log("****************");
        console.log();
      }

      /**
       * User, Profile, and Account appear only when signing in, not when
       * 'refreshing the session'
       */
      if (user) {
        // right now user has id, name, email (*can't trust*), image
      }

      if (profile) {
        token.displayName = profile.display_name;
      }

      if (account) {
        token.accessToken = account.access_token;
        token.accessTokenUpdatedAt = Date();

        token.refreshToken = account.refresh_token;
        token.refreshTokenUpdatedAt = Date();
      }

      return token;
    },
    // session: async (props) => {
    //   const session = props.session;
    //   const token = props.token;
    session: async ({
      session,
      user, // only returned if using database strategy (not JWT)
      token, // only returned if using JWT strategy (not database)
    }: {
      session: Session;
      user: User; // only returned if using database strategy (not JWT)
      token: JWT; // only returned if using JWT strategy (not database)
    }): Promise<Session> => {
      const sesh = {
        ...session,
        accessToken: token?.accessToken,
        accessTokenUpdatedAt: token?.accessToken ?? Date(),
        refreshToken: token?.refreshToken,
        refreshTokenUpdatedAt: token?.refreshToken ?? Date(),
      } as Session;
      //

      if (DEBUG_CALLBACKS) {
        console.log();
        console.log("****************");
        console.log("================");
        console.log("SESSION CALLBACK");
        console.log("================");
        console.log();
        // console.log("props:", props);
        console.log();
        console.log("SESSION:", session);
        console.log();
        console.log("JWT:", token);
        console.log();

        if (user) {
          // right now user has id, name, email (*can't trust*), image
          console.log();
          console.log("***************");
          console.log("user");
          console.log(user);
          console.log("***************");
          console.log();
        }
        console.log("****************");
        console.log();
      }

      return sesh;
    },
  },
  providers: [
    SpotifyProvider({
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
      authorization:
        "https://accounts.spotify.com/authorize?scope=" +
        encodeURIComponent(scopes),
      /**
       * Seems to be bugged, can't specify scopes as a property
       */
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

// next-auth (authjs) v5
export const {
  handlers: { GET, POST },
  auth,
} = NextAuth(authConfig);

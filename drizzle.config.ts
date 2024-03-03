import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  driver: "mysql2",
  dbCredentials: {
    uri: env.DEV_DATABASE_URL,
    database: "moozack dev", // db: moozack, branch: dev
  },
  tablesFilter: ["spaught-if-eye_*"],
  out: "./drizzle",

  verbose: true,
} satisfies Config;

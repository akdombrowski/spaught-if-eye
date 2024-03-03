import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { env } from "~/env";
import * as schema from "./schema";

export const dbClient = new Client({
  url: env.DEV_DATABASE_URL,
});
export const db = drizzle(dbClient, { schema });

export const dbAuthAdapter = DrizzleAdapter(db, schema.createTable);

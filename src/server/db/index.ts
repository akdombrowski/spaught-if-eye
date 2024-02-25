import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import { env } from "~/env";
import * as schema from "./schema";

export const dbClient = new Client({ url: env.DATABASE_URL });
export const db = drizzle(dbClient, { schema });

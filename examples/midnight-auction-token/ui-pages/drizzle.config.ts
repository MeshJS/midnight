import { type Config } from "drizzle-kit";
// import dotenv from "dotenv";

import { env } from "@/env";
// dotenv.config({path: ".env.local"})

export default {  
  out: './drizzle',
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },  
} satisfies Config;

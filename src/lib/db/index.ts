import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

// Re-use connection or provide fallback for build-time safety
export const sql = neon(connectionString || "postgresql://placeholder:placeholder@ep-sample-12345.us-east-1.aws.neon.tech/neondb?sslmode=require");
export const db = drizzle(sql, { schema });

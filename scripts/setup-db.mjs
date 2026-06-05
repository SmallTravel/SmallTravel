/**
 * Apply supabase/schema.sql to your Supabase database.
 *
 * Get DATABASE_URL from Supabase Dashboard → Project Settings → Database
 * → Connection string → URI (use "Session pooler" or direct connection).
 *
 * Usage:
 *   DATABASE_URL="postgresql://..." node scripts/setup-db.mjs
 */

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import pg from "pg";

const { Client } = pg;
const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, "..", "supabase", "schema.sql");

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error(
    "Missing DATABASE_URL.\n\n" +
      "1. Open Supabase Dashboard → Project Settings → Database\n" +
      "2. Copy the URI connection string (replace [YOUR-PASSWORD])\n" +
      "3. Run: DATABASE_URL='postgresql://...' npm run db:setup"
  );
  process.exit(1);
}

const sql = readFileSync(schemaPath, "utf8");

const client = new Client({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false },
});

try {
  await client.connect();
  console.log("Connected. Applying schema...");
  await client.query(sql);
  console.log("Done — profiles, tours, and bookings tables are ready.");
} catch (err) {
  console.error("Setup failed:", err.message);
  process.exit(1);
} finally {
  await client.end();
}

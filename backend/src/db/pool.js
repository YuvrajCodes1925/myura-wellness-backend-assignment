import dns from "dns";
import { Pool } from "pg";
import { env } from "../config/env.js";

dns.setDefaultResultOrder("ipv4first");

function buildConnectionConfig(databaseUrl) {
  const parsedUrl = new URL(databaseUrl);
  const host = parsedUrl.hostname;
  const isLocalDb = host === "localhost" || host === "127.0.0.1";

  // Avoid pg-connection-string sslmode semantics/warnings and keep SSL behavior explicit.
  parsedUrl.searchParams.delete("sslmode");
  parsedUrl.searchParams.delete("ssl");

  return {
    connectionString: parsedUrl.toString(),
    ssl: isLocalDb ? false : { rejectUnauthorized: false },
    connectionTimeoutMillis: 15000,
    idleTimeoutMillis: 30000
  };
}

export const pool = new Pool(buildConnectionConfig(env.databaseUrl));

pool.on("error", (error) => {
  console.error("Unexpected PostgreSQL pool error:", error);
});

export async function assertDatabaseConnection() {
  const client = await pool.connect();
  try {
    await client.query("SELECT 1");
  } finally {
    client.release();
  }
}
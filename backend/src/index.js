import app from "./app.js";
import { env } from "./config/env.js";
import { initializeDatabase } from "./db/init.js";
import { assertDatabaseConnection, pool } from "./db/pool.js";

function logStartupError(error) {
  console.error("Failed to start app:", error);

  if (error?.name) {
    console.error("Error name:", error.name);
  }

  if (error?.message) {
    console.error("Error message:", error.message);
  }

  if (error?.code) {
    console.error("Error code:", error.code);
  }

  if (error?.cause) {
    console.error("Error cause:", error.cause);
  }

  if (Array.isArray(error?.errors) && error.errors.length > 0) {
    console.error("Nested errors:");
    for (const nestedError of error.errors) {
      console.error("-", nestedError);
    }
  }

  const failedAddress = error?.address || error?.errors?.[0]?.address;
  if ((error?.code === "EACCES" || error?.code === "ENETUNREACH") && typeof failedAddress === "string" && failedAddress.includes(":")) {
    console.error("Hint: Your network cannot reach the database over IPv6.");
    console.error("Use the Supabase Session Pooler connection string (IPv4, usually port 6543) in DATABASE_URL.");
  }

  if (error?.stack) {
    console.error("Stack trace:\n", error.stack);
  }
}

async function start() {
  try {
    await assertDatabaseConnection();
    await initializeDatabase();

    app.listen(env.port, () => {
      console.log(`Backend running on http://localhost:${env.port}`);
      console.log(`Admin auth required: ${env.requireAdminAuth}`);
    });
  } catch (error) {
    logStartupError(error);
    await pool.end();
    process.exit(1);
  }
}

start();
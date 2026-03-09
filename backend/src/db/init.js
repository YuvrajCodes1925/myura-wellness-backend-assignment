import fs from "fs/promises";
import path from "path";
import bcrypt from "bcryptjs";
import { pool } from "./pool.js";
import { env } from "../config/env.js";

function logDatabaseInitError(error) {
  console.error("Database init failed:", error);
  if (error?.name) console.error("Error name:", error.name);
  if (error?.message) console.error("Error message:", error.message);
  if (error?.code) console.error("Error code:", error.code);
  if (error?.cause) console.error("Error cause:", error.cause);

  if (Array.isArray(error?.errors) && error.errors.length > 0) {
    console.error("Nested errors:");
    for (const nestedError of error.errors) {
      console.error("-", nestedError);
    }
  }

  if (error?.stack) {
    console.error("Stack trace:\n", error.stack);
  }
}

export async function initializeDatabase() {
  const schemaPath = path.resolve("sql", "schema.sql");
  const schemaSql = await fs.readFile(schemaPath, "utf8");
  await pool.query(schemaSql);

  const existing = await pool.query("SELECT id FROM admin_users WHERE username = $1", [env.adminUsername]);
  if (existing.rowCount === 0) {
    const passwordHash = await bcrypt.hash(env.adminPassword, 10);
    await pool.query(
      "INSERT INTO admin_users (username, password_hash) VALUES ($1, $2)",
      [env.adminUsername, passwordHash]
    );
  }
}

if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, "/")}`) {
  initializeDatabase()
    .then(() => {
      console.log("Database initialized successfully.");
      return pool.end();
    })
    .catch((error) => {
      logDatabaseInitError(error);
      return pool.end().finally(() => process.exit(1));
    });
}
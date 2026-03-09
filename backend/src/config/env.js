import dotenv from "dotenv";

dotenv.config();

const rawFrontendUrls = process.env.FRONTEND_URL || "http://localhost:5173";

export const env = {
  port: Number(process.env.PORT || 5000),
  databaseUrl: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/myura_wellness",
  frontendUrls: rawFrontendUrls
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean),
  jwtSecret: process.env.JWT_SECRET || "change_this_secret",
  requireAdminAuth: String(process.env.REQUIRE_ADMIN_AUTH || "false").toLowerCase() === "true",
  adminUsername: process.env.ADMIN_USERNAME || "admin",
  adminPassword: process.env.ADMIN_PASSWORD || "admin123"
};
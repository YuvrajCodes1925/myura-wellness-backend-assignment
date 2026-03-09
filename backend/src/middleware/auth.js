import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function requireAdmin(req, res, next) {
  if (!env.requireAdminAuth) {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid authorization header" });
  }

  const token = authHeader.slice(7);

  try {
    const payload = jwt.verify(token, env.jwtSecret);
    req.admin = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
import { Router } from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../db/pool.js";
import { env } from "../config/env.js";
import { validateBody } from "../middleware/validate.js";

const router = Router();

const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6)
});

router.post("/login", validateBody(loginSchema), async (req, res, next) => {
  try {
    const { username, password } = req.validatedBody;

    const result = await pool.query(
      "SELECT id, username, password_hash FROM admin_users WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const admin = result.rows[0];
    const valid = await bcrypt.compare(password, admin.password_hash);
    if (!valid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign(
      { admin_id: admin.id, username: admin.username },
      env.jwtSecret,
      { expiresIn: "12h" }
    );

    res.json({ token, username: admin.username });
  } catch (error) {
    next(error);
  }
});

export default router;
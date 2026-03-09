import { Router } from "express";
import { z } from "zod";
import { pool } from "../db/pool.js";
import { requireAdmin } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";

const router = Router();

const productSchema = z.object({
  product_name: z.string().min(2).max(150),
  price: z.number().nonnegative(),
  category: z.string().min(2).max(100),
  stock: z.number().int().nonnegative(),
  image_url: z.string().url().optional()
});

const stockSchema = z.object({
  stock: z.number().int().nonnegative()
});

router.get("/", async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, product_name, price, category, stock, image_url, created_at, updated_at FROM products ORDER BY id DESC"
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

router.post("/", requireAdmin, validateBody(productSchema), async (req, res, next) => {
  try {
    const { product_name, price, category, stock, image_url } = req.validatedBody;
    const { rows } = await pool.query(
      `INSERT INTO products (product_name, price, category, stock, image_url)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, product_name, price, category, stock, image_url, created_at, updated_at`,
      [product_name, price, category, stock, image_url || null]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
});

router.put("/:id/stock", requireAdmin, validateBody(stockSchema), async (req, res, next) => {
  try {
    const productId = Number(req.params.id);
    if (!Number.isInteger(productId) || productId <= 0) {
      return res.status(400).json({ error: "Invalid product id" });
    }

    const { stock } = req.validatedBody;
    const { rows } = await pool.query(
      "UPDATE products SET stock = $1, updated_at = NOW() WHERE id = $2 RETURNING id, product_name, price, category, stock, image_url, created_at, updated_at",
      [stock, productId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
});

export default router;
import { Router } from "express";
import { z } from "zod";
import { pool } from "../db/pool.js";
import { validateBody } from "../middleware/validate.js";

const router = Router();

const orderSchema = z.object({
  customer_name: z.string().min(2).max(150),
  customer_email: z.string().email().max(200),
  customer_address: z.string().min(5).max(500),
  items: z.array(z.object({
    product_id: z.number().int().positive(),
    quantity: z.number().int().positive()
  })).min(1)
});

router.post("/", validateBody(orderSchema), async (req, res, next) => {
  const client = await pool.connect();
  try {
    const { customer_name, customer_email, customer_address, items } = req.validatedBody;

    await client.query("BEGIN");

    let totalAmount = 0;
    const preparedItems = [];

    for (const item of items) {
      const productResult = await client.query(
        "SELECT id, product_name, price, stock FROM products WHERE id = $1 FOR UPDATE",
        [item.product_id]
      );

      if (productResult.rows.length === 0) {
        await client.query("ROLLBACK");
        return res.status(404).json({ error: `Product ${item.product_id} not found` });
      }

      const product = productResult.rows[0];
      if (product.stock < item.quantity) {
        await client.query("ROLLBACK");
        return res.status(409).json({
          error: `Insufficient stock for ${product.product_name}`,
          available_stock: product.stock
        });
      }

      const lineTotal = Number(product.price) * item.quantity;
      totalAmount += lineTotal;

      preparedItems.push({
        product_id: product.id,
        product_name: product.product_name,
        quantity: item.quantity,
        price_each: Number(product.price),
        line_total: lineTotal
      });
    }

    const orderResult = await client.query(
      `INSERT INTO orders (customer_name, customer_email, customer_address, total_amount)
       VALUES ($1, $2, $3, $4)
       RETURNING id, customer_name, customer_email, customer_address, total_amount, created_at`,
      [customer_name, customer_email, customer_address, totalAmount.toFixed(2)]
    );

    const order = orderResult.rows[0];

    for (const item of preparedItems) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price_each)
         VALUES ($1, $2, $3, $4)`,
        [order.id, item.product_id, item.quantity, item.price_each]
      );

      await client.query(
        "UPDATE products SET stock = stock - $1, updated_at = NOW() WHERE id = $2",
        [item.quantity, item.product_id]
      );
    }

    await client.query("COMMIT");

    res.status(201).json({
      message: "Order placed successfully",
      order,
      items: preparedItems
    });
  } catch (error) {
    await client.query("ROLLBACK");
    next(error);
  } finally {
    client.release();
  }
});

export default router;
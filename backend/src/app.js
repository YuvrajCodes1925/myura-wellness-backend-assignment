import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { env } from "./config/env.js";
import productsRouter from "./routes/products.js";
import ordersRouter from "./routes/orders.js";
import adminRouter from "./routes/admin.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

const app = express();

const allowedOrigins = new Set(env.frontendUrls);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has("*") || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Not allowed by CORS"));
    }
  })
);

app.use(express.json());

app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false
  })
);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/admin", adminRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
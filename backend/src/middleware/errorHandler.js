import { logError } from "../utils/logger.js";

export function notFoundHandler(req, res) {
  res.status(404).json({ error: "Route not found" });
}

export function errorHandler(error, req, res, next) {
  logError(error, `${req.method} ${req.originalUrl}`);

  if (res.headersSent) {
    return next(error);
  }

  res.status(error.status || 500).json({
    error: error.message || "Internal Server Error"
  });
}
import fs from "fs";
import path from "path";

const logsDir = path.resolve("logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const errorLogFile = path.join(logsDir, "error.log");

export function logError(error, context = "") {
  const message = `[${new Date().toISOString()}] ${context} ${error.stack || error.message || error}\n`;
  fs.appendFile(errorLogFile, message, () => {});
}
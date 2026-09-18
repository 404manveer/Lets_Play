import type { RequestHandler } from 'express';

export const requestLogger: RequestHandler = (req, res, next) => {
    console.log("🔥 requestLogger START");
  const start = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${ms}ms)`);
  });
  next();
};

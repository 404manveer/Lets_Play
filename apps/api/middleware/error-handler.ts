import type { ErrorRequestHandler, RequestHandler } from 'express';
import { AppError } from './app-error.js';

export const notFoundHandler: RequestHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
};

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err instanceof AppError ? err.message : 'Internal server error';

  console.error(`[error] ${req.method} ${req.originalUrl} ->`, err);

  res.status(statusCode).json({ success: false, message });
};

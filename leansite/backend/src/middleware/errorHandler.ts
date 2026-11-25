// Global error handler: JSON in the standard { success, message, timestamp } shape.
import type { NextFunction, Request, Response } from 'express';
import multer from 'multer';

interface HttpError extends Error {
  status?: number;
  statusCode?: number;
}

export function errorHandler(err: HttpError, _req: Request, res: Response, _next: NextFunction): void {
  // Upload problems (file too large, wrong type) are the visitor's input, not a server fault.
  const isUploadError = err instanceof multer.MulterError || err.message?.startsWith('Only PDF');
  const statusCode = isUploadError ? 422 : err.statusCode || err.status || 500;
  if (statusCode >= 500) console.error('[API Error]', err);

  res.status(statusCode).json({
    success: false,
    message: statusCode >= 500 ? 'Internal Server Error' : err.message,
    timestamp: Date.now(),
  });
}

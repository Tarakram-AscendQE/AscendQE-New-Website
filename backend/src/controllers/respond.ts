// Standard JSON responses: { success, message, data?, timestamp }.
import type { Response } from 'express';

export function sendJson(res: Response, status: number, success: boolean, message: string, data?: unknown): void {
  res.status(status).json({ success, message, ...(data !== undefined ? { data } : {}), timestamp: Date.now() });
}

/** Logs an unexpected error and answers 500 with a generic message (details stay in the server log). */
export function sendServerError(res: Response, context: string, err: unknown, message: string): void {
  console.error(`[${context}]`, err);
  sendJson(res, 500, false, message);
}

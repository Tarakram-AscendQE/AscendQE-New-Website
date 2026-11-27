// Studio authentication: verifies the JWT bearer token; the user goes into res.locals.user.
import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';

export interface AuthUser {
  sub: number;
  username: string;
}

function isAuthUser(payload: unknown): payload is AuthUser {
  if (typeof payload !== 'object' || payload === null) return false;
  const record = payload as Record<string, unknown>;
  return typeof record.sub === 'number' && typeof record.username === 'string';
}

function unauthorized(res: Response, message: string): void {
  res.status(401).json({ success: false, message, timestamp: Date.now() });
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7).trim() : '';
  if (!token) {
    unauthorized(res, 'Please sign in to AscendQE Studio.');
    return;
  }
  try {
    const payload = jwt.verify(token, config.auth.jwtSecret);
    if (!isAuthUser(payload)) throw new Error('Invalid token payload');
    res.locals.user = payload;
    next();
  } catch {
    unauthorized(res, 'Your session has expired. Please sign in to AscendQE Studio again.');
  }
}

/** The signed-in studio user (only call after requireAuth). */
export function currentUser(res: Response): AuthUser {
  return res.locals.user as AuthUser;
}

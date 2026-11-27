// Studio sign-in against the `admin_users` table (bcrypt), issuing a JWT.
import bcrypt from 'bcryptjs';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import type { RowDataPacket } from 'mysql2/promise';
import { config } from '../config/index.js';
import { pool } from '../config/database.js';
import { currentUser } from '../middleware/authMiddleware.js';
import { sendJson, sendServerError } from './respond.js';

interface AdminUserRow extends RowDataPacket {
  user_id: number;
  username: string;
  password_hash: string;
  is_active: number;
}

const INVALID_LOGIN = 'Invalid username or password. Please try again.';

function displayName(username: string): string {
  const raw = username.includes('@') ? username.split('@')[0] : username;
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

/** POST /api/auth/login */
export async function login(req: Request, res: Response): Promise<void> {
  const username = String(req.body?.username ?? '')
    .trim()
    .toLowerCase();
  const password = String(req.body?.password ?? '').trim();
  if (!username || !password) {
    sendJson(res, 400, false, 'Please enter both username and password.');
    return;
  }
  if (!pool) {
    sendJson(res, 503, false, 'Sign-in is unavailable right now. Please try again later.');
    return;
  }

  try {
    const [rows] = await pool.execute<AdminUserRow[]>(
      'SELECT user_id, username, password_hash, is_active FROM admin_users WHERE LOWER(username) = ? LIMIT 1',
      [username]
    );
    const user = rows[0];
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      sendJson(res, 401, false, INVALID_LOGIN);
      return;
    }
    if (!user.is_active) {
      sendJson(res, 403, false, 'This account is deactivated. Please contact your administrator.');
      return;
    }

    const token = jwt.sign({ sub: user.user_id, username: user.username }, config.auth.jwtSecret, {
      expiresIn: config.auth.jwtExpiresIn,
    } as jwt.SignOptions);
    const name = displayName(user.username);
    sendJson(res, 200, true, `Welcome back, ${name}!`, {
      session: {
        id: user.user_id,
        username: user.username,
        displayName: name,
        role: 'admin',
        token,
        loginTime: Date.now(),
      },
    });
  } catch (err) {
    sendServerError(res, 'Auth', err, 'Sign-in failed. Please try again.');
  }
}

/** GET /api/auth/me (requireAuth) */
export function getMe(_req: Request, res: Response): void {
  const user = currentUser(res);
  sendJson(res, 200, true, 'Signed in.', {
    id: user.sub,
    username: user.username,
    displayName: displayName(user.username),
    role: 'admin',
  });
}

/** POST /api/auth/logout (tokens are stateless; the client forgets its token) */
export function logout(_req: Request, res: Response): void {
  sendJson(res, 200, true, 'Signed out.');
}

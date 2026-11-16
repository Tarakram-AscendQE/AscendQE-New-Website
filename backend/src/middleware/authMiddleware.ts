// Authentication Guard Middleware

import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config/index.js'

export interface AuthTokenPayload {
  sub: number
  username: string
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized access. Please log in to AscendQE Studio.',
      timestamp: Date.now(),
    })
    return
  }

  const token = authHeader.split(' ')[1]
  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Invalid or missing authentication token.',
      timestamp: Date.now(),
    })
    return
  }

  try {
    const payload = jwt.verify(token, config.jwtSecret) as unknown as AuthTokenPayload
    res.locals.user = payload
    next()
  } catch {
    res.status(401).json({
      success: false,
      message: 'Your session has expired. Please log in to AscendQE Studio again.',
      timestamp: Date.now(),
    })
  }
}

// @src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { HttpError } from '@constants/Errors';
import HttpStatusCodes from '@constants/HttpStatusCodes';

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers['authorization'];

  if (!token) {
    throw new HttpError(
      'Unauthorized: Missing token',
      HttpStatusCodes.UNAUTHORIZED
    );
  }
  next();
}

import { parse } from 'cookie';
import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { AuthenticatedRequest } from './types';

export function withAuth(handler: Function) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.access_token;

    if (!token) {
      return res.status(401).json({ message: "Token manquant" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      (req as AuthenticatedRequest).user = decoded;
      return handler(req as AuthenticatedRequest, res);
    } catch (err) {
      return res.status(401).json({ message: "Token invalide" });
    }
  };
}

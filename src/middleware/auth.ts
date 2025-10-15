import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';


export interface JwtPayload { id: string; role: 'user' | 'admin'; }


export function authRequired(req: Request, res: Response, next: NextFunction) {
const header = req.headers.authorization || '';
const token = header.startsWith('Bearer ') ? header.slice(7) : null;
if (!token) return res.status(401).json({ message: 'Missing token', code: 401 });
try {
const secret = config.get<string>('security.jwt.secret');
const payload = jwt.verify(token, secret) as JwtPayload;
(req as any).user = payload;
next();
} catch {
return res.status(401).json({ message: 'Invalid token', code: 401 });
}
}
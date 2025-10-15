import { NextFunction, Request, Response } from 'express';


export function notFound(_req: Request, res: Response) {
res.status(404).json({ message: 'Not Found', code: 404 });
}


export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
console.error('[ERR]', err);
const status = err.status || 500;
res.status(status).json({ message: err.message || 'Internal Server Error', code: status, details: err.details });
}
import rateLimit from 'express-rate-limit';
import config from 'config';


export const baseLimiter = rateLimit({
windowMs: config.get<number>('security.rateLimit.windowMs'),
max: config.get<number>('security.rateLimit.max'),
standardHeaders: true,
legacyHeaders: false,
});


export const strictLimiter = rateLimit({
windowMs: 15 * 60 * 1000,
max: 20,
standardHeaders: true,
legacyHeaders: false,
});
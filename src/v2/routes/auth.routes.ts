import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';
import { strictLimiter } from '../../middleware/rateLimit';


const r = Router();


r.post('/register', register);
r.post('/login', strictLimiter, login);


export default r;
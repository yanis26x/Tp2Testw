import { Router } from 'express';
import { me, patchMe, getById } from '../controllers/users.controller';
import { authRequired } from '../../middleware/auth';
import { requireAdmin } from '../../middleware/roles';


const r = Router();


r.get('/me', authRequired, me);
r.patch('/me', authRequired, patchMe);
r.get('/:id', authRequired, requireAdmin, getById);


export default r;
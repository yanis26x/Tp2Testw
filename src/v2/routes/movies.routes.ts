import { Router } from 'express';
import { list, create, getById, patch, remove } from '../controllers/movies.controller';
import { authRequired } from '../../middleware/auth';
import { requireAdmin } from '../../middleware/roles';


const r = Router();


r.get('/', list);
r.post('/', authRequired, requireAdmin, create);
r.get('/:id', getById);
r.patch('/:id', authRequired, requireAdmin, patch);
r.delete('/:id', authRequired, requireAdmin, remove);


export default r;
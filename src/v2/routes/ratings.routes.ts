import { Router } from 'express';
import { create, avgMovie, avgSeries } from '../controllers/ratings.controller';
import { authRequired } from '../../middleware/auth';
import { strictLimiter } from '../../middleware/rateLimit';


const r = Router();


r.post('/', authRequired, strictLimiter, create);
r.get('/avg/movie/:movieId', avgMovie);
r.get('/avg/series/:seriesId', avgSeries);


export default r;
import { Router } from 'express';
import { listSeries, createSeries, createSeason, createEpisode, listEpisodes } from '../controllers/series.controller';
import { authRequired } from '../../middleware/auth';
import { requireAdmin } from '../../middleware/roles';


const r = Router();


r.get('/', listSeries);
r.post('/', authRequired, requireAdmin, createSeries);


r.post('/:seriesId/seasons', authRequired, requireAdmin, createSeason);


r.post('/:seriesId/seasons/:seasonId/episodes', authRequired, requireAdmin, createEpisode);


r.get('/:seriesId/seasons/:seasonId/episodes', listEpisodes);


export default r;
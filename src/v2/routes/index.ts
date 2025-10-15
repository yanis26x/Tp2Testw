import { Router } from 'express';
import auth from './auth.routes';
import users from './users.routes';
import movies from './movies.routes';
import series from './series.routes';
import ratings from './ratings.routes';


const r = Router();


r.use('/auth', auth);
r.use('/users', users);
r.use('/movies', movies);
r.use('/series', series);
r.use('/ratings', ratings);


export default r;
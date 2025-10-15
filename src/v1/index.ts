import { Router } from 'express';
const r = Router();


r.get('/', (_req, res) => {
res.json({ message: 'v1 – deprecated (lecture seule)' });
});


export default r;
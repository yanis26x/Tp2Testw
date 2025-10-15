import Series from '../../models/Series';
import Season from '../../models/Season';
import Episode from '../../models/Episode';
import { Request, Response } from 'express';


export async function listSeries(req: Request, res: Response) {
const { title, genre, status } = req.query as any;
const filter: any = {};
if (title) filter.title = { $regex: String(title), $options: 'i' };
if (genre) filter.genres = { $in: [String(genre)] };
if (status) filter.status = String(status);
const items = await Series.find(filter).sort({ createdAt: -1 });
res.json(items);
}


export async function createSeries(req: Request, res: Response) {
const s = await Series.create(req.body);
res.status(201).json(s);
}


export async function createSeason(req: Request, res: Response) {
const { seriesId } = req.params;
const season = await Season.create({ seriesId, seasonNo: req.body.seasonNo, episodes: req.body.episodes ?? 0 });
res.status(201).json(season);
}


export async function createEpisode(req: Request, res: Response) {
const { seriesId, seasonId } = req.params;
const ep = await Episode.create({ seriesId, seasonId, epNo: req.body.epNo, title: req.body.title, durationMin: req.body.durationMin });
res.status(201).json(ep);
}


export async function listEpisodes(req: Request, res: Response) {
const { seriesId, seasonId } = req.params;
const { minDuration } = req.query as any;
const filter: any = { seriesId, seasonId };
if (minDuration) filter.durationMin = { $gte: Number(minDuration) };
const eps = await Episode.find(filter).sort({ epNo: 1 });
res.json(eps);
}
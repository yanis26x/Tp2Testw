import Rating from '../../models/Rating';
import Episode from '../../models/Episode';
import { Request, Response } from 'express';


export async function create(req: Request, res: Response) {
const userId = (req as any).user.id;
const { target, targetId, score, review } = req.body || {};
if (!['movie', 'episode'].includes(target)) return res.status(400).json({ message: 'Invalid target' });
const rating = await Rating.create({ userId, target, targetId, score, review });
res.status(201).json(rating);
}


export async function avgMovie(req: Request, res: Response) {
const movieId = req.params.movieId;
const agg = await Rating.aggregate([
{ $match: { target: 'movie', targetId: new (require('mongoose').Types.ObjectId)(movieId) } },
{ $group: { _id: '$targetId', avg: { $avg: '$score' }, count: { $sum: 1 } } }
]);
const result = agg[0] || { avg: null, count: 0 };
res.json(result);
}


export async function avgSeries(req: Request, res: Response) {
const seriesId = req.params.seriesId;
const mongoose = require('mongoose');
const agg = await Episode.aggregate([
{ $match: { seriesId: new mongoose.Types.ObjectId(seriesId) } },
{ $lookup: { from: 'ratings', localField: '_id', foreignField: 'targetId', as: 'ratings', pipeline: [ { $match: { target: 'episode' } } ] } },
{ $unwind: { path: '$ratings', preserveNullAndEmptyArrays: false } },
{ $group: { _id: '$seriesId', avg: { $avg: '$ratings.score' }, count: { $sum: 1 } } }
]);
const result = agg[0] || { avg: null, count: 0 };
res.json(result);
}
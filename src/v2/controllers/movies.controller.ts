import Movie from '../../models/Movie';
import { Request, Response } from 'express';
import { getPagination } from '../utils/pagination';


export async function list(req: Request, res: Response) {
const { title, genre, minYear, maxDur } = req.query as any;
const filter: any = {};
if (title) filter.title = { $regex: String(title), $options: 'i' };
if (genre) filter.genres = { $in: [String(genre)] };
if (minYear) filter.releaseDate = { $gte: new Date(`${minYear}-01-01`) };
if (maxDur) filter.durationMin = { $lte: Number(maxDur) };
const { page, limit, skip } = getPagination(req.query);
const [items, total] = await Promise.all([
Movie.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
Movie.countDocuments(filter)
]);
res.json({ items, total, page, pages: Math.ceil(total / limit) });
}


export async function create(req: Request, res: Response) {
const movie = await Movie.create(req.body);
res.status(201).json(movie);
}


export async function getById(req: Request, res: Response) {
const movie = await Movie.findById(req.params.id);
if (!movie) return res.status(404).json({ message: 'Movie not found' });
res.json(movie);
}


export async function patch(req: Request, res: Response) {
const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
if (!movie) return res.status(404).json({ message: 'Movie not found' });
res.json(movie);
}


export async function remove(req: Request, res: Response) {
const movie = await Movie.findByIdAndDelete(req.params.id);
if (!movie) return res.status(404).json({ message: 'Movie not found' });
res.status(204).send();
}
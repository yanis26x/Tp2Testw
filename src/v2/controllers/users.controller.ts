import User from '../../models/User';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';


export async function me(req: Request, res: Response) {
const id = (req as any).user?.id;
const user = await User.findById(id).select('-password');
if (!user) return res.status(404).json({ message: 'User not found' });
res.json(user);
}


export async function patchMe(req: Request, res: Response) {
const id = (req as any).user?.id;
const { username, password } = req.body || {};
const updates: any = {};
if (username) updates.username = username;
if (password) updates.password = await bcrypt.hash(password, 10);
const user = await User.findByIdAndUpdate(id, updates, { new: true }).select('-password');
res.json(user);
}


export async function getById(req: Request, res: Response) {
const user = await User.findById(req.params.id).select('-password');
if (!user) return res.status(404).json({ message: 'User not found' });
res.json(user);
}
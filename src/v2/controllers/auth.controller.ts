import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import User from '../../models/User';
import { emailRe, usernameRe, strongPwdRe } from '../utils/validators';
import { Request, Response } from 'express';


export async function register(req: Request, res: Response) {
const { email, username, password } = req.body || {};
if (!emailRe.test(email)) return res.status(400).json({ message: 'Invalid email' });
if (!usernameRe.test(username)) return res.status(400).json({ message: 'Invalid username' });
if (!strongPwdRe.test(password)) return res.status(400).json({ message: 'Weak password' });


const exists = await User.findOne({ email });
if (exists) return res.status(409).json({ message: 'Email already exists' });


const hash = await bcrypt.hash(password, 10);
const user = await User.create({ email, username, password: hash, role: 'user' });
const { password: _p, ...safe } = user.toObject();
return res.status(201).json(safe);
}


export async function login(req: Request, res: Response) {
const { email, password } = req.body || {};
const user = await User.findOne({ email });
if (!user) return res.status(401).json({ message: 'Invalid credentials' });
const ok = await bcrypt.compare(password, user.password);
if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
const token = jwt.sign({ id: user.id, role: user.role }, config.get<string>('security.jwt.secret'), { expiresIn: config.get<string>('security.jwt.expiresIn') });
return res.json({ token });
}
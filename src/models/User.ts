import { Schema, model, Types } from 'mongoose';


export interface IUser {
email: string;
username: string;
name?: string;
password: string; // hash
role: 'user' | 'admin';
favorites?: { movies?: Types.ObjectId[]; episodes?: Types.ObjectId[] };
}


const userSchema = new Schema<IUser>({
email: { type: String, unique: true, required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
username: { type: String, required: true, minlength: 3, maxlength: 30, match: /^[A-Za-z0-9._-]+$/ },
name: { type: String },
password: { type: String, required: true },
role: { type: String, enum: ['user', 'admin'], default: 'user' },
favorites: {
movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
episodes: [{ type: Schema.Types.ObjectId, ref: 'Episode' }]
}
}, { timestamps: true });


export default model<IUser>('User', userSchema);
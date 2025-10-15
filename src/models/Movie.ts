import { Schema, model } from 'mongoose';


export interface IMovie {
title: string;
genres: string[];
synopsis?: string;
releaseDate?: Date;
durationMin: number; // 1..600
}


const movieSchema = new Schema<IMovie>({
title: { type: String, required: true, minlength: 1, maxlength: 200, index: true },
genres: [{ type: String, minlength: 1, maxlength: 30, index: true }],
synopsis: { type: String },
releaseDate: { type: Date },
durationMin: { type: Number, required: true, min: 1, max: 600 }
}, { timestamps: true });


export default model<IMovie>('Movie', movieSchema);
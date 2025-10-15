import { Schema, model } from 'mongoose';


export interface ISeries { title: string; genres: string[]; status: 'ongoing' | 'ended'; }


const seriesSchema = new Schema<ISeries>({
title: { type: String, required: true, minlength: 1, maxlength: 200, index: true },
genres: [{ type: String, minlength: 1, maxlength: 30, index: true }],
status: { type: String, enum: ['ongoing', 'ended'], default: 'ongoing' }
}, { timestamps: true });


export default model<ISeries>('Series', seriesSchema);
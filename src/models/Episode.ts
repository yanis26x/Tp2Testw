import { Schema, model, Types } from 'mongoose';


export interface IEpisode {
seriesId: Types.ObjectId;
seasonId: Types.ObjectId;
epNo: number; // >=1
title: string;
durationMin: number; // 1..300
}


const episodeSchema = new Schema<IEpisode>({
seriesId: { type: Schema.Types.ObjectId, ref: 'Series', required: true, index: true },
seasonId: { type: Schema.Types.ObjectId, ref: 'Season', required: true, index: true },
epNo: { type: Number, required: true, min: 1 },
title: { type: String, required: true, minlength: 1, maxlength: 200 },
durationMin: { type: Number, required: true, min: 1, max: 300 }
}, { timestamps: true });


export default model<IEpisode>('Episode', episodeSchema);
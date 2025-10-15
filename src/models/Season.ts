import { Schema, model, Types } from 'mongoose';


export interface ISeason { seriesId: Types.ObjectId; seasonNo: number; episodes: number; }


const seasonSchema = new Schema<ISeason>({
seriesId: { type: Schema.Types.ObjectId, ref: 'Series', required: true, index: true },
seasonNo: { type: Number, required: true, min: 1 },
episodes: { type: Number, default: 0, min: 0 }
}, { timestamps: true });


export default model<ISeason>('Season', seasonSchema);
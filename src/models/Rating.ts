import { Schema, model, Types } from 'mongoose';


export interface IRating {
userId: Types.ObjectId;
target: 'movie' | 'episode';
targetId: Types.ObjectId; // Movie or Episode id
score: number; // 0..10
review?: string; // max 2000
}


const ratingSchema = new Schema<IRating>({
userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
target: { type: String, enum: ['movie', 'episode'], required: true },
targetId: { type: Schema.Types.ObjectId, required: true, index: true },
score: { type: Number, required: true, min: 0, max: 10 },
review: { type: String, maxlength: 2000 }
}, { timestamps: true });


export default model<IRating>('Rating', ratingSchema);
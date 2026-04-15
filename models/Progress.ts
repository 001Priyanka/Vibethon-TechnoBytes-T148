import mongoose, { Document, Schema } from 'mongoose';

export interface IProgress extends Document {
  userId: mongoose.Types.ObjectId;
  topicId: string;
  completed: boolean;
  score: number;
  updatedAt: Date;
}

const progressSchema = new Schema<IProgress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    topicId: { type: String, required: true },
    completed: { type: Boolean, default: false },
    score: { type: Number, default: 0 },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: { createdAt: false, updatedAt: true } }
);

progressSchema.index({ userId: 1, topicId: 1 }, { unique: true });

export const Progress = (mongoose.models?.Progress as any) || mongoose.model<IProgress>('Progress', progressSchema);
import mongoose, { Document, Schema } from 'mongoose';

export interface IFlashcardProgress extends Document {
  userId: mongoose.Types.ObjectId;
  cardId: string;
  status: 'easy' | 'hard' | 'repeat';
}

const flashcardProgressSchema = new Schema<IFlashcardProgress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    cardId: { type: String, required: true },
    status: { type: String, enum: ['easy', 'hard', 'repeat'], default: 'repeat' },
  },
  { timestamps: { createdAt: false, updatedAt: true } }
);

flashcardProgressSchema.index({ userId: 1, cardId: 1 }, { unique: true });

export const FlashcardProgress = (mongoose.models?.FlashcardProgress as any) || mongoose.model<IFlashcardProgress>('FlashcardProgress', flashcardProgressSchema);
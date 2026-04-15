import mongoose, { Document, Schema, Models } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  image?: string;
  xp: number;
  level: number;
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: { type: String },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function getUserModel(m: typeof mongoose) {
  return m.models.User || m.model<IUser>('User', userSchema);
}

export const User = (mongoose.models?.User as any) || mongoose.model<IUser>('User', userSchema);
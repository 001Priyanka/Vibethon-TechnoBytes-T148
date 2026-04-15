import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/authMiddleware';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';
import { Progress } from '@/models/Progress';

export const runtime = 'nodejs';

export async function GET() {
  const session = await auth();
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();
  const user = await mongoose.model('User').findOne({ email: session.user.email });
  
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const progress = await Progress.find({ userId: user._id });
  return NextResponse.json(progress);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { topicId, completed, score } = await request.json();
  
  if (!topicId) {
    return NextResponse.json({ error: 'topicId required' }, { status: 400 });
  }

  await dbConnect();
  const user = await mongoose.model('User').findOne({ email: session.user.email });
  
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const progress = await Progress.findOneAndUpdate(
    { userId: user._id, topicId },
    { 
      $set: { 
        completed: completed ?? false, 
        score: score ?? 0,
        updatedAt: new Date()
      } 
    },
    { upsert: true, new: true }
  );

  return NextResponse.json(progress);
}
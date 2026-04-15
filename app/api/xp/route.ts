import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/authMiddleware';
import dbConnect from '@/lib/mongodb';
import { User } from '@/models/User';

export const runtime = 'nodejs';

const XP_THRESHOLDS = [0, 100, 250, 500, 1000, 2000, 3500, 5500, 8000, 11000];

function calculateLevel(xp: number): number {
  for (let i = XP_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= XP_THRESHOLDS[i]) {
      return i + 1;
    }
  }
  return 1;
}

export async function POST(request: NextRequest) {
  const session = await auth();
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { xp: xpToAdd } = await request.json();
  
  if (typeof xpToAdd !== 'number' || xpToAdd <= 0) {
    return NextResponse.json({ error: 'Invalid XP amount' }, { status: 400 });
  }

  await dbConnect();

  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const newXp = user.xp + xpToAdd;
  const newLevel = calculateLevel(newXp);

  const updatedUser = await User.findOneAndUpdate(
    { email: session.user.email },
    { $set: { xp: newXp, level: newLevel } },
    { new: true }
  );

  return NextResponse.json({
    xp: updatedUser!.xp,
    level: updatedUser!.level,
  });
}
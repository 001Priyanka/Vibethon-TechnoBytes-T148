import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/authMiddleware';
import dbConnect from '@/lib/mongodb';
import { User } from '@/models/User';

export const runtime = 'nodejs';

export async function GET() {
  const session = await auth();
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();
  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({
    id: user._id,
    name: user.name,
    email: user.email,
    image: user.image,
    xp: user.xp,
    level: user.level,
    createdAt: user.createdAt,
  });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  await dbConnect();

  const user = await User.findOneAndUpdate(
    { email: session.user.email },
    { $set: { name: body.name, image: body.image } },
    { new: true }
  );

  return NextResponse.json(user);
}
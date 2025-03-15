// src/app/api/users/me/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectToDatabase();
  const user = await User.findOne({ email: session.user.email })
    .populate('referredUsers') // Populate users this user referred
    .populate('referredBy')    // Populate the user who referred this user
    .populate('purchasedCourses'); // Populate purchased courses (if needed)

  console.log('API /users/me response:', user); // Debug log
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  return NextResponse.json(user);
}
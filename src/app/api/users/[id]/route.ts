import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import Transaction from '@/models/Transaction';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { name, email, balance, remarks, purchasedCourses } = await req.json();
  await connectToDatabase();

  const user = await User.findById(params.id);
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const balanceChange = balance - user.balance;
  user.name = name;
  user.email = email;
  user.balance = balance;
  if (purchasedCourses) user.purchasedCourses = purchasedCourses;

  if (balanceChange !== 0) {
    await new Transaction({
      userId: user._id,
      amount: balanceChange,
      reason: remarks || '',
      type: balanceChange > 0 ? 'credit' : 'debit',
    }).save();
  }

  await user.save();
  return NextResponse.json({ message: 'User updated' });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectToDatabase();
  await User.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'User deleted' });
}
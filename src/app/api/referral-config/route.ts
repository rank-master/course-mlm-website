import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import ReferralConfig from '@/models/ReferralConfig';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  await connectToDatabase();
  const config = await ReferralConfig.findOne({ courseId: null }) || {
    firstSale: { seller: 0.8, passive: 0.1, superPassive: 0.05 },
    subsequentSale: { seller: 0.6, passive: 0.2, superPassive: 0.1 },
  };
  return NextResponse.json({ global: config });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { global } = await req.json();
  await connectToDatabase();
  await ReferralConfig.findOneAndUpdate(
    { courseId: null },
    { $set: { firstSale: global.firstSale, subsequentSale: global.subsequentSale } },
    { upsert: true }
  );
  return NextResponse.json({ message: 'Config updated' });
}

export async function DELETE() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectToDatabase();
  await ReferralConfig.deleteOne({ courseId: null });
  return NextResponse.json({ message: 'Config reset to default' });
}
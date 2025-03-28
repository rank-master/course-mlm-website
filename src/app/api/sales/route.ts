import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import Course from '@/models/Course';
import Transaction from '@/models/Transaction';
import ReferralConfig from '@/models/ReferralConfig';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { buyerEmail, courseId, manualReferralCode, isFirstUser } = await req.json();
  if (!buyerEmail || !courseId) return NextResponse.json({ error: 'Buyer email and course ID required' }, { status: 400 });

  await connectToDatabase();

  const buyer = await User.findOne({ email: buyerEmail });
  if (!buyer) return NextResponse.json({ error: 'Buyer not found' }, { status: 404 });

  const course = await Course.findById(courseId);
  if (!course) return NextResponse.json({ error: 'Course not found' }, { status: 404 });

  if (buyer.purchasedCourses.includes(courseId)) {
    return NextResponse.json({ error: 'This user already owns this course' }, { status: 400 });
  }

  let referrer = buyer.referredBy ? await User.findById(buyer.referredBy) : null;
  if (!referrer && isFirstUser === false && manualReferralCode) {
    referrer = await User.findOne({ referralCode: manualReferralCode });
    if (!referrer) return NextResponse.json({ error: 'Invalid referral code' }, { status: 400 });
    buyer.referredBy = referrer._id;
    await buyer.save();
  }

  const referrerCourses = referrer ? await Course.find({ _id: { $in: referrer.purchasedCourses } }) : [];
  const referrerMaxPrice = referrerCourses.length ? Math.max(...referrerCourses.map(c => c.price)) : 0;
  const commissionBase = Math.min(referrerMaxPrice || course.price, course.price);

  const config = (await ReferralConfig.findOne({ courseId: null })) || {
    firstSale: { seller: 0.8, passive: 0.1, superPassive: 0.05 },
    subsequentSale: { seller: 0.6, passive: 0.2, superPassive: 0.1 },
  };

  const referrerSales = referrer ? await Transaction.find({ userId: referrer._id, reason: { $regex: `from ${buyer.email}` } }) : [];
  const isFirstSale = !referrer || referrerSales.length === 0;
  const rates = isFirstSale ? config.firstSale : config.subsequentSale;

  const superReferrer = referrer?.referredBy ? await User.findById(referrer.referredBy) : null;
  const superSuperReferrer = superReferrer?.referredBy ? await User.findById(superReferrer.referredBy) : null;

  const preview = {
    seller: referrer ? { id: referrer._id, email: referrer.email, amount: commissionBase * rates.seller } : null,
    passive: superReferrer ? { id: superReferrer._id, email: superReferrer.email, amount: commissionBase * rates.passive } : null,
    superPassive: superSuperReferrer ? { id: superSuperReferrer._id, email: superSuperReferrer.email, amount: commissionBase * rates.superPassive } : null,
    buyerId: buyer._id,
    courseId: course._id,
  };

  return NextResponse.json(preview);
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { seller, passive, superPassive, buyerId, courseId } = await req.json();
  await connectToDatabase();

  const buyer = await User.findById(buyerId);
  if (buyer.purchasedCourses.includes(courseId)) {
    return NextResponse.json({ error: 'This user already owns this course' }, { status: 400 });
  }
  buyer.purchasedCourses.push(courseId);
  await buyer.save();
  console.log('Updated buyer:', await User.findById(buyerId)); // Debug log

  const transactions = [];
  if (seller) {
    const sellerUser = await User.findById(seller.id);
    sellerUser.balance += seller.amount;
    transactions.push(new Transaction({
      userId: seller.id,
      amount: seller.amount,
      reason: `Sale commission from ${buyer.email}`,
      type: 'sale',
    }));
    await sellerUser.save();
  }
  if (passive) {
    const passiveUser = await User.findById(passive.id);
    passiveUser.balance += passive.amount;
    transactions.push(new Transaction({
      userId: passive.id,
      amount: passive.amount,
      reason: `Passive commission from ${buyer.email}`,
      type: 'passive',
    }));
    await passiveUser.save();
  }
  if (superPassive) {
    const superPassiveUser = await User.findById(superPassive.id);
    superPassiveUser.balance += superPassive.amount;
    transactions.push(new Transaction({
      userId: superPassive.id,
      amount: superPassive.amount,
      reason: `Super passive commission from ${buyer.email}`,
      type: 'super_passive',
    }));
    await superPassiveUser.save();
  }

  await Transaction.insertMany(transactions);
  return NextResponse.json({ message: 'Sale confirmed' });
}
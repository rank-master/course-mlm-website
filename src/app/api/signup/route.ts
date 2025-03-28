import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { email, password, name, referral } = await req.json();

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Find referrer if referral code provided
    let referrer = null;
    if (referral) {
      referrer = await User.findOne({ referralCode: referral });
      if (!referrer) {
        return NextResponse.json({ error: 'Invalid referral code' }, { status: 400 });
      }
    }

    // Generate unique referral code
    let referralCode;
    do {
      referralCode = `USER${Math.floor(1000 + Math.random() * 9000)}`;
    } while (await User.findOne({ referralCode }));

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      referralCode, // Use the unique code here
      referredBy: referrer ? referrer._id : null,
      balance: 0,
      referredUsers: [],
    });

    await newUser.save();

    // Update referrer's referredUsers array
    if (referrer) {
      referrer.referredUsers = referrer.referredUsers || [];
      referrer.referredUsers.push(newUser._id);
      await referrer.save();
    }

    return NextResponse.json(
      { message: 'User created successfully', user: { email, name, referralCode: newUser.referralCode } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
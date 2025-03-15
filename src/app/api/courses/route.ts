import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Course from '@/models/Course';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  await connectToDatabase();
  const courses = await Course.find({});
  return NextResponse.json(courses);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { name, price } = await req.json();
  if (!name || !price) return NextResponse.json({ error: 'Name and price required' }, { status: 400 });

  await connectToDatabase();
  const course = new Course({ name, price });
  await course.save();
  return NextResponse.json({ message: 'Course added' }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get('id');
  if (!courseId) return NextResponse.json({ error: 'Course ID required' }, { status: 400 });

  await connectToDatabase();
  await Course.findByIdAndDelete(courseId);
  return NextResponse.json({ message: 'Course deleted' });
}
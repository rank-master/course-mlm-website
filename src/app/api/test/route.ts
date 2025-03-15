import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Course from '@/models/Course';

export async function GET() {
  try {
    await connectToDatabase();

    // Seed initial courses (run once, then comment out)
    const courses = [
      { name: 'Bronze', price: 100, description: 'Entry-level course', image: '/images/bronze.jpg' },
      { name: 'Gold', price: 200, description: 'Intermediate course', image: '/images/gold.jpg' },
      { name: 'Diamond', price: 300, description: 'Advanced course', image: '/images/diamond.jpg' },
    ];

    await Course.deleteMany({}); // Clear existing courses (for testing)
    await Course.insertMany(courses);

    const allCourses = await Course.find();
    return NextResponse.json({ message: 'MongoDB connected', courses: allCourses });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to connect to MongoDB' }, { status: 500 });
  }
}
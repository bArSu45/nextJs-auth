import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(request) {
  try {
    await connectDB();
    const { name, email, password } = await request.json();
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    const user = await User.create({ name, email, password });
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.log(JSON.stringify(error))
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}

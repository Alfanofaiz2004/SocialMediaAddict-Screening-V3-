import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { username, password, phone } = await request.json();

    if (!username || !password || !phone) {
      return NextResponse.json({ success: false, error: 'Missing fields' }, { status: 400 });
    }

    const cleanUsername = username.toLowerCase().trim();

    if (cleanUsername === 'admin' || cleanUsername === 'guest') {
      return NextResponse.json({ success: false, error: 'Username not allowed' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { username: cleanUsername },
    });

    if (existingUser) {
      return NextResponse.json({ success: false, error: 'Username already registered' }, { status: 400 });
    }

    const newUser = await prisma.user.create({
      data: {
        username: cleanUsername,
        password: password,
        phone,
      },
    });

    return NextResponse.json({ success: true, user: { id: newUser.id, username: newUser.username } });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

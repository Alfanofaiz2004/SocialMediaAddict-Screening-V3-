import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ success: false, error: 'Missing fields' }, { status: 400 });
    }

    const cleanUsername = username.toLowerCase().trim();

    // Built-in Admin bypass from original code
    if (cleanUsername === 'admin' && password === '10123406') {
      return NextResponse.json({ 
        success: true, 
        user: { username: 'admin', role: 'admin' } 
      });
    } else if (cleanUsername === 'admin') {
      return NextResponse.json({ success: false, error: 'Password admin salah' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { username: cleanUsername },
    });

    if (!user) {
      return NextResponse.json({ success: false, error: 'Username tidak ditemukan' }, { status: 404 });
    }

    const passwordMatch = (password === user.password);

    if (!passwordMatch) {
      return NextResponse.json({ success: false, error: 'Password salah' }, { status: 401 });
    }

    return NextResponse.json({ 
      success: true, 
      user: { id: user.id, username: user.username, role: 'user' } 
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
      return NextResponse.json({ success: false, error: 'Username required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        name: true,
        phone: true,
        address: true,
        age: true,
        gender: true,
        createdAt: true,
      }
    });

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { username, name, phone, address, age, gender } = data;

    if (!username) {
      return NextResponse.json({ success: false, error: 'Username required' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { username },
      data: {
        name,
        phone,
        address,
        age: age ? parseInt(age.toString()) : null,
        gender,
      },
    });

    return NextResponse.json({ success: true, user: { username: updatedUser.username } });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
      return NextResponse.json({ success: false, error: 'Username required' }, { status: 400 });
    }

    // Prisma's onDelete: Cascade will automatically delete related AssessmentResults
    // if we set it up in schema.prisma. Let's assume we delete the user directly.
    // If cascade isn't set, we might need to delete results first.
    // Let's delete results first to be safe.
    await prisma.assessmentResult.deleteMany({
      where: { username }
    });

    await prisma.user.delete({
      where: { username }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Profile delete error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

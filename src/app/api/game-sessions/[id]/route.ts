import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Vercel Function Configuration
export const maxDuration = 30; // 30 seconds max
export const dynamic = 'force-dynamic'; // Always fresh data

// GET - Retrieve a specific game session
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const gameSession = await prisma.gameSession.findUnique({
      where: { id },
      include: {
        stages: true,
        customTimer: true,
      },
    });

    if (!gameSession) {
      return NextResponse.json(
        { error: 'Game session not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(gameSession);
  } catch (error) {
    console.error('Error fetching game session:', error);
    return NextResponse.json(
      { error: 'Failed to fetch game session' },
      { status: 500 }
    );
  }
}

// PUT - Update a game session
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      score,
      hintsUsed,
      isCompleted,
      endTime,
      timeRemaining,
    } = body;

    const gameSession = await prisma.gameSession.update({
      where: { id },
      data: {
        ...(score !== undefined && { score }),
        ...(hintsUsed !== undefined && { hintsUsed }),
        ...(isCompleted !== undefined && { isCompleted }),
        ...(endTime !== undefined && { endTime: new Date(endTime) }),
        ...(timeRemaining !== undefined && { timeRemaining }),
      },
      include: {
        stages: true,
        customTimer: true,
      },
    });

    return NextResponse.json(gameSession);
  } catch (error) {
    console.error('Error updating game session:', error);
    return NextResponse.json(
      { error: 'Failed to update game session' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a game session
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.gameSession.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Game session deleted successfully' });
  } catch (error) {
    console.error('Error deleting game session:', error);
    return NextResponse.json(
      { error: 'Failed to delete game session' },
      { status: 500 }
    );
  }
}

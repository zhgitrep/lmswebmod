import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Vercel Function Configuration
export const maxDuration = 30; // 30 seconds max
export const dynamic = 'force-dynamic'; // Always fresh data

// GET - Retrieve all game sessions
export async function GET() {
  try {
    const gameSessions = await prisma.gameSession.findMany({
      include: {
        stages: true,
        customTimer: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(gameSessions);
  } catch (error) {
    console.error('Error fetching game sessions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch game sessions' },
      { status: 500 }
    );
  }
}

// POST - Create a new game session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      playerName,
      course,
      module,
      totalTime,
      timeRemaining,
      customTimerDuration,
    } = body;

    // Validate required fields
    if (!playerName || !course || !module) {
      return NextResponse.json(
        { error: 'Missing required fields: playerName, course, module' },
        { status: 400 }
      );
    }

    // Create game session
    const gameSession = await prisma.gameSession.create({
      data: {
        playerName,
        course,
        module,
        totalTime: totalTime || 45 * 60, // Default 45 minutes in seconds
        timeRemaining: timeRemaining || 45 * 60,
        ...(customTimerDuration && {
          customTimer: {
            create: {
              duration: customTimerDuration,
            },
          },
        }),
      },
      include: {
        customTimer: true,
      },
    });

    return NextResponse.json(gameSession, { status: 201 });
  } catch (error) {
    console.error('Error creating game session:', error);
    return NextResponse.json(
      { error: 'Failed to create game session' },
      { status: 500 }
    );
  }
}

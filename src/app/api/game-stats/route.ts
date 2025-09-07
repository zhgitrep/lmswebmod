import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Vercel Function Configuration
export const maxDuration = 30; // 30 seconds max
export const dynamic = 'force-dynamic'; // Always fresh data

// GET - Retrieve game statistics
export async function GET() {
  try {
    // Get or create game stats
    let gameStats = await prisma.gameStats.findFirst();

    if (!gameStats) {
      gameStats = await prisma.gameStats.create({
        data: {
          totalGames: 0,
          completedGames: 0,
          averageScore: 0,
          averageTime: 0,
          totalHintsUsed: 0,
        },
      });
    }

    // Calculate real-time stats from game sessions
    const allSessions = await prisma.gameSession.findMany();
    const completedSessions = allSessions.filter(session => session.isCompleted);

    const totalGames = allSessions.length;
    const completedGames = completedSessions.length;
    const averageScore = completedGames > 0 
      ? completedSessions.reduce((sum, session) => sum + session.score, 0) / completedGames 
      : 0;
    const averageTime = completedGames > 0 
      ? completedSessions.reduce((sum, session) => {
          const timeSpent = session.totalTime - session.timeRemaining;
          return sum + (timeSpent / 60); // Convert to minutes
        }, 0) / completedGames 
      : 0;
    const totalHintsUsed = allSessions.reduce((sum, session) => sum + session.hintsUsed, 0);

    // Update stats
    const updatedStats = await prisma.gameStats.update({
      where: { id: gameStats.id },
      data: {
        totalGames,
        completedGames,
        averageScore,
        averageTime,
        totalHintsUsed,
      },
    });

    return NextResponse.json(updatedStats);
  } catch (error) {
    console.error('Error fetching game stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch game stats' },
      { status: 500 }
    );
  }
}

// POST - Update game statistics
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { totalGames, completedGames, averageScore, averageTime, totalHintsUsed } = body;

    let gameStats = await prisma.gameStats.findFirst();

    if (!gameStats) {
      gameStats = await prisma.gameStats.create({
        data: {
          totalGames: totalGames || 0,
          completedGames: completedGames || 0,
          averageScore: averageScore || 0,
          averageTime: averageTime || 0,
          totalHintsUsed: totalHintsUsed || 0,
        },
      });
    } else {
      gameStats = await prisma.gameStats.update({
        where: { id: gameStats.id },
        data: {
          ...(totalGames !== undefined && { totalGames }),
          ...(completedGames !== undefined && { completedGames }),
          ...(averageScore !== undefined && { averageScore }),
          ...(averageTime !== undefined && { averageTime }),
          ...(totalHintsUsed !== undefined && { totalHintsUsed }),
        },
      });
    }

    return NextResponse.json(gameStats);
  } catch (error) {
    console.error('Error updating game stats:', error);
    return NextResponse.json(
      { error: 'Failed to update game stats' },
      { status: 500 }
    );
  }
}

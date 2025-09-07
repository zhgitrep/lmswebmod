import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Vercel Function Configuration
export const maxDuration = 30; // 30 seconds max
export const dynamic = 'force-dynamic'; // Always fresh data

// POST - Create a stage completion record
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      gameSessionId,
      stageId,
      stageTitle,
      stageType,
      completed,
      timeSpent,
      hintsUsed,
    } = body;

    // Validate required fields
    if (!gameSessionId || !stageId || !stageTitle || !stageType) {
      return NextResponse.json(
        { error: 'Missing required fields: gameSessionId, stageId, stageTitle, stageType' },
        { status: 400 }
      );
    }

    // Check if stage completion already exists
    const existingStage = await prisma.stageCompletion.findFirst({
      where: {
        gameSessionId,
        stageId,
      },
    });

    let stageCompletion;

    if (existingStage) {
      // Update existing stage completion
      stageCompletion = await prisma.stageCompletion.update({
        where: { id: existingStage.id },
        data: {
          completed,
          timeSpent: timeSpent || 0,
          hintsUsed: hintsUsed || 0,
          completedAt: completed ? new Date() : null,
        },
      });
    } else {
      // Create new stage completion
      stageCompletion = await prisma.stageCompletion.create({
        data: {
          gameSessionId,
          stageId,
          stageTitle,
          stageType,
          completed,
          timeSpent: timeSpent || 0,
          hintsUsed: hintsUsed || 0,
          completedAt: completed ? new Date() : null,
        },
      });
    }

    return NextResponse.json(stageCompletion, { status: 201 });
  } catch (error) {
    console.error('Error creating stage completion:', error);
    return NextResponse.json(
      { error: 'Failed to create stage completion' },
      { status: 500 }
    );
  }
}

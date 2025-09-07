import { prisma } from './prisma';

export interface GameSessionData {
  playerName: string;
  course: string;
  module: string;
  totalTime: number;
  timeRemaining: number;
  customTimerDuration?: number;
}

export interface StageCompletionData {
  gameSessionId: string;
  stageId: number;
  stageTitle: string;
  stageType: string;
  completed: boolean;
  timeSpent: number;
  hintsUsed: number;
}

export interface GameUpdateData {
  score?: number;
  hintsUsed?: number;
  isCompleted?: boolean;
  endTime?: Date;
  timeRemaining?: number;
}

// Create a new game session
export async function createGameSession(data: GameSessionData) {
  try {
    const gameSession = await prisma.gameSession.create({
      data: {
        playerName: data.playerName,
        course: data.course,
        module: data.module,
        totalTime: data.totalTime,
        timeRemaining: data.timeRemaining,
        ...(data.customTimerDuration && {
          customTimer: {
            create: {
              duration: data.customTimerDuration,
            },
          },
        }),
      },
      include: {
        customTimer: true,
      },
    });

    return { success: true, data: gameSession };
  } catch (error) {
    console.error('Error creating game session:', error);
    return { success: false, error: 'Failed to create game session' };
  }
}

// Update a game session
export async function updateGameSession(sessionId: string, data: GameUpdateData) {
  try {
    const gameSession = await prisma.gameSession.update({
      where: { id: sessionId },
      data: {
        ...(data.score !== undefined && { score: data.score }),
        ...(data.hintsUsed !== undefined && { hintsUsed: data.hintsUsed }),
        ...(data.isCompleted !== undefined && { isCompleted: data.isCompleted }),
        ...(data.endTime !== undefined && { endTime: data.endTime }),
        ...(data.timeRemaining !== undefined && { timeRemaining: data.timeRemaining }),
      },
      include: {
        stages: true,
        customTimer: true,
      },
    });

    return { success: true, data: gameSession };
  } catch (error) {
    console.error('Error updating game session:', error);
    return { success: false, error: 'Failed to update game session' };
  }
}

// Save stage completion
export async function saveStageCompletion(data: StageCompletionData) {
  try {
    // Check if stage completion already exists
    const existingStage = await prisma.stageCompletion.findFirst({
      where: {
        gameSessionId: data.gameSessionId,
        stageId: data.stageId,
      },
    });

    let stageCompletion;

    if (existingStage) {
      // Update existing stage completion
      stageCompletion = await prisma.stageCompletion.update({
        where: { id: existingStage.id },
        data: {
          completed: data.completed,
          timeSpent: data.timeSpent,
          hintsUsed: data.hintsUsed,
          completedAt: data.completed ? new Date() : null,
        },
      });
    } else {
      // Create new stage completion
      stageCompletion = await prisma.stageCompletion.create({
        data: {
          gameSessionId: data.gameSessionId,
          stageId: data.stageId,
          stageTitle: data.stageTitle,
          stageType: data.stageType,
          completed: data.completed,
          timeSpent: data.timeSpent,
          hintsUsed: data.hintsUsed,
          completedAt: data.completed ? new Date() : null,
        },
      });
    }

    return { success: true, data: stageCompletion };
  } catch (error) {
    console.error('Error saving stage completion:', error);
    return { success: false, error: 'Failed to save stage completion' };
  }
}

// Get game session with all related data
export async function getGameSession(sessionId: string) {
  try {
    const gameSession = await prisma.gameSession.findUnique({
      where: { id: sessionId },
      include: {
        stages: true,
        customTimer: true,
      },
    });

    return { success: true, data: gameSession };
  } catch (error) {
    console.error('Error fetching game session:', error);
    return { success: false, error: 'Failed to fetch game session' };
  }
}

// Get all game sessions
export async function getAllGameSessions() {
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

    return { success: true, data: gameSessions };
  } catch (error) {
    console.error('Error fetching game sessions:', error);
    return { success: false, error: 'Failed to fetch game sessions' };
  }
}

// Delete a game session
export async function deleteGameSession(sessionId: string) {
  try {
    await prisma.gameSession.delete({
      where: { id: sessionId },
    });

    return { success: true };
  } catch (error) {
    console.error('Error deleting game session:', error);
    return { success: false, error: 'Failed to delete game session' };
  }
}

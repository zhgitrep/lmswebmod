'use client';

import { useState, useEffect, useCallback } from 'react';
import { setCookie } from 'cookies-next';
import EscapeRoomGame from './components/EscapeRoomGame';
import EscapeRoomStart from './components/EscapeRoomStart';
import EscapeRoomComplete from './components/EscapeRoomComplete';

export type GameStage = {
  id: number;
  title: string;
  description: string;
  type: 'code-format' | 'debug-click' | 'number-generator' | 'data-port' | 'css-puzzle' | 'logic-gate';
  completed: boolean;
  timeSpent: number;
  hints: string[];
  currentHint: number;
};

export type GameState = {
  isStarted: boolean;
  isCompleted: boolean;
  currentStage: number;
  timeRemaining: number;
  totalTime: number;
  stages: GameStage[];
  score: number;
  hintsUsed: number;
  sessionId?: string; // Database session ID
};

export default function EscapeRoomPage() {
  const [gameState, setGameState] = useState<GameState>({
    isStarted: false,
    isCompleted: false,
    currentStage: 0,
    timeRemaining: 45 * 60, // 45 minutes in seconds
    totalTime: 45 * 60,
    stages: [
      {
        id: 1,
        title: "Code Formatting Challenge",
        description: "Format the given JavaScript code correctly to unlock the door.",
        type: 'code-format',
        completed: false,
        timeSpent: 0,
        hints: [
          "Check for proper indentation and spacing",
          "Look for missing semicolons and brackets",
          "Ensure consistent naming conventions"
        ],
        currentHint: 0
      },
      {
        id: 2,
        title: "Debug Click Challenge",
        description: "Click on the image that contains the debugging tool to proceed.",
        type: 'debug-click',
        completed: false,
        timeSpent: 0,
        hints: [
          "Look for visual clues in the images",
          "Think about what debugging tools look like",
          "Check for console or terminal symbols"
        ],
        currentHint: 0
      },
      {
        id: 3,
        title: "Number Generator",
        description: "Write code to generate all numbers from 0 to 1000.",
        type: 'number-generator',
        completed: false,
        timeSpent: 0,
        hints: [
          "Use a loop to iterate through numbers",
          "Consider using a for loop or while loop",
          "Make sure to include both 0 and 1000"
        ],
        currentHint: 0
      },
      {
        id: 4,
        title: "Data Port Challenge",
        description: "Convert data from JSON format to CSV format.",
        type: 'data-port',
        completed: false,
        timeSpent: 0,
        hints: [
          "Parse the JSON data first",
          "Extract the required fields",
          "Format as comma-separated values"
        ],
        currentHint: 0
      },
      {
        id: 5,
        title: "CSS Positioning Puzzle",
        description: "Use CSS to position elements correctly and find the hidden path.",
        type: 'css-puzzle',
        completed: false,
        timeSpent: 0,
        hints: [
          "Use absolute positioning to place elements",
          "Consider z-index for layering",
          "Use transform properties for precise positioning"
        ],
        currentHint: 0
      },
      {
        id: 6,
        title: "Logic Gate Challenge",
        description: "Solve the boolean logic puzzle using AND, OR, and NOT gates.",
        type: 'logic-gate',
        completed: false,
        timeSpent: 0,
        hints: [
          "Start with the input values",
          "Follow the signal through each gate",
          "Use truth tables to verify your answer"
        ],
        currentHint: 0
      }
    ],
    score: 0,
    hintsUsed: 0
  });

  useEffect(() => {
    setCookie('activeMenu', '/escape-room', { maxAge: 60 * 60 * 24 * 7 });
  }, []);

  // Check for test mode - you can add ?test=challenge_number to URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const testChallenge = urlParams.get('test');
    
    if (testChallenge) {
      const challengeIndex = parseInt(testChallenge) - 1; // Convert to 0-based index
      if (challengeIndex >= 0 && challengeIndex < gameState.stages.length) {
        // Start game and jump to specific challenge
        setGameState(prev => ({
          ...prev,
          isStarted: true,
          currentStage: challengeIndex,
          timeRemaining: 60 * 60, // Give 60 minutes for testing
          totalTime: 60 * 60
        }));
      }
    }
  }, [gameState.stages.length]);

  const startGame = useCallback(async (customTime?: number) => {
    const timeInSeconds = (customTime || 45) * 60;
    
    try {
      // Create game session in database
      const response = await fetch('/api/game-sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerName: 'Zohaib Khan',
          course: 'Bachelor of IT',
          module: 'Interactive Web Dev',
          totalTime: timeInSeconds,
          timeRemaining: timeInSeconds,
          customTimerDuration: customTime,
        }),
      });

      if (response.ok) {
        const sessionData = await response.json();
        setGameState(prev => ({
          ...prev,
          isStarted: true,
          timeRemaining: timeInSeconds,
          totalTime: timeInSeconds,
          sessionId: sessionData.id
        }));
      } else {
        console.error('Failed to create game session');
        // Still start the game even if database save fails
        setGameState(prev => ({
          ...prev,
          isStarted: true,
          timeRemaining: timeInSeconds,
          totalTime: timeInSeconds
        }));
      }
    } catch (error) {
      console.error('Error creating game session:', error);
      // Still start the game even if database save fails
      setGameState(prev => ({
        ...prev,
        isStarted: true,
        timeRemaining: timeInSeconds,
        totalTime: timeInSeconds
      }));
    }
  }, []);

  const completeStage = useCallback(async (stageId: number, timeSpent: number) => {
    setGameState(prev => {
      const updatedStages = prev.stages.map(stage => 
        stage.id === stageId 
          ? { ...stage, completed: true, timeSpent }
          : stage
      );
      
      const nextStage = prev.currentStage + 1;
      const isCompleted = nextStage >= prev.stages.length;
      
      return {
        ...prev,
        stages: updatedStages,
        currentStage: isCompleted ? prev.currentStage : nextStage,
        isCompleted,
        score: prev.score + Math.max(0, 100 - timeSpent / 60) // Score based on time
      };
    });

    // Save stage completion to database
    if (gameState.sessionId) {
      try {
        const currentStage = gameState.stages.find(stage => stage.id === stageId);
        if (currentStage) {
          await fetch('/api/stages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              gameSessionId: gameState.sessionId,
              stageId: stageId,
              stageTitle: currentStage.title,
              stageType: currentStage.type,
              completed: true,
              timeSpent: timeSpent,
              hintsUsed: currentStage.currentHint,
            }),
          });
        }
      } catch (error) {
        console.error('Error saving stage completion:', error);
      }
    }
  }, [gameState.sessionId, gameState.stages]);

  const useHint = useCallback((stageId: number) => {
    setGameState(prev => {
      const updatedStages = prev.stages.map(stage => 
        stage.id === stageId 
          ? { ...stage, currentHint: Math.min(stage.currentHint + 1, stage.hints.length - 1) }
          : stage
      );
      
      return {
        ...prev,
        stages: updatedStages,
        hintsUsed: prev.hintsUsed + 1
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      isStarted: false,
      isCompleted: false,
      currentStage: 0,
      timeRemaining: 45 * 60,
      totalTime: 45 * 60,
      stages: gameState.stages.map(stage => ({
        ...stage,
        completed: false,
        timeSpent: 0,
        currentHint: 0
      })),
      score: 0,
      hintsUsed: 0
    });
  }, [gameState.stages]);

  if (!gameState.isStarted) {
    return <EscapeRoomStart onStart={startGame} />;
  }

  if (gameState.isCompleted) {
    return (
      <EscapeRoomComplete 
        gameState={gameState}
        onReset={resetGame}
      />
    );
  }

  return (
    <EscapeRoomGame
      gameState={gameState}
      setGameState={setGameState}
      onCompleteStage={completeStage}
      onUseHint={useHint}
    />
  );
} 
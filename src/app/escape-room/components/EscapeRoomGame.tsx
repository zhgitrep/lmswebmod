'use client';

import { useState, useEffect, useCallback } from 'react';
import { GameState, GameStage } from '../page';
import CodeFormatChallenge from './challenges/CodeFormatChallenge';
import DebugClickChallenge from './challenges/DebugClickChallenge';
import NumberGeneratorChallenge from './challenges/NumberGeneratorChallenge';
import DataPortChallenge from './challenges/DataPortChallenge';
import CSSPuzzleChallenge from './challenges/CSSPuzzleChallenge';
import LogicGateChallenge from './challenges/LogicGateChallenge';
import SaveButton from './SaveButton';

interface EscapeRoomGameProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  onCompleteStage: (stageId: number, timeSpent: number) => void;
  onUseHint: (stageId: number) => void;
}

export default function EscapeRoomGame({
  gameState,
  setGameState,
  onCompleteStage,
  onUseHint
}: EscapeRoomGameProps) {
  const [stageStartTime, setStageStartTime] = useState(Date.now());
  const [showHint, setShowHint] = useState(false);

  const currentStage = gameState.stages[gameState.currentStage];

  // Timer effect
  useEffect(() => {
    if (gameState.timeRemaining <= 0) {
      // Game over - time's up
      setGameState(prev => ({ ...prev, isCompleted: true }));
      return;
    }

    const timer = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        timeRemaining: Math.max(0, prev.timeRemaining - 1)
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.timeRemaining, setGameState]);

  // Reset stage timer when stage changes
  useEffect(() => {
    setStageStartTime(Date.now());
    setShowHint(false);
  }, [gameState.currentStage]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStageComplete = useCallback(() => {
    const timeSpent = Math.floor((Date.now() - stageStartTime) / 1000);
    onCompleteStage(currentStage.id, timeSpent);
  }, [currentStage.id, onCompleteStage, stageStartTime]);

  const handleUseHint = useCallback(() => {
    onUseHint(currentStage.id);
    setShowHint(true);
  }, [currentStage.id, onUseHint]);

  const getProgressPercentage = () => {
    return (gameState.currentStage / gameState.stages.length) * 100;
  };

  const getCompletedStages = () => {
    return gameState.stages.filter(stage => stage.completed).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header with Timer and Progress */}
        <div className="bg-black/20 backdrop-blur-md border-b border-white/10 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Game Title */}
              <div className="text-white">
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  🚪 Digital Escape Room
                </h1>
                <p className="text-gray-300 text-lg">Stage {gameState.currentStage + 1} of {gameState.stages.length}</p>
              </div>

              {/* Timer and Progress */}
              <div className="flex items-center space-x-8">
                {/* Timer */}
                <div className="text-center">
                  <div className={`text-4xl md:text-5xl font-mono font-bold ${
                    gameState.timeRemaining < 300 ? 'text-red-400 animate-pulse' : 'text-white'
                  } bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent`}>
                    ⏱️ {formatTime(gameState.timeRemaining)}
                  </div>
                  <div className="text-sm text-gray-300">Time Remaining</div>
                </div>

                {/* Progress */}
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-green-400 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                    {getCompletedStages()}/{gameState.stages.length}
                  </div>
                  <div className="text-sm text-gray-300">Completed</div>
                </div>

                {/* Score */}
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-yellow-400 bg-gradient-to-r from-yellow-400 to-orange-300 bg-clip-text text-transparent">
                    🏆 {gameState.score}
                  </div>
                  <div className="text-sm text-gray-300">Score</div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="w-full bg-gray-700/50 backdrop-blur-sm rounded-full h-3 shadow-inner">
                <div 
                  className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 h-3 rounded-full transition-all duration-700 shadow-lg"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Game Area */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Stage Info */}
            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl sticky top-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="mr-3">🎯</span>
                  Current Challenge
                </h2>
                
                <div className="space-y-6">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <h3 className="font-semibold text-blue-300 mb-3 text-lg">
                      {currentStage.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {currentStage.description}
                    </p>
                  </div>

                  {/* Hints Section */}
                  <div className="border-t border-white/20 pt-6">
                    <h4 className="font-semibold text-yellow-300 mb-4 flex items-center">
                      <span className="mr-2">💡</span>
                      Hints ({currentStage.hints.length})
                    </h4>
                    <button
                      onClick={handleUseHint}
                      disabled={currentStage.currentHint >= currentStage.hints.length - 1}
                      className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 
                               disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed 
                               text-white py-3 px-4 rounded-xl text-sm transition-all duration-300 
                               transform hover:scale-105 disabled:transform-none shadow-lg"
                    >
                      Get Hint ({currentStage.currentHint + 1}/{currentStage.hints.length})
                    </button>
                    
                    {showHint && currentStage.hints[currentStage.currentHint] && (
                      <div className="mt-4 p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-xl backdrop-blur-sm">
                        <p className="text-yellow-200 text-sm leading-relaxed">
                          {currentStage.hints[currentStage.currentHint]}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Save Button */}
                  <div className="border-t border-white/20 pt-6">
                    <h4 className="font-semibold text-blue-300 mb-4 flex items-center">
                      <span className="mr-2">💾</span>
                      Save Progress
                    </h4>
                    <SaveButton 
                      gameState={gameState}
                      className="w-full"
                    />
                  </div>

                  {/* Stage Progress */}
                  <div className="border-t border-white/20 pt-6">
                    <h4 className="font-semibold text-green-300 mb-4 flex items-center">
                      <span className="mr-2">📊</span>
                      All Stages
                    </h4>
                    <div className="space-y-3">
                      {gameState.stages.map((stage, index) => (
                        <div 
                          key={stage.id}
                          className={`flex items-center space-x-3 text-sm p-2 rounded-lg transition-all duration-300 ${
                            index === gameState.currentStage 
                              ? 'bg-blue-500/20 border border-blue-500/30 text-blue-300 font-semibold' 
                              : stage.completed 
                                ? 'bg-green-500/20 border border-green-500/30 text-green-300' 
                                : 'bg-gray-500/20 border border-gray-500/30 text-gray-400'
                          }`}
                        >
                          <span className="text-lg">
                            {stage.completed ? '✅' : index === gameState.currentStage ? '🔄' : '⏳'}
                          </span>
                          <span className="truncate">{stage.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Challenge Area */}
            <div className="lg:col-span-3">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl min-h-[700px]">
                {/* Challenge Renderer */}
                <div className="h-full">
                  {currentStage.type === 'code-format' && (
                    <CodeFormatChallenge
                      onComplete={handleStageComplete}
                      stage={currentStage}
                    />
                  )}
                  {currentStage.type === 'debug-click' && (
                    <DebugClickChallenge
                      onComplete={handleStageComplete}
                      stage={currentStage}
                    />
                  )}
                  {currentStage.type === 'number-generator' && (
                    <NumberGeneratorChallenge
                      onComplete={handleStageComplete}
                      stage={currentStage}
                    />
                  )}
                  {currentStage.type === 'data-port' && (
                    <DataPortChallenge
                      onComplete={handleStageComplete}
                      stage={currentStage}
                    />
                  )}
                  {currentStage.type === 'css-puzzle' && (
                    <CSSPuzzleChallenge
                      onComplete={handleStageComplete}
                      stage={currentStage}
                    />
                  )}
                  {currentStage.type === 'logic-gate' && (
                    <LogicGateChallenge
                      onComplete={handleStageComplete}
                      stage={currentStage}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

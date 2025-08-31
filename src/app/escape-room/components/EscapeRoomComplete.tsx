'use client';

import { GameState } from '../page';

interface EscapeRoomCompleteProps {
  gameState: GameState;
  onReset: () => void;
}

export default function EscapeRoomComplete({ gameState, onReset }: EscapeRoomCompleteProps) {
  const totalTimeSpent = gameState.totalTime - gameState.timeRemaining;
  const timeSpentMinutes = Math.floor(totalTimeSpent / 60);
  const timeSpentSeconds = totalTimeSpent % 60;
  
  const completedStages = gameState.stages.filter(stage => stage.completed);
  const averageTimePerStage = completedStages.length > 0 
    ? Math.floor(completedStages.reduce((sum, stage) => sum + stage.timeSpent, 0) / completedStages.length)
    : 0;

  const getPerformanceRating = () => {
    const completionRate = (completedStages.length / gameState.stages.length) * 100;
    const timeEfficiency = gameState.timeRemaining > 0 ? 'Good' : 'Time Up';
    
    if (completionRate === 100 && gameState.timeRemaining > 600) return '🏆 Master Coder';
    if (completionRate === 100 && gameState.timeRemaining > 300) return '🥇 Excellent';
    if (completionRate === 100) return '🥈 Good Job';
    if (completionRate >= 80) return '🥉 Well Done';
    if (completionRate >= 60) return '📚 Keep Learning';
    return '🔄 Try Again';
  };

  const getScoreColor = () => {
    if (gameState.score >= 500) return 'text-green-400';
    if (gameState.score >= 300) return 'text-yellow-400';
    if (gameState.score >= 100) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Escape Room Complete!
          </h1>
          <p className="text-xl text-gray-600">
            {gameState.timeRemaining > 0 ? 'Congratulations! You escaped!' : 'Time\'s up! Better luck next time!'}
          </p>
        </div>

        {/* Performance Rating */}
        <div className="text-center mb-8">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {getPerformanceRating()}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Completion Stats */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              📊 Completion Stats
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Stages Completed:</span>
                <span className="text-2xl font-bold text-blue-600">
                  {completedStages.length}/{gameState.stages.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Completion Rate:</span>
                <span className="text-xl font-bold text-green-600">
                  {Math.round((completedStages.length / gameState.stages.length) * 100)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Time Remaining:</span>
                <span className={`text-xl font-bold ${gameState.timeRemaining > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.floor(gameState.timeRemaining / 60)}:{(gameState.timeRemaining % 60).toString().padStart(2, '0')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Hints Used:</span>
                <span className="text-xl font-bold text-orange-600">
                  {gameState.hintsUsed}
                </span>
              </div>
            </div>
          </div>

          {/* Score and Time */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              🏆 Final Score
            </h2>
            <div className="space-y-4">
              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor()} mb-2`}>
                  {gameState.score} Points
                </div>
                <p className="text-gray-600">Based on speed and accuracy</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Total Time:</span>
                <span className="text-xl font-bold text-gray-800">
                  {timeSpentMinutes}:{timeSpentSeconds.toString().padStart(2, '0')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Avg/Stage:</span>
                <span className="text-xl font-bold text-gray-800">
                  {Math.floor(averageTimePerStage / 60)}:{(averageTimePerStage % 60).toString().padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stage Breakdown */}
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-200 mb-8">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">
            📋 Stage Breakdown
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {gameState.stages.map((stage) => (
              <div 
                key={stage.id}
                className={`p-4 rounded-lg border ${
                  stage.completed 
                    ? 'bg-green-100 border-green-300' 
                    : 'bg-red-100 border-red-300'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800">
                    {stage.title}
                  </h3>
                  <span className="text-2xl">
                    {stage.completed ? '✅' : '❌'}
                  </span>
                </div>
                {stage.completed && (
                  <div className="text-sm text-gray-600">
                    Time: {Math.floor(stage.timeSpent / 60)}:{(stage.timeSpent % 60).toString().padStart(2, '0')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <button
            onClick={onReset}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl text-xl shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            🔄 Play Again
          </button>
          
          <div className="text-gray-500 text-sm">
            <p>Want to improve your score? Try again with less hints!</p>
          </div>
        </div>

        {/* Student Info Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center text-gray-600">
            <p><strong>Student:</strong> Zohaib Khan</p>
            <p><strong>Course:</strong> Bachelor of Information Technology</p>
            <p><strong>Module:</strong> Interactive Web Development</p>
          </div>
        </div>
      </div>
    </div>
  );
}

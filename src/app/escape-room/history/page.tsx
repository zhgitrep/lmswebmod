'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface GameSession {
  id: string;
  playerName: string;
  course: string;
  module: string;
  startTime: string;
  endTime?: string;
  totalTime: number;
  timeRemaining: number;
  score: number;
  hintsUsed: number;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  stages: StageCompletion[];
  customTimer?: {
    duration: number;
  };
}

interface StageCompletion {
  id: string;
  stageId: number;
  stageTitle: string;
  stageType: string;
  completed: boolean;
  timeSpent: number;
  hintsUsed: number;
  completedAt?: string;
}

export default function GameHistoryPage() {
  const [gameSessions, setGameSessions] = useState<GameSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGameSessions();
  }, []);

  const fetchGameSessions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/game-sessions');
      
      if (response.ok) {
        const data = await response.json();
        setGameSessions(data);
      } else {
        setError('Failed to fetch game sessions');
      }
    } catch (error) {
      console.error('Error fetching game sessions:', error);
      setError('Failed to fetch game sessions');
    } finally {
      setLoading(false);
    }
  };

  const deleteGameSession = async (sessionId: string) => {
    if (!confirm('Are you sure you want to delete this game session?')) {
      return;
    }

    try {
      const response = await fetch(`/api/game-sessions/${sessionId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setGameSessions(prev => prev.filter(session => session.id !== sessionId));
      } else {
        alert('Failed to delete game session');
      }
    } catch (error) {
      console.error('Error deleting game session:', error);
      alert('Failed to delete game session');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getCompletionRate = (stages: StageCompletion[]) => {
    const completed = stages.filter(stage => stage.completed).length;
    return `${completed}/${stages.length}`;
  };

  const getTotalTimeSpent = (session: GameSession) => {
    if (session.isCompleted && session.endTime) {
      const start = new Date(session.startTime);
      const end = new Date(session.endTime);
      const timeSpent = Math.floor((end.getTime() - start.getTime()) / 1000);
      return formatTime(timeSpent);
    }
    return 'In Progress';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading game history...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6">
            📊 Game History
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            View all your escape room sessions
          </p>
          <Link
            href="/escape-room"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            🚀 New Game
          </Link>
        </div>

        {/* Game Sessions */}
        {gameSessions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎮</div>
            <h2 className="text-2xl font-bold text-white mb-4">No Game Sessions Found</h2>
            <p className="text-gray-300 mb-8">Start your first escape room challenge to see your history here!</p>
            <Link
              href="/escape-room"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-xl transition-all duration-300"
            >
              Start Your First Game
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {gameSessions.map((session) => (
              <div
                key={session.id}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
                  {/* Session Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h3 className="text-2xl font-bold text-white">
                        {session.playerName}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        session.isCompleted 
                          ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                          : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                      }`}>
                        {session.isCompleted ? 'Completed' : 'In Progress'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Course:</span>
                        <div className="text-white font-medium">{session.course}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Module:</span>
                        <div className="text-white font-medium">{session.module}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Score:</span>
                        <div className="text-yellow-400 font-bold">🏆 {session.score}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Hints Used:</span>
                        <div className="text-blue-400 font-medium">💡 {session.hintsUsed}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-4">
                      <div>
                        <span className="text-gray-400">Started:</span>
                        <div className="text-white">{formatDate(session.startTime)}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Time Spent:</span>
                        <div className="text-green-400">{getTotalTimeSpent(session)}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Stages Completed:</span>
                        <div className="text-purple-400">{getCompletionRate(session.stages)}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Timer:</span>
                        <div className="text-cyan-400">
                          {session.customTimer ? `${session.customTimer.duration}m` : '45m'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => deleteGameSession(session.id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>

                {/* Stage Details */}
                {session.stages.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <h4 className="text-lg font-semibold text-white mb-4">Stage Details:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {session.stages.map((stage) => (
                        <div
                          key={stage.id}
                          className={`p-3 rounded-lg border ${
                            stage.completed
                              ? 'bg-green-500/10 border-green-500/30'
                              : 'bg-gray-500/10 border-gray-500/30'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-white">
                              Stage {stage.stageId}: {stage.stageTitle}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded ${
                              stage.completed
                                ? 'bg-green-500/20 text-green-300'
                                : 'bg-gray-500/20 text-gray-300'
                            }`}>
                              {stage.completed ? '✓' : '○'}
                            </span>
                          </div>
                          <div className="text-xs text-gray-400 space-y-1">
                            <div>Time: {formatTime(stage.timeSpent)}</div>
                            <div>Hints: {stage.hintsUsed}</div>
                            {stage.completedAt && (
                              <div>Completed: {formatDate(stage.completedAt)}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { GameState } from '../page';

interface EscapeRoomStartProps {
  onStart: (customTime?: number) => void;
}

export default function EscapeRoomStart({ onStart }: EscapeRoomStartProps) {
  const [selectedTime, setSelectedTime] = useState<number>(45);
  const [customTime, setCustomTime] = useState<string>('');
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);

  const presetTimes = [
    { value: 15, label: '15 minutes', description: 'Quick challenge' },
    { value: 30, label: '30 minutes', description: 'Standard time' },
    { value: 45, label: '45 minutes', description: 'Recommended' },
    { value: 60, label: '60 minutes', description: 'Extended time' },
    { value: 90, label: '90 minutes', description: 'Relaxed pace' }
  ];

  const handleStart = () => {
    const timeToUse = showCustomInput && customTime ? parseInt(customTime) : selectedTime;
    onStart(timeToUse);
  };

  const handleCustomTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomTime(value);
    
    // Validate input - only allow numbers between 1 and 180
    const numValue = parseInt(value);
    if (numValue && numValue >= 1 && numValue <= 180) {
      setSelectedTime(numValue);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-6xl w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl mb-8">
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6">
                🚪 Digital Escape Room
              </h1>
              <p className="text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Code your way to freedom through 6 challenging puzzles
              </p>
            </div>
          </div>

          {/* Timer Configuration Section */}
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl mb-12">
            <h2 className="text-3xl font-bold text-yellow-300 mb-6 text-center flex items-center justify-center">
              <span className="mr-3">⏱️</span>
              Set Your Timer
            </h2>
            <p className="text-gray-300 text-center mb-8 text-lg">
              Choose how much time you want for your escape room challenge
            </p>

            {/* Preset Timer Options */}
            <div className="grid md:grid-cols-5 gap-4 mb-8">
              {presetTimes.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => {
                    setSelectedTime(preset.value);
                    setShowCustomInput(false);
                    setCustomTime('');
                  }}
                  className={`p-4 rounded-xl border transition-all duration-300 transform hover:scale-105 ${
                    selectedTime === preset.value && !showCustomInput
                      ? 'bg-gradient-to-r from-yellow-500/30 to-orange-500/30 border-yellow-400/50 shadow-lg'
                      : 'bg-white/5 border-white/20 hover:border-yellow-300/30'
                  }`}
                >
                  <div className="text-2xl font-bold text-white mb-2">{preset.value}m</div>
                  <div className="text-sm text-gray-300 font-medium">{preset.label}</div>
                  <div className="text-xs text-gray-400 mt-1">{preset.description}</div>
                </button>
              ))}
            </div>

            {/* Custom Timer Option */}
            <div className="text-center">
              <button
                onClick={() => setShowCustomInput(!showCustomInput)}
                className={`px-6 py-3 rounded-xl border transition-all duration-300 ${
                  showCustomInput
                    ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-purple-400/50'
                    : 'bg-white/5 border-white/20 hover:border-purple-300/30'
                }`}
              >
                <span className="text-white font-medium">🎛️ Custom Time</span>
              </button>
            </div>

            {/* Custom Time Input */}
            {showCustomInput && (
              <div className="mt-6 p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                  <div className="flex items-center space-x-2">
                    <label htmlFor="customTime" className="text-white font-medium">
                      Custom time (minutes):
                    </label>
                    <input
                      id="customTime"
                      type="number"
                      min="1"
                      max="180"
                      value={customTime}
                      onChange={handleCustomTimeChange}
                      placeholder="Enter 1-180"
                      className="w-24 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50"
                    />
                  </div>
                  <div className="text-sm text-gray-400">
                    (1-180 minutes allowed)
                  </div>
                </div>
                {customTime && parseInt(customTime) >= 1 && parseInt(customTime) <= 180 && (
                  <div className="mt-4 text-center">
                    <span className="text-green-300 font-medium">
                      ✓ Timer set to {customTime} minutes
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Current Selection Display */}
            <div className="mt-6 text-center">
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-300/30">
                <span className="text-white font-medium">Selected Time: </span>
                <span className="text-cyan-300 font-bold text-xl">
                  {showCustomInput && customTime ? customTime : selectedTime} minutes
                </span>
              </div>
            </div>
          </div>

          {/* Game Overview Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Student Information */}
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
              <h2 className="text-3xl font-bold text-blue-300 mb-6 flex items-center">
                <span className="mr-3">👨‍🎓</span>
                Student Information
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="font-semibold text-gray-300">Name:</span>
                  <span className="text-white font-medium">Zohaib Khan</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="font-semibold text-gray-300">Course:</span>
                  <span className="text-white font-medium">Bachelor of IT</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="font-semibold text-gray-300">Module:</span>
                  <span className="text-white font-medium">Interactive Web Dev</span>
                </div>
              </div>
            </div>

            {/* Game Stats */}
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
              <h2 className="text-3xl font-bold text-green-300 mb-6 flex items-center">
                <span className="mr-3">🎮</span>
                Game Overview
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="font-semibold text-gray-300">Duration:</span>
                  <span className="text-white font-medium">
                    {showCustomInput && customTime ? customTime : selectedTime} minutes
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="font-semibold text-gray-300">Puzzles:</span>
                  <span className="text-white font-medium">6 Challenges</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="font-semibold text-gray-300">Difficulty:</span>
                  <span className="text-white font-medium">Intermediate</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="font-semibold text-gray-300">Hints:</span>
                  <span className="text-white font-medium">Available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Challenge Types */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-8 text-center">
              🎯 Challenge Types
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-md p-6 rounded-2xl border border-red-300/30 hover:border-red-300/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <h3 className="font-bold text-red-300 mb-3 text-xl">🔧 Code Formatting</h3>
                <p className="text-gray-300 leading-relaxed">Fix JavaScript code formatting and syntax</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-md p-6 rounded-2xl border border-yellow-300/30 hover:border-yellow-300/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <h3 className="font-bold text-yellow-300 mb-3 text-xl">🐛 Debug Click</h3>
                <p className="text-gray-300 leading-relaxed">Identify debugging tools in images</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-md p-6 rounded-2xl border border-blue-300/30 hover:border-blue-300/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <h3 className="font-bold text-blue-300 mb-3 text-xl">🔢 Number Generator</h3>
                <p className="text-gray-300 leading-relaxed">Write loops to generate number sequences</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-violet-500/20 backdrop-blur-md p-6 rounded-2xl border border-purple-300/30 hover:border-purple-300/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <h3 className="font-bold text-purple-300 mb-3 text-xl">📊 Data Port</h3>
                <p className="text-gray-300 leading-relaxed">Convert between data formats</p>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 backdrop-blur-md p-6 rounded-2xl border border-green-300/30 hover:border-green-300/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <h3 className="font-bold text-green-300 mb-3 text-xl">🎨 CSS Puzzle</h3>
                <p className="text-gray-300 leading-relaxed">Position elements with CSS</p>
              </div>
              <div className="bg-gradient-to-br from-indigo-500/20 to-blue-500/20 backdrop-blur-md p-6 rounded-2xl border border-indigo-300/30 hover:border-indigo-300/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <h3 className="font-bold text-indigo-300 mb-3 text-xl">⚡ Logic Gates</h3>
                <p className="text-gray-300 leading-relaxed">Solve boolean logic puzzles</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl mb-12">
            <h2 className="text-3xl font-bold text-emerald-300 mb-6 text-center">
              🎮 Game Features
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <span className="text-3xl">⏱️</span>
                <div>
                  <h3 className="font-semibold text-white text-lg">Timer</h3>
                  <p className="text-gray-300">45-minute countdown with warnings</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <span className="text-3xl">💡</span>
                <div>
                  <h3 className="font-semibold text-white text-lg">Progressive Hints</h3>
                  <p className="text-gray-300">Get help when you&apos;re stuck</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <span className="text-3xl">🏆</span>
                <div>
                  <h3 className="font-semibold text-white text-lg">Score System</h3>
                  <p className="text-gray-300">Earn points based on speed</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <span className="text-3xl">📊</span>
                <div>
                  <h3 className="font-semibold text-white text-lg">Progress Tracking</h3>
                  <p className="text-gray-300">Monitor your completion status</p>
                </div>
              </div>
            </div>
          </div>

          {/* Start Button */}
          <div className="text-center">
            <button
              onClick={handleStart}
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 
                         text-white font-bold py-6 px-12 rounded-2xl text-2xl shadow-2xl transform hover:scale-105 hover:-translate-y-2 
                         transition-all duration-300 border border-purple-400/30 hover:border-purple-300/50"
            >
              🚀 Start Escape Room Challenge
            </button>
            <p className="text-gray-400 mt-6 text-lg">
              You have {showCustomInput && customTime ? customTime : selectedTime} minutes to escape. Good luck!
            </p>
            
            {/* Game History Link */}
            <div className="mt-8">
              <a
                href="/escape-room/history"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 
                         text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                📊 View Game History
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

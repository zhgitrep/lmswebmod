'use client';

import { useState } from 'react';
import { GameStage } from '../../page';

interface CSSPuzzleChallengeProps {
  onComplete: () => void;
  stage: GameStage;
}

export default function CSSPuzzleChallenge({ onComplete, stage }: CSSPuzzleChallengeProps) {
  const [userCSS, setUserCSS] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const correctCSS = `.box1 { position: absolute; top: 50px; left: 50px; }
.box2 { position: absolute; top: 150px; left: 150px; }
.box3 { position: absolute; top: 250px; left: 250px; }
.box4 { position: absolute; top: 350px; left: 350px; }
.box5 { position: absolute; top: 450px; left: 450px; }`;

  const checkCSS = () => {
    // Normalize CSS for comparison
    const normalizeCSS = (css: string) => {
      return css
        .replace(/\s+/g, ' ')
        .replace(/\s*{\s*/g, ' { ')
        .replace(/\s*}\s*/g, ' } ')
        .replace(/\s*:\s*/g, ': ')
        .replace(/\s*;\s*/g, '; ')
        .trim();
    };

    const normalizedUser = normalizeCSS(userCSS);
    const normalizedCorrect = normalizeCSS(correctCSS);

    if (normalizedUser === normalizedCorrect) {
      setFeedback('✅ Perfect! Your CSS positioning is correct!');
      setIsCorrect(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    } else {
      setFeedback('❌ Not quite right. Check your positioning values and CSS syntax.');
      setIsCorrect(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          🎨 CSS Positioning Puzzle
        </h2>
        <p className="text-gray-300 mb-4">
          Position the boxes to create a diagonal path from top-left to bottom-right. 
          Each box should be positioned 100px further down and right than the previous one.
        </p>
        <div className="text-gray-300 text-sm space-y-1 mb-4">
          <p><strong>Requirements:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Use absolute positioning for all boxes</li>
            <li>Box1: top: 50px, left: 50px</li>
            <li>Box2: top: 150px, left: 150px</li>
            <li>Box3: top: 250px, left: 250px</li>
            <li>Box4: top: 350px, left: 350px</li>
            <li>Box5: top: 450px, left: 450px</li>
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 flex-1">
        {/* CSS Input */}
        <div>
          <h3 className="text-lg font-semibold text-blue-300 mb-3">
            ✏️ Your CSS Code
          </h3>
          <textarea
            value={userCSS}
            onChange={(e) => setUserCSS(e.target.value)}
            className="w-full h-full bg-gray-900 border border-blue-500 rounded-lg p-4 text-blue-300 font-mono text-sm resize-none"
            placeholder=".box1 { position: absolute; top: 50px; left: 50px; }
.box2 { position: absolute; top: 150px; left: 150px; }
.box3 { position: absolute; top: 250px; left: 250px; }
.box4 { position: absolute; top: 350px; left: 350px; }
.box5 { position: absolute; top: 450px; left: 450px; }"
          />
        </div>

        {/* Visual Preview */}
        <div>
          <h3 className="text-lg font-semibold text-green-300 mb-3">
            🎯 Target Layout
          </h3>
          <div className="bg-gray-900 border border-green-500 rounded-lg p-4 h-full relative">
            <div className="relative w-full h-full min-h-[400px]">
              {/* Target positions */}
              <div className="absolute top-[50px] left-[50px] w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white text-xs">
                1
              </div>
              <div className="absolute top-[150px] left-[150px] w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-white text-xs">
                2
              </div>
              <div className="absolute top-[250px] left-[250px] w-8 h-8 bg-yellow-500 rounded flex items-center justify-center text-white text-xs">
                3
              </div>
              <div className="absolute top-[350px] left-[350px] w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white text-xs">
                4
              </div>
              <div className="absolute top-[450px] left-[450px] w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs">
                5
              </div>
              
              {/* Diagonal line showing the path */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line 
                  x1="66" y1="66" 
                  x2="466" y2="466" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeDasharray="5,5"
                />
              </svg>
            </div>
            <p className="text-green-300 text-sm mt-2">
              Create a diagonal path from top-left to bottom-right
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={checkCSS}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          🔍 Check CSS
        </button>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`mt-4 p-4 rounded-lg ${
          isCorrect 
            ? 'bg-green-500/20 border border-green-500/30' 
            : 'bg-red-500/20 border border-red-500/30'
        }`}>
          <p className={isCorrect ? 'text-green-300' : 'text-red-300'}>
            {feedback}
          </p>
        </div>
      )}

      {/* CSS Properties Reference */}
      <div className="mt-4 p-4 bg-purple-500/20 border border-purple-500/30 rounded-lg">
        <h4 className="text-purple-300 font-semibold mb-2">💡 CSS Properties Reference:</h4>
        <div className="text-purple-200 text-sm space-y-1">
          <p><strong>position: absolute;</strong> - Positions element relative to nearest positioned parent</p>
          <p><strong>top: [value]px;</strong> - Distance from top edge</p>
          <p><strong>left: [value]px;</strong> - Distance from left edge</p>
          <p><strong>z-index: [number];</strong> - Controls stacking order (optional)</p>
        </div>
      </div>
    </div>
  );
}

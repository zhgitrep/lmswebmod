'use client';

import { useState } from 'react';
import { GameStage } from '../../page';

interface CodeFormatChallengeProps {
  onComplete: () => void;
  stage: GameStage;
}

export default function CodeFormatChallenge({ onComplete, stage }: CodeFormatChallengeProps) {
  const [userCode, setUserCode] = useState(`functioncalculateSum(a,b){
return a+b;
}
constnumbers=[1,2,3,4,5];
letresult=0;
for(leti=0;i<numbers.length;i++){
result+=numbers[i];
}
console.log("Sum:",result);`);

  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const correctCode = `function calculateSum(a, b) {
  return a + b;
}

const numbers = [1, 2, 3, 4, 5];
let result = 0;

for (let i = 0; i < numbers.length; i++) {
  result += numbers[i];
}

console.log("Sum:", result);`;

  const checkCode = () => {
    // Normalize both codes for comparison (remove extra spaces, newlines)
    const normalizeCode = (code: string) => {
      return code
        .replace(/\s+/g, ' ')
        .replace(/\s*{\s*/g, ' { ')
        .replace(/\s*}\s*/g, ' } ')
        .replace(/\s*=\s*/g, ' = ')
        .replace(/\s*\+\s*/g, ' + ')
        .replace(/\s*\[\s*/g, ' [ ')
        .replace(/\s*\]\s*/g, ' ] ')
        .replace(/\s*\(\s*/g, ' ( ')
        .replace(/\s*\)\s*/g, ' ) ')
        .trim();
    };

    const normalizedUser = normalizeCode(userCode);
    const normalizedCorrect = normalizeCode(correctCode);

    if (normalizedUser === normalizedCorrect) {
      setFeedback('✅ Perfect! Your code formatting is correct!');
      setIsCorrect(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    } else {
      setFeedback('❌ Not quite right. Check your spacing, indentation, and line breaks.');
      setIsCorrect(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          🔧 Code Formatting Challenge
        </h2>
        <p className="text-gray-300 mb-4">
          Fix the formatting and syntax of the JavaScript code below. Pay attention to:
        </p>
        <ul className="text-gray-300 text-sm space-y-1 mb-6">
          <li>• Proper spacing around operators and keywords</li>
          <li>• Correct indentation (2 spaces)</li>
          <li>• Line breaks for readability</li>
          <li>• Consistent formatting style</li>
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-6 flex-1">
        {/* Original Code */}
        <div>
          <h3 className="text-lg font-semibold text-red-300 mb-3">
            🚨 Original Code (Needs Fixing)
          </h3>
          <div className="bg-gray-900 border border-red-500 rounded-lg p-4 h-full">
            <pre className="text-red-300 text-sm overflow-auto h-full">
{`functioncalculateSum(a,b){
return a+b;
}
constnumbers=[1,2,3,4,5];
letresult=0;
for(leti=0;i<numbers.length;i++){
result+=numbers[i];
}
console.log("Sum:",result);`}
            </pre>
          </div>
        </div>

        {/* User Input */}
        <div>
          <h3 className="text-lg font-semibold text-green-300 mb-3">
            ✏️ Your Fixed Code
          </h3>
          <textarea
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            className="w-full h-full bg-gray-900 border border-green-500 rounded-lg p-4 text-green-300 font-mono text-sm resize-none"
            placeholder="Enter your formatted code here..."
          />
        </div>
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

      {/* Action Buttons */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={checkCode}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          🔍 Check Code
        </button>
      </div>

      {/* Hint */}
      <div className="mt-4 p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
        <h4 className="text-yellow-300 font-semibold mb-2">💡 Hint:</h4>
        <p className="text-yellow-200 text-sm">
          Look for missing spaces around operators (=, +), proper indentation inside functions and loops, 
          and add line breaks to separate logical blocks of code.
        </p>
      </div>
    </div>
  );
}

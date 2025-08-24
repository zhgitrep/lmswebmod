'use client';

import { useState } from 'react';
import { GameStage } from '../../page';

interface NumberGeneratorChallengeProps {
  onComplete: () => void;
  stage: GameStage;
}

export default function NumberGeneratorChallenge({ onComplete, stage }: NumberGeneratorChallengeProps) {
  const [userCode, setUserCode] = useState('');
  const [output, setOutput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const runCode = () => {
    try {
      // Create a safe execution environment
      const safeEval = (code: string) => {
        // Remove any potentially dangerous code
        const sanitizedCode = code
          .replace(/eval|Function|setTimeout|setInterval|document|window|alert|confirm|prompt/gi, '')
          .replace(/import|export|require/gi, '');
        
        // Create a function that returns the result
        const func = new Function('return ' + sanitizedCode);
        return func();
      };

      const result = safeEval(userCode);
      
      if (Array.isArray(result)) {
        // Check if it's the correct sequence
        const expectedSequence = Array.from({ length: 1001 }, (_, i) => i);
        
        if (result.length === 1001 && 
            result.every((num, index) => num === expectedSequence[index])) {
          setOutput(`✅ Correct! Generated ${result.length} numbers from 0 to 1000`);
          setFeedback('🎉 Perfect! Your code generates all numbers from 0 to 1000!');
          setIsCorrect(true);
          setTimeout(() => {
            onComplete();
          }, 2000);
        } else {
          setOutput(`Generated ${result.length} numbers, but sequence is incorrect`);
          setFeedback('❌ The sequence is not correct. Make sure you generate numbers from 0 to 1000 in order.');
          setIsCorrect(false);
        }
      } else {
        setOutput('❌ Your code should return an array of numbers');
        setFeedback('❌ Your code should return an array containing numbers from 0 to 1000.');
        setIsCorrect(false);
      }
    } catch (error) {
      setOutput(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setFeedback('❌ There\'s a syntax error in your code. Please check and try again.');
      setIsCorrect(false);
    }
  };

  const showHint = () => {
    setFeedback('💡 Hint: Use a for loop or Array.from() to generate the sequence. Remember to include both 0 and 1000!');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          🔢 Number Generator Challenge
        </h2>
        <p className="text-gray-300 mb-4">
          Write JavaScript code that generates all numbers from 0 to 1000 (inclusive) and returns them as an array.
        </p>
        <div className="text-gray-300 text-sm space-y-1 mb-4">
          <p><strong>Requirements:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Generate numbers from 0 to 1000 (inclusive)</li>
            <li>Return as an array</li>
            <li>Numbers should be in ascending order</li>
            <li>Total count should be 1001 numbers</li>
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 flex-1">
        {/* Code Input */}
        <div>
          <h3 className="text-lg font-semibold text-blue-300 mb-3">
            ✏️ Your Code
          </h3>
          <textarea
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            className="w-full h-full bg-gray-900 border border-blue-500 rounded-lg p-4 text-blue-300 font-mono text-sm resize-none"
            placeholder="// Write your code here...
// Example: [0, 1, 2, ..., 1000]

"
          />
        </div>

        {/* Output */}
        <div>
          <h3 className="text-lg font-semibold text-green-300 mb-3">
            📊 Output
          </h3>
          <div className="w-full h-full bg-gray-900 border border-green-500 rounded-lg p-4">
            <pre className="text-green-300 text-sm overflow-auto h-full">
              {output || 'Run your code to see the output here...'}
            </pre>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={runCode}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          ▶️ Run Code
        </button>
        <button
          onClick={showHint}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          💡 Get Hint
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

      {/* Examples */}
      <div className="mt-4 p-4 bg-purple-500/20 border border-purple-500/30 rounded-lg">
        <h4 className="text-purple-300 font-semibold mb-2">💡 Example Solutions:</h4>
        <div className="text-purple-200 text-sm space-y-2">
          <div>
            <strong>Using for loop:</strong>
            <pre className="bg-gray-800 p-2 rounded mt-1 text-xs">
{`let numbers = [];
for (let i = 0; i <= 1000; i++) {
  numbers.push(i);
}
numbers;`}
            </pre>
          </div>
          <div>
            <strong>Using Array.from:</strong>
            <pre className="bg-gray-800 p-2 rounded mt-1 text-xs">
{`Array.from({length: 1001}, (_, i) => i);`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { GameStage } from '../../page';

interface DataPortChallengeProps {
  onComplete: () => void;
  stage: GameStage;
}

export default function DataPortChallenge({ onComplete, stage }: DataPortChallengeProps) {
  const [userCode, setUserCode] = useState('');
  const [output, setOutput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const sampleData = [
    { name: 'John', age: 25, city: 'New York' },
    { name: 'Alice', age: 30, city: 'London' },
    { name: 'Bob', age: 35, city: 'Paris' }
  ];

  const expectedCSV = `name,age,city
John,25,New York
Alice,30,London
Bob,35,Paris`;

  const runCode = () => {
    try {
      // Create a safe execution environment
      const safeEval = (code: string) => {
        // Remove any potentially dangerous code
        const sanitizedCode = code
          .replace(/eval|Function|setTimeout|setInterval|document|window|alert|confirm|prompt/gi, '')
          .replace(/import|export|require/gi, '');
        
        // Create a function with the sample data available
        const func = new Function('data', 'return ' + sanitizedCode);
        return func(sampleData);
      };

      const result = safeEval(userCode);
      
      if (typeof result === 'string') {
        // Normalize the result for comparison (remove extra whitespace)
        const normalizedResult = result.trim().replace(/\r\n/g, '\n');
        const normalizedExpected = expectedCSV.trim();
        
        if (normalizedResult === normalizedExpected) {
          setOutput('✅ Correct! Your CSV conversion is perfect!');
          setFeedback('🎉 Excellent! You successfully converted JSON to CSV format!');
          setIsCorrect(true);
          setTimeout(() => {
            onComplete();
          }, 2000);
        } else {
          setOutput(`Generated CSV, but format doesn't match exactly`);
          setFeedback('❌ The CSV format is not quite right. Check the headers and data formatting.');
          setIsCorrect(false);
        }
      } else {
        setOutput('❌ Your code should return a string (CSV format)');
        setFeedback('❌ Your code should return a string containing the CSV data.');
        setIsCorrect(false);
      }
    } catch (error) {
      setOutput(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setFeedback('❌ There\'s a syntax error in your code. Please check and try again.');
      setIsCorrect(false);
    }
  };

  const showHint = () => {
    setFeedback('💡 Hint: Extract the keys for headers, then iterate through the data array to create CSV rows. Use join() for formatting.');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          📊 Data Port Challenge
        </h2>
        <p className="text-gray-300 mb-4">
          Convert the given JSON data to CSV format. Your code should return a string with proper CSV formatting.
        </p>
        <div className="text-gray-300 text-sm space-y-1 mb-4">
          <p><strong>Requirements:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Convert JSON array to CSV string</li>
            <li>Include headers (column names)</li>
            <li>Use comma as delimiter</li>
            <li>Each object becomes a row</li>
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 flex-1">
        {/* Input Data */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-300 mb-3">
            📥 Input JSON Data
          </h3>
          <div className="bg-gray-900 border border-yellow-500 rounded-lg p-4 h-full">
            <pre className="text-yellow-300 text-sm overflow-auto h-full">
{JSON.stringify(sampleData, null, 2)}
            </pre>
          </div>
        </div>

        {/* Code Input */}
        <div>
          <h3 className="text-lg font-semibold text-blue-300 mb-3">
            ✏️ Your Conversion Code
          </h3>
          <textarea
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            className="w-full h-full bg-gray-900 border border-blue-500 rounded-lg p-4 text-blue-300 font-mono text-sm resize-none"
            placeholder="// Write your JSON to CSV conversion code here...
// The input data is available as 'data'
// Return the CSV string

"
          />
        </div>
      </div>

      {/* Expected Output */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-green-300 mb-3">
          📤 Expected CSV Output
        </h3>
        <div className="bg-gray-900 border border-green-500 rounded-lg p-4">
          <pre className="text-green-300 text-sm">
{expectedCSV}
          </pre>
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
        <h4 className="text-purple-300 font-semibold mb-2">💡 Example Solution:</h4>
        <div className="text-purple-200 text-sm">
          <pre className="bg-gray-800 p-2 rounded mt-1 text-xs">
{`// Get headers from first object
const headers = Object.keys(data[0]);

// Create header row
const headerRow = headers.join(',');

// Create data rows
const dataRows = data.map(obj => 
  headers.map(header => obj[header]).join(',')
);

// Combine header and data rows
return [headerRow, ...dataRows].join('\\n');`}
          </pre>
        </div>
      </div>
    </div>
  );
}

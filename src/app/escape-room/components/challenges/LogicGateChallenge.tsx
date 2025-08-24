'use client';

import { useState } from 'react';
import { GameStage } from '../../page';

interface LogicGateChallengeProps {
  onComplete: () => void;
  stage: GameStage;
}

export default function LogicGateChallenge({ onComplete, stage }: LogicGateChallengeProps) {
  const [answers, setAnswers] = useState({
    input1: false,
    input2: false,
    input3: false,
    output: false
  });
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const correctAnswers = {
    input1: true,
    input2: false,
    input3: true,
    output: true
  };

  const checkAnswers = () => {
    const isAllCorrect = 
      answers.input1 === correctAnswers.input1 &&
      answers.input2 === correctAnswers.input2 &&
      answers.input3 === correctAnswers.input3 &&
      answers.output === correctAnswers.output;

    if (isAllCorrect) {
      setFeedback('✅ Perfect! All your logic gate answers are correct!');
      setIsCorrect(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    } else {
      setFeedback('❌ Some answers are incorrect. Check your boolean logic calculations.');
      setIsCorrect(false);
    }
  };

  const handleInputChange = (input: keyof typeof answers, value: boolean) => {
    setAnswers(prev => ({
      ...prev,
      [input]: value
    }));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          ⚡ Logic Gate Challenge
        </h2>
        <p className="text-gray-300 mb-4">
          Solve the boolean logic puzzle below. Determine the correct input values and final output 
          based on the logic gates shown.
        </p>
        <div className="text-gray-300 text-sm space-y-1 mb-4">
          <p><strong>Logic Gates:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>AND (&):</strong> Output is true only if ALL inputs are true</li>
            <li><strong>OR (|):</strong> Output is true if ANY input is true</li>
            <li><strong>NOT (~):</strong> Output is the opposite of the input</li>
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 flex-1">
        {/* Logic Diagram */}
        <div>
          <h3 className="text-lg font-semibold text-blue-300 mb-3">
            🧮 Logic Circuit
          </h3>
          <div className="bg-gray-900 border border-blue-500 rounded-lg p-6 h-full">
            <div className="space-y-6">
              {/* Inputs */}
              <div className="flex justify-between items-center">
                <div className="text-white">
                  <span className="font-semibold">Input 1:</span>
                  <select 
                    value={answers.input1.toString()}
                    onChange={(e) => handleInputChange('input1', e.target.value === 'true')}
                    className="ml-2 bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white"
                  >
                    <option value="false">False</option>
                    <option value="true">True</option>
                  </select>
                </div>
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-white">
                  <span className="font-semibold">Input 2:</span>
                  <select 
                    value={answers.input2.toString()}
                    onChange={(e) => handleInputChange('input2', e.target.value === 'true')}
                    className="ml-2 bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white"
                  >
                    <option value="false">False</option>
                    <option value="true">True</option>
                  </select>
                </div>
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-white">
                  <span className="font-semibold">Input 3:</span>
                  <select 
                    value={answers.input3.toString()}
                    onChange={(e) => handleInputChange('input3', e.target.value === 'true')}
                    className="ml-2 bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white"
                  >
                    <option value="false">False</option>
                    <option value="true">True</option>
                  </select>
                </div>
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              </div>

              {/* Logic Gates */}
              <div className="text-center space-y-4">
                <div className="bg-yellow-600 text-white py-2 px-4 rounded">
                  AND Gate: (Input1 AND Input2)
                </div>
                <div className="bg-purple-600 text-white py-2 px-4 rounded">
                  NOT Gate: ~(Input3)
                </div>
                <div className="bg-orange-600 text-white py-2 px-4 rounded">
                  OR Gate: (AND_result OR NOT_result)
                </div>
              </div>

              {/* Output */}
              <div className="flex justify-between items-center">
                <div className="text-white">
                  <span className="font-semibold">Final Output:</span>
                  <select 
                    value={answers.output.toString()}
                    onChange={(e) => handleInputChange('output', e.target.value === 'true')}
                    className="ml-2 bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white"
                  >
                    <option value="false">False</option>
                    <option value="true">True</option>
                  </select>
                </div>
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Truth Table */}
        <div>
          <h3 className="text-lg font-semibold text-green-300 mb-3">
            📊 Truth Table Reference
          </h3>
          <div className="bg-gray-900 border border-green-500 rounded-lg p-4 h-full">
            <div className="space-y-4">
              <div>
                <h4 className="text-green-300 font-semibold mb-2">AND Gate:</h4>
                <table className="w-full text-sm text-gray-300">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left p-1">A</th>
                      <th className="text-left p-1">B</th>
                      <th className="text-left p-1">Output</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="p-1">0</td><td className="p-1">0</td><td className="p-1">0</td></tr>
                    <tr><td className="p-1">0</td><td className="p-1">1</td><td className="p-1">0</td></tr>
                    <tr><td className="p-1">1</td><td className="p-1">0</td><td className="p-1">0</td></tr>
                    <tr><td className="p-1">1</td><td className="p-1">1</td><td className="p-1">1</td></tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h4 className="text-green-300 font-semibold mb-2">OR Gate:</h4>
                <table className="w-full text-sm text-gray-300">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left p-1">A</th>
                      <th className="text-left p-1">B</th>
                      <th className="text-left p-1">Output</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="p-1">0</td><td className="p-1">0</td><td className="p-1">0</td></tr>
                    <tr><td className="p-1">0</td><td className="p-1">1</td><td className="p-1">1</td></tr>
                    <tr><td className="p-1">1</td><td className="p-1">0</td><td className="p-1">1</td></tr>
                    <tr><td className="p-1">1</td><td className="p-1">1</td><td className="p-1">1</td></tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h4 className="text-green-300 font-semibold mb-2">NOT Gate:</h4>
                <table className="w-full text-sm text-gray-300">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left p-1">Input</th>
                      <th className="text-left p-1">Output</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="p-1">0</td><td className="p-1">1</td></tr>
                    <tr><td className="p-1">1</td><td className="p-1">0</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={checkAnswers}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          🔍 Check Answers
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

      {/* Hint */}
      <div className="mt-4 p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
        <h4 className="text-yellow-300 font-semibold mb-2">💡 Hint:</h4>
        <p className="text-yellow-200 text-sm">
          Work step by step: First calculate (Input1 AND Input2), then calculate NOT(Input3), 
          and finally calculate (AND_result OR NOT_result). Use the truth tables to help you!
        </p>
      </div>
    </div>
  );
}

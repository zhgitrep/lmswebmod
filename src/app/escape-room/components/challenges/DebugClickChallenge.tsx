'use client';

import { useState } from 'react';
import { GameStage } from '../../page';

interface DebugClickChallengeProps {
  onComplete: () => void;
  stage: GameStage;
}

export default function DebugClickChallenge({ onComplete, stage }: DebugClickChallengeProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const images = [
    {
      id: 1,
      name: 'Calculator',
      description: 'A basic calculator application',
      isDebugTool: false,
      emoji: '🧮'
    },
    {
      id: 2,
      name: 'Console Debugger',
      description: 'Browser developer tools with console',
      isDebugTool: true,
      emoji: '🐛'
    },
    {
      id: 3,
      name: 'Text Editor',
      description: 'Simple text editing application',
      isDebugTool: false,
      emoji: '📝'
    },
    {
      id: 4,
      name: 'Terminal',
      description: 'Command line interface',
      isDebugTool: false,
      emoji: '💻'
    }
  ];

  const handleImageClick = (imageId: number) => {
    setSelectedImage(imageId);
    const image = images.find(img => img.id === imageId);
    
    if (image?.isDebugTool) {
      setFeedback('✅ Correct! You found the debugging tool!');
      setIsCorrect(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    } else {
      setFeedback('❌ That\'s not a debugging tool. Look for console or developer tools.');
      setIsCorrect(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          🐛 Debug Click Challenge
        </h2>
        <p className="text-gray-300 mb-4">
          Click on the image that represents a debugging tool. Look for tools that help developers 
          find and fix errors in their code.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 flex-1">
        {images.map((image) => (
          <div
            key={image.id}
            onClick={() => handleImageClick(image.id)}
            className={`cursor-pointer transition-all duration-200 transform hover:scale-105 ${
              selectedImage === image.id 
                ? 'ring-4 ring-blue-500' 
                : 'hover:ring-2 hover:ring-gray-400'
            }`}
          >
            <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 h-full flex flex-col items-center justify-center text-center">
              <div className="text-6xl mb-4">{image.emoji}</div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {image.name}
              </h3>
              <p className="text-gray-400 text-sm">
                {image.description}
              </p>
              {selectedImage === image.id && (
                <div className="mt-4 text-sm">
                  {image.isDebugTool ? (
                    <span className="text-green-400">✅ Debugging Tool</span>
                  ) : (
                    <span className="text-red-400">❌ Not a Debug Tool</span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`mt-6 p-4 rounded-lg ${
          isCorrect 
            ? 'bg-green-500/20 border border-green-500/30' 
            : 'bg-red-500/20 border border-red-500/30'
        }`}>
          <p className={isCorrect ? 'text-green-300' : 'text-red-300'}>
            {feedback}
          </p>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
        <h4 className="text-blue-300 font-semibold mb-2">💡 What to look for:</h4>
        <ul className="text-blue-200 text-sm space-y-1">
          <li>• Console or terminal interfaces</li>
          <li>• Developer tools with debugging features</li>
          <li>• Error tracking or logging tools</li>
          <li>• Code inspection utilities</li>
        </ul>
      </div>
    </div>
  );
}

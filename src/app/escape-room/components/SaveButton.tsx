'use client';

import { useState } from 'react';

interface SaveButtonProps {
  gameState: any;
  onSave?: () => void;
  className?: string;
}

export default function SaveButton({ gameState, onSave, className = '' }: SaveButtonProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSave = async () => {
    if (!gameState.sessionId) {
      setSaveStatus('error');
      return;
    }

    setIsSaving(true);
    setSaveStatus('idle');

    try {
      // Update game session
      const response = await fetch(`/api/game-sessions/${gameState.sessionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          score: gameState.score,
          hintsUsed: gameState.hintsUsed,
          isCompleted: gameState.isCompleted,
          timeRemaining: gameState.timeRemaining,
          ...(gameState.isCompleted && { endTime: new Date().toISOString() }),
        }),
      });

      if (response.ok) {
        setSaveStatus('success');
        onSave?.();
        
        // Reset status after 3 seconds
        setTimeout(() => {
          setSaveStatus('idle');
        }, 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Error saving game:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const getButtonContent = () => {
    if (isSaving) {
      return (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Saving...
        </>
      );
    }

    switch (saveStatus) {
      case 'success':
        return (
          <>
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Saved!
          </>
        );
      case 'error':
        return (
          <>
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Save Failed
          </>
        );
      default:
        return (
          <>
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Save Progress
          </>
        );
    }
  };

  const getButtonClasses = () => {
    const baseClasses = 'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200';
    
    switch (saveStatus) {
      case 'success':
        return `${baseClasses} bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white`;
      case 'error':
        return `${baseClasses} bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white`;
      default:
        return `${baseClasses} bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white ${className}`;
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={isSaving || !gameState.sessionId}
      className={getButtonClasses()}
    >
      {getButtonContent()}
    </button>
  );
}

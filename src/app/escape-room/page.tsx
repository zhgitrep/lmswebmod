'use client';

import { useEffect } from 'react';
import { setCookie } from 'cookies-next';

export default function EscapeRoomPage() {
  useEffect(() => {
    // Set active menu to escape-room when page loads
    setCookie('activeMenu', '/escape-room', { maxAge: 60 * 60 * 24 * 7 });
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '30px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#333',
          marginBottom: '30px',
          fontSize: '2.5em'
        }}>
          🚪 Escape Room
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '30px',
          marginBottom: '30px'
        }}>
          {/* Student Information */}
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '25px',
            borderRadius: '8px',
            border: '1px solid #dee2e6'
          }}>
            <h2 style={{
              color: '#333',
              marginBottom: '20px',
              fontSize: '1.8em'
            }}>
              👨‍🎓 Student Information
            </h2>
            
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#333' }}>Name:</strong>
              <span style={{ marginLeft: '10px', color: '#666' }}>Zohaib Khan</span>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#333' }}>Course:</strong>
              <span style={{ marginLeft: '10px', color: '#666' }}>Bachelor of Information Technology</span>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#333' }}>Module:</strong>
              <span style={{ marginLeft: '10px', color: '#666' }}>Interactive Web Development</span>
            </div>
          </div>

          {/* Game Overview */}
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '25px',
            borderRadius: '8px',
            border: '1px solid #dee2e6'
          }}>
            <h2 style={{
              color: '#333',
              marginBottom: '20px',
              fontSize: '1.8em'
            }}>
              🎮 Game Overview
            </h2>
            
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#333' }}>Theme:</strong>
              <span style={{ marginLeft: '10px', color: '#666' }}>Digital Code Escape</span>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#333' }}>Duration:</strong>
              <span style={{ marginLeft: '10px', color: '#666' }}>45 minutes</span>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#333' }}>Puzzles:</strong>
              <span style={{ marginLeft: '10px', color: '#666' }}>8 Interactive Puzzles</span>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#333' }}>Status:</strong>
              <span style={{ marginLeft: '10px', color: '#666' }}>Ready to Start</span>
            </div>
          </div>
        </div>

        {/* Game Levels */}
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '25px',
          borderRadius: '8px',
          border: '1px solid #dee2e6',
          marginBottom: '30px'
        }}>
          <h2 style={{
            color: '#333',
            marginBottom: '20px',
            fontSize: '1.8em',
            textAlign: 'center'
          }}>
            🎯 Game Levels
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            <div style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #dc3545',
              boxShadow: '0 2px 4px rgba(220, 53, 69, 0.1)'
            }}>
              <h3 style={{ color: '#dc3545', marginBottom: '15px', fontSize: '1.3em' }}>
                🔓 Level 1: Code Breaker
              </h3>
              <p style={{ marginBottom: '15px', color: '#666' }}>
                Decrypt the hidden message using binary code patterns.
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ color: '#dc3545', fontSize: '0.9em' }}>2 puzzles</span>
                <button style={{
                  backgroundColor: '#dc3545',
                  color: 'white',
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9em'
                }}>
                  Start Level
                </button>
              </div>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #fd7e14',
              boxShadow: '0 2px 4px rgba(253, 126, 20, 0.1)'
            }}>
              <h3 style={{ color: '#fd7e14', marginBottom: '15px', fontSize: '1.3em' }}>
                🧩 Level 2: Logic Labyrinth
              </h3>
              <p style={{ marginBottom: '15px', color: '#666' }}>
                Navigate through boolean logic gates and truth tables.
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ color: '#fd7e14', fontSize: '0.9em' }}>3 puzzles</span>
                <button style={{
                  backgroundColor: '#fd7e14',
                  color: 'white',
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9em'
                }}>
                  Start Level
                </button>
              </div>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #28a745',
              boxShadow: '0 2px 4px rgba(40, 167, 69, 0.1)'
            }}>
              <h3 style={{ color: '#28a745', marginBottom: '15px', fontSize: '1.3em' }}>
                🎨 Level 3: CSS Maze
              </h3>
              <p style={{ marginBottom: '15px', color: '#666' }}>
                Solve CSS positioning puzzles to find the hidden path.
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ color: '#28a745', fontSize: '0.9em' }}>3 puzzles</span>
                <button style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9em'
                }}>
                  Start Level
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Game Features */}
        <div style={{
          backgroundColor: '#e8f5e8',
          padding: '25px',
          borderRadius: '8px',
          border: '1px solid #4caf50'
        }}>
          <h2 style={{
            color: '#2e7d32',
            marginBottom: '20px',
            fontSize: '1.8em',
            textAlign: 'center'
          }}>
            🎮 Game Features
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            <div style={{
              backgroundColor: 'white',
              padding: '15px',
              borderRadius: '5px',
              border: '1px solid #4caf50'
            }}>
              <h3 style={{ color: '#2e7d32', marginBottom: '10px' }}>⏱️ Timer</h3>
              <p style={{ margin: '0', color: '#666' }}>45-minute countdown timer with hints</p>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              padding: '15px',
              borderRadius: '5px',
              border: '1px solid #4caf50'
            }}>
              <h3 style={{ color: '#2e7d32', marginBottom: '10px' }}>💡 Hints</h3>
              <p style={{ margin: '0', color: '#666' }}>Get help when stuck with progressive hints</p>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              padding: '15px',
              borderRadius: '5px',
              border: '1px solid #4caf50'
            }}>
              <h3 style={{ color: '#2e7d32', marginBottom: '10px' }}>🏆 Achievements</h3>
              <p style={{ margin: '0', color: '#666' }}>Earn badges for completing puzzles quickly</p>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              padding: '15px',
              borderRadius: '5px',
              border: '1px solid #4caf50'
            }}>
              <h3 style={{ color: '#2e7d32', marginBottom: '10px' }}>📊 Progress</h3>
              <p style={{ margin: '0', color: '#666' }}>Track your progress and completion time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
'use client';

import { useEffect } from 'react';
import { setCookie } from 'cookies-next';

export default function PreLabPage() {
  useEffect(() => {
    // Set active menu to pre-lab when page loads
    setCookie('activeMenu', '/pre-lab', { maxAge: 60 * 60 * 24 * 7 });
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
          ❓ Pre-lab Questions
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
              <span style={{ marginLeft: '10px', color: '#666' }}>Web Development Fundamentals</span>
            </div>
          </div>

          {/* Pre-lab Overview */}
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
              📚 Pre-lab Overview
            </h2>
            
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#333' }}>Topic:</strong>
              <span style={{ marginLeft: '10px', color: '#666' }}>HTML5 and CSS Fundamentals</span>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#333' }}>Duration:</strong>
              <span style={{ marginLeft: '10px', color: '#666' }}>2 hours</span>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#333' }}>Questions:</strong>
              <span style={{ marginLeft: '10px', color: '#666' }}>15 Multiple Choice</span>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#333' }}>Status:</strong>
              <span style={{ marginLeft: '10px', color: '#666' }}>Not Started</span>
            </div>
          </div>
        </div>

        {/* Question Sets */}
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
            📝 Question Sets
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
              border: '1px solid #007bff',
              boxShadow: '0 2px 4px rgba(0, 123, 255, 0.1)'
            }}>
              <h3 style={{ color: '#007bff', marginBottom: '15px', fontSize: '1.3em' }}>
                🎯 Set 1: HTML Basics
              </h3>
              <p style={{ marginBottom: '15px', color: '#666' }}>
                Questions covering HTML structure, tags, and semantic elements.
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ color: '#007bff', fontSize: '0.9em' }}>5 questions</span>
                <button style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9em'
                }}>
                  Start Quiz
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
                🎨 Set 2: CSS Styling
              </h3>
              <p style={{ marginBottom: '15px', color: '#666' }}>
                Questions about CSS properties, selectors, and layout techniques.
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ color: '#28a745', fontSize: '0.9em' }}>5 questions</span>
                <button style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9em'
                }}>
                  Start Quiz
                </button>
              </div>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #ffc107',
              boxShadow: '0 2px 4px rgba(255, 193, 7, 0.1)'
            }}>
              <h3 style={{ color: '#ffc107', marginBottom: '15px', fontSize: '1.3em' }}>
                ⚡ Set 3: JavaScript Basics
              </h3>
              <p style={{ marginBottom: '15px', color: '#666' }}>
                Questions covering JavaScript syntax, functions, and DOM manipulation.
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ color: '#ffc107', fontSize: '0.9em' }}>5 questions</span>
                <button style={{
                  backgroundColor: '#ffc107',
                  color: 'white',
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9em'
                }}>
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
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
            📋 Instructions
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
              <h3 style={{ color: '#2e7d32', marginBottom: '10px' }}>⏱️ Time Limit</h3>
              <p style={{ margin: '0', color: '#666' }}>Each question set has a 30-minute time limit</p>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              padding: '15px',
              borderRadius: '5px',
              border: '1px solid #4caf50'
            }}>
              <h3 style={{ color: '#2e7d32', marginBottom: '10px' }}>📊 Scoring</h3>
              <p style={{ margin: '0', color: '#666' }}>Multiple choice questions with immediate feedback</p>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              padding: '15px',
              borderRadius: '5px',
              border: '1px solid #4caf50'
            }}>
              <h3 style={{ color: '#2e7d32', marginBottom: '10px' }}>🔄 Retakes</h3>
              <p style={{ margin: '0', color: '#666' }}>You can retake each set up to 3 times</p>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              padding: '15px',
              borderRadius: '5px',
              border: '1px solid #4caf50'
            }}>
              <h3 style={{ color: '#2e7d32', marginBottom: '10px' }}>📈 Progress</h3>
              <p style={{ margin: '0', color: '#666' }}>Track your progress and review answers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
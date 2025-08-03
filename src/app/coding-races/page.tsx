'use client';

import { useEffect } from 'react';
import { setCookie } from 'cookies-next';

export default function CodingRacesPage() {
  useEffect(() => {
    // Set active menu to coding-races when page loads
    setCookie('activeMenu', '/coding-races', { maxAge: 60 * 60 * 24 * 7 });
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
          🏁 Coding Races
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
              <span style={{ marginLeft: '10px', color: '#666' }}>John Doe</span>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#333' }}>Student Number:</strong>
              <span style={{ marginLeft: '10px', color: '#666' }}>12345678</span>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#333' }}>Course:</strong>
              <span style={{ marginLeft: '10px', color: '#666' }}>Bachelor of Information Technology</span>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#333' }}>Module:</strong>
              <span style={{ marginLeft: '10px', color: '#666' }}>Advanced Programming</span>
            </div>
          </div>

          {/* Competition Overview */}
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
              🏆 Competition Overview
            </h2>
            
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#333' }}>Type:</strong>
              <span style={{ marginLeft: '10px', color: '#666' }}>Real-time Coding Challenges</span>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#333' }}>Duration:</strong>
              <span style={{ marginLeft: '10px', color: '#666' }}>30-60 minutes</span>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#333' }}>Languages:</strong>
              <span style={{ marginLeft: '10px', color: '#666' }}>JavaScript, Python, Java</span>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#333' }}>Status:</strong>
              <span style={{ marginLeft: '10px', color: '#666' }}>Ready to Compete</span>
            </div>
          </div>
        </div>

        {/* Race Categories */}
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
            🏁 Race Categories
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
              border: '1px solid #6f42c1',
              boxShadow: '0 2px 4px rgba(111, 66, 193, 0.1)'
            }}>
              <h3 style={{ color: '#6f42c1', marginBottom: '15px', fontSize: '1.3em' }}>
                🥉 Beginner Sprint
              </h3>
              <p style={{ marginBottom: '15px', color: '#666' }}>
                Basic algorithms and data structures for newcomers.
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ color: '#6f42c1', fontSize: '0.9em' }}>30 min</span>
                <button style={{
                  backgroundColor: '#6f42c1',
                  color: 'white',
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9em'
                }}>
                  Join Race
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
                🥈 Intermediate Marathon
              </h3>
              <p style={{ marginBottom: '15px', color: '#666' }}>
                Advanced algorithms and optimization challenges.
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ color: '#fd7e14', fontSize: '0.9em' }}>45 min</span>
                <button style={{
                  backgroundColor: '#fd7e14',
                  color: 'white',
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9em'
                }}>
                  Join Race
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
                🥇 Expert Ultra
              </h3>
              <p style={{ marginBottom: '15px', color: '#666' }}>
                Complex problem-solving and system design challenges.
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ color: '#ffc107', fontSize: '0.9em' }}>60 min</span>
                <button style={{
                  backgroundColor: '#ffc107',
                  color: 'white',
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9em'
                }}>
                  Join Race
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
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
            🏆 Leaderboard
          </h2>
          
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            border: '1px solid #dee2e6'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              gap: '15px',
              alignItems: 'center',
              padding: '10px',
              borderBottom: '1px solid #dee2e6',
              fontWeight: 'bold',
              color: '#333'
            }}>
              <span>Rank</span>
              <span>Player</span>
              <span>Score</span>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              gap: '15px',
              alignItems: 'center',
              padding: '10px',
              borderBottom: '1px solid #dee2e6'
            }}>
              <span style={{ color: '#ffd700', fontSize: '1.2em' }}>🥇</span>
              <span>CodeMaster Pro</span>
              <span style={{ color: '#28a745', fontWeight: 'bold' }}>2500 pts</span>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              gap: '15px',
              alignItems: 'center',
              padding: '10px',
              borderBottom: '1px solid #dee2e6'
            }}>
              <span style={{ color: '#c0c0c0', fontSize: '1.2em' }}>🥈</span>
              <span>Algorithm Ace</span>
              <span style={{ color: '#28a745', fontWeight: 'bold' }}>2200 pts</span>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              gap: '15px',
              alignItems: 'center',
              padding: '10px',
              borderBottom: '1px solid #dee2e6'
            }}>
              <span style={{ color: '#cd7f32', fontSize: '1.2em' }}>🥉</span>
              <span>Debug Ninja</span>
              <span style={{ color: '#28a745', fontWeight: 'bold' }}>2000 pts</span>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              gap: '15px',
              alignItems: 'center',
              padding: '10px'
            }}>
              <span style={{ color: '#666' }}>4</span>
              <span>John Doe</span>
              <span style={{ color: '#666' }}>1800 pts</span>
            </div>
          </div>
        </div>

        {/* Features */}
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
            ⚡ Race Features
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
              <h3 style={{ color: '#2e7d32', marginBottom: '10px' }}>⚡ Real-time</h3>
              <p style={{ margin: '0', color: '#666' }}>Live competition with real-time leaderboard</p>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              padding: '15px',
              borderRadius: '5px',
              border: '1px solid #4caf50'
            }}>
              <h3 style={{ color: '#2e7d32', marginBottom: '10px' }}>🔧 Multi-language</h3>
              <p style={{ margin: '0', color: '#666' }}>Support for JavaScript, Python, and Java</p>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              padding: '15px',
              borderRadius: '5px',
              border: '1px solid #4caf50'
            }}>
              <h3 style={{ color: '#2e7d32', marginBottom: '10px' }}>📊 Analytics</h3>
              <p style={{ margin: '0', color: '#666' }}>Detailed performance metrics and analysis</p>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              padding: '15px',
              borderRadius: '5px',
              border: '1px solid #4caf50'
            }}>
              <h3 style={{ color: '#2e7d32', marginBottom: '10px' }}>🏆 Achievements</h3>
              <p style={{ margin: '0', color: '#666' }}>Earn badges and unlock achievements</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
'use client';

import { useEffect } from 'react';
import { setCookie } from 'cookies-next';

export default function AboutPage() {
  useEffect(() => {
    // Set active menu to about when page loads
    setCookie('activeMenu', '/about', { maxAge: 60 * 60 * 24 * 7 });
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
          👨‍💻 About Me
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '30px',
          marginBottom: '30px'
        }}>
          {/* Personal Information */}
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
              📋 Personal Information
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
              <strong style={{ color: '#333' }}>Institution:</strong>
              <span style={{ marginLeft: '10px', color: '#666' }}>La Trobe University</span>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#333' }}>Email:</strong>
              <span style={{ marginLeft: '10px', color: '#666' }}>john.doe@students.latrobe.edu.au</span>
            </div>
          </div>

          {/* Project Information */}
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
              🚀 Project Details
            </h2>
            
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#333' }}>Project Name:</strong>
              <span style={{ marginLeft: '10px', color: '#666' }}>LTU Moodle App Generator</span>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#333' }}>Technology Stack:</strong>
              <span style={{ marginLeft: '10px', color: '#666' }}>Next.js, React, TypeScript</span>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#333' }}>Features:</strong>
              <span style={{ marginLeft: '10px', color: '#666' }}>HTML5 Code Generator, Dark/Light Mode</span>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#333' }}>Accessibility:</strong>
              <span style={{ marginLeft: '10px', color: '#666' }}>WCAG 2.1 AA Compliant</span>
            </div>
          </div>
        </div>

        {/* Video Section */}
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
            🎥 How to Use This Website
          </h2>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '300px',
            backgroundColor: '#e9ecef',
            borderRadius: '8px',
            border: '2px dashed #6c757d'
          }}>
            <div style={{
              textAlign: 'center',
              color: '#6c757d'
            }}>
              <div style={{
                fontSize: '4em',
                marginBottom: '20px'
              }}>
                📹
              </div>
              <h3 style={{ marginBottom: '10px', color: '#495057' }}>
                Video Tutorial Coming Soon
              </h3>
              <p style={{ margin: '0', fontSize: '1.1em' }}>
                A comprehensive video tutorial will be added here to demonstrate how to use the HTML5 Code Generator.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
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
            ✨ Website Features
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
              <h3 style={{ color: '#2e7d32', marginBottom: '10px' }}>🎨 HTML5 Generator</h3>
              <p style={{ margin: '0', color: '#666' }}>Generate complete HTML5 pages with inline CSS and JavaScript</p>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              padding: '15px',
              borderRadius: '5px',
              border: '1px solid #4caf50'
            }}>
              <h3 style={{ color: '#2e7d32', marginBottom: '10px' }}>🌙 Dark/Light Mode</h3>
              <p style={{ margin: '0', color: '#666' }}>Toggle between dark and light themes for better user experience</p>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              padding: '15px',
              borderRadius: '5px',
              border: '1px solid #4caf50'
            }}>
              <h3 style={{ color: '#2e7d32', marginBottom: '10px' }}>🍪 Cookie Management</h3>
              <p style={{ margin: '0', color: '#666' }}>Remember user preferences and navigation state</p>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              padding: '15px',
              borderRadius: '5px',
              border: '1px solid #4caf50'
            }}>
              <h3 style={{ color: '#2e7d32', marginBottom: '10px' }}>♿ Accessibility</h3>
              <p style={{ margin: '0', color: '#666' }}>WCAG 2.1 AA compliant with proper ARIA labels</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

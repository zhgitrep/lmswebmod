'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [generatedCode, setGeneratedCode] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    fontSize: '16px'
  });

  const generateHTMLCode = () => {
    const htmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${formData.title || 'Generated Page'}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: ${formData.backgroundColor};
            color: ${formData.textColor};
            font-size: ${formData.fontSize};
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background-color: rgba(255, 255, 255, 0.9);
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
            text-align: center;
            margin-bottom: 20px;
        }
        p {
            line-height: 1.6;
            margin-bottom: 15px;
        }
        .button {
            background-color: #007bff;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin: 5px;
        }
        .button:hover {
            background-color: #0056b3;
        }
        .output {
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 5px;
            padding: 15px;
            margin-top: 20px;
            font-family: 'Courier New', monospace;
            white-space: pre-wrap;
            overflow-x: auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>${formData.title || 'Generated Page'}</h1>
        <p>${formData.description || 'This is a dynamically generated HTML page with inline CSS and JavaScript.'}</p>
        
        <div style="text-align: center; margin: 20px 0;">
            <button class="button" onclick="showAlert()">Click Me!</button>
            <button class="button" onclick="changeBackground()">Change Background</button>
            <button class="button" onclick="showTime()">Show Time</button>
        </div>
        
        <div id="output" class="output"></div>
    </div>

    <script>
        function showAlert() {
            alert('Hello! This is a JavaScript alert.');
        }
        
        function changeBackground() {
            const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            document.body.style.backgroundColor = randomColor;
        }
        
        function showTime() {
            const now = new Date();
            const timeString = now.toLocaleString();
            document.getElementById('output').innerHTML = 'Current time: ' + timeString;
        }
        
        // Add some interactive features
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Page loaded successfully!');
            
            // Add click event to container
            document.querySelector('.container').addEventListener('click', function(e) {
                if (e.target.tagName !== 'BUTTON') {
                    this.style.transform = 'scale(1.02)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 200);
                }
            });
        });
    </script>
</body>
</html>`;

    setGeneratedCode(htmlCode);
  };

  useEffect(() => {
    generateHTMLCode();
  }, [formData]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    alert('Code copied to clipboard!');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
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
          🚀 HTML5 Code Generator
        </h1>
        
        <p style={{
          textAlign: 'center',
          fontSize: '1.2em',
          color: '#666',
          marginBottom: '40px'
        }}>
          Generate HTML5 code with JavaScript and inline CSS
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '30px',
          marginBottom: '30px'
        }}>
          {/* Form Section */}
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #dee2e6'
          }}>
            <h2 style={{
              color: '#333',
              marginBottom: '20px',
              fontSize: '1.5em'
            }}>
              Customize Your Page
            </h2>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                marginBottom: '5px',
                fontWeight: 'bold',
                color: '#333'
              }}>
                Page Title:
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
                placeholder="Enter page title"
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                marginBottom: '5px',
                fontWeight: 'bold',
                color: '#333'
              }}>
                Description:
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                  minHeight: '80px',
                  resize: 'vertical'
                }}
                placeholder="Enter page description"
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                marginBottom: '5px',
                fontWeight: 'bold',
                color: '#333'
              }}>
                Background Color:
              </label>
              <input
                type="color"
                value={formData.backgroundColor}
                onChange={(e) => setFormData({...formData, backgroundColor: e.target.value})}
                style={{
                  width: '100%',
                  height: '40px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                marginBottom: '5px',
                fontWeight: 'bold',
                color: '#333'
              }}>
                Text Color:
              </label>
              <input
                type="color"
                value={formData.textColor}
                onChange={(e) => setFormData({...formData, textColor: e.target.value})}
                style={{
                  width: '100%',
                  height: '40px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                marginBottom: '5px',
                fontWeight: 'bold',
                color: '#333'
              }}>
                Font Size:
              </label>
              <select
                value={formData.fontSize}
                onChange={(e) => setFormData({...formData, fontSize: e.target.value})}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              >
                <option value="14px">Small (14px)</option>
                <option value="16px">Medium (16px)</option>
                <option value="18px">Large (18px)</option>
                <option value="20px">Extra Large (20px)</option>
              </select>
            </div>
          </div>

          {/* Preview Section */}
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #dee2e6'
          }}>
            <h2 style={{
              color: '#333',
              marginBottom: '20px',
              fontSize: '1.5em'
            }}>
              Live Preview
            </h2>
            
            <div style={{
              backgroundColor: formData.backgroundColor,
              color: formData.textColor,
              padding: '20px',
              borderRadius: '8px',
              fontSize: formData.fontSize,
              minHeight: '200px',
              border: '1px solid #ddd'
            }}>
              <h3 style={{ marginTop: '0', marginBottom: '10px' }}>
                {formData.title || 'Generated Page'}
              </h3>
              <p style={{ margin: '0' }}>
                {formData.description || 'This is a dynamically generated HTML page with inline CSS and JavaScript.'}
              </p>
            </div>
          </div>
        </div>

        {/* Generated Code Section */}
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #dee2e6',
          marginBottom: '20px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '15px'
          }}>
            <h2 style={{
              color: '#333',
              margin: '0',
              fontSize: '1.5em'
            }}>
              Generated HTML5 Code
            </h2>
            <button
              onClick={copyToClipboard}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              📋 Copy Code
            </button>
          </div>
          
          <pre style={{
            backgroundColor: '#2d3748',
            color: '#e2e8f0',
            padding: '20px',
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '12px',
            lineHeight: '1.4',
            maxHeight: '400px'
          }}>
            <code>{generatedCode}</code>
          </pre>
        </div>

        <div style={{
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#e8f5e8',
          borderRadius: '8px',
          border: '1px solid #4caf50'
        }}>
          <h3 style={{ color: '#2e7d32', marginTop: '0' }}>
            ✨ Features
          </h3>
          <p style={{ color: '#2e7d32', margin: '0' }}>
            • HTML5 compliant code • Inline CSS styling • JavaScript functionality • 
            Responsive design • Interactive buttons • Color customization • 
            Real-time preview • Copy to clipboard
          </p>
        </div>
      </div>
    </div>
  );
}

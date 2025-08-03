'use client';

import { useState, useEffect } from 'react';
import { getCookie, setCookie } from 'cookies-next';

interface Tab {
  id: string;
  name: string;
  icon: string;
  content: React.ReactNode;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = getCookie('activeTab');
    return savedTab ? String(savedTab) : 'generator';
  });
  const [isTabMenuOpen, setIsTabMenuOpen] = useState(false);

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

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setCookie('activeTab', tabId, { maxAge: 60 * 60 * 24 * 7 }); // 1 week
    setIsTabMenuOpen(false); // Close menu when tab is selected
  };

  // Tab content components
  const GeneratorTab = () => (
    <div>
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '30px', fontSize: '2em' }}>
        🚀 HTML5 Code Generator
      </h2>
      
      <p style={{ textAlign: 'center', fontSize: '1.2em', color: '#666', marginBottom: '40px' }}>
        Generate HTML5 code with JavaScript and inline CSS
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
        {/* Form Section */}
        <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', border: '1px solid #dee2e6' }}>
          <h3 style={{ color: '#333', marginBottom: '20px', fontSize: '1.5em' }}>Customize Your Page</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
              Page Title:
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
              placeholder="Enter page title"
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
              Description:
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', minHeight: '80px', resize: 'vertical' }}
              placeholder="Enter page description"
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
              Background Color:
            </label>
            <input
              type="color"
              value={formData.backgroundColor}
              onChange={(e) => setFormData({...formData, backgroundColor: e.target.value})}
              style={{ width: '100%', height: '40px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
              Text Color:
            </label>
            <input
              type="color"
              value={formData.textColor}
              onChange={(e) => setFormData({...formData, textColor: e.target.value})}
              style={{ width: '100%', height: '40px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
              Font Size:
            </label>
            <select
              value={formData.fontSize}
              onChange={(e) => setFormData({...formData, fontSize: e.target.value})}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
            >
              <option value="14px">Small (14px)</option>
              <option value="16px">Medium (16px)</option>
              <option value="18px">Large (18px)</option>
              <option value="20px">Extra Large (20px)</option>
            </select>
          </div>
        </div>

        {/* Preview Section */}
        <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', border: '1px solid #dee2e6' }}>
          <h3 style={{ color: '#333', marginBottom: '20px', fontSize: '1.5em' }}>Live Preview</h3>
          
          <div style={{
            backgroundColor: formData.backgroundColor,
            color: formData.textColor,
            padding: '20px',
            borderRadius: '8px',
            fontSize: formData.fontSize,
            minHeight: '200px',
            border: '1px solid #ddd'
          }}>
            <h4 style={{ marginTop: '0', marginBottom: '10px' }}>
              {formData.title || 'Generated Page'}
            </h4>
            <p style={{ margin: '0' }}>
              {formData.description || 'This is a dynamically generated HTML page with inline CSS and JavaScript.'}
            </p>
          </div>
        </div>
      </div>

      {/* Generated Code Section */}
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', border: '1px solid #dee2e6', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3 style={{ color: '#333', margin: '0', fontSize: '1.5em' }}>Generated HTML5 Code</h3>
          <button
            onClick={copyToClipboard}
            style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '14px' }}
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
    </div>
  );

  const AboutTab = () => (
    <div>
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '30px', fontSize: '2em' }}>
        👨‍💻 About Me
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
        {/* Personal Information */}
        <div style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', border: '1px solid #dee2e6' }}>
          <h3 style={{ color: '#333', marginBottom: '20px', fontSize: '1.8em' }}>📋 Personal Information</h3>
          
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
        <div style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', border: '1px solid #dee2e6' }}>
          <h3 style={{ color: '#333', marginBottom: '20px', fontSize: '1.8em' }}>🚀 Project Details</h3>
          
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
      <div style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', border: '1px solid #dee2e6', marginBottom: '30px' }}>
        <h3 style={{ color: '#333', marginBottom: '20px', fontSize: '1.8em', textAlign: 'center' }}>
          🎥 How to Use This Website
        </h3>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '300px',
          backgroundColor: '#e9ecef',
          borderRadius: '8px',
          border: '2px dashed #6c757d'
        }}>
          <div style={{ textAlign: 'center', color: '#6c757d' }}>
            <div style={{ fontSize: '4em', marginBottom: '20px' }}>📹</div>
            <h4 style={{ marginBottom: '10px', color: '#495057' }}>Video Tutorial Coming Soon</h4>
            <p style={{ margin: '0', fontSize: '1.1em' }}>
              A comprehensive video tutorial will be added here to demonstrate how to use the HTML5 Code Generator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const EscapeRoomTab = () => (
    <div>
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '30px', fontSize: '2em' }}>
        🚪 Escape Room
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
        {/* Student Information */}
        <div style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', border: '1px solid #dee2e6' }}>
          <h3 style={{ color: '#333', marginBottom: '20px', fontSize: '1.8em' }}>👨‍🎓 Student Information</h3>
          
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
        <div style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', border: '1px solid #dee2e6' }}>
          <h3 style={{ color: '#333', marginBottom: '20px', fontSize: '1.8em' }}>🎮 Game Overview</h3>
          
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
      <div style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', border: '1px solid #dee2e6', marginBottom: '30px' }}>
        <h3 style={{ color: '#333', marginBottom: '20px', fontSize: '1.8em', textAlign: 'center' }}>🎯 Game Levels</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #dc3545', boxShadow: '0 2px 4px rgba(220, 53, 69, 0.1)' }}>
            <h4 style={{ color: '#dc3545', marginBottom: '15px', fontSize: '1.3em' }}>🔓 Level 1: Code Breaker</h4>
            <p style={{ marginBottom: '15px', color: '#666' }}>Decrypt the hidden message using binary code patterns.</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#dc3545', fontSize: '0.9em' }}>2 puzzles</span>
              <button style={{ backgroundColor: '#dc3545', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9em' }}>
                Start Level
              </button>
            </div>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #fd7e14', boxShadow: '0 2px 4px rgba(253, 126, 20, 0.1)' }}>
            <h4 style={{ color: '#fd7e14', marginBottom: '15px', fontSize: '1.3em' }}>🧩 Level 2: Logic Labyrinth</h4>
            <p style={{ marginBottom: '15px', color: '#666' }}>Navigate through boolean logic gates and truth tables.</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#fd7e14', fontSize: '0.9em' }}>3 puzzles</span>
              <button style={{ backgroundColor: '#fd7e14', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9em' }}>
                Start Level
              </button>
            </div>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #28a745', boxShadow: '0 2px 4px rgba(40, 167, 69, 0.1)' }}>
            <h4 style={{ color: '#28a745', marginBottom: '15px', fontSize: '1.3em' }}>🎨 Level 3: CSS Maze</h4>
            <p style={{ marginBottom: '15px', color: '#666' }}>Solve CSS positioning puzzles to find the hidden path.</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#28a745', fontSize: '0.9em' }}>3 puzzles</span>
              <button style={{ backgroundColor: '#28a745', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9em' }}>
                Start Level
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CodingRacesTab = () => (
    <div>
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '30px', fontSize: '2em' }}>
        🏁 Coding Races
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
        {/* Student Information */}
        <div style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', border: '1px solid #dee2e6' }}>
          <h3 style={{ color: '#333', marginBottom: '20px', fontSize: '1.8em' }}>👨‍🎓 Student Information</h3>
          
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
            <span style={{ marginLeft: '10px', color: '#666' }}>Advanced Programming</span>
          </div>
        </div>

        {/* Competition Overview */}
        <div style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', border: '1px solid #dee2e6' }}>
          <h3 style={{ color: '#333', marginBottom: '20px', fontSize: '1.8em' }}>🏆 Competition Overview</h3>
          
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
      <div style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', border: '1px solid #dee2e6', marginBottom: '30px' }}>
        <h3 style={{ color: '#333', marginBottom: '20px', fontSize: '1.8em', textAlign: 'center' }}>🏁 Race Categories</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #6f42c1', boxShadow: '0 2px 4px rgba(111, 66, 193, 0.1)' }}>
            <h4 style={{ color: '#6f42c1', marginBottom: '15px', fontSize: '1.3em' }}>🥉 Beginner Sprint</h4>
            <p style={{ marginBottom: '15px', color: '#666' }}>Basic algorithms and data structures for newcomers.</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6f42c1', fontSize: '0.9em' }}>30 min</span>
              <button style={{ backgroundColor: '#6f42c1', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9em' }}>
                Join Race
              </button>
            </div>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #fd7e14', boxShadow: '0 2px 4px rgba(253, 126, 20, 0.1)' }}>
            <h4 style={{ color: '#fd7e14', marginBottom: '15px', fontSize: '1.3em' }}>🥈 Intermediate Marathon</h4>
            <p style={{ marginBottom: '15px', color: '#666' }}>Advanced algorithms and optimization challenges.</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#fd7e14', fontSize: '0.9em' }}>45 min</span>
              <button style={{ backgroundColor: '#fd7e14', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9em' }}>
                Join Race
              </button>
            </div>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #ffc107', boxShadow: '0 2px 4px rgba(255, 193, 7, 0.1)' }}>
            <h4 style={{ color: '#ffc107', marginBottom: '15px', fontSize: '1.3em' }}>🥇 Expert Ultra</h4>
            <p style={{ marginBottom: '15px', color: '#666' }}>Complex problem-solving and system design challenges.</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#ffc107', fontSize: '0.9em' }}>60 min</span>
              <button style={{ backgroundColor: '#ffc107', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9em' }}>
                Join Race
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    {
      id: 'generator',
      name: 'HTML5 Generator',
      icon: '🚀',
      content: <GeneratorTab />
    },
    {
      id: 'about',
      name: 'About',
      icon: '👨‍💻',
      content: <AboutTab />
    },
    {
      id: 'escape-room',
      name: 'Escape Room',
      icon: '🚪',
      content: <EscapeRoomTab />
    },
    {
      id: 'coding-races',
      name: 'Coding Races',
      icon: '🏁',
      content: <CodingRacesTab />
    }
  ];

  const activeTabContent = tabs.find(tab => tab.id === activeTab);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', backgroundColor: 'white', borderRadius: '10px', padding: '30px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        {/* Tab Navigation with Hamburger Menu */}
        <div style={{ borderBottom: '2px solid #e9ecef', marginBottom: '30px' }}>
          {/* Desktop Tab Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', flex: 1 }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  style={{
                    padding: '12px 24px',
                    border: 'none',
                    backgroundColor: activeTab === tab.id ? '#007bff' : 'transparent',
                    color: activeTab === tab.id ? 'white' : '#666',
                    borderRadius: '8px 8px 0 0',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span>{tab.icon}</span>
                  <span style={{ display: 'inline' }}>{tab.name}</span>
                </button>
              ))}
            </div>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setIsTabMenuOpen(!isTabMenuOpen)}
              style={{
                display: 'block',
                padding: '8px',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                borderRadius: '4px',
                transition: 'all 0.3s ease'
              }}
              aria-label="Toggle tab menu"
            >
              <div style={{ width: '24px', height: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <span 
                  style={{
                    display: 'block',
                    width: '20px',
                    height: '2px',
                    backgroundColor: '#666',
                    transition: 'all 0.3s ease',
                    transform: isTabMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
                  }}
                />
                <span 
                  style={{
                    display: 'block',
                    width: '20px',
                    height: '2px',
                    backgroundColor: '#666',
                    margin: '4px 0',
                    transition: 'all 0.3s ease',
                    opacity: isTabMenuOpen ? '0' : '1'
                  }}
                />
                <span 
                  style={{
                    display: 'block',
                    width: '20px',
                    height: '2px',
                    backgroundColor: '#666',
                    transition: 'all 0.3s ease',
                    transform: isTabMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'
                  }}
                />
              </div>
            </button>
          </div>

          {/* Mobile Tab Menu */}
          <div 
            style={{
              display: isTabMenuOpen ? 'block' : 'none',
              backgroundColor: '#f8f9fa',
              borderTop: '1px solid #dee2e6',
              padding: '15px',
              borderRadius: '0 0 8px 8px',
              marginTop: '10px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  style={{
                    padding: '12px 16px',
                    border: 'none',
                    backgroundColor: activeTab === tab.id ? '#007bff' : 'transparent',
                    color: activeTab === tab.id ? 'white' : '#666',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    textAlign: 'left'
                  }}
                >
                  <span>{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div style={{ minHeight: '500px' }}>
          {activeTabContent?.content}
        </div>
      </div>
    </div>
  );
}

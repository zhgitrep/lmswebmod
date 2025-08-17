'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { getCookie, setCookie } from 'cookies-next';

interface Tab {
  id: string;
  name: string;
  icon: string;
  content: React.ReactNode;
}

interface TabItem {
  id: string;
  header: string;
  content: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = getCookie('activeTab');
    const defaultTab = 'tabs';
    const allowedTabs = ['about', 'escape-room', 'coding-races', 'tabs'];
    const candidate = savedTab ? String(savedTab) : defaultTab;
    return allowedTabs.includes(candidate) ? candidate : defaultTab;
  });
  const [isTabMenuOpen, setIsTabMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const savedTab = getCookie('activeTab');
      if (savedTab) {
        setActiveTab(String(savedTab));
      }
      setMounted(true);
    }
  }, []);

  

  // Tabs functionality
  const [tabItems, setTabItems] = useState<TabItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedTabs = localStorage.getItem('tabs');
      return savedTabs ? JSON.parse(savedTabs) : [
        { id: '1', header: 'Step 1', content: '- Install VSCode\n-- Download from official website\n-- Install extensions\n- Install Chrome\n-- Download latest version\n-- Set as default browser' },
        { id: '2', header: 'Step 2', content: '- Install Node.js\n-- Download LTS version\n-- Verify installation\n- Install Git\n-- Configure user settings\n-- Set up SSH keys' },
        { id: '3', header: 'Step 3', content: '- Create project folder\n-- Initialize git repository\n-- Set up development environment\n- Install dependencies\n-- Run npm install\n-- Configure build tools' }
      ];
    }
    return [];
  });

  const [activeTabId, setActiveTabId] = useState('1');
  const [editingTabId, setEditingTabId] = useState<string | null>(null);
  const [editingHeader, setEditingHeader] = useState('');
  
  const prevActiveTabIdRef = useRef(activeTabId);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isSavingRef = useRef(false);
  
  // Debounced generated code state
  const [debouncedGeneratedCode, setDebouncedGeneratedCode] = useState('');
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);

  // Save tabs to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tabs', JSON.stringify(tabItems));
    }
  }, [tabItems]);

  // Initialize debounced code on mount
  useEffect(() => {
    setDebouncedGeneratedCode(generateTabsHTML());
  }, []);

  // Reset editing state when active tab changes
  useEffect(() => {
    if (editingTabId && editingTabId !== activeTabId) {
      setEditingTabId(null);
      setEditingHeader('');
    }
  }, [activeTabId, editingTabId]);

  // Load content into textarea when switching tabs
  useEffect(() => {
    if (textareaRef.current) {
      const currentContent = tabItems.find(tab => tab.id === activeTabId)?.content || '';
      textareaRef.current.value = currentContent;
    }
  }, [activeTabId]); // Only depend on activeTabId, not tabItems

  // Function to handle manual save
  const handleSave = () => {
    // Get content directly from textarea
    const textareaContent = textareaRef.current?.value || '';
    
    // Update tabItems using functional update to ensure we have the latest state
    setTabItems(prevTabItems => {
      const updatedTabItems = prevTabItems.map(tab => 
        tab.id === activeTabId ? { ...tab, content: textareaContent } : tab
      );
      
      // Generate code immediately with the updated content
      setIsGeneratingCode(true);
      
      // Create a temporary function to generate HTML with the updated content
      const generateHTMLWithUpdatedContent = () => {
        const activeTabItem = updatedTabItems.find(tab => tab.id === activeTabId);
        if (!activeTabItem) return '';

        // Convert content with dashes to HTML list
        const convertContentToHTML = (content: string) => {
          const lines = content.split('\n').filter(line => line.trim());
          let html = '<ul>';
          
          lines.forEach(line => {
            const trimmed = line.trim();
            if (trimmed.startsWith('-')) {
              const level = (trimmed.match(/^-+/)?.[0].length || 1) - 1;
              const text = trimmed.replace(/^-+\s*/, '');
              const indent = '  '.repeat(level);
              html += `${indent}<li>${text}</li>\n`;
            }
          });
          
          html += '</ul>';
          return html;
        };

        const htmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tabs Generator</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .tabs-header {
            display: flex;
            background-color: #f8f9fa;
            border-bottom: 2px solid #dee2e6;
            overflow-x: auto;
        }
        .tab-button {
            padding: 15px 25px;
            border: none;
            background-color: transparent;
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
            color: #666;
            transition: all 0.3s ease;
            white-space: nowrap;
            border-bottom: 3px solid transparent;
        }
        .tab-button:hover {
            background-color: #e9ecef;
            color: #333;
        }
        .tab-button.active {
            background-color: #007bff;
            color: white;
            border-bottom-color: #007bff;
        }
        .tab-content {
            padding: 30px;
            min-height: 400px;
        }
        .tab-panel {
            display: none;
        }
        .tab-panel.active {
            display: block;
        }
        h2 {
            color: #333;
            margin-bottom: 20px;
            font-size: 1.8em;
        }
        ul {
            line-height: 1.6;
            color: #555;
        }
        li {
            margin-bottom: 8px;
        }
        .copy-button {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            z-index: 1000;
        }
        .copy-button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="tabs-header">
            ${updatedTabItems.map(tab => `
                <button class="tab-button ${tab.id === activeTabId ? 'active' : ''}" onclick="showTab('${tab.id}')">
                    ${tab.header}
                </button>
            `).join('')}
        </div>
        
        ${updatedTabItems.map(tab => `
            <div id="tab-${tab.id}" class="tab-content tab-panel ${tab.id === activeTabId ? 'active' : ''}">
                <h2>${tab.header}</h2>
                ${convertContentToHTML(tab.content)}
            </div>
        `).join('')}
    </div>

    <button class="copy-button" onclick="copyToClipboard()">📋 Copy Code</button>

    <script>
        function showTab(tabId) {
            // Hide all tab panels
            const tabPanels = document.querySelectorAll('.tab-panel');
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Remove active class from all tab buttons
            const tabButtons = document.querySelectorAll('.tab-button');
            tabButtons.forEach(button => button.classList.remove('active'));
            
            // Show the selected tab panel
            const selectedPanel = document.getElementById('tab-' + tabId);
            if (selectedPanel) {
                selectedPanel.classList.add('active');
            }
            
            // Add active class to the clicked button
            const selectedButton = event.target;
            if (selectedButton) {
                selectedButton.classList.add('active');
            }
        }
        
        function copyToClipboard() {
            const code = document.documentElement.outerHTML;
            navigator.clipboard.writeText(code).then(() => {
                alert('Code copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy: ', err);
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = code;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                alert('Code copied to clipboard!');
            });
        }
    </script>
</body>
</html>`;

        return htmlCode;
      };
      
      setDebouncedGeneratedCode(generateHTMLWithUpdatedContent());
      setIsGeneratingCode(false);
      
      return updatedTabItems;
    });
    
    // Ensure textarea content persists after save by setting it again
    // This prevents the content from being reset to placeholder
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.value = textareaContent;
      }
    }, 0);
  };

  const addTab = () => {
    if (tabItems.length >= 15) {
      alert('Maximum 15 tabs allowed!');
      return;
    }
    const newId = (Math.max(...tabItems.map(t => parseInt(t.id))) + 1).toString();
    const newTab: TabItem = {
      id: newId,
      header: `Step ${newId}`,
      content: '- New step content\n-- Add your content here\n-- Use - for first level\n-- Use -- for second level'
    };
    setTabItems([...tabItems, newTab]);
    setActiveTabId(newId);
  };

  const removeTab = (id: string) => {
    if (tabItems.length <= 1) {
      alert('At least one tab must remain!');
      return;
    }
    const newTabs = tabItems.filter(tab => tab.id !== id);
    setTabItems(newTabs);
    if (activeTabId === id) {
      setActiveTabId(newTabs[0].id);
    }
  };

  const updateTabHeader = (id: string, header: string) => {
    setTabItems(tabItems.map(tab => 
      tab.id === id ? { ...tab, header } : tab
    ));
    setEditingTabId(null);
  };

  const updateTabContent = (id: string, content: string) => {
    setTabItems(tabItems.map(tab => 
      tab.id === id ? { ...tab, content } : tab
    ));
  };







  const startEditingHeader = (id: string, header: string) => {
    setEditingTabId(id);
    setEditingHeader(header);
  };

  const generateTabsHTML = useCallback(() => {
    const activeTabItem = tabItems.find(tab => tab.id === activeTabId);
    if (!activeTabItem) return '';

    // Convert content with dashes to HTML list
    const convertContentToHTML = (content: string) => {
      const lines = content.split('\n').filter(line => line.trim());
      let html = '<ul>';
      
      lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('-')) {
          const level = (trimmed.match(/^-+/)?.[0].length || 1) - 1;
          const text = trimmed.replace(/^-+\s*/, '');
          const indent = '  '.repeat(level);
          html += `${indent}<li>${text}</li>\n`;
        }
      });
      
      html += '</ul>';
      return html;
    };

    const htmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tabs Generator</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .tabs-header {
            display: flex;
            background-color: #f8f9fa;
            border-bottom: 2px solid #dee2e6;
            overflow-x: auto;
        }
        .tab-button {
            padding: 15px 25px;
            border: none;
            background-color: transparent;
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
            color: #666;
            transition: all 0.3s ease;
            white-space: nowrap;
            border-bottom: 3px solid transparent;
        }
        .tab-button:hover {
            background-color: #e9ecef;
            color: #333;
        }
        .tab-button.active {
            background-color: #007bff;
            color: white;
            border-bottom-color: #007bff;
        }
        .tab-content {
            padding: 30px;
            min-height: 400px;
        }
        .tab-panel {
            display: none;
        }
        .tab-panel.active {
            display: block;
        }
        h2 {
            color: #333;
            margin-bottom: 20px;
            font-size: 1.8em;
        }
        ul {
            line-height: 1.6;
            color: #555;
        }
        li {
            margin-bottom: 8px;
        }
        .copy-button {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #28a745;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            z-index: 1000;
        }
        .copy-button:hover {
            background-color: #218838;
        }
    </style>
</head>
<body>
    <button class="copy-button" onclick="copyCode()">📋 Copy Code</button>
    
    <div class="container">
        <div class="tabs-header">
${tabItems.map(tab => `
            <button class="tab-button ${tab.id === activeTabId ? 'active' : ''}" onclick="showTab('${tab.id}')">
                ${tab.header}
            </button>`).join('')}
        </div>
        
        <div class="tab-content">
${tabItems.map(tab => `
            <div id="tab-${tab.id}" class="tab-panel ${tab.id === activeTabId ? 'active' : ''}">
                <h2>${tab.header}</h2>
                ${convertContentToHTML(tab.content)}
            </div>`).join('')}
        </div>
    </div>

    <script>
        function showTab(tabId) {
            // Hide all tab panels
            const panels = document.querySelectorAll('.tab-panel');
            panels.forEach(panel => panel.classList.remove('active'));
            
            // Remove active class from all buttons
            const buttons = document.querySelectorAll('.tab-button');
            buttons.forEach(button => button.classList.remove('active'));
            
            // Show selected tab panel
            document.getElementById('tab-' + tabId).classList.add('active');
            
            // Add active class to clicked button
            event.target.classList.add('active');
        }
        
        function copyCode() {
            const code = document.documentElement.outerHTML;
            navigator.clipboard.writeText(code).then(() => {
                alert('Code copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy code: ', err);
                alert('Failed to copy code. Please try again.');
            });
        }
        
        // Add some interactive features
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Tabs page loaded successfully!');
            
            // Add smooth transitions
            const tabButtons = document.querySelectorAll('.tab-button');
            tabButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Add a subtle animation
                    this.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 150);
                });
            });
        });
    </script>
</body>
</html>`;

    return htmlCode;
  }, [activeTabId, tabItems]);

  const copyTabsCode = () => {
    const code = debouncedGeneratedCode;
    if (code) {
      navigator.clipboard.writeText(code);
      alert('Tabs code copied to clipboard!');
    } else {
      alert('Please wait for the code to finish generating...');
    }
  };

  // HTML5 generator code removed

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // Only run on client side
    if (typeof window !== 'undefined') {
      setCookie('activeTab', tabId, { maxAge: 60 * 60 * 24 * 7 }); // 1 week
    }
    setIsTabMenuOpen(false); // Close menu when tab is selected
  };

  const TabsTab = () => (
    <div>
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '30px', fontSize: '2em' }}>
        📑 Tabs Generator
      </h2>
      
      <p style={{ textAlign: 'center', fontSize: '1.2em', color: '#666', marginBottom: '40px' }}>
        Create and manage tabs with content. Generate HTML5 code that can be saved as a standalone file.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '20px', minHeight: '600px' }}>
        {/* Tabs Headers Panel */}
        <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', border: '1px solid #dee2e6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ color: '#333', margin: '0', fontSize: '1.5em' }}>Tabs Headers</h3>
            <button
              onClick={addTab}
              style={{ 
                backgroundColor: '#28a745', 
                color: 'white', 
                border: 'none', 
                padding: '8px 12px', 
                borderRadius: '4px', 
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
              disabled={tabItems.length >= 15}
            >
              +
            </button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {tabItems.map((tab) => (
              <div
                key={tab.id}
                style={{
                  padding: '12px',
                  backgroundColor: activeTabId === tab.id ? '#007bff' : 'white',
                  color: activeTabId === tab.id ? 'white' : '#333',
                  borderRadius: '6px',
                  border: '1px solid #dee2e6',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
                onClick={() => setActiveTabId(tab.id)}
              >
                <div style={{ flex: 1 }}>
                  {editingTabId === tab.id ? (
                    <input
                      type="text"
                      value={editingHeader}
                      onChange={(e) => setEditingHeader(e.target.value)}
                      onBlur={() => updateTabHeader(tab.id, editingHeader)}
                      onKeyPress={(e) => e.key === 'Enter' && updateTabHeader(tab.id, editingHeader)}
                      style={{
                        width: '100%',
                        padding: '4px 8px',
                        border: '1px solid #007bff',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                      autoFocus
                    />
                  ) : (
                    <span 
                      style={{ fontSize: '14px' }}
                      onDoubleClick={() => startEditingHeader(tab.id, tab.header)}
                    >
                      {tab.header}
                    </span>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTab(tab.id);
                  }}
                  style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    marginLeft: '8px'
                  }}
                >
                  -
                </button>
              </div>
            ))}
          </div>
          
          <p style={{ fontSize: '12px', color: '#666', marginTop: '15px', textAlign: 'center' }}>
            Double-click tab headers to edit • Max 15 tabs
          </p>
        </div>

        {/* Tabs Content Panel */}
        <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', border: '1px solid #dee2e6' }}>
          <h3 style={{ color: '#333', marginBottom: '20px', fontSize: '1.5em' }}>Tabs Content</h3>
          
          {tabItems.length > 0 && (
            <div>
              <h4 style={{ color: '#666', marginBottom: '15px', fontSize: '1.2em' }}>
                {tabItems.find(tab => tab.id === activeTabId)?.header}
              </h4>
              
              <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {isGeneratingCode ? 'Generating Code...' : 'Click Save to generate code'}
                </div>
                <button
                  onClick={handleSave}
                  disabled={isGeneratingCode}
                  style={{
                    backgroundColor: isGeneratingCode ? '#6c757d' : '#007bff',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: isGeneratingCode ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                >
                  {isGeneratingCode ? 'Generating...' : 'Save'}
                </button>
              </div>
              
              <textarea
                ref={textareaRef}
                style={{
                  width: '100%',
                  minHeight: '400px',
                  padding: '15px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: 'monospace',
                  lineHeight: '1.4',
                  resize: 'vertical'
                }}
                placeholder="Enter your content here...
Use - for first level items
Use -- for second level items
Use --- for third level items"
              />
              
              <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
                <strong>Formatting Guide:</strong><br/>
                • Use <code>-</code> for first level items<br/>
                • Use <code>--</code> for second level items<br/>
                • Use <code>---</code> for third level items<br/>
                • Each line will be converted to HTML list items
              </div>
            </div>
          )}
        </div>

        {/* Output Panel */}
        <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', border: '1px solid #dee2e6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ color: '#333', margin: '0', fontSize: '1.5em' }}>
              Output {isGeneratingCode && <span style={{ fontSize: '0.7em', color: '#999', opacity: 0.7 }}>⟳</span>}
            </h3>
            <button
              onClick={copyTabsCode}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
              disabled={isGeneratingCode}
            >
              📋 Copy
            </button>
          </div>
          
          <div style={{
            backgroundColor: '#2d3748',
            color: '#e2e8f0',
            padding: '15px',
            borderRadius: '6px',
            fontSize: '11px',
            lineHeight: '1.3',
            maxHeight: '500px',
            overflow: 'auto',
            fontFamily: 'monospace',
            position: 'relative'
          }}>
            {isGeneratingCode && (
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: 'rgba(0, 123, 255, 0.7)',
                color: 'white',
                padding: '3px 6px',
                borderRadius: '3px',
                fontSize: '9px',
                zIndex: 10,
                opacity: 0.8
              }}>
                ⏳
              </div>
            )}
            <pre style={{ margin: '0', whiteSpace: 'pre-wrap' }}>
              <code>{debouncedGeneratedCode}</code>
            </pre>
          </div>
          
          <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
            <strong>Instructions:</strong><br/>
            • Click &quot;Save&quot; to generate HTML code<br/>
            • Click &quot;Copy&quot; to copy the HTML code<br/>
            • Paste into a .html file<br/>
            • Open in any web browser
          </div>
        </div>
      </div>
    </div>
  );

  // HTML5 Generator removed

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
            <span style={{ marginLeft: '10px', color: '#666' }}>Tabs Generator, Dark/Light Mode</span>
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
          minHeight: '400px',
          backgroundColor: '#e9ecef',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <iframe
            src="https://drive.google.com/file/d/1q2FUMAbisH65pXbbB1wlH1PO0-1oRDFb/preview"
            width="100%"
            height="400"
            allow="autoplay"
            style={{
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          ></iframe>
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
    },
    {
      id: 'tabs',
      name: 'Tabs Generator',
      icon: '📑',
      content: <TabsTab />
    }
  ];

  const activeTabContent = tabs.find(tab => tab.id === activeTab);

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-5">
        <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-600 dark:text-gray-300">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-5">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
        {/* Tab Navigation with Hamburger Menu */}
        <div className="border-b-2 border-gray-200 dark:border-gray-700 mb-8">
          {/* Desktop Tab Navigation */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            minHeight: '60px'
          }}>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'row', 
              gap: '8px', 
              flex: 1, 
              overflowX: 'auto',
              alignItems: 'center'
            }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  style={{
                    padding: '16px 20px',
                    border: 'none',
                    borderRadius: '8px 8px 0 0',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '8px',
                    flexShrink: 0,
                    backgroundColor: activeTab === tab.id ? '#2563eb' : 'transparent',
                    color: activeTab === tab.id ? 'white' : '#374151',
                    boxShadow: activeTab === tab.id ? '0 4px 12px rgba(37, 99, 235, 0.3)' : 'none',
                    borderBottom: activeTab === tab.id ? '4px solid #1d4ed8' : 'none'
                  }}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>

            {/* Desktop controls: Hamburger + Dark Mode toggle (page-level) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '16px' }}>
              <button
                onClick={() => setIsTabMenuOpen(!isTabMenuOpen)}
                style={{ 
                  padding: '12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  backgroundColor: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  flexShrink: 0,
                  alignSelf: 'center',
                  minHeight: '50px',
                  height: '50px',
                  justifyContent: 'center',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.3s ease'
                }}
                aria-label="Toggle tab menu"
              >
                <div style={{ width: '20px', height: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <span 
                    style={{
                      display: 'block',
                      width: '18px',
                      height: '2px',
                      backgroundColor: '#666',
                      transition: 'all 0.3s ease',
                      transform: isTabMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
                    }}
                  />
                  <span 
                    style={{
                      display: 'block',
                      width: '18px',
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
                      width: '18px',
                      height: '2px',
                      backgroundColor: '#666',
                      transition: 'all 0.3s ease',
                      transform: isTabMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'
                    }}
                  />
                </div>
              </button>
              <button
                onClick={() => {
                  try {
                    // Access theme toggle via a custom event for ThemeProvider
                    document.dispatchEvent(new CustomEvent('toggle-theme'));
                  } catch {}
                }}
                style={{
                  padding: '12px 14px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                aria-label="Toggle dark mode"
              >
                <span>🌙</span>
                <span style={{ color: '#374151', fontSize: '14px' }} className="hidden sm:inline">Dark Mode</span>
              </button>
            </div>
          </div>

          {/* Tab Menu Dropdown */}
          <div 
            className={`${
              isTabMenuOpen ? 'block' : 'hidden'
            } bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-600 p-4 rounded-b-lg mt-2 shadow-lg`}
            style={{ 
              display: isTabMenuOpen ? 'block' : 'none'
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
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    textAlign: 'left',
                    backgroundColor: activeTab === tab.id ? '#2563eb' : 'transparent',
                    color: activeTab === tab.id ? 'white' : '#374151',
                    boxShadow: activeTab === tab.id ? '0 4px 12px rgba(37, 99, 235, 0.3)' : 'none',
                    borderLeft: activeTab === tab.id ? '4px solid #1d4ed8' : 'none',
                    fontWeight: activeTab === tab.id ? '600' : '500'
                  }}
                >
                  <span style={{ fontSize: '18px' }}>{tab.icon}</span>
                  <span style={{ fontWeight: '600' }}>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[500px]">
          {activeTabContent?.content}
        </div>
      </div>
    </div>
  );
}

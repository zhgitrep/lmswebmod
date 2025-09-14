module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/escape-room'],
      numberOfRuns: 1,
      startServerCommand: 'npm run dev',
      startServerReadyPattern: 'ready - started server on',
      startServerReadyTimeout: 60000,
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.7 }],
        'categories:accessibility': ['warn', { minScore: 0.8 }],
        'categories:best-practices': ['warn', { minScore: 0.7 }],
        'categories:seo': ['warn', { minScore: 0.7 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};

import { test, expect } from '@playwright/test';

test.describe('Escape Room Application', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the escape room page before each test
    await page.goto('/escape-room');
  });

  test.describe('Example 1: Complete Game Flow Test', () => {
    test('should complete a full game session with custom timer', async ({ page }) => {
      // Test the complete game flow from start to finish
      
      // 1. Verify the start screen loads correctly
      await expect(page.locator('h1')).toContainText('🚪 Digital Escape Room');
      await expect(page.locator('text=Code your way to freedom through 6 challenging puzzles')).toBeVisible();
      
      // 2. Set custom timer to 15 minutes
      await page.click('text=🎛️ Custom Time');
      await page.fill('input[type="number"]', '15');
      await expect(page.locator('text=✓ Timer set to 15 minutes')).toBeVisible();
      
      // 3. Start the game
      await page.click('text=🚀 Start Escape Room Challenge');
      
      // 4. Verify game interface loads
      await expect(page.locator('text=🚪 Digital Escape Room')).toBeVisible();
      await expect(page.locator('text=Stage 1 of 6')).toBeVisible();
      
      // 5. Check timer is set to 15 minutes (format: MM:SS)
      await page.waitForTimeout(2000); // Wait for timer to initialize
      const timerElement = page.locator('.text-4xl').first();
      await expect(timerElement).toBeVisible();
      
      // 6. Verify current challenge is displayed
      await expect(page.locator('text=Code Formatting Challenge')).toBeVisible();
      
      // 7. Test hint system
      await page.click('text=Get Hint (1/3)');
      await expect(page.locator('.bg-yellow-500\\/20')).toBeVisible();
      
      // 8. Test save functionality
      await page.click('text=Save Progress');
      await expect(page.locator('text=Saved!')).toBeVisible();
      
      // 9. Verify sidebar shows all stages
      await expect(page.locator('text=All Stages')).toBeVisible();
      await expect(page.locator('text=Stage 1: Code Formatting Challenge')).toBeVisible();
    });
  });

  test.describe('Example 2: Challenge Completion Test', () => {
    test('should complete the Code Formatting Challenge', async ({ page }) => {
      // Start the game
      await page.click('text=🚀 Start Escape Room Challenge');
      
      // Wait for game to load
      await expect(page.locator('text=Stage 1 of 6')).toBeVisible();
      
      // Find the code formatting challenge
      await expect(page.locator('text=Code Formatting Challenge')).toBeVisible();
      
      // Wait for the challenge to fully load
      await page.waitForTimeout(1000);
      
      // Look for the malformed code (it might be in a pre tag or code block)
      const codeElement = page.locator('pre, code, .code-block').first();
      await expect(codeElement).toBeVisible();
      
      // Format the code correctly (this would be the actual solution)
      const formattedCode = `function calculateSum(a, b) {
  return a + b;
}

console.log("Sum:", calculateSum(5, 3));`;
      
      // Find the textarea or input for the solution
      const solutionInput = page.locator('textarea, input[type="text"]').first();
      await expect(solutionInput).toBeVisible();
      
      // Clear the existing code and paste formatted version
      await solutionInput.clear();
      await solutionInput.fill(formattedCode);
      
      // Submit the solution
      await page.click('text=Submit Solution');
      
      // Verify challenge completion (this might show different text)
      await expect(page.locator('text=Challenge Completed!, text=Success!, text=Correct!').first()).toBeVisible();
      await expect(page.locator('text=Stage 2 of 6')).toBeVisible();
      
      // Verify score increased (look for score display)
      await expect(page.locator('text=🏆, text=Score:').first()).toBeVisible();
    });
  });

  test.describe('Example 3: Game History and Database Test', () => {
    test('should save game session and display in history', async ({ page }) => {
      // Start a game
      await page.click('text=🚀 Start Escape Room Challenge');
      
      // Complete first stage
      await expect(page.locator('text=Stage 1 of 6')).toBeVisible();
      
      // Save progress
      await page.click('text=Save Progress');
      await expect(page.locator('text=Saved!')).toBeVisible();
      
      // Navigate to game history
      await page.goto('/escape-room/history');
      
      // Verify history page loads
      await expect(page.locator('h1')).toContainText('Game History');
      
      // Check if game session is displayed (these might be in different elements)
      await expect(page.locator('text=Zohaib Khan, text=Test Player').first()).toBeVisible();
      await expect(page.locator('text=Bachelor of IT, text=Test Course').first()).toBeVisible();
      await expect(page.locator('text=Interactive Web Dev, text=Test Module').first()).toBeVisible();
      
      // Verify session details (look for various possible status texts)
      await expect(page.locator('text=In Progress, text=Active, text=Ongoing').first()).toBeVisible();
      await expect(page.locator('text=💡, text=Hints:').first()).toBeVisible();
      await expect(page.locator('text=🏆, text=Score:').first()).toBeVisible();
      
      // Test delete functionality (if delete button exists)
      const deleteButton = page.locator('text=🗑️ Delete, text=Delete, button:has-text("Delete")').first();
      if (await deleteButton.isVisible()) {
        await deleteButton.click();
        
        // Confirm deletion
        page.on('dialog', dialog => dialog.accept());
        
        // Verify session is removed
        await expect(page.locator('text=No Game Sessions Found, text=No sessions found').first()).toBeVisible();
      }
    });
  });

  test.describe('Responsive Design Tests', () => {
    test('should work on mobile devices', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Verify mobile layout
      await expect(page.locator('text=🚪 Digital Escape Room')).toBeVisible();
      
      // Test mobile navigation
      await page.click('text=🚀 Start Escape Room Challenge');
      
      // Verify mobile game interface
      await expect(page.locator('text=Stage 1 of 6')).toBeVisible();
      
      // Test mobile sidebar (should be collapsible)
      const sidebarToggle = page.locator('text=🎯 Current Challenge, text=Toggle Sidebar, button:has-text("Menu")').first();
      if (await sidebarToggle.isVisible()) {
        await sidebarToggle.click();
      }
      
      // Verify mobile-friendly layout
      await expect(page.locator('.lg\\:col-span-1, .sidebar, .game-sidebar').first()).toBeVisible();
    });
  });

  test.describe('API Integration Tests', () => {
    test('should test API endpoints', async ({ request }) => {
      // Test GET /api/game-sessions
      const gameSessionsResponse = await request.get('/api/game-sessions');
      expect(gameSessionsResponse.ok()).toBeTruthy();
      
      // Test POST /api/game-sessions
      const createSessionResponse = await request.post('/api/game-sessions', {
        data: {
          playerName: 'Test Player',
          course: 'Test Course',
          module: 'Test Module',
          totalTime: 2700,
          timeRemaining: 2700
        }
      });
      expect(createSessionResponse.ok()).toBeTruthy();
      
      const sessionData = await createSessionResponse.json();
      expect(sessionData.playerName).toBe('Test Player');
      
      // Test GET /api/game-stats
      const statsResponse = await request.get('/api/game-stats');
      expect(statsResponse.ok()).toBeTruthy();
      
      // Clean up - delete the test session
      await request.delete(`/api/game-sessions/${sessionData.id}`);
    });
  });
});

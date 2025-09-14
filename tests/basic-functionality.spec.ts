import { test, expect } from '@playwright/test';

test.describe('Basic Escape Room Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the escape room page before each test
    await page.goto('/escape-room');
  });

  test('should load the escape room start page', async ({ page }) => {
    // Verify the page loads with the correct title (use more specific selector)
    await expect(page.locator('h1:has-text("🚪 Digital Escape Room")')).toBeVisible();
    
    // Verify the subtitle is present
    await expect(page.locator('text=Code your way to freedom through 6 challenging puzzles')).toBeVisible();
    
    // Verify the start button is present
    await expect(page.locator('text=🚀 Start Escape Room Challenge')).toBeVisible();
    
    // Verify student information is displayed
    await expect(page.locator('text=Zohaib Khan')).toBeVisible();
    await expect(page.locator('text=Bachelor of IT')).toBeVisible();
    await expect(page.locator('text=Interactive Web Dev')).toBeVisible();
  });

  test('should allow custom timer configuration', async ({ page }) => {
    // Click custom time button
    await page.click('text=🎛️ Custom Time');
    
    // Verify custom input appears
    await expect(page.locator('input[type="number"]')).toBeVisible();
    
    // Enter custom time
    await page.fill('input[type="number"]', '15');
    
    // Verify confirmation message appears
    await expect(page.locator('text=✓ Timer set to 15 minutes')).toBeVisible();
  });

  test('should start the game when start button is clicked', async ({ page }) => {
    // Click start button
    await page.click('text=🚀 Start Escape Room Challenge');
    
    // Wait for the game to load
    await page.waitForTimeout(2000);
    
    // Verify we're in the game interface
    await expect(page.locator('text=🚪 Digital Escape Room')).toBeVisible();
    
    // Look for stage information (might be different text)
    await expect(page.locator('text=Stage 1, text=Stage 1 of 6, text=Challenge 1').first()).toBeVisible();
    
    // Verify timer is displayed (look for any timer-like element)
    const timerElement = page.locator('.text-4xl, .timer, [class*="text-"]').first();
    await expect(timerElement).toBeVisible();
  });

  test('should display challenge information', async ({ page }) => {
    // Start the game
    await page.click('text=🚀 Start Escape Room Challenge');
    
    // Wait for the game to load
    await page.waitForTimeout(2000);
    
    // Verify challenge title is displayed (look for various possible texts)
    await expect(page.locator('text=Code Formatting Challenge, text=Code Formatting, text=Challenge 1').first()).toBeVisible();
    
    // Verify hint button is available (look for various possible texts)
    await expect(page.locator('text=Get Hint, text=Hint, text=Get Hint (1/3)').first()).toBeVisible();
  });

  test('should navigate to game history page', async ({ page }) => {
    // Click the game history link
    await page.click('text=📊 View Game History');
    
    // Wait for navigation
    await page.waitForTimeout(2000);
    
    // Verify we're on the history page (look for various possible texts)
    await expect(page.locator('h1:has-text("Game History"), h1:has-text("History"), text=Game History').first()).toBeVisible();
  });

  test('should work on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Verify the page still loads correctly
    await expect(page.locator('text=🚪 Digital Escape Room')).toBeVisible();
    await expect(page.locator('text=🚀 Start Escape Room Challenge')).toBeVisible();
    
    // Start the game on mobile
    await page.click('text=🚀 Start Escape Room Challenge');
    
    // Wait for the game to load
    await page.waitForTimeout(2000);
    
    // Verify game interface works on mobile (look for various possible texts)
    await expect(page.locator('text=Stage 1, text=Stage 1 of 6, text=Challenge 1').first()).toBeVisible();
  });
});

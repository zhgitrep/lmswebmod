import { test, expect } from '@playwright/test';

test.describe('Simple Escape Room Tests', () => {
  test('should load escape room page', async ({ page }) => {
    // Navigate to escape room
    await page.goto('/escape-room');
    
    // Check if the main title is visible
    await expect(page.locator('h1:has-text("🚪 Digital Escape Room")')).toBeVisible();
    
    // Check if start button exists
    await expect(page.locator('button:has-text("🚀 Start Escape Room Challenge")')).toBeVisible();
  });

  test('should allow custom timer setup', async ({ page }) => {
    await page.goto('/escape-room');
    
    // Click custom time button
    await page.click('button:has-text("🎛️ Custom Time")');
    
    // Check if input field appears
    await expect(page.locator('input[type="number"]')).toBeVisible();
    
    // Enter a custom time
    await page.fill('input[type="number"]', '15');
    
    // Check if confirmation appears
    await expect(page.locator('text=✓ Timer set to 15 minutes')).toBeVisible();
  });

  test('should navigate to history page', async ({ page }) => {
    await page.goto('/escape-room');
    
    // Click history link
    await page.click('a:has-text("📊 View Game History")');
    
    // Wait for navigation
    await page.waitForTimeout(2000);
    
    // Check if we're on a different page (URL should change)
    expect(page.url()).toContain('/escape-room/history');
  });

  test('should work on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/escape-room');
    
    // Check if page loads on mobile
    await expect(page.locator('h1:has-text("🚪 Digital Escape Room")')).toBeVisible();
    await expect(page.locator('button:has-text("🚀 Start Escape Room Challenge")')).toBeVisible();
  });
});

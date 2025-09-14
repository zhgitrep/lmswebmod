# 🧪 Testing Documentation

This document describes the comprehensive testing setup for the Escape Room application.

## 📋 Test Overview

### **Playwright Tests**
- **E2E Testing**: Complete user journey testing
- **Cross-browser Testing**: Chrome, Firefox, Safari, Mobile
- **API Testing**: Database integration testing
- **Responsive Testing**: Mobile and desktop layouts

### **Lighthouse Tests**
- **Performance Testing**: Core Web Vitals
- **Accessibility Testing**: WCAG compliance
- **Best Practices**: Security and optimization
- **SEO Testing**: Search engine optimization

## 🚀 Running Tests

### **Playwright Tests**

```bash
# Run all tests
npm run test

# Run tests with UI (interactive)
npm run test:ui

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests in debug mode
npm run test:debug

# View test report
npm run test:report
```

### **Lighthouse Tests**

```bash
# Run Lighthouse CI
npm run lighthouse

# View Lighthouse results
npm run lighthouse:view
```

### **Run All Tests**

```bash
# Run both Playwright and Lighthouse tests
npm run test:all
```

## 📊 Test Examples

### **Example 1: Complete Game Flow Test**
Tests the entire user journey from start to finish:
- ✅ Start screen validation
- ✅ Custom timer configuration
- ✅ Game interface loading
- ✅ Timer verification
- ✅ Challenge display
- ✅ Hint system functionality
- ✅ Save progress feature
- ✅ Sidebar navigation

### **Example 2: Challenge Completion Test**
Tests specific challenge completion:
- ✅ Code formatting challenge
- ✅ Solution submission
- ✅ Challenge completion verification
- ✅ Score tracking
- ✅ Stage progression

### **Example 3: Game History and Database Test**
Tests database integration:
- ✅ Game session creation
- ✅ Progress saving
- ✅ History page display
- ✅ Session management
- ✅ Delete functionality

## 🔧 Test Configuration

### **Playwright Configuration**
- **Browsers**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari
- **Parallel Execution**: Enabled for faster testing
- **Retry Logic**: 2 retries on CI
- **Screenshots**: On failure
- **Videos**: On failure
- **Traces**: On first retry

### **Lighthouse Configuration**
- **URLs Tested**: Home, Escape Room, History
- **Runs**: 3 per URL for accuracy
- **Performance Threshold**: 80%
- **Accessibility Threshold**: 90%
- **Best Practices Threshold**: 80%
- **SEO Threshold**: 80%

## 📈 Performance Metrics

### **Core Web Vitals**
- **First Contentful Paint**: < 2s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Total Blocking Time**: < 300ms

### **Accessibility Standards**
- **WCAG 2.1 AA Compliance**: Required
- **Keyboard Navigation**: Full support
- **Screen Reader Support**: Required
- **Color Contrast**: 4.5:1 minimum

## 🐛 Debugging Tests

### **Playwright Debugging**
```bash
# Run specific test file
npx playwright test tests/escape-room.spec.ts

# Run specific test
npx playwright test -g "should complete a full game session"

# Debug with browser
npx playwright test --headed --debug
```

### **Lighthouse Debugging**
```bash
# Run Lighthouse manually
npx lighthouse http://localhost:3000/escape-room

# Generate detailed report
npx lighthouse http://localhost:3000/escape-room --output html --output-path ./lighthouse-report.html
```

## 📝 Test Reports

### **Playwright Reports**
- **HTML Report**: `playwright-report/index.html`
- **JSON Report**: `test-results/results.json`
- **JUnit Report**: `test-results/results.xml`

### **Lighthouse Reports**
- **CI Report**: Uploaded to temporary storage
- **Local Report**: `lighthouse-report.html`

## 🔄 Continuous Integration

### **GitHub Actions Example**
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run test:all
```

## 🎯 Test Coverage

### **Frontend Coverage**
- ✅ Page navigation
- ✅ User interactions
- ✅ Form submissions
- ✅ Error handling
- ✅ Responsive design

### **Backend Coverage**
- ✅ API endpoints
- ✅ Database operations
- ✅ Error responses
- ✅ Data validation

### **Integration Coverage**
- ✅ Database connectivity
- ✅ Session management
- ✅ Progress tracking
- ✅ History functionality

## 🚨 Common Issues

### **Playwright Issues**
1. **Element not found**: Check selectors and timing
2. **Timeout errors**: Increase timeout or add waits
3. **Browser compatibility**: Test on multiple browsers

### **Lighthouse Issues**
1. **Performance issues**: Optimize images and code
2. **Accessibility issues**: Add ARIA labels and keyboard support
3. **SEO issues**: Add meta tags and structured data

## 📚 Best Practices

1. **Test Isolation**: Each test should be independent
2. **Data Cleanup**: Clean up test data after tests
3. **Realistic Data**: Use realistic test scenarios
4. **Error Scenarios**: Test error conditions
5. **Performance**: Monitor test execution time

## 🔗 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Core Web Vitals](https://web.dev/vitals/)

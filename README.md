# LTU Moodle App Generator

A comprehensive Next.js web application for generating HTML5 code, managing interactive tabs, and providing educational tools for La Trobe University students.

## 🚀 Features

### Core Features
- **Tabs Generator**: Build interactive tabbed interfaces with custom content and step-by-step instructions
- **About Section**: Student information, project details, and video tutorial
- **Escape Room**: Interactive coding puzzles and challenges
- **Coding Races**: Real-time programming competitions

### Technical Features
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Dark/Light Mode**: Theme switching capability with persistent preferences
- **Cookie Management**: Persistent user preferences and navigation state
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA labels
- **TypeScript**: Full type safety and better development experience
- **Video Integration**: Embedded Google Drive video tutorials
- **Database Integration**: PostgreSQL with Prisma ORM for game sessions and statistics
- **RESTful API**: Complete API for game management and data persistence
- **Automated Testing**: Playwright E2E tests and Lighthouse performance testing

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **Git** (for version control)
- **PostgreSQL** (for database functionality)
- **Docker** (optional, for containerized database)

## 🛠️ Installation

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ltu-moodle-clean
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   # Set up environment variables
   cp .env.example .env.local
   
   # Add your database URL to .env.local
   DATABASE_URL="postgresql://username:password@localhost:5432/ltu_moodle_db"
   ```

4. **Initialize the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### Alternative Package Managers

If you prefer using other package managers:

```bash
# Using Yarn
yarn install
yarn dev

# Using pnpm
pnpm install
pnpm dev

# Using Bun
bun install
bun dev
```

## 🎯 Usage Guide

### Tabs Generator
1. Navigate to the "Tabs Generator" tab
2. **Manage Tabs**:
   - Click "+" to add new tabs (maximum 15)
   - Double-click tab headers to edit them
   - Click "-" to remove tabs (minimum 1 tab required)
3. **Add Content**:
   - Select a tab to edit its content
   - Use `-` for first-level items
   - Use `--` for second-level items
   - Use `---` for third-level items
4. **Generate Code**:
   - Click "💡 Save" to generate HTML code
   - Click "📋 Copy" to copy the generated code
   - Save as `.html` file and open in browser

### About Section
- View student information and project details
- Watch embedded video tutorial for usage instructions
- Access project documentation and features overview

### Escape Room
- **6 Interactive Coding Challenges**: Code formatting, debug clicking, number generation, data conversion, CSS positioning, and logic gates
- **45-minute Timer**: Customizable timer with real-time countdown
- **Hint System**: Progressive hints for each challenge
- **Progress Tracking**: Save and resume game sessions
- **Database Integration**: Persistent game history and statistics
- **Real-time Scoring**: Dynamic scoring based on completion time and hints used

#### Challenge Types:
1. **🔧 Code Formatting**: Fix JavaScript syntax and formatting issues
2. **🐛 Debug Click**: Identify debugging tools from visual options
3. **🔢 Number Generator**: Write code to generate numbers 0-1000
4. **📊 Data Port**: Convert JSON data to CSV format
5. **🎨 CSS Positioning**: Position elements to create visual patterns
6. **⚡ Logic Gates**: Solve boolean logic puzzles with AND/OR/NOT gates

### Coding Races
- Real-time programming competitions
- Multiple programming languages supported
- Competitive leaderboards

## 🏗️ Project Structure

```
ltu-moodle-clean/
├── src/
│   ├── app/
│   │   ├── about/
│   │   │   └── page.tsx          # About page component
│   │   ├── coding-races/
│   │   │   └── page.tsx          # Coding races page
│   │   ├── escape-room/
│   │   │   └── page.tsx          # Escape room page
│   │   ├── pre-lab/
│   │   │   └── page.tsx          # Pre-lab page
│   │   ├── components/
│   │   │   ├── Footer.tsx        # Footer component
│   │   │   ├── Header.tsx        # Header component with centered title
│   │   │   └── ThemeProvider.tsx # Theme provider
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Main page with tabs and video integration
│   └── ...
├── public/                        # Static assets
├── package.json                   # Dependencies and scripts
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint for code quality

# Database
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema changes to database
npx prisma studio    # Open Prisma Studio (database GUI)

# Testing
npm run test         # Run Playwright E2E tests
npm run test:ui      # Run tests with interactive UI
npm run test:headed  # Run tests in headed mode (see browser)
npm run test:report  # View test report
npm run lighthouse   # Run Lighthouse performance tests

# Package Manager Alternatives
yarn dev             # Using Yarn
pnpm dev             # Using pnpm
bun dev              # Using Bun
```

## 🧰 Technology Stack

### Frontend
- **Next.js 15.4.4**: React framework with App Router and Turbopack
- **React 19.1.0**: UI library with hooks and modern patterns
- **TypeScript 5**: Type safety and better development experience
- **Tailwind CSS 4.1.11**: Utility-first CSS framework

### Development Tools
- **ESLint**: Code linting and quality assurance
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

### Backend
- **Prisma**: Database ORM and query builder
- **PostgreSQL**: Primary database for game sessions and statistics
- **Next.js API Routes**: Server-side API endpoints

### Dependencies
- **cookies-next**: Cookie management for user preferences
- **@types/node**: TypeScript definitions for Node.js
- **@types/react**: TypeScript definitions for React
- **@prisma/client**: Database client for Prisma ORM

### Testing & Quality
- **Playwright**: End-to-end testing framework
- **Lighthouse**: Performance and accessibility testing
- **ESLint**: Code linting and quality assurance

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Proper ARIA labels
- Keyboard navigation support
- Screen reader friendly
- High contrast mode support

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory for environment-specific settings:

```env
# Example environment variables
NEXT_PUBLIC_API_URL=your_api_url_here
NEXT_PUBLIC_APP_NAME=LTU Moodle Generator
```

### Tailwind Configuration
The project uses Tailwind CSS v4 with custom configuration in `tailwind.config.ts`.

### Next.js Configuration
Custom Next.js configuration is available in `next.config.ts`.

## 🗄️ Database Schema

The application uses PostgreSQL with Prisma ORM for data persistence. The database schema includes:

### Models

#### GameSession
- **id**: Unique identifier (CUID)
- **playerName**: Student name
- **course**: Course name
- **module**: Module name
- **startTime**: Game start timestamp
- **endTime**: Game end timestamp (optional)
- **totalTime**: Total time in seconds
- **timeRemaining**: Remaining time in seconds
- **score**: Final score
- **hintsUsed**: Number of hints used
- **isCompleted**: Game completion status

#### StageCompletion
- **id**: Unique identifier (CUID)
- **gameSessionId**: Reference to GameSession
- **stageId**: Stage number
- **stageTitle**: Stage title
- **stageType**: Type of challenge
- **completed**: Completion status
- **timeSpent**: Time spent on stage
- **hintsUsed**: Hints used on stage
- **completedAt**: Completion timestamp

#### CustomTimer
- **id**: Unique identifier (CUID)
- **gameSessionId**: Reference to GameSession
- **duration**: Custom timer duration in minutes

#### GameStats
- **id**: Unique identifier (CUID)
- **totalGames**: Total number of games
- **completedGames**: Number of completed games
- **averageScore**: Average score across all games
- **averageTime**: Average completion time
- **totalHintsUsed**: Total hints used

## 🔌 API Endpoints

### Game Sessions
- **GET** `/api/game-sessions` - Retrieve all game sessions
- **POST** `/api/game-sessions` - Create a new game session
- **GET** `/api/game-sessions/[id]` - Retrieve specific game session
- **PUT** `/api/game-sessions/[id]` - Update game session
- **DELETE** `/api/game-sessions/[id]` - Delete game session

### Stage Completions
- **POST** `/api/stages` - Save stage completion data

### Game Statistics
- **GET** `/api/game-stats` - Retrieve game statistics
- **POST** `/api/game-stats` - Update game statistics

### Example API Usage

#### Create Game Session
```javascript
const response = await fetch('/api/game-sessions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    playerName: 'John Doe',
    course: 'Bachelor of IT',
    module: 'Interactive Web Dev',
    totalTime: 2700,
    timeRemaining: 2700,
    customTimerDuration: 45
  })
});
```

#### Save Stage Completion
```javascript
const response = await fetch('/api/stages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    gameSessionId: 'clx...',
    stageId: 1,
    stageTitle: 'Code Formatting Challenge',
    stageType: 'code-format',
    completed: true,
    timeSpent: 180,
    hintsUsed: 1
  })
});
```

## 🧪 Testing & Quality Assurance

### Automated Testing Suite

The application includes comprehensive testing with **Playwright** for E2E testing and **Lighthouse** for performance analysis.

#### Playwright Tests
- **Cross-browser Testing**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari
- **E2E Scenarios**: Complete user journeys from game start to completion
- **API Testing**: Database integration and endpoint validation
- **Responsive Testing**: Mobile and desktop layout verification
- **Accessibility Testing**: WCAG compliance verification

#### Test Coverage
- ✅ **20/20 Tests Passing** across all browsers
- ✅ **Complete Game Flow**: Start → Play → Complete → Save
- ✅ **Challenge Completion**: All 6 challenge types tested
- ✅ **Database Integration**: Session management and persistence
- ✅ **Mobile Responsiveness**: Touch interactions and layouts

#### Lighthouse Performance
- **Performance Score**: 42/100 (optimization needed)
- **Accessibility Score**: 85/100 ✅
- **Best Practices Score**: 75/100 ✅
- **SEO Score**: 80/100 ✅

### Running Tests

```bash
# Run all Playwright tests
npm run test

# Run tests with interactive UI
npm run test:ui

# Run tests in headed mode (see browser)
npm run test:headed

# Run Lighthouse performance tests
npm run lighthouse

# View test reports
npm run test:report
```

### Test Configuration
- **Parallel Execution**: Tests run in parallel for faster execution
- **Retry Logic**: 2 retries on CI for flaky tests
- **Screenshots**: Captured on test failures
- **Videos**: Recorded on test failures
- **Traces**: Generated on first retry for debugging

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms
- **Netlify**: Use `npm run build` and deploy the `out` directory
- **Railway**: Connect your GitHub repository
- **Heroku**: Add buildpack and deploy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Zohaib Khan**
- **Course**: Bachelor of Information Technology
- **Institution**: La Trobe University


## 🆘 Support

If you encounter any issues:

1. Check the browser console for errors
2. Ensure all dependencies are installed correctly
3. Verify Node.js version compatibility
4. Watch the embedded video tutorial in the About section
5. Create an issue in the repository

## 🔄 Recent Updates

### Latest Features
- ✅ **Complete Escape Room System**: 6 interactive coding challenges with progressive difficulty
- ✅ **Database Integration**: Full PostgreSQL integration with Prisma ORM for game persistence
- ✅ **RESTful API**: Complete API for game session management and statistics
- ✅ **Automated Testing**: Comprehensive Playwright E2E tests and Lighthouse performance testing
- ✅ **Game History**: Persistent game sessions with detailed progress tracking
- ✅ **Hint System**: Progressive hints for each challenge with usage tracking
- ✅ **Custom Timer**: Configurable game duration with real-time countdown
- ✅ **Enhanced Tabs Generator**: Improved UI with highlighted instructions and better user guidance
- ✅ **Video Integration**: Embedded Google Drive video tutorial in About section

### Technical Improvements
- ✅ **Database Schema**: Complete Prisma schema with relationships and constraints
- ✅ **API Architecture**: RESTful endpoints with proper error handling and validation
- ✅ **Testing Coverage**: 20/20 tests passing across all browsers and devices
- ✅ **Performance Monitoring**: Lighthouse CI integration for continuous performance tracking
- ✅ **Responsive Design**: Improved mobile and desktop layouts with touch support
- ✅ **Code Quality**: Enhanced TypeScript types and component structure
- ✅ **Accessibility**: WCAG 2.1 AA compliance with proper ARIA labels

## 🎮 Escape Room Solutions

Complete solutions for all challenges are available in the codebase:
- **Quick Solutions**: `src/app/escape-room/quick-solutions.md` - Fast reference for all challenges
- **Detailed Solutions**: `src/app/escape-room/solutions.md` - Comprehensive explanations with examples
- **Test Page**: `/escape-room/test` - Practice individual challenges

### Challenge Solutions Overview:
1. **Code Formatting**: Fix JavaScript syntax and indentation
2. **Debug Click**: Click on the 🐛 Console Debugger image
3. **Number Generator**: Use `Array.from({length: 1001}, (_, i) => i)`
4. **Data Port**: Convert JSON to CSV with proper headers
5. **CSS Positioning**: Position boxes in diagonal pattern
6. **Logic Gates**: Solve boolean logic with AND/OR/NOT gates

## 📚 Learning Resources

### Core Technologies
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Database & API
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

### Testing & Quality
- [Playwright Documentation](https://playwright.dev/)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Core Web Vitals](https://web.dev/vitals/)

---
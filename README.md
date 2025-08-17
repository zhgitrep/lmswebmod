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

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **Git** (for version control)

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

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
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
- Interactive coding puzzles and challenges
- Multiple difficulty levels
- Real-time feedback and scoring

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

### Dependencies
- **cookies-next**: Cookie management for user preferences
- **@types/node**: TypeScript definitions for Node.js
- **@types/react**: TypeScript definitions for React

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
- ✅ **Enhanced Tabs Generator**: Improved UI with highlighted instructions and better user guidance
- ✅ **Video Integration**: Embedded Google Drive video tutorial in About section
- ✅ **UI Improvements**: Centered header title and optimized layout
- ✅ **Tab Reordering**: Tabs Generator moved next to About for better accessibility
- ✅ **Enhanced Instructions**: Prominent "Click Save to generate code" instruction with visual highlighting

### Technical Improvements
- ✅ **Header Centering**: Fixed title alignment with explicit inline styles
- ✅ **Responsive Design**: Improved mobile and desktop layouts
- ✅ **Code Quality**: Enhanced TypeScript types and component structure

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---
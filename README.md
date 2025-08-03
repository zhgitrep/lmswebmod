# LTU Moodle Step-by-Step Generator

A comprehensive Next.js web application for generating HTML5 code, managing interactive tabs, and providing educational tools for La Trobe University students.

## 🚀 Features

### Core Features
- **HTML5 Code Generator**: Create complete HTML5 pages with inline CSS and JavaScript
- **Tabs Generator**: Build interactive tabbed interfaces with custom content
- **Escape Room**: Interactive coding puzzles and challenges
- **Coding Races**: Real-time programming competitions
- **About Section**: Student information and project details

### Technical Features
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Dark/Light Mode**: Theme switching capability
- **Cookie Management**: Persistent user preferences and navigation state
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA labels
- **TypeScript**: Full type safety and better development experience

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

### HTML5 Generator
1. Navigate to the "HTML5 Generator" tab
2. Customize your page settings:
   - **Page Title**: Enter your desired page title
   - **Description**: Add a description for your page
   - **Background Color**: Choose a background color using the color picker
   - **Text Color**: Select text color for better contrast
   - **Font Size**: Choose from Small (14px) to Extra Large (20px)
3. Preview your changes in real-time
4. Click "📋 Copy Code" to copy the generated HTML5 code
5. Save the code as a `.html` file and open in any web browser

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
   - Click "Save" to generate HTML code
   - Click "📋 Copy" to copy the generated code
   - Save as `.html` file and open in browser

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
│   │   │   ├── Header.tsx        # Header component
│   │   │   └── ThemeProvider.tsx # Theme provider
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Main page with tabs
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
- **Next.js 15.4.4**: React framework with App Router
- **React 19.1.0**: UI library
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

**John Doe**
- Student Number: 12345678
- Course: Bachelor of Information Technology
- Institution: La Trobe University
- Email: john.doe@students.latrobe.edu.au

## 🆘 Support

If you encounter any issues:

1. Check the browser console for errors
2. Ensure all dependencies are installed correctly
3. Verify Node.js version compatibility
4. Create an issue in the repository

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Note**: This project is designed for educational purposes at La Trobe University. For production use, additional security measures and testing should be implemented.

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import { getCookie, setCookie } from 'cookies-next';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const menuItems = [
    { name: 'Tabs', href: '/' },
    { name: 'Pre-lab Questions', href: '/pre-lab' },
    { name: 'Escape Room', href: '/escape-room' },
    { name: 'Coding Races', href: '/coding-races' },
    { name: 'About', href: '/about' },
  ];

  const handleMenuClick = (href: string) => {
    setIsMenuOpen(false);
    // Save active menu to cookie
    setCookie('activeMenu', href, { maxAge: 60 * 60 * 24 * 7 }); // 1 week
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Student Number */}
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Student No. 12345678
            </span>
          </div>

          {/* Title */}
          <div className="flex-1 flex justify-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              LTU Moodle App Generator
            </h1>
          </div>

          {/* Theme Toggle and Menu */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <span>{theme === 'light' ? '🌙' : '☀️'}</span>
              <span className="hidden sm:inline">Dark Mode</span>
            </button>

            {/* Hamburger Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } sm:block border-t border-gray-200 dark:border-gray-700`}
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex flex-col sm:flex-row sm:space-x-8 py-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => handleMenuClick(item.href)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
} 
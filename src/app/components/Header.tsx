'use client';

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 justify-center">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            LTU Moodle App Generator
          </h1>
        </div>
      </div>
    </header>
  );
}
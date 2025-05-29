
import React, { useEffect, useState } from "react";

export default function Layout({ children }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 shadow px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-400">⚽ Soccer Matches</h1>
          <button
            onClick={() => setIsDark(!isDark)}
            className="bg-gray-200 dark:bg-gray-700 text-sm px-3 py-1.5 rounded-md hover:opacity-80"
          >
            {isDark ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 text-center py-4 mt-8 text-sm text-gray-600 dark:text-gray-300">
        © {new Date().getFullYear()} Ritesh Ray. All rights reserved.
      </footer>
    </div>
  );
}

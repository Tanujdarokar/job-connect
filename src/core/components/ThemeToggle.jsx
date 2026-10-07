import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../theme/ThemeProvider';

export const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label="Toggle dark mode"
      className={`p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-dark-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/40 ${className}`}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-400 rotate-0 scale-100 transition-all" />
      ) : (
        <Moon className="w-5 h-5 text-slate-600 rotate-0 scale-100 transition-all" />
      )}
    </button>
  );
};

export default ThemeToggle;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Moon, Sun, User } from 'lucide-react';
import { ProfileProgress } from '../ui/ProfileProgress';
import { useSharedData } from '../../context/SharedDataContext';

export const Header: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { flowProgress } = useSharedData();
  const hasStartedFlow = flowProgress.completedSteps.length > 0;

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-lg font-bold text-primary-600 dark:text-primary-400">
            <Calculator className="w-5 h-5" />
            <span className="hidden sm:inline">Financial Calculators</span>
            <span className="sm:hidden">FinCalc</span>
          </Link>

          <div className="flex items-center gap-4">
            <ProfileProgress />

            <div className="flex items-center gap-2">
              {hasStartedFlow && (
                <Link
                  to="/dashboard"
                  className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  title="View Dashboard"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden md:inline">Dashboard</span>
                </Link>
              )}
              <Link
                to="/about"
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors hidden sm:block"
              >
                About
              </Link>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

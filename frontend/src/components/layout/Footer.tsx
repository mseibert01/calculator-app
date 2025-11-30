import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t dark:border-gray-700 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-xl font-bold text-primary-600 dark:text-primary-400 mb-4">
              <Calculator className="w-6 h-6" />
              <span>Financial Calculators</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Free financial tools to help you make smart money decisions.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                About
              </Link>
              <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Calculators */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Popular Calculators</h3>
            <div className="flex flex-col gap-2">
              <Link to="/hourly-to-salary" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                Hourly to Salary
              </Link>
              <Link to="/take-home-pay" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                Take-Home Pay
              </Link>
              <Link to="/cost-of-living" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                Cost of Living
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500" /> for better financial decisions
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-xs mt-2">
            &copy; {currentYear} Financial Calculators. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

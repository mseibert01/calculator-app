import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

import AdPlaceholder from '../ui/AdPlaceholder';

interface CalculatorLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({
  title,
  description,
  children
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Button
          variant="ghost"
          icon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => navigate('/')}
          className="mb-6"
        >
          Back to Calculators
        </Button>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">{description}</p>
            </div>
            <div className="w-full">
              {children}
            </div>
          </div>

          {/* Sidebar with Ad */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 mt-8 lg:mt-0">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-semibold mb-3 text-gray-500 dark:text-gray-400 uppercase tracking-wide">Advertisement</h3>
                <AdPlaceholder />
              </div>

              {/* Related Resources Card */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-3">Need Help?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  All calculations are done in your browser. Your data never leaves your device.
                </p>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => navigate('/')}
                >
                  Browse All Calculators
                </Button>
              </div>
            </div>
          </aside>
        </div>

        {/* Mobile Ad */}
        <div className="lg:hidden mt-8">
          <AdPlaceholder />
        </div>
      </div>
    </div>
  );
};


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
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Button
        variant="ghost"
        icon={<ArrowLeft className="w-4 h-4" />}
        onClick={() => navigate('/')}
        className="mb-6"
      >
        Back to Calculators
      </Button>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">{description}</p>
          </div>
          {children}
        </div>
        <aside className="hidden lg:block mt-8 lg:mt-0 w-full">
          <div className="sticky top-24 w-full">
            <h3 className="text-lg font-bold mb-4">Advertisement</h3>
            <div className="w-full">
              <AdPlaceholder />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};


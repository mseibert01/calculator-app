import React, { useState } from 'react';
import { Shield, Zap, Lock } from 'lucide-react';
import { CalculatorCard } from '../components/calculators/CalculatorCard';
import { FlowBanner } from '../components/ui/FlowBanner';
import { calculators, categories } from '../data/calculators';

export const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const popularCalculators = calculators.filter(calc => calc.popular);
  const filteredCalculators = selectedCategory
    ? calculators.filter(calc => calc.category === selectedCategory)
    : calculators;

  return (
    <div>
      {/* Hero Section - Clean & Modern */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-8 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-white">
              Master Your Money with Free Financial Tools
            </h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-6">
              Professional calculators for budgeting, investing, and planning your financial future. All data stays private on your device.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                100% Free
              </span>
              <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                <Lock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                Privacy First
              </span>
              <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Instant Results
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Flow Banner */}
      <section className="py-6 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <FlowBanner />
        </div>
      </section>

      {/* Popular Calculators */}
      {popularCalculators.length > 0 && (
        <section className="py-8 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-6">
              Popular Calculators
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularCalculators.map((calculator) => (
                <CalculatorCard key={calculator.id} calculator={calculator} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Calculators by Category */}
      <section id="calculators" className="py-8 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-4">
            All Calculators
          </h2>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === null
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              All
            </button>
            {categories.map((category) => {
              const count = calculators.filter(c => c.category === category.id).length;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Calculators Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCalculators.map((calculator) => (
              <CalculatorCard key={calculator.id} calculator={calculator} />
            ))}
          </div>

          {filteredCalculators.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">
                No calculators found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

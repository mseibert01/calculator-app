import React, { useState } from 'react';
import { ArrowRight, Shield, Zap, Lock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { CalculatorCard } from '../components/calculators/CalculatorCard';
import AdPlaceholder from '../components/ui/AdPlaceholder';
import { calculators, categories } from '../data/calculators';

export const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const scrollToCalculators = () => {
    document.getElementById('calculators')?.scrollIntoView({ behavior: 'smooth' });
  };

  const popularCalculators = calculators.filter(calc => calc.popular);
  const filteredCalculators = selectedCategory
    ? calculators.filter(calc => calc.category === selectedCategory)
    : calculators;

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Financial Calculators for Smart Decisions
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Free tools to help you plan your career, manage your money, and achieve your financial goals
          </p>
          <Button
            variant="secondary"
            className="text-lg"
            icon={<ArrowRight className="w-5 h-5" />}
            onClick={scrollToCalculators}
          >
            Browse Calculators
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex p-4 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">100% Free</h3>
              <p className="text-gray-600 dark:text-gray-400">
                No signups, no subscriptions, no hidden fees. Just free tools.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Results</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get accurate calculations in real-time as you type.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
                <Lock className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Privacy First</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your data stays in your browser. We don't track or store anything.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Calculators */}
      {popularCalculators.length > 0 && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Most Popular Calculators
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              Start with these most-used tools to get quick insights into your finances
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularCalculators.map((calculator) => (
                <CalculatorCard key={calculator.id} calculator={calculator} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ad Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <AdPlaceholder />
        </div>
      </section>

      {/* All Calculators by Category */}
      <section id="calculators" className="py-16 px-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Browse by Category
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Find the perfect calculator for your specific needs
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === null
                  ? 'bg-primary-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow'
              }`}
            >
              All Calculators
            </button>
            {categories.map((category) => {
              const count = calculators.filter(c => c.category === category.id).length;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white shadow-lg scale-105'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow'
                  }`}
                >
                  {category.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Selected Category Info */}
          {selectedCategory && (
            <div className="max-w-2xl mx-auto mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              {categories.find(c => c.id === selectedCategory) && (
                <>
                  <h3 className="text-2xl font-bold mb-2">
                    {categories.find(c => c.id === selectedCategory)?.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {categories.find(c => c.id === selectedCategory)?.description}
                  </p>
                </>
              )}
            </div>
          )}

          {/* Calculators Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCalculators.map((calculator) => (
              <CalculatorCard key={calculator.id} calculator={calculator} />
            ))}
          </div>

          {filteredCalculators.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No calculators found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary-50 dark:bg-primary-900/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make Better Financial Decisions?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Start using our free calculators today. No signup required.
          </p>
          <Button
            variant="primary"
            className="text-lg"
            onClick={scrollToCalculators}
          >
            Get Started
          </Button>
        </div>
      </section>
    </div>
  );
};

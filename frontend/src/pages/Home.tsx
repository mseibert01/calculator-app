import React from 'react';
import { ArrowRight, Shield, Zap, Lock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { CalculatorCard } from '../components/calculators/CalculatorCard';
import AdPlaceholder from '../components/ui/AdPlaceholder';
import { calculators } from '../data/calculators';

export const Home: React.FC = () => {
  const scrollToCalculators = () => {
    document.getElementById('calculators')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Financial Calculators for Smart Decisions
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Free tools to help you plan your career, negotiate salary, and manage your money
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

      {/* Calculators Grid */}
      <section id="calculators" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Choose a Calculator
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculators.slice(0, 3).map((calculator) => (
              <CalculatorCard key={calculator.id} calculator={calculator} />
            ))}
          </div>

          <div className="my-6">
            <AdPlaceholder />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculators.slice(3).map((calculator) => (
              <CalculatorCard key={calculator.id} calculator={calculator} />
            ))}
          </div>
        </div>
      </section>

      {/* Ad Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <AdPlaceholder />
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

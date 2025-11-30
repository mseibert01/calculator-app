import React from 'react';
import { Card } from '../components/ui/Card';

export const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">About Financial Calculators</h1>

      <div className="space-y-6">
        <Card>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            We believe everyone deserves access to quality financial tools. Our mission is to
            provide free, accurate, and easy-to-use calculators that help people make informed
            decisions about their money and career.
          </p>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold mb-4">Why We Built This</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Financial literacy is crucial in today's world. Whether you're negotiating a salary,
            planning a career change, or budgeting for the future, having the right tools makes
            all the difference.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            We created this platform to democratize access to financial calculations that were
            previously only available through expensive software or financial advisors.
          </p>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold mb-4">Privacy & Security</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            All calculations happen directly in your browser. We don't collect, store, or
            transmit your personal financial information. Your privacy is our top priority.
          </p>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Have questions, suggestions, or feedback? We'd love to hear from you at{' '}
            <a href="mailto:hello@financialcalculators.com" className="text-primary-600 dark:text-primary-400 hover:underline">
              hello@financialcalculators.com
            </a>
          </p>
        </Card>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, DollarSign, Clock, TrendingUp } from 'lucide-react';
import { Button } from './Button';

interface FlowStartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlowStartModal: React.FC<FlowStartModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'welcome' | 'income-type'>('welcome');

  if (!isOpen) return null;

  const handleIncomeTypeSelect = (type: 'hourly' | 'salary') => {
    if (type === 'hourly') {
      navigate('/hourly-to-salary');
    } else {
      navigate('/take-home-pay');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'welcome' && (
          <div className="p-8 md:p-12 text-center">
            <div className="inline-flex p-4 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-6">
              <TrendingUp className="w-12 h-12 text-primary-600 dark:text-primary-400" />
            </div>

            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Build Your Financial Profile
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
              Answer a few quick questions to create your personalized financial profile.
              Your data is saved locally and never leaves your device.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-left">
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">Income</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Calculate your take-home pay</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">Budget</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Plan your monthly spending</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">Debt</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Track and plan debt payoff</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-sm">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">Net Worth</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Complete financial snapshot</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="primary"
                onClick={() => setStep('income-type')}
                className="text-lg px-8"
              >
                Get Started
              </Button>
              <Button
                variant="ghost"
                onClick={onClose}
                className="text-lg"
              >
                Maybe Later
              </Button>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-500 mt-6">
              Takes about 5 minutes • All data stored locally • No account required
            </p>
          </div>
        )}

        {step === 'income-type' && (
          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-2 text-center text-gray-900 dark:text-white">
              How do you get paid?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
              Let's start by understanding your income
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => handleIncomeTypeSelect('hourly')}
                className="p-6 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4 group-hover:scale-110 transition-transform">
                    <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Hourly Rate</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    I'm paid by the hour and want to see my annual salary
                  </p>
                </div>
              </button>

              <button
                onClick={() => handleIncomeTypeSelect('salary')}
                className="p-6 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full mb-4 group-hover:scale-110 transition-transform">
                    <DollarSign className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Annual Salary</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    I have a salary and want to see my take-home pay
                  </p>
                </div>
              </button>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setStep('welcome')}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              >
                ← Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

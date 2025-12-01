import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight, CheckCircle2, Circle } from 'lucide-react';
import { useSharedData, FlowStep } from '../../context/SharedDataContext';
import { Button } from './Button';
import { FlowStartModal } from './FlowStartModal';

const FLOW_STEP_INFO: Record<FlowStep, { title: string; path: string; description: string }> = {
  'take-home-pay': {
    title: 'Calculate Your Income',
    path: '/take-home-pay',
    description: 'Start by understanding your take-home pay'
  },
  'budget': {
    title: 'Create Your Budget',
    path: '/budget-calculator',
    description: 'Plan your spending with a personalized budget'
  },
  'debt-payoff': {
    title: 'Plan Debt Payoff',
    path: '/debt-payoff-calculator',
    description: 'Create a strategy to pay off debt faster'
  },
  'net-worth': {
    title: 'Calculate Net Worth',
    path: '/net-worth-calculator',
    description: 'Get a complete picture of your finances'
  },
  'goals': {
    title: 'Set Financial Goals',
    path: '/goals-calculator',
    description: 'Define and track your financial goals'
  },
  'retirement': {
    title: 'Plan for Retirement',
    path: '/retirement-planner',
    description: 'Project your retirement savings'
  }
};

export const FlowBanner: React.FC = () => {
  const navigate = useNavigate();
  const { flowProgress, dismissFlow, isFlowComplete, nextFlowStep } = useSharedData();
  const [showModal, setShowModal] = useState(false);

  if (flowProgress.dismissed || isFlowComplete) return null;

  const completedCount = flowProgress.completedSteps.length;
  const totalSteps = Object.keys(FLOW_STEP_INFO).length;

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    dismissFlow();
  };

  const handleContinue = () => {
    if (completedCount === 0) {
      // First time - show guided modal
      setShowModal(true);
    } else if (nextFlowStep) {
      // Already started - go to next step
      navigate(FLOW_STEP_INFO[nextFlowStep].path);
    }
  };

  return (
    <>
      <FlowStartModal isOpen={showModal} onClose={() => setShowModal(false)} />
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border border-primary-200 dark:border-primary-800 rounded-lg p-6 mb-8 relative">
      <button
        onClick={handleDismiss}
        className="absolute top-4 right-4 p-1 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-full transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
      </button>

      <div className="pr-8">
        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
          {completedCount === 0
            ? 'Build Your Financial Profile'
            : `Keep Going! ${totalSteps - completedCount} Step${totalSteps - completedCount !== 1 ? 's' : ''} Left`
          }
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          {completedCount === 0
            ? 'Complete these quick calculators to build a personalized financial profile. Your data is saved locally and never leaves your device.'
            : 'You\'re making progress! Complete your profile to get personalized insights and calculator recommendations.'
          }
        </p>

        {/* Progress Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {(Object.keys(FLOW_STEP_INFO) as FlowStep[]).map((step) => {
            const isComplete = flowProgress.completedSteps.includes(step);
            const isCurrent = step === nextFlowStep;
            const stepInfo = FLOW_STEP_INFO[step];

            return (
              <div
                key={step}
                className={`flex items-start gap-2 p-3 rounded-lg border transition-all ${
                  isComplete
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                    : isCurrent
                    ? 'bg-white dark:bg-gray-800 border-primary-300 dark:border-primary-700 shadow-sm'
                    : 'bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="mt-0.5">
                  {isComplete ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <Circle className={`w-5 h-5 ${isCurrent ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'}`} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                    {stepInfo.title}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                    {stepInfo.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            icon={<ArrowRight className="w-4 h-4" />}
            onClick={handleContinue}
            className="text-sm"
          >
            {completedCount === 0 ? 'Get Started' : 'Continue Setup'}
          </Button>
          <button
            onClick={handleDismiss}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Home } from 'lucide-react';
import { useSharedData, FlowStep } from '../../context/SharedDataContext';
import { Button } from './Button';

interface FlowNavigationProps {
  currentStep: FlowStep;
}

const FLOW_STEP_INFO: Record<FlowStep, { title: string; path: string; nextStep: FlowStep | null }> = {
  'take-home-pay': {
    title: 'Income',
    path: '/take-home-pay',
    nextStep: 'budget'
  },
  'budget': {
    title: 'Budget',
    path: '/budget-calculator',
    nextStep: 'debt-payoff'
  },
  'debt-payoff': {
    title: 'Debt',
    path: '/debt-payoff-calculator',
    nextStep: 'net-worth'
  },
  'net-worth': {
    title: 'Net Worth',
    path: '/net-worth-calculator',
    nextStep: null
  }
};

export const FlowNavigation: React.FC<FlowNavigationProps> = ({ currentStep }) => {
  const navigate = useNavigate();
  const { flowProgress, markStepComplete } = useSharedData();

  const currentStepInfo = FLOW_STEP_INFO[currentStep];
  const nextStep = currentStepInfo.nextStep;
  const nextStepInfo = nextStep ? FLOW_STEP_INFO[nextStep] : null;
  const isCompleted = flowProgress.completedSteps.includes(currentStep);
  const isLastStep = !nextStep;

  const handleContinue = () => {
    // Mark current step as complete
    if (!isCompleted) {
      markStepComplete(currentStep);
    }

    if (nextStepInfo) {
      // Navigate to next step
      navigate(nextStepInfo.path);
    } else {
      // Last step - go to dashboard
      navigate('/dashboard');
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex-1">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isCompleted ? (
                <span className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <Check className="w-4 h-4" />
                  Step completed
                </span>
              ) : (
                <>Step {Object.keys(FLOW_STEP_INFO).indexOf(currentStep) + 1} of 4: {currentStepInfo.title}</>
              )}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              icon={<Home className="w-4 h-4" />}
              onClick={handleGoHome}
            >
              Exit Flow
            </Button>

            <Button
              variant="primary"
              icon={<ArrowRight className="w-4 h-4" />}
              onClick={handleContinue}
              className="text-base px-6"
            >
              {isLastStep ? 'Complete & View Dashboard' : `Continue to ${nextStepInfo?.title}`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

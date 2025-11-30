import React from 'react';
import { CalculatorLayout } from './CalculatorLayout';
import { Card } from '../ui/Card';

export const TakeHomePay: React.FC = () => {
  return (
    <CalculatorLayout
      title="Take-Home Pay Calculator"
      description="Calculate your net pay after taxes and deductions."
    >
      <Card>
        <div className="text-center py-12">
          <h3 className="text-2xl font-bold mb-4">Coming Soon</h3>
          <p className="text-gray-600 dark:text-gray-400">
            This calculator is under development and will be available soon.
          </p>
        </div>
      </Card>
    </CalculatorLayout>
  );
};

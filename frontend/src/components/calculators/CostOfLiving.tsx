import React from 'react';
import { CalculatorLayout } from './CalculatorLayout';
import { Card } from '../ui/Card';

export const CostOfLiving: React.FC = () => {
  return (
    <CalculatorLayout
      title="Cost of Living Calculator"
      description="Compare living expenses between cities."
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

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import * as Icons from 'lucide-react';
import { Calculator } from '../../data/calculators';

interface CalculatorCardProps {
  calculator: Calculator;
}

export const CalculatorCard: React.FC<CalculatorCardProps> = ({ calculator }) => {
  const navigate = useNavigate();
  const IconComponent = (Icons as any)[calculator.icon] || Icons.Calculator;

  return (
    <Card hover onClick={() => navigate(calculator.path)}>
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
            <IconComponent className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          {calculator.popular && (
            <span className="px-2 py-1 text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full">
              Popular
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {calculator.name}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
          {calculator.description}
        </p>

        <Button
          variant="primary"
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            navigate(calculator.path);
          }}
        >
          Calculate Now
        </Button>
      </div>
    </Card>
  );
};

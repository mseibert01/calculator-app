import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { ResultDisplay } from '../ui/ResultDisplay';
import { CalculatorLayout } from './CalculatorLayout';
import { calculateSavingsGoal } from '../../lib/calculations';
import { formatCurrency } from '../../lib/utils';

const schema = z.object({
  goalAmount: z.number().min(1),
  currentSavings: z.number().min(0),
  monthlyContribution: z.number().min(0),
  interestRate: z.number().min(0).max(20),
  timeframe: z.number().min(0).max(50).optional(),
});

type FormData = z.infer<typeof schema>;

export const SavingsGoalCalculator: React.FC = () => {
  const [results, setResults] = useState<ReturnType<typeof calculateSavingsGoal> | null>(null);

  const { register, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      goalAmount: 50000,
      currentSavings: 5000,
      monthlyContribution: 500,
      interestRate: 5,
      timeframe: 5,
    },
    mode: 'onChange'
  });

  const formValues = watch();

  useEffect(() => {
    try {
      const result = calculateSavingsGoal(formValues);
      setResults(result);
    } catch (error) {
      setResults(null);
    }
  }, [formValues]);

  return (
    <CalculatorLayout
      title="Savings Goal Calculator"
      description="Calculate how long it will take to reach your savings goal and how much you need to save monthly."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <h2 className="text-2xl font-bold mb-6">Your Savings Goal</h2>
          <div className="space-y-4">
            <Input label="Goal Amount" type="number" prefix="$" {...register('goalAmount', { valueAsNumber: true })} error={errors.goalAmount?.message} />
            <Input label="Current Savings" type="number" prefix="$" {...register('currentSavings', { valueAsNumber: true })} error={errors.currentSavings?.message} />
            <Input label="Monthly Contribution" type="number" prefix="$" {...register('monthlyContribution', { valueAsNumber: true })} error={errors.monthlyContribution?.message} />
            <Input label="Expected Interest Rate" type="number" suffix="%" step="0.1" {...register('interestRate', { valueAsNumber: true })} error={errors.interestRate?.message} />
            <Input label="Target Timeframe (Years)" type="number" {...register('timeframe', { valueAsNumber: true })} error={errors.timeframe?.message} />
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <h2 className="text-2xl font-bold mb-6">Results</h2>
            {results ? (
              <div className="space-y-4">
                <ResultDisplay label="Amount Needed" value={formatCurrency(results.amountNeeded)} size="large" />
                <div className="grid grid-cols-2 gap-4 pt-4 border-t dark:border-gray-700">
                  <ResultDisplay label="Months to Goal" value={results.monthsToGoal.toFixed(0)} />
                  <ResultDisplay label="Years to Goal" value={results.yearsToGoal.toFixed(1)} />
                  {results.monthlyContributionNeeded > 0 && (
                    <ResultDisplay label="Monthly Needed" value={formatCurrency(results.monthlyContributionNeeded)} variant="positive" />
                  )}
                  <ResultDisplay label="Total Interest" value={formatCurrency(results.totalInterest)} variant="positive" />
                </div>
              </div>
            ) : (
              <p>Enter your savings details to see results.</p>
            )}
          </Card>
        </div>
      </div>
    </CalculatorLayout>
  );
};

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { ResultDisplay } from '../ui/ResultDisplay';
import { CalculatorLayout } from './CalculatorLayout';
import { calculateHourlyToSalary } from '../../lib/calculations';
import { useSharedData } from '../../context/SharedDataContext';
import { formatCurrency, formatNumber } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { ArrowRight, Home } from 'lucide-react';

const schema = z.object({
  hourlyRate: z.number().min(0.01, 'Hourly rate must be greater than 0'),
  hoursPerWeek: z.number().min(1).max(168, 'Must be between 1 and 168 hours'),
  weeksPerYear: z.number().min(1).max(52, 'Must be between 1 and 52 weeks'),
  paidTimeOff: z.number().min(0).max(52, 'Must be between 0 and 52 weeks'),
});

type FormData = z.infer<typeof schema>;

export const HourlyToSalary: React.FC = () => {
  const { sharedData, setSharedData } = useSharedData();
  const [results, setResults] = useState<ReturnType<typeof calculateHourlyToSalary> | null>(null);
  const [dataSaved, setDataSaved] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      hourlyRate: sharedData.hourlyRate || 25,
      hoursPerWeek: 40,
      weeksPerYear: 52,
      paidTimeOff: 2,
    },
    mode: 'onChange'
  });

  const formValues = watch();

  useEffect(() => {
    try {
      const result = calculateHourlyToSalary(formValues);
      setResults(result);
      setSharedData({
        annualSalary: result.annualSalary,
        hourlyRate: formValues.hourlyRate,
        grossIncome: result.annualSalary
      });

      // Show saved indicator
      setDataSaved(true);
      const timer = setTimeout(() => setDataSaved(false), 2000);

      return () => clearTimeout(timer);
    } catch (error) {
      setResults(null);
    }
  }, [formValues, setSharedData]);

  const handleContinue = () => {
    navigate('/take-home-pay');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <CalculatorLayout
      title="Hourly to Salary Calculator"
      description="Convert your hourly wage to annual salary and see your estimated earnings across different pay periods."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Enter Your Information</h2>
            {dataSaved && (
              <span className="text-xs text-green-600 dark:text-green-400 font-medium px-2 py-1 bg-green-50 dark:bg-green-900/30 rounded-full">
                ✓ Saved
              </span>
            )}
          </div>

          <div className="space-y-4">
            <Input
              label="Hourly Rate"
              type="number"
              step="0.01"
              prefix="$"
              {...register('hourlyRate', { valueAsNumber: true })}
              error={errors.hourlyRate?.message}
            />

            <Input
              label="Hours Per Week"
              type="number"
              step="1"
              {...register('hoursPerWeek', { valueAsNumber: true })}
              error={errors.hoursPerWeek?.message}
            />

            <Input
              label="Weeks Per Year"
              type="number"
              step="1"
              {...register('weeksPerYear', { valueAsNumber: true })}
              error={errors.weeksPerYear?.message}
            />

            <Input
              label="Paid Time Off (weeks)"
              type="number"
              step="1"
              {...register('paidTimeOff', { valueAsNumber: true })}
              error={errors.paidTimeOff?.message}
            />
          </div>
        </Card>

        {/* Results Section */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-2xl font-bold mb-6">Your Results</h2>

            {results ? (
              <div className="space-y-4">
                <ResultDisplay
                  label="Annual Salary"
                  value={formatCurrency(results.annualSalary)}
                  size="large"
                  variant="default"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t dark:border-gray-700">
                  <ResultDisplay
                    label="Monthly Pay"
                    value={formatCurrency(results.monthlyPay)}
                    size="small"
                  />

                  <ResultDisplay
                    label="Biweekly Pay"
                    value={formatCurrency(results.biweeklyPay)}
                    size="small"
                  />

                  <ResultDisplay
                    label="Weekly Pay"
                    value={formatCurrency(results.weeklyPay)}
                    size="small"
                  />

                  <ResultDisplay
                    label="Work Hours/Year"
                    value={formatNumber(results.totalWorkHours)}
                    size="small"
                    context={`${results.workWeeks} work weeks`}
                  />
                </div>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                Enter valid values to see your results
              </p>
            )}
          </Card>

          {/* Info Card */}
          <Card>
            <h3 className="font-bold mb-2">How it works</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This calculator converts your hourly wage to an annual salary by multiplying your
              hourly rate by the number of hours you work per week and the number of weeks you
              work per year (accounting for paid time off).
            </p>
          </Card>
        </div>
      </div>

      {/* Flow Navigation */}
      <div className="sticky bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-40 mt-8">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Step 1 of 4: Calculate Your Salary
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
                disabled={!results}
              >
                Continue to Income
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '../ui/Card';
import { Select } from '../ui/Select';
import { Input } from '../ui/Input';
import { ResultDisplay } from '../ui/ResultDisplay';
import { CalculatorLayout } from './CalculatorLayout';
import { calculateCostOfLivingDifference } from '../../lib/calculations';
import { costOfLivingData } from '../../data/costOfLivingData';
import { formatCurrency } from '../../lib/utils';
import { useSharedData } from '../../context/SharedDataContext';

const cityOptions = costOfLivingData.map(city => ({ value: city.name, label: city.name }));

const schema = z.object({
  currentCity: z.string(),
  newCity: z.string(),
  currentSalary: z.number().min(1, 'Salary must be greater than 0'),
});

type FormData = z.infer<typeof schema>;

export const CostOfLiving: React.FC = () => {
  const { sharedData, setSharedData } = useSharedData();
  const [results, setResults] = useState<ReturnType<typeof calculateCostOfLivingDifference> | null>(null);

  const {
    register,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      currentCity: 'Chicago, IL',
      newCity: 'San Francisco, CA',
      currentSalary: sharedData.annualSalary || 60000,
    },
    mode: 'onChange'
  });

  const formValues = watch();

  useEffect(() => {
    try {
      const result = calculateCostOfLivingDifference(formValues);
      setResults(result);
      setSharedData({ annualSalary: formValues.currentSalary });
    } catch (error) {
      setResults(null);
    }
  }, [formValues, setSharedData]);

  return (
    <CalculatorLayout
      title="Cost of Living Calculator"
      description="Compare the cost of living between two cities and see how much you would need to earn to maintain your current lifestyle."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <h2 className="text-2xl font-bold mb-6">Enter Your Information</h2>
          <div className="space-y-4">
            <Select
              label="Current City"
              {...register('currentCity')}
              options={cityOptions}
            />
            <Select
              label="New City"
              {...register('newCity')}
              options={cityOptions}
            />
            <Input
              label="Current Annual Salary"
              type="number"
              prefix="$"
              {...register('currentSalary', { valueAsNumber: true })}
              error={errors.currentSalary?.message}
            />
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <h2 className="text-2xl font-bold mb-6">Comparison Results</h2>
            {results ? (
              <div className="space-y-4">
                <ResultDisplay
                  label={`Equivalent Salary in ${formValues.newCity}`}
                  value={formatCurrency(results.equivalentSalary)}
                  size="large"
                />
                <p className="text-center text-gray-600 dark:text-gray-400">
                  To maintain your current lifestyle, you would need to earn{' '}
                  <span className="font-bold text-primary-600 dark:text-primary-400">
                    {formatCurrency(results.equivalentSalary)}
                  </span>{' '}
                  in {formValues.newCity}.
                </p>
                <div className="pt-4 border-t dark:border-gray-700">
                    <h3 className="text-lg font-bold mb-2 text-center">Cost Index Comparison</h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <div></div>
                        <div className="grid grid-cols-2 gap-x-2 font-bold">
                           <span>{formValues.currentCity}</span>
                           <span>{formValues.newCity}</span>
                        </div>
                        {Object.entries(results.cityIndices.current).map(([key, value]) => (
                            <React.Fragment key={key}>
                                <span className="capitalize">{key}</span>
                                <div className="grid grid-cols-2 gap-x-2">
                                    <span>{value}</span>
                                    <span>{results.cityIndices.new[key as keyof typeof results.cityIndices.new]}</span>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
              </div>
            ) : (
              <p className="text-center py-8">
                Please select two different cities to see the comparison.
              </p>
            )}
          </Card>
        </div>
      </div>
    </CalculatorLayout>
  );
};
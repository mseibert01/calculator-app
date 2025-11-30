import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { ResultDisplay } from '../ui/ResultDisplay';
import { CalculatorLayout } from './CalculatorLayout';
import { calculateRetirementSavings } from '../../lib/calculations';
import { formatCurrency } from '../../lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const schema = z.object({
  currentAge: z.number().min(18).max(100),
  retirementAge: z.number().min(18).max(100),
  currentSavings: z.number().min(0),
  monthlyContribution: z.number().min(0),
  returnRate: z.number().min(0).max(20),
  inflationRate: z.number().min(0).max(10),
});

type FormData = z.infer<typeof schema>;

export const RetirementCalculator: React.FC = () => {
  const [results, setResults] = useState<ReturnType<typeof calculateRetirementSavings> | null>(null);

  const {
    register,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      currentAge: 30,
      retirementAge: 65,
      currentSavings: 50000,
      monthlyContribution: 500,
      returnRate: 7,
      inflationRate: 3,
    },
    mode: 'onChange'
  });

  const formValues = watch();

  useEffect(() => {
    try {
      const result = calculateRetirementSavings(formValues);
      setResults(result);
    } catch (error) {
      setResults(null);
    }
  }, [formValues]);

  return (
    <CalculatorLayout
      title="Retirement Savings Calculator"
      description="Project your retirement savings and see how your money can grow over time."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <h2 className="text-2xl font-bold mb-6">Enter Your Information</h2>
          <div className="space-y-4">
            <Input label="Current Age" type="number" {...register('currentAge', { valueAsNumber: true })} error={errors.currentAge?.message} />
            <Input label="Retirement Age" type="number" {...register('retirementAge', { valueAsNumber: true })} error={errors.retirementAge?.message} />
            <Input label="Current Savings" type="number" prefix="$" {...register('currentSavings', { valueAsNumber: true })} error={errors.currentSavings?.message} />
            <Input label="Monthly Contribution" type="number" prefix="$" {...register('monthlyContribution', { valueAsNumber: true })} error={errors.monthlyContribution?.message} />
            <Input label="Annual Return Rate" type="number" suffix="%" {...register('returnRate', { valueAsNumber: true })} error={errors.returnRate?.message} />
            <Input label="Annual Inflation Rate" type="number" suffix="%" {...register('inflationRate', { valueAsNumber: true })} error={errors.inflationRate?.message} />
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <h2 className="text-2xl font-bold mb-6">Your Retirement Projection</h2>
            {results ? (
              <div className="space-y-4">
                <ResultDisplay
                  label="Projected Savings at Retirement"
                  value={formatCurrency(results.futureValue)}
                  size="large"
                />
                <ResultDisplay
                  label="In Today's Dollars"
                  value={formatCurrency(results.realValue)}
                  size="medium"
                  context={`After ${results.yearsToRetirement} years of inflation`}
                />
              </div>
            ) : (
              <p>Enter valid data to see projection.</p>
            )}
          </Card>
          {results && (
             <Card>
                <h3 className="text-xl font-bold mb-4">Savings Growth Over Time</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={results.projection}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis tickFormatter={(tick) => `$${(tick / 1000)}k`} />
                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        <Legend />
                        <Line type="monotone" dataKey="value" name="Savings" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
             </Card>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
};

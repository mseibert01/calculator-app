import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { ResultDisplay } from '../ui/ResultDisplay';
import { CalculatorLayout } from './CalculatorLayout';
import { calculateInvestmentGrowth } from '../../lib/calculations';
import { formatCurrency } from '../../lib/utils';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

const schema = z.object({
  initialInvestment: z.number().min(0),
  monthlyContribution: z.number().min(0),
  timeHorizon: z.number().min(1).max(50),
  returnRate: z.number().min(0).max(100),
});

type FormData = z.infer<typeof schema>;

export const InvestmentCalculator: React.FC = () => {
  const [results, setResults] = useState<ReturnType<typeof calculateInvestmentGrowth> | null>(null);

  const {
    register,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      initialInvestment: 10000,
      monthlyContribution: 500,
      timeHorizon: 10,
      returnRate: 7,
    },
    mode: 'onChange'
  });

  const formValues = watch();

  useEffect(() => {
    try {
      const result = calculateInvestmentGrowth(formValues);
      setResults(result);
    } catch (error) {
      setResults(null);
    }
  }, [formValues]);

  return (
    <CalculatorLayout
      title="Investment Calculator"
      description="See how your investments can grow over time with the power of compound interest."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <h2 className="text-2xl font-bold mb-6">Enter Your Investment Details</h2>
          <div className="space-y-4">
            <Input label="Initial Investment" type="number" prefix="$" {...register('initialInvestment', { valueAsNumber: true })} error={errors.initialInvestment?.message} />
            <Input label="Monthly Contribution" type="number" prefix="$" {...register('monthlyContribution', { valueAsNumber: true })} error={errors.monthlyContribution?.message} />
            <Input label="Time Horizon (Years)" type="number" {...register('timeHorizon', { valueAsNumber: true })} error={errors.timeHorizon?.message} />
            <Input label="Annual Rate of Return" type="number" suffix="%" {...register('returnRate', { valueAsNumber: true })} error={errors.returnRate?.message} />
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <h2 className="text-2xl font-bold mb-6">Your Investment Projection</h2>
            {results ? (
              <div className="space-y-4">
                <ResultDisplay label="Future Value" value={formatCurrency(results.futureValue)} size="large" />
                <div className="grid grid-cols-2 gap-4 pt-4 border-t dark:border-gray-700">
                    <ResultDisplay label="Total Contributions" value={formatCurrency(results.totalContributions)} />
                    <ResultDisplay label="Total Interest" value={formatCurrency(results.totalInterest)} />
                </div>
              </div>
            ) : (
              <p>Enter valid data to see your projection.</p>
            )}
          </Card>
        </div>
      </div>
       {results && (
        <Card className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Investment Growth Over Time</h2>
             <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={results.projection}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(tick) => `$${(tick / 1000)}k`} />
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                    <Legend />
                    <Area type="monotone" dataKey="initialInvestment" stackId="1" name="Initial Investment" stroke="#ffc658" fill="#ffc658" />
                    <Area type="monotone" dataKey="totalContributions" stackId="1" name="Total Contributions" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="totalInterest" stackId="1" name="Total Interest" stroke="#82ca9d" fill="#82ca9d" />
                </AreaChart>
            </ResponsiveContainer>
        </Card>
      )}
    </CalculatorLayout>
  );
};

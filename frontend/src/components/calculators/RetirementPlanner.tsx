// frontend/src/components/calculators/RetirementPlanner.tsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { CalculatorLayout } from './CalculatorLayout';
import { useSharedData } from '../../context/SharedDataContext';
import { FlowNavigation } from '../ui/FlowNavigation';
import { calculateRetirementSavings } from '../../lib/calculations';
import { formatCurrency } from '../../lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const schema = z.object({
  currentAge: z.number().min(18),
  retirementAge: z.number().min(18),
  currentRetirementSavings: z.number().min(0),
  monthlyRetirementContribution: z.number().min(0),
  returnRate: z.number().min(0).max(20),
  inflationRate: z.number().min(0).max(10),
});

type FormData = z.infer<typeof schema>;

export const RetirementPlanner: React.FC = () => {
  const { financialProfile, setSharedData, markStepComplete } = useSharedData();
  const [results, setResults] = useState<ReturnType<typeof calculateRetirementSavings> | null>(null);

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      currentAge: financialProfile.currentAge || 30,
      retirementAge: financialProfile.retirementAge || 65,
      currentRetirementSavings: financialProfile.currentRetirementSavings || 50000,
      monthlyRetirementContribution: financialProfile.monthlyRetirementContribution || 500,
      returnRate: 7,
      inflationRate: 3,
    },
    mode: 'onChange'
  });

  const formValues = watch();

  useEffect(() => {
    try {
      const result = calculateRetirementSavings({
        currentAge: formValues.currentAge,
        retirementAge: formValues.retirementAge,
        currentSavings: formValues.currentRetirementSavings,
        monthlyContribution: formValues.monthlyRetirementContribution,
        returnRate: formValues.returnRate,
        inflationRate: formValues.inflationRate,
      });
      setResults(result);
      setSharedData({
        currentAge: formValues.currentAge,
        retirementAge: formValues.retirementAge,
        currentRetirementSavings: formValues.currentRetirementSavings,
        monthlyRetirementContribution: formValues.monthlyRetirementContribution,
      });
      markStepComplete('retirement');
    } catch (error) {
      setResults(null);
    }
  }, [formValues, setSharedData, markStepComplete]);

  return (
    <CalculatorLayout
      title="Retirement Planner"
      description="Project your retirement savings and see if you're on track to meet your goals."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <h2 className="text-2xl font-bold mb-6">Your Retirement Plan</h2>
          <div className="space-y-4">
            <Input label="Current Age" type="number" {...register('currentAge', { valueAsNumber: true })} error={errors.currentAge?.message} />
            <Input label="Retirement Age" type="number" {...register('retirementAge', { valueAsNumber: true })} error={errors.retirementAge?.message} />
            <Input label="Current Retirement Savings" type="number" prefix="$" {...register('currentRetirementSavings', { valueAsNumber: true })} error={errors.currentRetirementSavings?.message} />
            <Input label="Monthly Contribution" type="number" prefix="$" {...register('monthlyRetirementContribution', { valueAsNumber: true })} error={errors.monthlyRetirementContribution?.message} />
            <Input label="Expected Annual Return" type="number" suffix="%" {...register('returnRate', { valueAsNumber: true })} error={errors.returnRate?.message} />
            <Input label="Expected Inflation Rate" type="number" suffix="%" {...register('inflationRate', { valueAsNumber: true })} error={errors.inflationRate?.message} />
          </div>
        </Card>
        <div className="space-y-6">
          <Card>
            <h2 className="text-2xl font-bold mb-6">Retirement Projection</h2>
            {results && (
              <div className="space-y-4">
                <p>Future Value: {formatCurrency(results.futureValue)}</p>
                <p>In Today's Dollars: {formatCurrency(results.realValue)}</p>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={results.projection}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </Card>
        </div>
      </div>
      <FlowNavigation currentStep="retirement" />
    </CalculatorLayout>
  );
};

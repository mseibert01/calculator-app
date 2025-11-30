import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { ResultDisplay } from '../ui/ResultDisplay';
import { CalculatorLayout } from './CalculatorLayout';
import { calculateMortgage } from '../../lib/calculations';
import { formatCurrency } from '../../lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useSharedData } from '../../context/SharedDataContext';

const schema = z.object({
  homePrice: z.number().min(1),
  downPayment: z.number().min(0),
  interestRate: z.number().min(0).max(20),
  loanTerm: z.number().min(1).max(50),
  propertyTax: z.number().min(0).optional(),
  homeInsurance: z.number().min(0).optional(),
  hoa: z.number().min(0).optional(),
  pmi: z.number().min(0).optional(),
});

type FormData = z.infer<typeof schema>;

const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444'];

export const MortgageCalculator: React.FC = () => {
  const { financialProfile, setSharedData } = useSharedData();
  const [results, setResults] = useState<ReturnType<typeof calculateMortgage> | null>(null);

  const {
    register,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues:{
      homePrice: financialProfile.homePrice || 400000,
      downPayment: financialProfile.downPayment || 80000,
      interestRate: financialProfile.mortgageRate || 6.5,
      loanTerm: 30,
      propertyTax: 4000,
      homeInsurance: 1200,
      hoa: 0,
      pmi: 0,
    },
    mode: 'onChange'
  });

  const formValues = watch();

  useEffect(() => {
    try {
      const result = calculateMortgage(formValues);
      setResults(result);
      setSharedData({
        homePrice: formValues.homePrice,
        downPayment: formValues.downPayment,
        mortgageRate: formValues.interestRate,
        monthlyMortgagePayment: result.totalMonthlyPayment
      });
    } catch (error) {
      setResults(null);
    }
  }, [formValues, setSharedData]);

  const pieData = results ? [
    { name: 'Principal & Interest', value: results.principalAndInterest },
    { name: 'Property Tax', value: results.propertyTax },
    { name: 'Home Insurance', value: results.homeInsurance },
    { name: 'HOA + PMI', value: results.hoa + results.pmi }
  ].filter(item => item.value > 0) : [];

  const downPaymentPercent = (formValues.downPayment / formValues.homePrice) * 100;

  return (
    <CalculatorLayout
      title="Mortgage Calculator"
      description="Calculate your monthly mortgage payment and see the total cost of homeownership."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <h2 className="text-2xl font-bold mb-6">Home Details</h2>
            <div className="space-y-4">
              <Input
                label="Home Price"
                type="number"
                prefix="$"
                {...register('homePrice', { valueAsNumber: true })}
                error={errors.homePrice?.message}
              />
              <Input
                label="Down Payment"
                type="number"
                prefix="$"
                {...register('downPayment', { valueAsNumber: true })}
                error={errors.downPayment?.message}
              />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Down payment: {downPaymentPercent.toFixed(1)}%
                {downPaymentPercent < 20 && ' (PMI may be required)'}
              </p>
              <Input
                label="Interest Rate"
                type="number"
                suffix="%"
                step="0.1"
                {...register('interestRate', { valueAsNumber: true })}
                error={errors.interestRate?.message}
              />
              <Input
                label="Loan Term (Years)"
                type="number"
                {...register('loanTerm', { valueAsNumber: true })}
                error={errors.loanTerm?.message}
              />
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-6">Additional Costs</h2>
            <div className="space-y-4">
              <Input
                label="Annual Property Tax"
                type="number"
                prefix="$"
                {...register('propertyTax', { valueAsNumber: true })}
                error={errors.propertyTax?.message}
              />
              <Input
                label="Annual Home Insurance"
                type="number"
                prefix="$"
                {...register('homeInsurance', { valueAsNumber: true })}
                error={errors.homeInsurance?.message}
              />
              <Input
                label="Monthly HOA Fees"
                type="number"
                prefix="$"
                {...register('hoa', { valueAsNumber: true })}
                error={errors.hoa?.message}
              />
              <Input
                label="Monthly PMI"
                type="number"
                prefix="$"
                {...register('pmi', { valueAsNumber: true })}
                error={errors.pmi?.message}
              />
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h2 className="text-2xl font-bold mb-6">Monthly Payment</h2>
            {results ? (
              <div className="space-y-4">
                <ResultDisplay
                  label="Total Monthly Payment"
                  value={formatCurrency(results.totalMonthlyPayment)}
                  size="large"
                />
                <div className="grid grid-cols-2 gap-4 pt-4 border-t dark:border-gray-700">
                  <ResultDisplay
                    label="Principal & Interest"
                    value={formatCurrency(results.principalAndInterest)}
                  />
                  <ResultDisplay
                    label="Loan Amount"
                    value={formatCurrency(results.loanAmount)}
                  />
                  <ResultDisplay
                    label="Total Interest"
                    value={formatCurrency(results.totalInterest)}
                    variant="negative"
                  />
                  <ResultDisplay
                    label="Total Cost"
                    value={formatCurrency(results.totalCost)}
                  />
                </div>
              </div>
            ) : (
              <p>Enter home details to see payment breakdown.</p>
            )}
          </Card>

          {results && pieData.length > 0 && (
            <Card>
              <h3 className="text-xl font-bold mb-4">Payment Breakdown</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          )}

          <Card>
            <h3 className="font-bold mb-2">Affordability Rule</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your monthly housing payment should not exceed 28% of your gross monthly income. Lenders typically use this as a guideline for mortgage approval.
            </p>
          </Card>
        </div>
      </div>
    </CalculatorLayout>
  );
};

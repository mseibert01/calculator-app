import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { ResultDisplay } from '../ui/ResultDisplay';
import { CalculatorLayout } from './CalculatorLayout';
import { calculateNetWorth } from '../../lib/calculations';
import { formatCurrency } from '../../lib/utils';
import { useSharedData } from '../../context/SharedDataContext';
import { FlowNavigation } from '../ui/FlowNavigation';

const schema = z.object({
  cashAndSavings: z.number().min(0),
  investments: z.number().min(0),
  retirement: z.number().min(0),
  homeValue: z.number().min(0),
  vehicleValue: z.number().min(0),
  otherAssets: z.number().min(0),
  mortgage: z.number().min(0),
  studentLoans: z.number().min(0),
  carLoans: z.number().min(0),
  creditCards: z.number().min(0),
  otherDebts: z.number().min(0),
});

type FormData = z.infer<typeof schema>;

export const NetWorthCalculator: React.FC = () => {
  const { setSharedData, markStepComplete } = useSharedData();
  const [results, setResults] = useState<ReturnType<typeof calculateNetWorth> | null>(null);
  const [hasMarkedComplete, setHasMarkedComplete] = useState(false);
  const { register, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      cashAndSavings: 25000,
      investments: 50000,
      retirement: 100000,
      homeValue: 400000,
      vehicleValue: 20000,
      otherAssets: 10000,
      mortgage: 300000,
      studentLoans: 30000,
      carLoans: 15000,
      creditCards: 5000,
      otherDebts: 0,
    },
    mode: 'onChange'
  });

  const formValues = watch();

  useEffect(() => {
    try {
      const result = calculateNetWorth(formValues);
      setResults(result);

      // Save net worth data
      setSharedData({
        totalAssets: result.totalAssets,
        netWorth: result.netWorth
      });

      // Mark step as complete after user has entered asset/liability information
      if (!hasMarkedComplete && result.totalAssets > 0) {
        markStepComplete('net-worth');
        setHasMarkedComplete(true);
      }
    } catch (error) {
      setResults(null);
    }
  }, [formValues, setSharedData, markStepComplete, hasMarkedComplete]);

  return (
    <CalculatorLayout title="Net Worth Calculator" description="Calculate your total net worth by adding up assets and subtracting liabilities.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <h2 className="text-2xl font-bold mb-6">Assets</h2>
            <div className="space-y-4">
              <Input label="Cash & Savings" type="number" prefix="$" {...register('cashAndSavings', { valueAsNumber: true })} error={errors.cashAndSavings?.message} />
              <Input label="Investments" type="number" prefix="$" {...register('investments', { valueAsNumber: true })} error={errors.investments?.message} />
              <Input label="Retirement Accounts" type="number" prefix="$" {...register('retirement', { valueAsNumber: true })} error={errors.retirement?.message} />
              <Input label="Home Value" type="number" prefix="$" {...register('homeValue', { valueAsNumber: true })} error={errors.homeValue?.message} />
              <Input label="Vehicle Value" type="number" prefix="$" {...register('vehicleValue', { valueAsNumber: true })} error={errors.vehicleValue?.message} />
              <Input label="Other Assets" type="number" prefix="$" {...register('otherAssets', { valueAsNumber: true })} error={errors.otherAssets?.message} />
            </div>
          </Card>
          <Card>
            <h2 className="text-2xl font-bold mb-6">Liabilities</h2>
            <div className="space-y-4">
              <Input label="Mortgage" type="number" prefix="$" {...register('mortgage', { valueAsNumber: true })} error={errors.mortgage?.message} />
              <Input label="Student Loans" type="number" prefix="$" {...register('studentLoans', { valueAsNumber: true })} error={errors.studentLoans?.message} />
              <Input label="Car Loans" type="number" prefix="$" {...register('carLoans', { valueAsNumber: true })} error={errors.carLoans?.message} />
              <Input label="Credit Cards" type="number" prefix="$" {...register('creditCards', { valueAsNumber: true })} error={errors.creditCards?.message} />
              <Input label="Other Debts" type="number" prefix="$" {...register('otherDebts', { valueAsNumber: true })} error={errors.otherDebts?.message} />
            </div>
          </Card>
        </div>
        <Card>
          <h2 className="text-2xl font-bold mb-6">Your Net Worth</h2>
          {results ? (
            <div className="space-y-4">
              <ResultDisplay label="Net Worth" value={formatCurrency(results.netWorth)} size="large" variant={results.netWorth >= 0 ? 'positive' : 'negative'} />
              <div className="grid grid-cols-2 gap-4 pt-4 border-t dark:border-gray-700">
                <ResultDisplay label="Total Assets" value={formatCurrency(results.totalAssets)} variant="positive" />
                <ResultDisplay label="Total Liabilities" value={formatCurrency(results.totalLiabilities)} variant="negative" />
                <ResultDisplay label="Liquid Assets" value={formatCurrency(results.liquidAssets)} />
                <ResultDisplay label="Debt Ratio" value={results.debtToAssetRatio.toFixed(1) + '%'} />
              </div>
            </div>
          ) : <p>Enter values to calculate net worth.</p>}
        </Card>
      </div>
      <FlowNavigation currentStep="net-worth" />
    </CalculatorLayout>
  );
};

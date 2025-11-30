import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { ResultDisplay } from '../ui/ResultDisplay';
import { CalculatorLayout } from './CalculatorLayout';
import { calculateTakeHomePay } from '../../lib/calculations';
import { formatCurrency } from '../../lib/utils';
import { useSharedData } from '../../context/SharedDataContext';
import { Select } from '../ui/Select';

const schema = z.object({
  grossIncome: z.number().min(1, 'Gross income must be greater than 0'),
  payFrequency: z.enum(['annually', 'monthly', 'biweekly', 'weekly']),
  filingStatus: z.enum(['single', 'married']),
  state: z.string().min(1, 'State is required'),
});

type FormData = z.infer<typeof schema>;

// A simplified list of states for the dropdown
const states = [
  { value: 'AL', label: 'Alabama' }, { value: 'AK', label: 'Alaska' }, { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' }, { value: 'CA', label: 'California' }, { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' }, { value: 'DE', label: 'Delaware' }, { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' }, { value: 'HI', label: 'Hawaii' }, { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' }, { value: 'IN', label: 'Indiana' }, { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' }, { value: 'KY', label: 'Kentucky' }, { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' }, { value: 'MD', label: 'Maryland' }, { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' }, { value: 'MN', label: 'Minnesota' }, { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' }, { value: 'MT', label: 'Montana' }, { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' }, { value: 'NH', label: 'New Hampshire' }, { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' }, { value: 'NY', label: 'New York' }, { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' }, { value: 'OH', label: 'Ohio' }, { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' }, { value: 'PA', label: 'Pennsylvania' }, { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' }, { value: 'SD', label: 'South Dakota' }, { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' }, { value: 'UT', label: 'Utah' }, { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' }, { value: 'WA', label: 'Washington' }, { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' }, { value: 'WY', label: 'Wyoming' },
];

export const TakeHomePay: React.FC = () => {
  const { sharedData, setSharedData } = useSharedData();
  const [results, setResults] = useState<ReturnType<typeof calculateTakeHomePay> | null>(null);

  const {
    register,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      grossIncome: sharedData.annualSalary || 50000,
      payFrequency: 'annually',
      filingStatus: 'single',
      state: 'CA',
    },
    mode: 'onChange'
  });

  const formValues = watch();

  useEffect(() => {
    try {
      const result = calculateTakeHomePay(formValues);
      setResults(result);
      if (formValues.payFrequency === 'annually') {
        setSharedData({ annualSalary: formValues.grossIncome });
      }
    } catch (error) {
      setResults(null);
    }
  }, [formValues, setSharedData]);

  return (
    <CalculatorLayout
      title="Take-Home Pay Calculator"
      description="Estimate your net pay after federal and state taxes. This is a simplified calculation for illustrative purposes."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <h2 className="text-2xl font-bold mb-6">Enter Your Information</h2>
          <div className="space-y-4">
            <Input
              label="Gross Income"
              type="number"
              step="1000"
              prefix="$"
              {...register('grossIncome', { valueAsNumber: true })}
              error={errors.grossIncome?.message}
            />
            <Select
              label="Pay Frequency"
              {...register('payFrequency')}
              error={errors.payFrequency?.message}
              options={[
                { value: 'annually', label: 'Annually' },
                { value: 'monthly', label: 'Monthly' },
                { value: 'biweekly', label: 'Bi-Weekly' },
                { value: 'weekly', label: 'Weekly' },
              ]}
            />
            <Select
              label="Filing Status"
              {...register('filingStatus')}
              error={errors.filingStatus?.message}
              options={[
                { value: 'single', label: 'Single' },
                { value: 'married', label: 'Married Filing Jointly' },
              ]}
            />
            <Select
              label="State"
              {...register('state')}
              error={errors.state?.message}
              options={states}
            />
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <h2 className="text-2xl font-bold mb-6">Your Estimated Results</h2>
            {results ? (
              <div className="space-y-4">
                <ResultDisplay
                  label="Net Pay (Take-Home)"
                  value={formatCurrency(results.netPay)}
                  size="large"
                />
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t dark:border-gray-700">
                    <ResultDisplay label="Gross Pay" value={formatCurrency(results.grossPay)} />
                    <ResultDisplay label="Federal Tax" value={formatCurrency(results.federalTax)} variant="negative" />
                    <ResultDisplay label="State Tax" value={formatCurrency(results.stateTax)} variant="negative" />
                    <ResultDisplay label="Social Security" value={formatCurrency(results.socialSecurity)} variant="negative" />
                    <ResultDisplay label="Medicare" value={formatCurrency(results.medicare)} variant="negative" />
                    <ResultDisplay label="Total Taxes" value={formatCurrency(results.totalTax)} variant="negative" />
                 </div>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                Enter valid values to see your results
              </p>
            )}
          </Card>
           <Card>
            <h3 className="font-bold mb-2">Disclaimer</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This calculator provides a simplified estimate for illustrative purposes only. Tax laws are complex and change frequently. Consult a qualified professional for tax advice.
            </p>
          </Card>
        </div>
      </div>
    </CalculatorLayout>
  );
};
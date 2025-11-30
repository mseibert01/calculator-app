import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { ResultDisplay } from '../ui/ResultDisplay';
import { CalculatorLayout } from './CalculatorLayout';
import { calculateInterest } from '../../lib/calculations';
import { formatCurrency } from '../../lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../ui/Table';

const schema = z.object({
  initialInvestment: z.number().min(0),
  annualContribution: z.number().min(0),
  monthlyContribution: z.number().min(0),
  interestRate: z.number().min(0).max(100),
  years: z.number().min(1).max(50),
  compoundingFrequency: z.enum(['annually', 'semiannually', 'quarterly', 'monthly', 'semimonthly', 'biweekly', 'weekly', 'daily', 'continuously']),
  contributionTiming: z.enum(['beginning', 'end']),
  taxRate: z.number().min(0).max(100),
  inflationRate: z.number().min(0).max(100),
});

type FormData = z.infer<typeof schema>;

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

export const InterestCalculator: React.FC = () => {
  const [results, setResults] = useState<ReturnType<typeof calculateInterest> | null>(null);

  const {
    register,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      initialInvestment: 10000,
      annualContribution: 0,
      monthlyContribution: 500,
      interestRate: 7,
      years: 10,
      compoundingFrequency: 'monthly',
      contributionTiming: 'end',
      taxRate: 0,
      inflationRate: 3,
    },
    mode: 'onChange'
  });

  const formValues = watch();

  useEffect(() => {
    try {
      const result = calculateInterest(formValues);
      setResults(result);
    } catch (error) {
      setResults(null);
    }
  }, [formValues]);

  const pieData = results ? [
    { name: 'Initial Investment', value: results.totalPrincipal },
    { name: 'Contributions', value: results.totalContributions },
    { name: 'Interest Earned', value: results.totalInterest }
  ] : [];

  return (
    <CalculatorLayout
      title="Interest Calculator"
      description="Calculate compound interest earnings with flexible contribution options and detailed projections."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <h2 className="text-2xl font-bold mb-6">Investment Details</h2>
            <div className="space-y-4">
              <Input
                label="Initial Investment"
                type="number"
                prefix="$"
                {...register('initialInvestment', { valueAsNumber: true })}
                error={errors.initialInvestment?.message}
              />
              <Input
                label="Annual Contribution"
                type="number"
                prefix="$"
                {...register('annualContribution', { valueAsNumber: true })}
                error={errors.annualContribution?.message}
              />
              <Input
                label="Monthly Contribution"
                type="number"
                prefix="$"
                {...register('monthlyContribution', { valueAsNumber: true })}
                error={errors.monthlyContribution?.message}
              />
              <Select
                label="Contribution Timing"
                {...register('contributionTiming')}
                options={[
                  { value: 'end', label: 'End of Period' },
                  { value: 'beginning', label: 'Beginning of Period' }
                ]}
              />
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-6">Rate Settings</h2>
            <div className="space-y-4">
              <Input
                label="Annual Interest Rate"
                type="number"
                suffix="%"
                step="0.1"
                {...register('interestRate', { valueAsNumber: true })}
                error={errors.interestRate?.message}
              />
              <Select
                label="Compounding Frequency"
                {...register('compoundingFrequency')}
                options={[
                  { value: 'daily', label: 'Daily (365/year)' },
                  { value: 'weekly', label: 'Weekly (52/year)' },
                  { value: 'biweekly', label: 'Biweekly (26/year)' },
                  { value: 'semimonthly', label: 'Semimonthly (24/year)' },
                  { value: 'monthly', label: 'Monthly (12/year)' },
                  { value: 'quarterly', label: 'Quarterly (4/year)' },
                  { value: 'semiannually', label: 'Semiannually (2/year)' },
                  { value: 'annually', label: 'Annually (1/year)' },
                  { value: 'continuously', label: 'Continuously' }
                ]}
              />
              <Input
                label="Investment Length (Years)"
                type="number"
                {...register('years', { valueAsNumber: true })}
                error={errors.years?.message}
              />
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-6">Advanced Options</h2>
            <div className="space-y-4">
              <Input
                label="Tax Rate on Interest"
                type="number"
                suffix="%"
                step="0.1"
                {...register('taxRate', { valueAsNumber: true })}
                error={errors.taxRate?.message}
              />
              <Input
                label="Expected Inflation Rate"
                type="number"
                suffix="%"
                step="0.1"
                {...register('inflationRate', { valueAsNumber: true })}
                error={errors.inflationRate?.message}
              />
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h2 className="text-2xl font-bold mb-6">Summary</h2>
            {results ? (
              <div className="space-y-4">
                <ResultDisplay
                  label="Ending Balance"
                  value={formatCurrency(results.endingBalance)}
                  size="large"
                />
                <div className="grid grid-cols-2 gap-4 pt-4 border-t dark:border-gray-700">
                  <ResultDisplay
                    label="Total Principal"
                    value={formatCurrency(results.totalPrincipal)}
                  />
                  <ResultDisplay
                    label="Total Contributions"
                    value={formatCurrency(results.totalContributions)}
                  />
                  <ResultDisplay
                    label="Total Interest"
                    value={formatCurrency(results.totalInterest)}
                    variant="positive"
                  />
                  {results.afterTaxBalance !== results.endingBalance && (
                    <ResultDisplay
                      label="After Tax"
                      value={formatCurrency(results.afterTaxBalance)}
                    />
                  )}
                </div>
                {results.inflationAdjustedBalance !== results.endingBalance && (
                  <div className="pt-4 border-t dark:border-gray-700">
                    <ResultDisplay
                      label="Inflation-Adjusted Value"
                      value={formatCurrency(results.inflationAdjustedBalance)}
                      context="In today's dollars"
                    />
                  </div>
                )}
              </div>
            ) : (
              <p>Enter values to see results.</p>
            )}
          </Card>

          {results && (
            <Card>
              <h3 className="text-xl font-bold mb-4">Balance Composition</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(1)}%`}
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
        </div>
      </div>

      {results && results.yearlySchedule.length > 0 && (
        <>
          <Card className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Growth Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={results.yearlySchedule}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(tick) => `$${(tick / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Legend />
                <Area type="monotone" dataKey="principal" stackId="1" name="Principal" stroke="#ffc658" fill="#ffc658" />
                <Area type="monotone" dataKey="contributions" stackId="1" name="Contributions" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="interest" stackId="1" name="Interest" stroke="#82ca9d" fill="#82ca9d" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Annual Schedule</h2>
            <div className="max-h-96 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Year</TableHead>
                    <TableHead>Principal</TableHead>
                    <TableHead>Contributions</TableHead>
                    <TableHead>Interest</TableHead>
                    <TableHead>Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.yearlySchedule.map((row) => (
                    <TableRow key={row.year}>
                      <TableCell>{row.year}</TableCell>
                      <TableCell>{formatCurrency(row.principal)}</TableCell>
                      <TableCell>{formatCurrency(row.contributions)}</TableCell>
                      <TableCell>{formatCurrency(row.interest)}</TableCell>
                      <TableCell className="font-semibold">{formatCurrency(row.balance)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </>
      )}
    </CalculatorLayout>
  );
};

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { ResultDisplay } from '../ui/ResultDisplay';
import { Table } from '../ui/Table';
import { CalculatorLayout } from './CalculatorLayout';
import { calculateTax } from '../../lib/calculations';
import { formatCurrency } from '../../lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useSharedData } from '../../context/SharedDataContext';

const schema = z.object({
  income: z.number().min(0),
  filingStatus: z.enum(['single', 'married', 'head']),
  state: z.string(),
  deductions: z.number().min(0),
  dependents: z.number().min(0).max(20),
});

type FormData = z.infer<typeof schema>;

const COLORS = ['#ef4444', '#f59e0b', '#3b82f6', '#10b981'];

const STATE_OPTIONS = [
  { value: 'none', label: 'No State Tax' },
  { value: 'CA', label: 'California' },
  { value: 'NY', label: 'New York' },
  { value: 'TX', label: 'Texas (No Income Tax)' },
  { value: 'FL', label: 'Florida (No Income Tax)' },
  { value: 'WA', label: 'Washington (No Income Tax)' },
  { value: 'NV', label: 'Nevada (No Income Tax)' },
  { value: 'other', label: 'Other State' },
];

export const TaxCalculator: React.FC = () => {
  const { financialProfile, setSharedData } = useSharedData();
  const [results, setResults] = useState<ReturnType<typeof calculateTax> | null>(null);

  const {
    register,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      income: financialProfile.grossIncome || 75000,
      filingStatus: 'single',
      state: financialProfile.state || 'none',
      deductions: 0,
      dependents: 0,
    },
    mode: 'onChange'
  });

  const formValues = watch();

  useEffect(() => {
    try {
      const result = calculateTax(formValues);
      setResults(result);
      setSharedData({
        grossIncome: formValues.income,
        netIncome: result.takeHomePay
      });
    } catch (error) {
      setResults(null);
    }
  }, [formValues, setSharedData]);

  const pieData = results ? [
    { name: 'Federal Tax', value: results.federalTax },
    { name: 'State Tax', value: results.stateTax },
    { name: 'FICA Tax', value: results.ficaTax },
    { name: 'Take-Home Pay', value: results.takeHomePay }
  ].filter(item => item.value > 0) : [];

  const standardDeduction2025: Record<string, number> = {
    'single': 14600,
    'married': 29200,
    'head': 21900
  };

  return (
    <CalculatorLayout
      title="Tax Calculator"
      description="Estimate your federal and state income taxes for 2025 with accurate tax brackets."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <h2 className="text-2xl font-bold mb-6">Income & Filing</h2>
            <div className="space-y-4">
              <Input
                label="Annual Gross Income"
                type="number"
                prefix="$"
                {...register('income', { valueAsNumber: true })}
                error={errors.income?.message}
              />
              <Select
                label="Filing Status"
                {...register('filingStatus')}
                options={[
                  { value: 'single', label: 'Single' },
                  { value: 'married', label: 'Married Filing Jointly' },
                  { value: 'head', label: 'Head of Household' }
                ]}
              />
              <Select
                label="State"
                {...register('state')}
                options={STATE_OPTIONS}
              />
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-6">Deductions</h2>
            <div className="space-y-4">
              <Input
                label="Additional Deductions"
                type="number"
                prefix="$"
                {...register('deductions', { valueAsNumber: true })}
                error={errors.deductions?.message}
              />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Standard deduction for {formValues.filingStatus.replace('-', ' ')}: {formatCurrency(standardDeduction2025[formValues.filingStatus])}
              </p>
              <Input
                label="Number of Dependents"
                type="number"
                {...register('dependents', { valueAsNumber: true })}
                error={errors.dependents?.message}
              />
            </div>
          </Card>

          <Card>
            <h3 className="font-bold mb-2">2025 Federal Tax Brackets (Single)</h3>
            <div className="overflow-x-auto">
              <Table>
                <thead>
                  <tr>
                    <th className="text-left p-2">Rate</th>
                    <th className="text-right p-2">Income Range</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-t dark:border-gray-700">
                    <td className="p-2">10%</td>
                    <td className="text-right p-2">$0 - $11,925</td>
                  </tr>
                  <tr className="border-t dark:border-gray-700">
                    <td className="p-2">12%</td>
                    <td className="text-right p-2">$11,925 - $48,475</td>
                  </tr>
                  <tr className="border-t dark:border-gray-700">
                    <td className="p-2">22%</td>
                    <td className="text-right p-2">$48,475 - $103,350</td>
                  </tr>
                  <tr className="border-t dark:border-gray-700">
                    <td className="p-2">24%</td>
                    <td className="text-right p-2">$103,350 - $197,300</td>
                  </tr>
                  <tr className="border-t dark:border-gray-700">
                    <td className="p-2">32%</td>
                    <td className="text-right p-2">$197,300 - $250,525</td>
                  </tr>
                  <tr className="border-t dark:border-gray-700">
                    <td className="p-2">35%</td>
                    <td className="text-right p-2">$250,525 - $626,350</td>
                  </tr>
                  <tr className="border-t dark:border-gray-700">
                    <td className="p-2">37%</td>
                    <td className="text-right p-2">$626,350+</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h2 className="text-2xl font-bold mb-6">Tax Summary</h2>
            {results ? (
              <div className="space-y-4">
                <ResultDisplay
                  label="After-Tax Income"
                  value={formatCurrency(results.takeHomePay)}
                  size="large"
                  variant="positive"
                />
                <div className="grid grid-cols-2 gap-4 pt-4 border-t dark:border-gray-700">
                  <ResultDisplay
                    label="Gross Income"
                    value={formatCurrency(results.grossIncome)}
                  />
                  <ResultDisplay
                    label="Total Tax"
                    value={formatCurrency(results.totalTax)}
                    variant="negative"
                  />
                  <ResultDisplay
                    label="Federal Tax"
                    value={formatCurrency(results.federalTax)}
                    variant="negative"
                  />
                  <ResultDisplay
                    label="State Tax"
                    value={formatCurrency(results.stateTax)}
                    variant="negative"
                  />
                  <ResultDisplay
                    label="FICA Tax"
                    value={formatCurrency(results.ficaTax)}
                    context="Social Security + Medicare"
                  />
                  <ResultDisplay
                    label="Taxable Income"
                    value={formatCurrency(results.taxableIncome)}
                  />
                  <ResultDisplay
                    label="Effective Tax Rate"
                    value={results.effectiveRate.toFixed(1) + '%'}
                  />
                </div>
              </div>
            ) : (
              <p>Enter your income to see tax estimates.</p>
            )}
          </Card>

          {results && pieData.length > 0 && (
            <Card>
              <h3 className="text-xl font-bold mb-4">Tax Breakdown</h3>
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

          <Card>
            <h3 className="font-bold mb-2">Monthly Breakdown</h3>
            {results && (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Monthly Gross:</span>
                  <span className="font-medium">{formatCurrency(results.grossIncome / 12)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Monthly Tax:</span>
                  <span className="font-medium text-red-600">-{formatCurrency(results.totalTax / 12)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t dark:border-gray-700">
                  <span className="font-bold">Monthly Take-Home:</span>
                  <span className="font-bold text-green-600">{formatCurrency(results.takeHomePay / 12)}</span>
                </div>
              </div>
            )}
          </Card>

          <Card>
            <h3 className="font-bold mb-2">Tax Planning Tips</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>• Maximize 401k contributions to reduce taxable income</li>
              <li>• Consider itemizing if deductions exceed standard deduction</li>
              <li>• HSA contributions are triple tax-advantaged</li>
              <li>• Track charitable donations and business expenses</li>
            </ul>
          </Card>
        </div>
      </div>
    </CalculatorLayout>
  );
};

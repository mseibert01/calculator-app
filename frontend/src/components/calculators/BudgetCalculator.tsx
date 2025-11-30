import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { ResultDisplay } from '../ui/ResultDisplay';
import { CalculatorLayout } from './CalculatorLayout';
import { calculateBudget } from '../../lib/calculations';
import { formatCurrency } from '../../lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useSharedData } from '../../context/SharedDataContext';
import { SuggestionsSection } from '../ui/SuggestionCard';
import { Home, TrendingUp } from 'lucide-react';

const schema = z.object({
  monthlyIncome: z.number().min(1),
  budgetRule: z.enum(['50-30-20', '60-20-20', 'custom']),
  customNeeds: z.number().min(0).max(100).optional(),
  customWants: z.number().min(0).max(100).optional(),
  customSavings: z.number().min(0).max(100).optional(),
});

type FormData = z.infer<typeof schema>;

const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

export const BudgetCalculator: React.FC = () => {
  const { financialProfile, setSharedData } = useSharedData();
  const [results, setResults] = useState<ReturnType<typeof calculateBudget> | null>(null);

  const {
    register,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      monthlyIncome: financialProfile.netIncome ? financialProfile.netIncome / 12 : 5000,
      budgetRule: '50-30-20',
      customNeeds: 50,
      customWants: 30,
      customSavings: 20,
    },
    mode: 'onChange'
  });

  const formValues = watch();
  const isCustom = formValues.budgetRule === 'custom';

  useEffect(() => {
    try {
      const result = calculateBudget(formValues);
      setResults(result);
      setSharedData({
        netIncome: formValues.monthlyIncome * 12,
        monthlyRetirementContribution: result.savings
      });
    } catch (error) {
      setResults(null);
    }
  }, [formValues, setSharedData]);

  const pieData = results ? [
    { name: 'Needs (Housing, Food, Bills)', value: results.needs },
    { name: 'Wants (Entertainment, Dining)', value: results.wants },
    { name: 'Savings & Debt', value: results.savings }
  ] : [];

  const suggestions = results ? [
    {
      title: "Find Your Dream Home",
      description: `Based on your $${formatCurrency(results.needs)} needs budget, see what you can afford.`,
      action: "Calculate Mortgage",
      calculator: "/mortgage-calculator",
      icon: <Home className="w-6 h-6" />
    },
    {
      title: "Plan Your Retirement",
      description: `Invest your $${formatCurrency(results.savings)} monthly savings for the future.`,
      action: "Retirement Calculator",
      calculator: "/retirement-calculator",
      icon: <TrendingUp className="w-6 h-6" />
    }
  ] : [];

  return (
    <CalculatorLayout
      title="Budget Calculator"
      description="Plan your spending with the popular 50/30/20 budgeting rule or create a custom budget."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <h2 className="text-2xl font-bold mb-6">Your Income</h2>
            <div className="space-y-4">
              <Input
                label="Monthly Take-Home Income"
                type="number"
                prefix="$"
                {...register('monthlyIncome', { valueAsNumber: true })}
                error={errors.monthlyIncome?.message}
              />
              <Select
                label="Budget Rule"
                {...register('budgetRule')}
                options={[
                  { value: '50-30-20', label: '50/30/20 Rule (Recommended)' },
                  { value: '60-20-20', label: '60/20/20 Rule (Conservative)' },
                  { value: 'custom', label: 'Custom Budget' }
                ]}
              />
            </div>
          </Card>

          {isCustom && (
            <Card>
              <h2 className="text-2xl font-bold mb-6">Custom Percentages</h2>
              <div className="space-y-4">
                <Input
                  label="Needs %"
                  type="number"
                  suffix="%"
                  {...register('customNeeds', { valueAsNumber: true })}
                  error={errors.customNeeds?.message}
                />
                <Input
                  label="Wants %"
                  type="number"
                  suffix="%"
                  {...register('customWants', { valueAsNumber: true })}
                  error={errors.customWants?.message}
                />
                <Input
                  label="Savings & Debt %"
                  type="number"
                  suffix="%"
                  {...register('customSavings', { valueAsNumber: true })}
                  error={errors.customSavings?.message}
                />
                {isCustom && formValues.customNeeds && formValues.customWants && formValues.customSavings && (
                  <p className={`text-sm ${
                    formValues.customNeeds + formValues.customWants + formValues.customSavings === 100
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}>
                    Total: {formValues.customNeeds + formValues.customWants + formValues.customSavings}%
                    {formValues.customNeeds + formValues.customWants + formValues.customSavings !== 100 && ' (Should equal 100%)'}
                  </p>
                )}
              </div>
            </Card>
          )}

          <Card>
            <h3 className="font-bold mb-2">What is the 50/30/20 Rule?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              This popular budgeting method divides your after-tax income into three categories:
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li><strong>50% Needs:</strong> Housing, utilities, groceries, insurance, minimum debt payments</li>
              <li><strong>30% Wants:</strong> Dining out, entertainment, hobbies, subscriptions</li>
              <li><strong>20% Savings:</strong> Emergency fund, retirement, extra debt payments, investments</li>
            </ul>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h2 className="text-2xl font-bold mb-6">Your Budget</h2>
            {results ? (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <ResultDisplay
                    label="Needs"
                    value={formatCurrency(results.needs)}
                    context={`${results.needsPercentage}%`}
                  />
                  <ResultDisplay
                    label="Wants"
                    value={formatCurrency(results.wants)}
                    context={`${results.wantsPercentage}%`}
                  />
                  <ResultDisplay
                    label="Savings"
                    value={formatCurrency(results.savings)}
                    context={`${results.savingsPercentage}%`}
                    variant="positive"
                  />
                </div>
              </div>
            ) : (
              <p>Enter your income to see your budget breakdown.</p>
            )}
          </Card>

          {results && (
            <Card>
              <h3 className="text-xl font-bold mb-4">Budget Breakdown</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ percent }) => `${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          )}
        </div>
      </div>

      {results && <SuggestionsSection suggestions={suggestions} title="Next Steps" />}
    </CalculatorLayout>
  );
};

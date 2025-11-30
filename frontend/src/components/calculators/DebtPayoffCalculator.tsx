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
import { calculateDebtPayoff } from '../../lib/calculations';
import { formatCurrency } from '../../lib/utils';

const debtSchema = z.object({
  name: z.string(),
  balance: z.number().min(0),
  interestRate: z.number().min(0).max(100),
  minimumPayment: z.number().min(0),
});

const schema = z.object({
  debts: z.array(debtSchema).min(1),
  extraPayment: z.number().min(0),
  strategy: z.enum(['avalanche', 'snowball']),
});

type FormData = z.infer<typeof schema>;
type DebtInput = z.infer<typeof debtSchema>;

export const DebtPayoffCalculator: React.FC = () => {
  const [results, setResults] = useState<ReturnType<typeof calculateDebtPayoff> | null>(null);
  const [debts, setDebts] = useState<DebtInput[]>([
    { name: 'Credit Card 1', balance: 5000, interestRate: 18.5, minimumPayment: 150 },
    { name: 'Credit Card 2', balance: 3000, interestRate: 22.9, minimumPayment: 90 },
    { name: 'Car Loan', balance: 15000, interestRate: 5.5, minimumPayment: 350 },
    { name: 'Student Loan', balance: 25000, interestRate: 6.8, minimumPayment: 280 },
  ]);

  const {
    register,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      debts: debts,
      extraPayment: 200,
      strategy: 'avalanche',
    },
    mode: 'onChange'
  });

  const formValues = watch();

  useEffect(() => {
    setValue('debts', debts);
  }, [debts, setValue]);

  useEffect(() => {
    try {
      const result = calculateDebtPayoff(formValues);
      setResults(result);
    } catch (error) {
      setResults(null);
    }
  }, [formValues]);

  const addDebt = () => {
    setDebts([...debts, { name: `Debt ${debts.length + 1}`, balance: 0, interestRate: 0, minimumPayment: 0 }]);
  };

  const removeDebt = (index: number) => {
    if (debts.length > 1) {
      setDebts(debts.filter((_, i) => i !== index));
    }
  };

  const updateDebt = (index: number, field: keyof DebtInput, value: string | number) => {
    const newDebts = [...debts];
    newDebts[index] = { ...newDebts[index], [field]: value };
    setDebts(newDebts);
  };

  return (
    <CalculatorLayout
      title="Debt Payoff Calculator"
      description="Compare avalanche vs snowball strategies and see how to become debt-free faster."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Debts</h2>
              <button
                onClick={addDebt}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Debt
              </button>
            </div>
            <div className="space-y-4">
              {debts.map((debt, index) => (
                <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <Input
                      label="Debt Name"
                      value={debt.name}
                      onChange={(e) => updateDebt(index, 'name', e.target.value)}
                      className="flex-1 mr-2"
                    />
                    {debts.length > 1 && (
                      <button
                        onClick={() => removeDebt(index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Input
                      label="Balance"
                      type="number"
                      prefix="$"
                      value={debt.balance}
                      onChange={(e) => updateDebt(index, 'balance', parseFloat(e.target.value) || 0)}
                    />
                    <Input
                      label="APR"
                      type="number"
                      suffix="%"
                      step="0.1"
                      value={debt.interestRate}
                      onChange={(e) => updateDebt(index, 'interestRate', parseFloat(e.target.value) || 0)}
                    />
                    <Input
                      label="Min Payment"
                      type="number"
                      prefix="$"
                      value={debt.minimumPayment}
                      onChange={(e) => updateDebt(index, 'minimumPayment', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-6">Payoff Strategy</h2>
            <div className="space-y-4">
              <Select
                label="Strategy"
                {...register('strategy')}
                options={[
                  { value: 'avalanche', label: 'Avalanche (Highest Interest First)' },
                  { value: 'snowball', label: 'Snowball (Lowest Balance First)' }
                ]}
              />
              <Input
                label="Extra Monthly Payment"
                type="number"
                prefix="$"
                {...register('extraPayment', { valueAsNumber: true })}
                error={errors.extraPayment?.message}
              />
            </div>
          </Card>

          <Card>
            <h3 className="font-bold mb-2">Avalanche vs Snowball</h3>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <p><strong>Avalanche:</strong> Pay off highest interest rate debts first. Saves the most money on interest.</p>
              <p><strong>Snowball:</strong> Pay off smallest balances first. Provides quick wins and psychological momentum.</p>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h2 className="text-2xl font-bold mb-6">Payoff Summary</h2>
            {results ? (
              <div className="space-y-4">
                <ResultDisplay
                  label="Debt-Free Date"
                  value={`${results.monthsToPayoff} months`}
                  size="large"
                  variant="positive"
                />
                <div className="grid grid-cols-2 gap-4 pt-4 border-t dark:border-gray-700">
                  <ResultDisplay
                    label="Total Debt"
                    value={formatCurrency(results.totalDebt)}
                  />
                  <ResultDisplay
                    label="Total Interest"
                    value={formatCurrency(results.totalInterestPaid)}
                    variant="negative"
                  />
                  <ResultDisplay
                    label="Total Payments"
                    value={formatCurrency(results.totalPaid)}
                  />
                  <ResultDisplay
                    label="Monthly Payment"
                    value={formatCurrency(results.totalMinimumPayment + formValues.extraPayment)}
                  />
                </div>
              </div>
            ) : (
              <p>Enter your debts to see payoff plan.</p>
            )}
          </Card>

          {results && results.payoffSchedule.length > 0 && (
            <Card>
              <h3 className="text-xl font-bold mb-4">Payment Schedule Preview</h3>
              <div className="overflow-x-auto">
                <Table>
                  <thead>
                    <tr>
                      <th className="text-left p-2">Month</th>
                      <th className="text-left p-2">Debt</th>
                      <th className="text-right p-2">Payment</th>
                      <th className="text-right p-2">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.payoffSchedule.slice(0, 12).map((item, index) => (
                      <tr key={index} className="border-t dark:border-gray-700">
                        <td className="p-2">{item.month}</td>
                        <td className="p-2">{item.debtName}</td>
                        <td className="text-right p-2">{formatCurrency(item.payment)}</td>
                        <td className="text-right p-2">{formatCurrency(item.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {results.payoffSchedule.length > 12 && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Showing first 12 months of {results.monthsToPayoff} month schedule
                  </p>
                )}
              </div>
            </Card>
          )}

          <Card>
            <h3 className="font-bold mb-2">Tips for Success</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>• Stop adding new debt while paying off existing balances</li>
              <li>• Consider balance transfers to lower interest rates</li>
              <li>• Pay more than the minimum whenever possible</li>
              <li>• Build an emergency fund to avoid new debt</li>
            </ul>
          </Card>
        </div>
      </div>
    </CalculatorLayout>
  );
};

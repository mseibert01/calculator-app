import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { ResultDisplay } from '../ui/ResultDisplay';
import { CalculatorLayout } from './CalculatorLayout';
import { calculateFourZeroOneK } from '../../lib/calculations';
import { formatCurrency } from '../../lib/utils';
import { useSharedData } from '../../context/SharedDataContext';

const schema = z.object({
  currentAge: z.number().min(18).max(100),
  retirementAge: z.number().min(18).max(100),
  currentBalance: z.number().min(0),
  employeeContributionPercent: z.number().min(0).max(100),
  annualSalary: z.number().min(0),
  employerMatchPercent: z.number().min(0).max(100),
  employerMatchLimit: z.number().min(0).max(100),
  annualReturnRate: z.number().min(0).max(20),
  salaryIncreaseRate: z.number().min(0).max(20),
});

type FormData = z.infer<typeof schema>;

export const FourZeroOneKCalculator: React.FC = () => {
  const { financialProfile, setSharedData } = useSharedData();
  const [results, setResults] = useState<ReturnType<typeof calculateFourZeroOneK> | null>(null);

  const {
    register,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      currentAge: 30,
      retirementAge: financialProfile.retirementAge || 65,
      currentBalance: 50000,
      employeeContributionPercent: 10,
      annualSalary: financialProfile.grossIncome || 75000,
      employerMatchPercent: 50,
      employerMatchLimit: 6,
      annualReturnRate: 7,
      salaryIncreaseRate: 3,
    },
    mode: 'onChange'
  });

  const formValues = watch();

  useEffect(() => {
    try {
      const result = calculateFourZeroOneK(formValues);
      setResults(result);
      setSharedData({
        monthlyRetirementContribution: result.monthlyContribution,
        expectedReturnRate: formValues.annualReturnRate
      });
    } catch (error) {
      setResults(null);
    }
  }, [formValues, setSharedData]);

  return (
    <CalculatorLayout
      title="401k/IRA Calculator"
      description="Optimize your retirement account contributions and see how employer matching impacts your savings."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <h2 className="text-2xl font-bold mb-6">Retirement Details</h2>
            <div className="space-y-4">
              <Input
                label="Current Age"
                type="number"
                {...register('currentAge', { valueAsNumber: true })}
                error={errors.currentAge?.message}
              />
              <Input
                label="Retirement Age"
                type="number"
                {...register('retirementAge', { valueAsNumber: true })}
                error={errors.retirementAge?.message}
              />
              <Input
                label="Current 401k/IRA Balance"
                type="number"
                prefix="$"
                {...register('currentBalance', { valueAsNumber: true })}
                error={errors.currentBalance?.message}
              />
              <Input
                label="Contribution (%)"
                type="number"
                suffix="%"
                {...register('employeeContributionPercent', { valueAsNumber: true })}
                error={errors.employeeContributionPercent?.message}
              />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Contributing {formValues.employeeContributionPercent}% of salary
                {formValues.employeeContributionPercent < 15 && ' (Consider increasing to 15%+)'}
              </p>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-6">Employer Match</h2>
            <div className="space-y-4">
              <Input
                label="Annual Salary"
                type="number"
                prefix="$"
                {...register('annualSalary', { valueAsNumber: true })}
                error={errors.annualSalary?.message}
              />
              <Input
                label="Employer Match Rate"
                type="number"
                suffix="%"
                {...register('employerMatchPercent', { valueAsNumber: true })}
                error={errors.employerMatchPercent?.message}
              />
              <Input
                label="Match Limit (% of Salary)"
                type="number"
                suffix="%"
                {...register('employerMatchLimit', { valueAsNumber: true })}
                error={errors.employerMatchLimit?.message}
              />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Example: 50% match up to 6% means employer contributes $0.50 for every $1.00 you contribute, up to 6% of your salary
              </p>
              <Input
                label="Expected Annual Return"
                type="number"
                suffix="%"
                step="0.1"
                {...register('annualReturnRate', { valueAsNumber: true })}
                error={errors.annualReturnRate?.message}
              />
              <Input
                label="Annual Salary Increase"
                type="number"
                suffix="%"
                step="0.1"
                {...register('salaryIncreaseRate', { valueAsNumber: true })}
                error={errors.salaryIncreaseRate?.message}
              />
            </div>
          </Card>

          <Card>
            <h3 className="font-bold mb-2">2025 Contribution Limits</h3>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <p><strong>401k:</strong> $23,000 ($30,500 if age 50+)</p>
              <p><strong>IRA:</strong> $7,000 ($8,000 if age 50+)</p>
              <p className="mt-2">Employer match does not count toward these limits!</p>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h2 className="text-2xl font-bold mb-6">Retirement Projection</h2>
            {results ? (
              <div className="space-y-4">
                <ResultDisplay
                  label="Balance at Retirement"
                  value={formatCurrency(results.retirementBalance)}
                  size="large"
                  variant="positive"
                />
                <div className="grid grid-cols-2 gap-4 pt-4 border-t dark:border-gray-700">
                  <ResultDisplay
                    label="Years to Retirement"
                    value={results.yearsToRetirement.toString()}
                  />
                  <ResultDisplay
                    label="Employee Contributions"
                    value={formatCurrency(results.employeeContributions)}
                  />
                  <ResultDisplay
                    label="Employer Contributions"
                    value={formatCurrency(results.employerContributions)}
                    variant="positive"
                  />
                  <ResultDisplay
                    label="Investment Growth"
                    value={formatCurrency(results.investmentGrowth)}
                    variant="positive"
                  />
                  <ResultDisplay
                    label="Monthly Contribution"
                    value={formatCurrency(results.monthlyContribution)}
                  />
                  <ResultDisplay
                    label="Total Contributions"
                    value={formatCurrency(results.totalContributions)}
                  />
                </div>
              </div>
            ) : (
              <p>Enter your retirement details to see projections.</p>
            )}
          </Card>

          <Card>
            <h3 className="font-bold mb-2">Free Money!</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Always contribute enough to get the full employer match - it's an instant {formValues.employerMatchPercent}% return on your money. Missing out on the match is like turning down a raise!
            </p>
          </Card>
        </div>
      </div>
    </CalculatorLayout>
  );
};

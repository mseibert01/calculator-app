import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { ResultDisplay } from '../ui/ResultDisplay';
import { CalculatorLayout } from './CalculatorLayout';
import { calculateLoanPayment } from '../../lib/calculations';
import { formatCurrency } from '../../lib/utils';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../ui/Table';

const schema = z.object({
  loanAmount: z.number().min(1),
  interestRate: z.number().min(0).max(100),
  loanTerm: z.number().min(1).max(50),
});

type FormData = z.infer<typeof schema>;

export const LoanCalculator: React.FC = () => {
  const [results, setResults] = useState<ReturnType<typeof calculateLoanPayment> | null>(null);

  const {
    register,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      loanAmount: 250000,
      interestRate: 5,
      loanTerm: 30,
    },
    mode: 'onChange'
  });

  const formValues = watch();

  useEffect(() => {
    try {
      const result = calculateLoanPayment(formValues);
      setResults(result);
    } catch (error) {
      setResults(null);
    }
  }, [formValues]);

  return (
    <CalculatorLayout
      title="Loan Calculator"
      description="Calculate your monthly loan payment and see a full amortization schedule."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <h2 className="text-2xl font-bold mb-6">Enter Your Loan Details</h2>
          <div className="space-y-4">
            <Input label="Loan Amount" type="number" prefix="$" {...register('loanAmount', { valueAsNumber: true })} error={errors.loanAmount?.message} />
            <Input label="Annual Interest Rate" type="number" suffix="%" {...register('interestRate', { valueAsNumber: true })} error={errors.interestRate?.message} />
            <Input label="Loan Term (Years)" type="number" {...register('loanTerm', { valueAsNumber: true })} error={errors.loanTerm?.message} />
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <h2 className="text-2xl font-bold mb-6">Your Loan Summary</h2>
            {results ? (
              <div className="space-y-4">
                <ResultDisplay label="Monthly Payment" value={formatCurrency(results.monthlyPayment)} size="large" />
                <div className="grid grid-cols-2 gap-4 pt-4 border-t dark:border-gray-700">
                    <ResultDisplay label="Total Principal" value={formatCurrency(results.totalPrincipal)} />
                    <ResultDisplay label="Total Interest" value={formatCurrency(results.totalInterest)} variant="negative"/>
                </div>
              </div>
            ) : (
              <p>Enter valid data to see your loan summary.</p>
            )}
          </Card>
        </div>
      </div>
      {results && (
        <Card className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Amortization Schedule</h2>
            <div className="max-h-96 overflow-y-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Month</TableHead>
                            <TableHead>Payment</TableHead>
                            <TableHead>Principal</TableHead>
                            <TableHead>Interest</TableHead>
                            <TableHead>Balance</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {results.amortizationSchedule.map((row) => (
                            <TableRow key={row.month}>
                                <TableCell>{row.month}</TableCell>
                                <TableCell>{formatCurrency(row.payment)}</TableCell>
                                <TableCell>{formatCurrency(row.principal)}</TableCell>
                                <TableCell>{formatCurrency(row.interest)}</TableCell>
                                <TableCell>{formatCurrency(row.balance)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Card>
      )}
    </CalculatorLayout>
  );
};

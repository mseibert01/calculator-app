// frontend/src/components/calculators/GoalsCalculator.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { CalculatorLayout } from './CalculatorLayout';
import { useSharedData } from '../../context/SharedDataContext';
import { FlowNavigation } from '../ui/FlowNavigation';
import { Plus, Trash2 } from 'lucide-react';

const goalSchema = z.object({
  name: z.string().min(1, 'Goal name is required'),
  targetAmount: z.number().min(1, 'Target amount must be greater than 0'),
  currentAmount: z.number().min(0),
  targetDate: z.string().min(1, 'Target date is required'),
});

type Goal = z.infer<typeof goalSchema>;

export const GoalsCalculator: React.FC = () => {
  const { financialProfile, setSharedData } = useSharedData();
  const [goals, setGoals] = useState<Goal[]>(financialProfile.goals || []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Goal>({
    resolver: zodResolver(goalSchema),
  });

  const addGoal = (data: Goal) => {
    const newGoals = [...goals, data];
    setGoals(newGoals);
    setSharedData({ goals: newGoals });
    reset();
  };

  const deleteGoal = (index: number) => {
    const newGoals = goals.filter((_, i) => i !== index);
    setGoals(newGoals);
    setSharedData({ goals: newGoals });
  };

  return (
    <CalculatorLayout
      title="Financial Goals"
      description="Define and track your financial goals to stay motivated and on track."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <h2 className="text-2xl font-bold mb-6">Add a New Goal</h2>
            <form onSubmit={handleSubmit(addGoal)} className="space-y-4">
              <Input
                label="Goal Name"
                {...register('name')}
                error={errors.name?.message}
                placeholder="e.g., House Down Payment"
              />
              <Input
                label="Target Amount"
                type="number"
                prefix="$"
                {...register('targetAmount', { valueAsNumber: true })}
                error={errors.targetAmount?.message}
              />
              <Input
                label="Current Amount Saved"
                type="number"
                prefix="$"
                {...register('currentAmount', { valueAsNumber: true })}
                error={errors.currentAmount?.message}
              />
              <Input
                label="Target Date"
                type="date"
                {...register('targetDate')}
                error={errors.targetDate?.message}
              />
              <Button type="submit" icon={<Plus className="w-4 h-4" />}>
                Add Goal
              </Button>
            </form>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <h2 className="text-2xl font-bold mb-6">Your Goals</h2>
            {goals.length > 0 ? (
              <div className="space-y-4">
                {goals.map((goal, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold">{goal.name}</h3>
                      <button onClick={() => deleteGoal(index)}>
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                    <p>Target: ${goal.targetAmount.toLocaleString()}</p>
                    <p>Saved: ${goal.currentAmount.toLocaleString()}</p>
                    <p>Date: {goal.targetDate}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-primary-600 h-2.5 rounded-full"
                        style={{ width: `${(goal.currentAmount / goal.targetAmount) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>You haven't added any goals yet.</p>
            )}
          </Card>
        </div>
      </div>
      <FlowNavigation currentStep="goals" />
    </CalculatorLayout>
  );
};

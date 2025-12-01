import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ResultDisplay } from '../ui/ResultDisplay';
import { CalculatorLayout } from './CalculatorLayout';
import { formatCurrency } from '../../lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useSharedData, BudgetCategory } from '../../context/SharedDataContext';
import { FlowNavigation } from '../ui/FlowNavigation';
import { Plus, Trash2 } from 'lucide-react';

const DEFAULT_CATEGORIES: BudgetCategory[] = [
  { id: '1', name: 'Housing (Rent/Mortgage)', amount: 0, type: 'need' },
  { id: '2', name: 'Utilities', amount: 0, type: 'need' },
  { id: '3', name: 'Groceries', amount: 0, type: 'need' },
  { id: '4', name: 'Transportation', amount: 0, type: 'need' },
  { id: '5', name: 'Insurance', amount: 0, type: 'need' },
  { id: '6', name: 'Entertainment', amount: 0, type: 'want' },
  { id: '7', name: 'Dining Out', amount: 0, type: 'want' },
  { id: '8', name: 'Shopping', amount: 0, type: 'want' },
  { id: '9', name: 'Emergency Fund', amount: 0, type: 'savings' },
  { id: '10', name: 'Retirement', amount: 0, type: 'savings' },
  { id: '11', name: 'Debt Payment', amount: 0, type: 'savings' },
];

const COLORS = {
  need: '#ef4444',
  want: '#3b82f6',
  savings: '#10b981'
};

export const BudgetCalculator: React.FC = () => {
  const { financialProfile, setSharedData, markStepComplete } = useSharedData();
  const [monthlyIncome, setMonthlyIncome] = useState(financialProfile.netIncome ? financialProfile.netIncome / 12 : 5000);
  const [categories, setCategories] = useState<BudgetCategory[]>(
    financialProfile.budgetCategories || DEFAULT_CATEGORIES
  );
  const [hasMarkedComplete, setHasMarkedComplete] = useState(false);
  const [dataSaved, setDataSaved] = useState(false);

  const totalNeeds = categories.filter(c => c.type === 'need').reduce((sum, c) => sum + c.amount, 0);
  const totalWants = categories.filter(c => c.type === 'want').reduce((sum, c) => sum + c.amount, 0);
  const totalSavings = categories.filter(c => c.type === 'savings').reduce((sum, c) => sum + c.amount, 0);
  const totalSpent = totalNeeds + totalWants + totalSavings;
  const remaining = monthlyIncome - totalSpent;

  const needsPercent = monthlyIncome > 0 ? (totalNeeds / monthlyIncome) * 100 : 0;
  const wantsPercent = monthlyIncome > 0 ? (totalWants / monthlyIncome) * 100 : 0;
  const savingsPercent = monthlyIncome > 0 ? (totalSavings / monthlyIncome) * 100 : 0;

  const pieData = [
    { name: 'Needs', value: totalNeeds, color: COLORS.need },
    { name: 'Wants', value: totalWants, color: COLORS.want },
    { name: 'Savings', value: totalSavings, color: COLORS.savings },
  ].filter(item => item.value > 0);

  useEffect(() => {
    // Save data
    setSharedData({
      monthlyIncome,
      monthlyExpenses: {
        needs: totalNeeds,
        wants: totalWants,
        savings: totalSavings
      },
      budgetCategories: categories
    });

    // Show saved indicator
    if (totalSpent > 0) {
      setDataSaved(true);
      const timer = setTimeout(() => setDataSaved(false), 2000);

      // Mark step as complete
      if (!hasMarkedComplete) {
        markStepComplete('budget');
        setHasMarkedComplete(true);
      }

      return () => clearTimeout(timer);
    }
  }, [monthlyIncome, categories, totalNeeds, totalWants, totalSavings, totalSpent, setSharedData, markStepComplete, hasMarkedComplete]);

  const addCategory = (type: 'need' | 'want' | 'savings') => {
    const newCategory: BudgetCategory = {
      id: Date.now().toString(),
      name: 'New Category',
      amount: 0,
      type
    };
    setCategories([...categories, newCategory]);
  };

  const updateCategory = (id: string, field: 'name' | 'amount', value: string | number) => {
    setCategories(categories.map(cat =>
      cat.id === id ? { ...cat, [field]: value } : cat
    ));
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const CategorySection = ({ type, title, color }: { type: 'need' | 'want' | 'savings', title: string, color: string }) => {
    const typeCategories = categories.filter(c => c.type === type);
    const typeTotal = typeCategories.reduce((sum, c) => sum + c.amount, 0);
    const typePercent = monthlyIncome > 0 ? (typeTotal / monthlyIncome) * 100 : 0;

    return (
      <Card className="border-l-4" style={{ borderLeftColor: color }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {formatCurrency(typeTotal)} ({typePercent.toFixed(1)}%)
            </p>
          </div>
          <Button
            variant="ghost"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => addCategory(type)}
            className="text-sm"
          >
            Add
          </Button>
        </div>

        <div className="space-y-3">
          {typeCategories.map((category) => (
            <div key={category.id} className="flex items-center gap-2">
              <Input
                value={category.name}
                onChange={(e) => updateCategory(category.id, 'name', e.target.value)}
                className="flex-1"
                placeholder="Category name"
              />
              <Input
                type="text"
                inputMode="decimal"
                pattern="[0-9]*"
                value={category.amount}
                onChange={(e) => updateCategory(category.id, 'amount', parseFloat(e.target.value) || 0)}
                prefix="$"
                className="w-32"
              />
              <button
                onClick={() => deleteCategory(category.id)}
                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                aria-label="Delete category"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {typeCategories.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
              No {title.toLowerCase()} categories yet. Click "Add" to create one.
            </p>
          )}
        </div>
      </Card>
    );
  };

  return (
    <CalculatorLayout
      title="Budget Calculator"
      description="Create a detailed monthly budget by category and track your spending."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Input */}
        <div className="space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Monthly Income</h2>
              {dataSaved && (
                <span className="text-xs text-green-600 dark:text-green-400 font-medium px-2 py-1 bg-green-50 dark:bg-green-900/30 rounded-full">
                  ✓ Saved
                </span>
              )}
            </div>
            <Input
              label="Take-Home Pay"
              type="text"
              inputMode="decimal"
              pattern="[0-9]*"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(parseFloat(e.target.value) || 0)}
              prefix="$"
            />
          </Card>

          <CategorySection type="need" title="Needs (Essentials)" color={COLORS.need} />
          <CategorySection type="want" title="Wants (Lifestyle)" color={COLORS.want} />
          <CategorySection type="savings" title="Savings & Debt" color={COLORS.savings} />
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-2xl font-bold mb-6">Budget Summary</h2>
            <div className="space-y-4">
              <ResultDisplay
                label="Monthly Income"
                value={formatCurrency(monthlyIncome)}
                size="large"
              />

              <div className="grid grid-cols-3 gap-4 pt-4 border-t dark:border-gray-700">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Needs</p>
                  <p className="text-lg font-bold" style={{ color: COLORS.need }}>
                    {formatCurrency(totalNeeds)}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {needsPercent.toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Wants</p>
                  <p className="text-lg font-bold" style={{ color: COLORS.want }}>
                    {formatCurrency(totalWants)}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {wantsPercent.toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Savings</p>
                  <p className="text-lg font-bold" style={{ color: COLORS.savings }}>
                    {formatCurrency(totalSavings)}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {savingsPercent.toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t dark:border-gray-700">
                <ResultDisplay
                  label="Remaining"
                  value={formatCurrency(remaining)}
                  variant={remaining >= 0 ? 'positive' : 'negative'}
                />
              </div>
            </div>
          </Card>

          {/* Pie Chart */}
          {pieData.length > 0 && (
            <Card>
              <h3 className="text-lg font-bold mb-4">Spending Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          )}

          {/* Budget Health */}
          <Card>
            <h3 className="text-lg font-bold mb-3">Budget Health</h3>
            <div className="space-y-3">
              <div className={`p-3 rounded-lg ${needsPercent <= 50 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-yellow-50 dark:bg-yellow-900/20'}`}>
                <p className="text-sm font-semibold mb-1">Needs: {needsPercent.toFixed(1)}%</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {needsPercent <= 50 ? '✓ On track' : '⚠ Try to keep under 50%'}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${savingsPercent >= 20 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-yellow-50 dark:bg-yellow-900/20'}`}>
                <p className="text-sm font-semibold mb-1">Savings: {savingsPercent.toFixed(1)}%</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {savingsPercent >= 20 ? '✓ Great job!' : '⚠ Aim for at least 20%'}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <FlowNavigation currentStep="budget" />
    </CalculatorLayout>
  );
};

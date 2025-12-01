import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { useSharedData } from '../context/SharedDataContext';
import { formatCurrency } from '../lib/utils';
import {
  getFinancialRecommendations,
  calculateFinancialHealthScore
} from '../lib/calculations';
import { CircularProgressBar } from '../components/ui/CircularProgressBar';
import {
  DollarSign,
  Wallet,
  CreditCard,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Circle,
  AlertCircle,
  Zap,
  Target,
  Briefcase,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { financialProfile, flowProgress, isFlowComplete, resetFlow } = useSharedData();

  const financialHealthScore = calculateFinancialHealthScore(financialProfile);
  const recommendations = getFinancialRecommendations(financialProfile);

  const flowSteps = [
    {
      id: 'take-home-pay',
      title: 'Income',
      path: '/take-home-pay',
      icon: <DollarSign className="w-5 h-5" />,
      completed: flowProgress.completedSteps.includes('take-home-pay' as any),
      data: financialProfile.annualSalary
        ? `${formatCurrency(financialProfile.annualSalary)}/year`
        : 'Not set'
    },
    {
      id: 'budget',
      title: 'Budget',
      path: '/budget-calculator',
      icon: <Wallet className="w-5 h-5" />,
      completed: flowProgress.completedSteps.includes('budget' as any),
      data: financialProfile.monthlyIncome
        ? `${formatCurrency(financialProfile.monthlyIncome)}/month`
        : 'Not set'
    },
    {
      id: 'debt-payoff',
      title: 'Debt',
      path: '/debt-payoff-calculator',
      icon: <CreditCard className="w-5 h-5" />,
      completed: flowProgress.completedSteps.includes('debt-payoff' as any),
      data: financialProfile.totalDebt
        ? `${formatCurrency(financialProfile.totalDebt)} total`
        : 'Not set'
    },
    {
      id: 'net-worth',
      title: 'Net Worth',
      path: '/net-worth-calculator',
      icon: <TrendingUp className="w-5 h-5" />,
      completed: flowProgress.completedSteps.includes('net-worth' as any),
      data: financialProfile.netWorth !== undefined
        ? formatCurrency(financialProfile.netWorth)
        : 'Not set'
    },
    {
      id: 'goals',
      title: 'Goals',
      path: '/goals-calculator',
      icon: <Target className="w-5 h-5" />,
      completed: flowProgress.completedSteps.includes('goals' as any),
      data: financialProfile.goals
        ? `${financialProfile.goals.length} goals set`
        : 'Not set'
    },
    {
      id: 'retirement',
      title: 'Retirement',
      path: '/retirement-planner',
      icon: <Briefcase className="w-5 h-5" />,
      completed: flowProgress.completedSteps.includes('retirement' as any),
      data: financialProfile.retirementAge
        ? `Age ${financialProfile.retirementAge}`
        : 'Not set'
    }
  ];

  const completedCount = flowProgress.completedSteps.length;
  const progressPercent = (completedCount / 6) * 100;

  const getPriorityClass = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Financial Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your financial profile and track your progress
          </p>
        </div>

        {/* Profile Progress */}
        <Card className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Profile Setup Progress</h2>
            {isFlowComplete && (
              <span className="text-sm text-green-600 dark:text-green-400 font-medium px-3 py-1 bg-green-50 dark:bg-green-900/30 rounded-full">
                ✓ Complete
              </span>
            )}
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {completedCount} of 4 steps completed
              </span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {progressPercent.toFixed(0)}%
              </span>
            </div>
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {flowSteps.map((step) => (
              <Link
                key={step.id}
                to={step.path}
                className={`p-4 border-2 rounded-lg transition-all hover:shadow-md ${
                  step.completed
                    ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      step.completed
                        ? 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                    }`}>
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">{step.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{step.data}</p>
                    </div>
                  </div>
                  {step.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </div>
              </Link>
            ))}
          </div>

          {!isFlowComplete && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Complete Your Profile
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Finish setting up your profile to get personalized recommendations and insights.
                </p>
              </div>
            </div>
          )}
        </Card>
        
        {isFlowComplete && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <Card className="lg:col-span-1 text-center">
              <h2 className="text-2xl font-bold mb-4">Your Financial Health Score</h2>
              <CircularProgressBar percentage={financialHealthScore} />
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                {financialHealthScore > 80 ? "Excellent!" : financialHealthScore > 60 ? "Good" : financialHealthScore > 40 ? "Fair" : "Needs Improvement"}
              </p>
            </Card>

            <Card className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Personalized Recommendations</h2>
              <div className="space-y-4">
                {recommendations.length > 0 ? (
                  recommendations.map(rec => (
                    <div key={rec.id} className={`p-4 border-l-4 rounded-r-lg ${getPriorityClass(rec.priority)}`}>
                      <div className="flex items-start gap-3">
                        <Zap className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-1" />
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white mb-1">{rec.title}</h3>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{rec.description}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                    You're doing great! We don't have any specific recommendations for you right now.
                  </p>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* Financial Overview */}
        {completedCount > 0 && (
          <Card className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Financial Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {financialProfile.annualSalary && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Annual Income</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(financialProfile.annualSalary)}
                  </p>
                </div>
              )}
              {financialProfile.netIncome && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Net Income</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(financialProfile.netIncome)}
                  </p>
                </div>
              )}
              {financialProfile.totalDebt !== undefined && financialProfile.totalDebt > 0 && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Debt</p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {formatCurrency(financialProfile.totalDebt)}
                  </p>
                </div>
              )}
              {financialProfile.netWorth !== undefined && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Net Worth</p>
                  <p className={`text-2xl font-bold ${
                    financialProfile.netWorth >= 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {formatCurrency(financialProfile.netWorth)}
                  </p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Quick Actions */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/"
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
            >
              <h3 className="font-bold mb-1 text-gray-900 dark:text-white">Browse Calculators</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Explore all available financial calculators
              </p>
              <div className="flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </Link>

            <button
              onClick={resetFlow}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all text-left"
            >
              <h3 className="font-bold mb-1 text-gray-900 dark:text-white">Reset Profile</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Clear all data and start fresh
              </p>
              <div className="flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium">
                Reset Now <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </button>

            <Link
              to="/about"
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
            >
              <h3 className="font-bold mb-1 text-gray-900 dark:text-white">About & Privacy</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Learn how your data is protected
              </p>
              <div className="flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium">
                Learn More <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};


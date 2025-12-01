// frontend/src/data/recommendations.ts

import { FinancialProfile } from '../context/SharedDataContext';

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  condition: (profile: FinancialProfile) => boolean;
}

export const RECOMMENDATIONS: Recommendation[] = [
  // Savings Recommendations
  {
    id: 'increase-savings-rate',
    title: 'Boost Your Savings Rate',
    description: 'Your savings rate is lower than the recommended 15-20%. Try to automate your savings by setting up recurring transfers to a high-yield savings account.',
    priority: 'high',
    condition: (profile) => {
      const annualSavings = (profile.monthlyExpenses?.savings || 0) * 12;
      const savingsRate = (profile.grossIncome && profile.grossIncome > 0) ? (annualSavings / profile.grossIncome) * 100 : 0;
      return savingsRate < 15;
    }
  },
  {
    id: 'build-emergency-fund',
    title: 'Build Your Emergency Fund',
    description: 'An emergency fund should cover 3-6 months of living expenses. This will protect you from unexpected financial shocks.',
    priority: 'high',
    condition: (profile) => {
      const monthlyExpenses = (profile.monthlyExpenses?.needs || 0) + (profile.monthlyExpenses?.wants || 0);
      const emergencyFund = profile.assets?.find(a => a.name.toLowerCase().includes('emergency'))?.value || 0;
      return emergencyFund < monthlyExpenses * 3;
    }
  },

  // Debt Recommendations
  {
    id: 'reduce-dti',
    title: 'Lower Your Debt-to-Income Ratio',
    description: 'Your debt-to-income ratio is higher than the recommended 36%. Focus on paying down high-interest debt to free up more of your income.',
    priority: 'high',
    condition: (profile) => {
      const monthlyDebtPayment = profile.monthlyDebtPayment || 0;
      const grossMonthlyIncome = (profile.grossIncome || 0) / 12;
      const dti = (grossMonthlyIncome > 0) ? (monthlyDebtPayment / grossMonthlyIncome) * 100 : 0;
      return dti > 36;
    }
  },
  {
    id: 'debt-avalanche',
    title: 'Consider the Debt Avalanche Method',
    description: 'The debt avalanche method involves paying off your highest-interest debt first. This can save you a significant amount of money in interest over time.',
    priority: 'medium',
    condition: (profile) => (profile.totalDebt || 0) > 0,
  },

  // Investment & Retirement Recommendations
  {
    id: 'increase-retirement-contributions',
    title: 'Increase Your Retirement Contributions',
    description: 'Your retirement savings seem to be lagging. Even small increases to your monthly contributions can make a big difference over time thanks to compound growth.',
    priority: 'high',
    condition: (profile) => {
      const retirementSavings = profile.currentRetirementSavings || 0;
      const annualIncome = profile.annualSalary || profile.grossIncome || 0;
      const age = profile.currentAge || 30;
      const recommendedSavings = (age / 10) * annualIncome;
      return annualIncome > 0 && retirementSavings < recommendedSavings * 0.8;
    }
  },
  {
    id: 'start-investing',
    title: 'Start Investing for the Future',
    description: 'If you haven\'t already, consider opening a brokerage account and investing in a diversified portfolio of low-cost index funds. This is a great way to build long-term wealth.',
    priority: 'medium',
    condition: (profile) => (profile.currentInvestments || 0) === 0 && (profile.currentRetirementSavings || 0) === 0,
  },

  // Net Worth Recommendations
  {
    id: 'grow-net-worth',
    title: 'Focus on Growing Your Net Worth',
    description: 'Your net worth is a key indicator of your financial health. You can increase it by growing your assets (like savings and investments) and reducing your liabilities (like debt).',
    priority: 'low',
    condition: (profile) => (profile.netWorth || 0) < (profile.annualSalary || 0),
  },
];

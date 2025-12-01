// src/context/SharedDataContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


export interface BudgetCategory {
  id: string;
  name: string;
  amount: number;
  type: 'need' | 'want' | 'savings';
}

export interface FinancialProfile {
  // Income
  hourlyRate?: number;
  annualSalary?: number;
  grossIncome?: number;
  netIncome?: number;
  payFrequency?: 'annually' | 'monthly' | 'biweekly' | 'weekly';

  // Location & Cost of Living
  currentCity?: string;
  newCity?: string;
  costOfLivingAdjustment?: number;

  // Tax Information
  filingStatus?: 'single' | 'married';
  state?: string;
  effectiveTaxRate?: number;

  // Retirement
  currentAge?: number;
  retirementAge?: number;
  currentRetirementSavings?: number;
  monthlyRetirementContribution?: number;
  retirementGoal?: number;

  // Housing
  monthlyRent?: number;
  homePrice?: number;
  downPayment?: number;
  mortgageRate?: number;
  monthlyMortgagePayment?: number;

  // Investments
  currentInvestments?: number;
  monthlyInvestment?: number;
  expectedReturnRate?: number;

  // Debts
  totalDebt?: number;
  monthlyDebtPayment?: number;
  debts?: Array<{
    name: string;
    balance: number;
    interestRate: number;
    minimumPayment: number;
  }>;

  // Goals
  savingsGoal?: number;
  savingsTimeframe?: number;
  emergencyFundGoal?: number;

  // Assets (for net worth)
  assets?: Array<{
    name: string;
    value: number;
  }>;
  totalAssets?: number;
  netWorth?: number;

  // Budget
  monthlyIncome?: number;
  monthlyExpenses?: {
    needs?: number;
    wants?: number;
    savings?: number;
  };
  budgetCategories?: BudgetCategory[];
}


export type FlowStep = 'take-home-pay' | 'budget' | 'debt-payoff' | 'net-worth';

export interface FlowProgress {
  completedSteps: FlowStep[];
  dismissed: boolean;
  lastUpdated: number;
}

// Legacy support
interface SharedData extends FinancialProfile {}

interface SharedDataContextType {
  sharedData: SharedData;
  setSharedData: (data: Partial<SharedData>) => void;
  clearSharedData: () => void;
  financialProfile: FinancialProfile;
  flowProgress: FlowProgress;
  markStepComplete: (step: FlowStep) => void;
  dismissFlow: () => void;
  resetFlow: () => void;
  isFlowComplete: boolean;
  nextFlowStep: FlowStep | null;
}

const SharedDataContext = createContext<SharedDataContextType | undefined>(undefined);

const FLOW_STEPS: FlowStep[] = ['take-home-pay', 'budget', 'debt-payoff', 'net-worth'];

export const SharedDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sharedData, setSharedDataState] = useState<SharedData>(() => {
    try {
      const item = window.localStorage.getItem('sharedCalculatorData');
      return item ? JSON.parse(item) : {};
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return {};
    }
  });

  const [flowProgress, setFlowProgress] = useState<FlowProgress>(() => {
    try {
      const item = window.localStorage.getItem('calculatorFlowProgress');
      return item ? JSON.parse(item) : { completedSteps: [], dismissed: false, lastUpdated: Date.now() };
    } catch (error) {
      console.error('Error reading flow progress from localStorage', error);
      return { completedSteps: [], dismissed: false, lastUpdated: Date.now() };
    }
  });

  const setSharedData = (data: Partial<SharedData>) => {
    setSharedDataState(prevData => ({ ...prevData, ...data }));
  };

  const clearSharedData = () => {
    setSharedDataState({});
    try {
      window.localStorage.removeItem('sharedCalculatorData');
    } catch (error) {
      console.error('Error clearing localStorage', error);
    }
  };

  const markStepComplete = (step: FlowStep) => {
    setFlowProgress(prev => {
      if (prev.completedSteps.includes(step)) return prev;
      return {
        ...prev,
        completedSteps: [...prev.completedSteps, step],
        lastUpdated: Date.now()
      };
    });
  };

  const dismissFlow = () => {
    setFlowProgress(prev => ({
      ...prev,
      dismissed: true,
      lastUpdated: Date.now()
    }));
  };

  const resetFlow = () => {
    setFlowProgress({
      completedSteps: [],
      dismissed: false,
      lastUpdated: Date.now()
    });
    // Also clear all shared data
    clearSharedData();
  };

  const isFlowComplete = flowProgress.completedSteps.length === FLOW_STEPS.length;

  const nextFlowStep = (() => {
    for (const step of FLOW_STEPS) {
      if (!flowProgress.completedSteps.includes(step)) {
        return step;
      }
    }
    return null;
  })();

  useEffect(() => {
    try {
      window.localStorage.setItem('sharedCalculatorData', JSON.stringify(sharedData));
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  }, [sharedData]);

  useEffect(() => {
    try {
      window.localStorage.setItem('calculatorFlowProgress', JSON.stringify(flowProgress));
    } catch (error) {
      console.error('Error writing flow progress to localStorage', error);
    }
  }, [flowProgress]);

  return (
    <SharedDataContext.Provider value={{
      sharedData,
      setSharedData,
      clearSharedData,
      financialProfile: sharedData,
      flowProgress,
      markStepComplete,
      dismissFlow,
      resetFlow,
      isFlowComplete,
      nextFlowStep
    }}>
      {children}
    </SharedDataContext.Provider>
  );
};

export const useSharedData = () => {
  const context = useContext(SharedDataContext);
  if (context === undefined) {
    throw new Error('useSharedData must be used within a SharedDataProvider');
  }
  return context;
};

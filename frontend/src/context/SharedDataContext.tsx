// src/context/SharedDataContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

  // Goals
  savingsGoal?: number;
  savingsTimeframe?: number;
  emergencyFundGoal?: number;
}

// Legacy support
interface SharedData extends FinancialProfile {}

interface SharedDataContextType {
  sharedData: SharedData;
  setSharedData: (data: Partial<SharedData>) => void;
  clearSharedData: () => void;
  financialProfile: FinancialProfile;
}

const SharedDataContext = createContext<SharedDataContextType | undefined>(undefined);

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

  useEffect(() => {
    try {
      window.localStorage.setItem('sharedCalculatorData', JSON.stringify(sharedData));
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  }, [sharedData]);

  return (
    <SharedDataContext.Provider value={{
      sharedData,
      setSharedData,
      clearSharedData,
      financialProfile: sharedData
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

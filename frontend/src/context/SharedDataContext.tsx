// src/context/SharedDataContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SharedData {
  annualSalary?: number;
  hourlyRate?: number;
  // Add other shared fields here
}

interface SharedDataContextType {
  sharedData: SharedData;
  setSharedData: (data: SharedData) => void;
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

  const setSharedData = (data: SharedData) => {
    setSharedDataState(prevData => ({ ...prevData, ...data }));
  };

  useEffect(() => {
    try {
      window.localStorage.setItem('sharedCalculatorData', JSON.stringify(sharedData));
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  }, [sharedData]);

  return (
    <SharedDataContext.Provider value={{ sharedData, setSharedData }}>
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

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { SharedDataProvider } from './context/SharedDataContext';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Dashboard } from './pages/Dashboard';
import { HourlyToSalary } from './components/calculators/HourlyToSalary';
import { TakeHomePay } from './components/calculators/TakeHomePay';
import { CostOfLiving } from './components/calculators/CostOfLiving';
import { RetirementCalculator } from './components/calculators/RetirementCalculator';
import { LoanCalculator } from './components/calculators/LoanCalculator';
import { InvestmentCalculator } from './components/calculators/InvestmentCalculator';
import { InterestCalculator } from './components/calculators/InterestCalculator';
import { BudgetCalculator } from './components/calculators/BudgetCalculator';
import { MortgageCalculator } from './components/calculators/MortgageCalculator';
import { SavingsGoalCalculator } from './components/calculators/SavingsGoalCalculator';
import { NetWorthCalculator } from './components/calculators/NetWorthCalculator';
import { FourZeroOneKCalculator } from './components/calculators/FourZeroOneKCalculator';
import { DebtPayoffCalculator } from './components/calculators/DebtPayoffCalculator';
import { TaxCalculator } from './components/calculators/TaxCalculator';
import { GoalsCalculator } from './components/calculators/GoalsCalculator';
import { RetirementPlanner } from './components/calculators/RetirementPlanner';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <SharedDataProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/hourly-to-salary" element={<HourlyToSalary />} />
            <Route path="/take-home-pay" element={<TakeHomePay />} />
            <Route path="/cost-of-living" element={<CostOfLiving />} />
            <Route path="/retirement-calculator" element={<RetirementCalculator />} />
            <Route path="/loan-calculator" element={<LoanCalculator />} />
            <Route path="/investment-calculator" element={<InvestmentCalculator />} />
            <Route path="/interest-calculator" element={<InterestCalculator />} />
            <Route path="/budget-calculator" element={<BudgetCalculator />} />
            <Route path="/mortgage-calculator" element={<MortgageCalculator />} />
            <Route path="/savings-goal-calculator" element={<SavingsGoalCalculator />} />
            <Route path="/net-worth-calculator" element={<NetWorthCalculator />} />
            <Route path="/401k-calculator" element={<FourZeroOneKCalculator />} />
            <Route path="/debt-payoff-calculator" element={<DebtPayoffCalculator />} />
            <Route path="/tax-calculator" element={<TaxCalculator />} />
            <Route path="/goals-calculator" element={<GoalsCalculator />} />
            <Route path="/retirement-planner" element={<RetirementPlanner />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/freelance-rate" element={<TakeHomePay />} />
            <Route path="/salary-negotiation" element={<TakeHomePay />} />
            <Route path="/privacy" element={<About />} />
            <Route path="/contact" element={<About />} />
          </Routes>
        </Layout>
      </SharedDataProvider>
    </BrowserRouter>
  );
};

export default App;

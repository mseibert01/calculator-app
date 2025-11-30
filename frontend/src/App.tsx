import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { SharedDataProvider } from './context/SharedDataContext';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { HourlyToSalary } from './components/calculators/HourlyToSalary';
import { TakeHomePay } from './components/calculators/TakeHomePay';
import { CostOfLiving } from './components/calculators/CostOfLiving';
import { RetirementCalculator } from './components/calculators/RetirementCalculator';
import { LoanCalculator } from './components/calculators/LoanCalculator';
import { InvestmentCalculator } from './components/calculators/InvestmentCalculator';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <SharedDataProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/hourly-to-salary" element={<HourlyToSalary />} />
            <Route path="/take-home-pay" element={<TakeHomePay />} />
            <Route path="/cost-of-living" element={<CostOfLiving />} />
            <Route path="/retirement-calculator" element={<RetirementCalculator />} />
            <Route path="/loan-calculator" element={<LoanCalculator />} />
            <Route path="/investment-calculator" element={<InvestmentCalculator />} />
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

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { HourlyToSalary } from './components/calculators/HourlyToSalary';
import { TakeHomePay } from './components/calculators/TakeHomePay';
import { CostOfLiving } from './components/calculators/CostOfLiving';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/hourly-to-salary" element={<HourlyToSalary />} />
          <Route path="/take-home-pay" element={<TakeHomePay />} />
          <Route path="/cost-of-living" element={<CostOfLiving />} />
          <Route path="/freelance-rate" element={<TakeHomePay />} />
          <Route path="/salary-negotiation" element={<TakeHomePay />} />
          <Route path="/privacy" element={<About />} />
          <Route path="/contact" element={<About />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;

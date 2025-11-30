export interface Calculator {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
  popular?: boolean;
  keywords: string[];
}

export const calculators: Calculator[] = [
  {
    id: 'hourly-to-salary',
    name: 'Hourly to Salary Calculator',
    description: 'Convert your hourly wage to annual salary with benefits',
    icon: 'DollarSign',
    path: '/hourly-to-salary',
    popular: true,
    keywords: ['hourly', 'salary', 'wage', 'conversion']
  },
  {
    id: 'take-home-pay',
    name: 'Take-Home Pay Calculator',
    description: 'Calculate your net pay after taxes and deductions',
    icon: 'Wallet',
    path: '/take-home-pay',
    popular: true,
    keywords: ['net pay', 'taxes', 'deductions', 'paycheck']
  },
  {
    id: 'cost-of-living',
    name: 'Cost of Living Calculator',
    description: 'Compare living expenses between cities',
    icon: 'Home',
    path: '/cost-of-living',
    popular: true,
    keywords: ['cost of living', 'city comparison', 'relocation']
  },
  {
    id: 'freelance-rate',
    name: 'Freelance Rate Calculator',
    description: 'Determine your ideal hourly or project rate',
    icon: 'Briefcase',
    path: '/freelance-rate',
    keywords: ['freelance', 'contractor', 'hourly rate']
  },
  {
    id: 'salary-negotiation',
    name: 'Salary Negotiation Calculator',
    description: 'Get data-driven insights for your next salary discussion',
    icon: 'TrendingUp',
    path: '/salary-negotiation',
    keywords: ['negotiation', 'counteroffer', 'raise']
  },
  {
    id: 'retirement-calculator',
    name: 'Retirement Savings Calculator',
    description: 'Project your retirement savings and see how your money can grow over time.',
    icon: 'Landmark',
    path: '/retirement-calculator',
    keywords: ['retirement', 'savings', '401k', 'investment']
  },
  {
    id: 'loan-calculator',
    name: 'Loan Calculator',
    description: 'Calculate your monthly loan payment and see a full amortization schedule.',
    icon: 'Banknote',
    path: '/loan-calculator',
    keywords: ['loan', 'mortgage', 'car loan', 'amortization']
  },
  {
    id: 'investment-calculator',
    name: 'Investment Calculator',
    description: 'See how your investments can grow over time with compound interest.',
    icon: 'LineChart',
    path: '/investment-calculator',
    keywords: ['investment', 'compound interest', 'stocks', 'returns']
  },
  {
    id: 'interest-calculator',
    name: 'Interest Calculator',
    description: 'Calculate compound interest with flexible compounding frequencies and contribution options.',
    icon: 'Calculator',
    path: '/interest-calculator',
    popular: true,
    keywords: ['interest', 'compound interest', 'simple interest', 'APY', 'savings']
  }
];

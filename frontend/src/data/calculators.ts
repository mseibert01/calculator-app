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
  }
];

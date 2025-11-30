export interface Calculator {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
  popular?: boolean;
  category: 'income' | 'budgeting' | 'investing' | 'debt' | 'housing' | 'tax';
  keywords: string[];
}

export interface CalculatorCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const categories: CalculatorCategory[] = [
  {
    id: 'income',
    name: 'Income & Salary',
    description: 'Calculate salaries, hourly rates, and take-home pay',
    icon: 'DollarSign'
  },
  {
    id: 'budgeting',
    name: 'Budgeting & Planning',
    description: 'Create budgets and track your financial goals',
    icon: 'Wallet'
  },
  {
    id: 'investing',
    name: 'Investing & Retirement',
    description: 'Plan for retirement and grow your investments',
    icon: 'TrendingUp'
  },
  {
    id: 'debt',
    name: 'Debt Management',
    description: 'Pay off debt faster with smart strategies',
    icon: 'CreditCard'
  },
  {
    id: 'housing',
    name: 'Housing & Mortgages',
    description: 'Calculate mortgage payments and home affordability',
    icon: 'Home'
  },
  {
    id: 'tax',
    name: 'Taxes',
    description: 'Estimate your tax liability and plan ahead',
    icon: 'Receipt'
  }
];

export const calculators: Calculator[] = [
  {
    id: 'hourly-to-salary',
    name: 'Hourly to Salary Calculator',
    description: 'Convert your hourly wage to annual salary with benefits',
    icon: 'DollarSign',
    path: '/hourly-to-salary',
    popular: true,
    category: 'income',
    keywords: ['hourly', 'salary', 'wage', 'conversion']
  },
  {
    id: 'take-home-pay',
    name: 'Take-Home Pay Calculator',
    description: 'Calculate your net pay after taxes and deductions',
    icon: 'Wallet',
    path: '/take-home-pay',
    popular: true,
    category: 'income',
    keywords: ['net pay', 'taxes', 'deductions', 'paycheck']
  },
  {
    id: 'cost-of-living',
    name: 'Cost of Living Calculator',
    description: 'Compare living expenses between cities',
    icon: 'Home',
    path: '/cost-of-living',
    popular: true,
    category: 'budgeting',
    keywords: ['cost of living', 'city comparison', 'relocation']
  },
  {
    id: 'freelance-rate',
    name: 'Freelance Rate Calculator',
    description: 'Determine your ideal hourly or project rate',
    icon: 'Briefcase',
    path: '/freelance-rate',
    category: 'income',
    keywords: ['freelance', 'contractor', 'hourly rate']
  },
  {
    id: 'salary-negotiation',
    name: 'Salary Negotiation Calculator',
    description: 'Get data-driven insights for your next salary discussion',
    icon: 'TrendingUp',
    path: '/salary-negotiation',
    category: 'income',
    keywords: ['negotiation', 'counteroffer', 'raise']
  },
  {
    id: 'retirement-calculator',
    name: 'Retirement Savings Calculator',
    description: 'Project your retirement savings and see how your money can grow over time.',
    icon: 'Landmark',
    path: '/retirement-calculator',
    category: 'investing',
    keywords: ['retirement', 'savings', '401k', 'investment']
  },
  {
    id: 'loan-calculator',
    name: 'Loan Calculator',
    description: 'Calculate your monthly loan payment and see a full amortization schedule.',
    icon: 'Banknote',
    path: '/loan-calculator',
    category: 'debt',
    keywords: ['loan', 'mortgage', 'car loan', 'amortization']
  },
  {
    id: 'investment-calculator',
    name: 'Investment Calculator',
    description: 'See how your investments can grow over time with compound interest.',
    icon: 'LineChart',
    path: '/investment-calculator',
    category: 'investing',
    keywords: ['investment', 'compound interest', 'stocks', 'returns']
  },
  {
    id: 'interest-calculator',
    name: 'Interest Calculator',
    description: 'Calculate compound interest with flexible compounding frequencies and contribution options.',
    icon: 'Calculator',
    path: '/interest-calculator',
    popular: true,
    category: 'investing',
    keywords: ['interest', 'compound interest', 'simple interest', 'APY', 'savings']
  },
  {
    id: 'budget-calculator',
    name: 'Budget Calculator',
    description: 'Plan your spending with the 50/30/20 budgeting rule or create a custom budget.',
    icon: 'Wallet',
    path: '/budget-calculator',
    popular: true,
    category: 'budgeting',
    keywords: ['budget', '50/30/20', 'spending', 'personal finance', 'budgeting']
  },
  {
    id: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    description: 'Calculate your monthly mortgage payment and see the total cost of homeownership.',
    icon: 'Home',
    path: '/mortgage-calculator',
    popular: true,
    category: 'housing',
    keywords: ['mortgage', 'home loan', 'housing', 'property', 'PMI', 'home buying']
  },
  {
    id: 'savings-goal-calculator',
    name: 'Savings Goal Calculator',
    description: 'Calculate how long it will take to reach your savings goal and how much to save monthly.',
    icon: 'Target',
    path: '/savings-goal-calculator',
    category: 'budgeting',
    keywords: ['savings', 'goal', 'target', 'financial goals', 'compound interest']
  },
  {
    id: 'net-worth-calculator',
    name: 'Net Worth Calculator',
    description: 'Calculate your total net worth by adding up assets and subtracting liabilities.',
    icon: 'TrendingUp',
    path: '/net-worth-calculator',
    category: 'budgeting',
    keywords: ['net worth', 'assets', 'liabilities', 'wealth', 'financial snapshot']
  },
  {
    id: '401k-calculator',
    name: '401k/IRA Calculator',
    description: 'Optimize your retirement account contributions and see how employer matching impacts savings.',
    icon: 'PiggyBank',
    path: '/401k-calculator',
    category: 'investing',
    keywords: ['401k', 'IRA', 'retirement', 'employer match', '403b', 'retirement account']
  },
  {
    id: 'debt-payoff-calculator',
    name: 'Debt Payoff Calculator',
    description: 'Compare avalanche vs snowball strategies and see how to become debt-free faster.',
    icon: 'CreditCard',
    path: '/debt-payoff-calculator',
    category: 'debt',
    keywords: ['debt', 'payoff', 'avalanche', 'snowball', 'debt free', 'credit card']
  },
  {
    id: 'tax-calculator',
    name: 'Tax Calculator',
    description: 'Estimate your federal and state income taxes for 2025 with accurate tax brackets.',
    icon: 'Receipt',
    path: '/tax-calculator',
    category: 'tax',
    keywords: ['tax', 'income tax', 'federal tax', 'state tax', 'tax brackets', 'FICA']
  }
];

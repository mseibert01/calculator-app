import { costOfLivingData, CityCostOfLiving } from '../data/costOfLivingData';
import { calculateStateTax } from './stateTaxRates';

export interface HourlyToSalaryInput {
  hourlyRate: number;
  hoursPerWeek: number;
  weeksPerYear: number;
  paidTimeOff: number;
}

export interface HourlyToSalaryResult {
  annualSalary: number;
  monthlyPay: number;
  biweeklyPay: number;
  weeklyPay: number;
  totalWorkHours: number;
  workWeeks: number;
}

export interface TakeHomePayInput {
  grossIncome: number;
  payFrequency: 'annually' | 'monthly' | 'biweekly' | 'weekly';
  filingStatus: 'single' | 'married';
  state: string;
}

export interface TakeHomePayResult {
  grossPay: number;
  netPay: number;
  federalTax: number;
  stateTax: number;
  socialSecurity: number;
  medicare: number;
  totalTax: number;
}

export const calculateHourlyToSalary = (input: HourlyToSalaryInput): HourlyToSalaryResult => {
  const workWeeks = input.weeksPerYear - input.paidTimeOff;
  const totalWorkHours = input.hoursPerWeek * workWeeks;
  const annualSalary = input.hourlyRate * totalWorkHours;
  const monthlyPay = annualSalary / 12;
  const biweeklyPay = annualSalary / 26;
  const weeklyPay = annualSalary / workWeeks;

  return {
    annualSalary,
    monthlyPay,
    biweeklyPay,
    weeklyPay,
    totalWorkHours,
    workWeeks
  };
};

export const calculateTakeHomePay = (input: TakeHomePayInput): TakeHomePayResult => {
  let annualGrossIncome = input.grossIncome;

  switch (input.payFrequency) {
    case 'monthly':
      annualGrossIncome *= 12;
      break;
    case 'biweekly':
      annualGrossIncome *= 26;
      break;
    case 'weekly':
      annualGrossIncome *= 52;
      break;
  }

  // Calculate Federal Income Tax using 2025 brackets
  const standardDeduction = input.filingStatus === 'married' ? 30000 : 15000;
  const taxableIncome = Math.max(0, annualGrossIncome - standardDeduction);

  let federalTax = 0;
  const federalBrackets = input.filingStatus === 'married'
    ? [
        { rate: 0.10, min: 0, max: 23200 },
        { rate: 0.12, min: 23200, max: 94300 },
        { rate: 0.22, min: 94300, max: 201050 },
        { rate: 0.24, min: 201050, max: 383900 },
        { rate: 0.32, min: 383900, max: 487450 },
        { rate: 0.35, min: 487450, max: 731200 },
        { rate: 0.37, min: 731200, max: Infinity },
      ]
    : [
        { rate: 0.10, min: 0, max: 11600 },
        { rate: 0.12, min: 11600, max: 47150 },
        { rate: 0.22, min: 47150, max: 100525 },
        { rate: 0.24, min: 100525, max: 191950 },
        { rate: 0.32, min: 191950, max: 243725 },
        { rate: 0.35, min: 243725, max: 609350 },
        { rate: 0.37, min: 609350, max: Infinity },
      ];

  for (const bracket of federalBrackets) {
    if (taxableIncome > bracket.min) {
      const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
      federalTax += taxableInBracket * bracket.rate;
    }
  }

  // Calculate State Tax using accurate state data
  const stateTax = calculateStateTax(annualGrossIncome, input.state, input.filingStatus);

  // FICA taxes
  const socialSecurityRate = 0.062;
  const socialSecurityWageBase = 168600; // 2025 limit
  const socialSecurity = Math.min(annualGrossIncome, socialSecurityWageBase) * socialSecurityRate;

  // Medicare tax - 1.45% base rate
  const medicareRate = 0.0145;
  const baseMedicare = annualGrossIncome * medicareRate;

  // Additional Medicare Tax - 0.9% on income over threshold (2025)
  const additionalMedicareThreshold = input.filingStatus === 'married' ? 250000 : 200000;
  const additionalMedicare = annualGrossIncome > additionalMedicareThreshold
    ? (annualGrossIncome - additionalMedicareThreshold) * 0.009
    : 0;

  const medicare = baseMedicare + additionalMedicare;



  const totalTax = federalTax + stateTax + socialSecurity + medicare;

  const annualNetIncome = annualGrossIncome - totalTax;

  

  let grossPay, netPay;

  switch (input.payFrequency) {

    case 'annually':

      grossPay = annualGrossIncome;

      netPay = annualNetIncome;

      break;

    case 'monthly':

      grossPay = annualGrossIncome / 12;

      netPay = annualNetIncome / 12;

      break;

    case 'biweekly':

      grossPay = annualGrossIncome / 26;

      netPay = annualNetIncome / 26;

      break;

    case 'weekly':

      grossPay = annualGrossIncome / 52;

      netPay = annualNetIncome / 52;

      break;

  }





  return {

    grossPay,

    netPay,

    federalTax: federalTax / (input.payFrequency === 'annually' ? 1 : input.payFrequency === 'monthly' ? 12 : input.payFrequency === 'biweekly' ? 26 : 52),

    stateTax: stateTax / (input.payFrequency === 'annually' ? 1 : input.payFrequency === 'monthly' ? 12 : input.payFrequency === 'biweekly' ? 26 : 52),

    socialSecurity: socialSecurity / (input.payFrequency === 'annually' ? 1 : input.payFrequency === 'monthly' ? 12 : input.payFrequency === 'biweekly' ? 26 : 52),

    medicare: medicare / (input.payFrequency === 'annually' ? 1 : input.payFrequency === 'monthly' ? 12 : input.payFrequency === 'biweekly' ? 26 : 52),

    totalTax: totalTax / (input.payFrequency === 'annually' ? 1 : input.payFrequency === 'monthly' ? 12 : input.payFrequency === 'biweekly' ? 26 : 52),

  };

};











export interface CostOfLivingInput {



    currentCity: string;



    newCity: string;



    currentSalary: number;



    filingStatus: 'single' | 'married';



}







export interface CostOfLivingResult {



    equivalentSalary: number;



    difference: number;



    cityIndices: {



        current: CityCostOfLiving['indices'];



        new: CityCostOfLiving['indices'];



    };



    currentTakeHomePay: TakeHomePayResult;



    newTakeHomePay: TakeHomePayResult;



}







export const calculateCostOfLivingDifference = (input: CostOfLivingInput): CostOfLivingResult | null => {







    const currentCityData = costOfLivingData.find(c => c.name === input.currentCity);



    const newCityData = costOfLivingData.find(c => c.name === input.newCity);







    if (!currentCityData || !newCityData || input.currentCity === input.newCity) {



        return null;



    }







    const equivalentSalary = (input.currentSalary / currentCityData.indices.overall) * newCityData.indices.overall;



    const difference = equivalentSalary - input.currentSalary;







    const currentCityState = input.currentCity.split(', ')[1];



    const newCityState = input.newCity.split(', ')[1];







    const currentTakeHomePay = calculateTakeHomePay({



        grossIncome: input.currentSalary,



        payFrequency: 'annually',



        filingStatus: input.filingStatus,



        state: currentCityState,



    });







    const newTakeHomePay = calculateTakeHomePay({



        grossIncome: equivalentSalary,



        payFrequency: 'annually',



        filingStatus: input.filingStatus,



        state: newCityState,



    });







    return {



        equivalentSalary,



        difference,



        cityIndices: {



            current: currentCityData.indices,



            new: newCityData.indices



        },



        currentTakeHomePay,



        newTakeHomePay,



    };



};







export interface RetirementSavingsInput {



    currentAge: number;



    retirementAge: number;



    currentSavings: number;



    monthlyContribution: number;



    returnRate: number;



    inflationRate: number;



}







export interface RetirementSavingsResult {



    futureValue: number;



    realValue: number;



    yearsToRetirement: number;



    projection: { year: number; value: number }[];



}







export const calculateRetirementSavings = (input: RetirementSavingsInput): RetirementSavingsResult | null => {







    if (input.currentAge >= input.retirementAge) {







        return null;







    }







    







    const yearsToRetirement = input.retirementAge - input.currentAge;







    const annualContribution = input.monthlyContribution * 12;







    const annualReturnRate = input.returnRate / 100;







    const annualInflationRate = input.inflationRate / 100;















    const projection: { year: number; value: number }[] = [];







    let futureValue = input.currentSavings;







    







    for (let i = 0; i <= yearsToRetirement; i++) {







        projection.push({ year: input.currentAge + i, value: futureValue });







        futureValue = (futureValue + annualContribution) * (1 + annualReturnRate);







    }







    







    const realValue = futureValue / Math.pow(1 + annualInflationRate, yearsToRetirement);















    return {







        futureValue,







        realValue,







        yearsToRetirement,







        projection,







    };







};















export interface LoanPaymentInput {







    loanAmount: number;







    interestRate: number;







    loanTerm: number;







}















export interface AmortizationRow {







    month: number;







    payment: number;







    principal: number;







    interest: number;







    balance: number;







}















export interface LoanPaymentResult {







    monthlyPayment: number;







    totalInterest: number;







    totalPrincipal: number;







    amortizationSchedule: AmortizationRow[];







}















export const calculateLoanPayment = (input: LoanPaymentInput): LoanPaymentResult | null => {















    const { loanAmount, interestRate, loanTerm } = input;















    if (loanAmount <= 0 || interestRate < 0 || loanTerm <= 0) {















        return null;















    }































    const monthlyInterestRate = interestRate / 100 / 12;















    const numberOfPayments = loanTerm * 12;































    const monthlyPayment =















        (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /















        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);















        















    if (isNaN(monthlyPayment) || !isFinite(monthlyPayment)){















        return null;















    }































    const amortizationSchedule: AmortizationRow[] = [];















    let balance = loanAmount;















    let totalInterest = 0;































    for (let i = 1; i <= numberOfPayments; i++) {















        const interest = balance * monthlyInterestRate;















        const principal = monthlyPayment - interest;















        balance -= principal;















        totalInterest += interest;































        amortizationSchedule.push({















            month: i,















            payment: monthlyPayment,















            principal,















            interest,















            balance: balance < 0 ? 0 : balance,















        });















    }































    return {















        monthlyPayment,















        totalInterest,















        totalPrincipal: loanAmount,















        amortizationSchedule,















    };















};































export interface InvestmentGrowthInput {















    initialInvestment: number;















    monthlyContribution: number;















    timeHorizon: number;















    returnRate: number;















}































export interface InvestmentGrowthResult {















    futureValue: number;















    totalContributions: number;















    totalInterest: number;















    projection: { year: number; initialInvestment: number; totalContributions: number; totalInterest: number; }[];















}































export const calculateInvestmentGrowth = (input: InvestmentGrowthInput): InvestmentGrowthResult | null => {















    const { initialInvestment, monthlyContribution, timeHorizon, returnRate } = input;















    if (timeHorizon <= 0) {















        return null;















    }































    const annualContribution = monthlyContribution * 12;















    const annualReturnRate = returnRate / 100;















    















    const projection: InvestmentGrowthResult['projection'] = [];















    let futureValue = initialInvestment;















    let totalContributions = initialInvestment;































    for (let i = 0; i <= timeHorizon; i++) {















        const yearStartValue = futureValue;






























        















        projection.push({















            year: i,















            initialInvestment: initialInvestment,















            totalContributions: totalContributions,















            totalInterest: yearStartValue - totalContributions,















        });















        















        futureValue = (futureValue + annualContribution) * (1 + annualReturnRate);















        totalContributions += annualContribution;















    }































    const finalValue = projection[projection.length-1];















    const totalInterest = finalValue.totalInterest + (finalValue.initialInvestment + finalValue.totalContributions) * annualReturnRate;















































    return {















        futureValue: futureValue,















        totalContributions: totalContributions,















        totalInterest: totalInterest,















        projection,















    };















};



export interface InterestCalculatorInput {
  initialInvestment: number;
  annualContribution: number;
  monthlyContribution: number;
  interestRate: number;
  years: number;
  compoundingFrequency: 'annually' | 'semiannually' | 'quarterly' | 'monthly' | 'semimonthly' | 'biweekly' | 'weekly' | 'daily' | 'continuously';
  contributionTiming: 'beginning' | 'end';
  taxRate: number;
  inflationRate: number;
}

export interface YearlyScheduleRow {
  year: number;
  principal: number;
  contributions: number;
  interest: number;
  balance: number;
}

export interface InterestCalculatorResult {
  endingBalance: number;
  totalPrincipal: number;
  totalContributions: number;
  totalInterest: number;
  afterTaxBalance: number;
  inflationAdjustedBalance: number;
  yearlySchedule: YearlyScheduleRow[];
}

const getCompoundingPeriodsPerYear = (frequency: InterestCalculatorInput['compoundingFrequency']): number => {
  const frequencies = {
    'annually': 1,
    'semiannually': 2,
    'quarterly': 4,
    'monthly': 12,
    'semimonthly': 24,
    'biweekly': 26,
    'weekly': 52,
    'daily': 365,
    'continuously': Infinity
  };
  return frequencies[frequency];
};

export const calculateInterest = (input: InterestCalculatorInput): InterestCalculatorResult => {
  const {
    initialInvestment,
    annualContribution,
    monthlyContribution,
    interestRate,
    years,
    compoundingFrequency,
    contributionTiming,
    taxRate,
    inflationRate
  } = input;

  const periodsPerYear = getCompoundingPeriodsPerYear(compoundingFrequency);
  const rateDecimal = interestRate / 100;
  const inflationDecimal = inflationRate / 100;
  const totalMonthlyContributions = monthlyContribution * 12;
  const totalYearlyContribution = annualContribution + totalMonthlyContributions;

  const yearlySchedule: YearlyScheduleRow[] = [];

  let balance = initialInvestment;
  let totalContributionsAccumulated = 0;
  let totalInterestAccumulated = 0;

  for (let year = 0; year <= years; year++) {

    if (year > 0) {
      // Add contributions for this year
      if (contributionTiming === 'beginning') {
        balance += totalYearlyContribution;
        totalContributionsAccumulated += totalYearlyContribution;
      }

      // Calculate interest for the year
      if (compoundingFrequency === 'continuously') {
        // Continuous compounding: A = Pe^(rt)
        const growthFactor = Math.exp(rateDecimal);
        const interestEarned = balance * (growthFactor - 1);
        balance *= growthFactor;
        totalInterestAccumulated += interestEarned;
      } else {
        // Regular compounding
        const periodRate = rateDecimal / periodsPerYear;
        const periodsInYear = periodsPerYear;

        for (let period = 0; period < periodsInYear; period++) {
          const periodInterest = balance * periodRate;
          balance += periodInterest;
          totalInterestAccumulated += periodInterest;

          // Add periodic contributions if monthly contributions exist
          if (monthlyContribution > 0) {
            const periodsPerMonth = periodsPerYear / 12;
            if ((period + 1) % periodsPerMonth === 0) {
              if (contributionTiming === 'end') {
                balance += monthlyContribution;
                totalContributionsAccumulated += monthlyContribution;
              }
            }
          }
        }

        // Add annual contribution at end if applicable
        if (annualContribution > 0 && contributionTiming === 'end') {
          balance += annualContribution;
          totalContributionsAccumulated += annualContribution;
        }
      }

      if (contributionTiming === 'end' && compoundingFrequency === 'continuously') {
        balance += totalYearlyContribution;
        totalContributionsAccumulated += totalYearlyContribution;
      }
    }


    yearlySchedule.push({
      year,
      principal: initialInvestment,
      contributions: totalContributionsAccumulated,
      interest: totalInterestAccumulated,
      balance
    });
  }

  const endingBalance = balance;
  const totalPrincipal = initialInvestment;
  const totalContributions = totalContributionsAccumulated;
  const totalInterest = totalInterestAccumulated;

  // Calculate after-tax balance
  const taxOnInterest = totalInterest * (taxRate / 100);
  const afterTaxBalance = endingBalance - taxOnInterest;

  // Calculate inflation-adjusted balance (purchasing power in today's dollars)
  const inflationAdjustedBalance = endingBalance / Math.pow(1 + inflationDecimal, years);

  return {
    endingBalance,
    totalPrincipal,
    totalContributions,
    totalInterest,
    afterTaxBalance,
    inflationAdjustedBalance,
    yearlySchedule
  };
};

// Budget Calculator (50/30/20 Rule)
export interface BudgetInput {
  monthlyIncome: number;
  budgetRule?: '50-30-20' | '60-20-20' | 'custom';
  customNeeds?: number;
  customWants?: number;
  customSavings?: number;
}

export interface BudgetResult {
  monthlyIncome: number;
  needs: number;
  wants: number;
  savings: number;
  needsPercentage: number;
  wantsPercentage: number;
  savingsPercentage: number;
}

export const calculateBudget = (input: BudgetInput): BudgetResult => {
  let needsPercentage: number;
  let wantsPercentage: number;
  let savingsPercentage: number;

  if (input.budgetRule === 'custom') {
    needsPercentage = input.customNeeds || 50;
    wantsPercentage = input.customWants || 30;
    savingsPercentage = input.customSavings || 20;
  } else if (input.budgetRule === '60-20-20') {
    needsPercentage = 60;
    wantsPercentage = 20;
    savingsPercentage = 20;
  } else {
    // Default 50/30/20
    needsPercentage = 50;
    wantsPercentage = 30;
    savingsPercentage = 20;
  }

  const needs = (input.monthlyIncome * needsPercentage) / 100;
  const wants = (input.monthlyIncome * wantsPercentage) / 100;
  const savings = (input.monthlyIncome * savingsPercentage) / 100;

  return {
    monthlyIncome: input.monthlyIncome,
    needs,
    wants,
    savings,
    needsPercentage,
    wantsPercentage,
    savingsPercentage
  };
};

// Mortgage Calculator
export interface MortgageInput {
  homePrice: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  propertyTax?: number;
  homeInsurance?: number;
  hoa?: number;
  pmi?: number;
}

export interface MortgageResult {
  loanAmount: number;
  monthlyPayment: number;
  principalAndInterest: number;
  propertyTax: number;
  homeInsurance: number;
  hoa: number;
  pmi: number;
  totalMonthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  affordableHomePrice?: number;
}

export const calculateMortgage = (input: MortgageInput): MortgageResult => {
  const loanAmount = input.homePrice - input.downPayment;
  const monthlyRate = input.interestRate / 100 / 12;
  const numberOfPayments = input.loanTerm * 12;

  let principalAndInterest = 0;
  if (monthlyRate === 0) {
    principalAndInterest = loanAmount / numberOfPayments;
  } else {
    principalAndInterest = 
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  }

  const monthlyPropertyTax = (input.propertyTax || 0) / 12;
  const monthlyInsurance = (input.homeInsurance || 0) / 12;
  const monthlyHoa = input.hoa || 0;
  const monthlyPmi = input.pmi || 0;

  const totalMonthlyPayment = 
    principalAndInterest + 
    monthlyPropertyTax + 
    monthlyInsurance + 
    monthlyHoa + 
    monthlyPmi;

  const totalInterest = (principalAndInterest * numberOfPayments) - loanAmount;
  const totalCost = input.homePrice + totalInterest + 
    ((input.propertyTax || 0) * input.loanTerm) + 
    ((input.homeInsurance || 0) * input.loanTerm);

  return {
    loanAmount,
    monthlyPayment: principalAndInterest,
    principalAndInterest,
    propertyTax: monthlyPropertyTax,
    homeInsurance: monthlyInsurance,
    hoa: monthlyHoa,
    pmi: monthlyPmi,
    totalMonthlyPayment,
    totalInterest,
    totalCost
  };
};

// Savings Goal Calculator
export interface SavingsGoalInput {
  goalAmount: number;
  currentSavings: number;
  monthlyContribution: number;
  interestRate: number;
  timeframe?: number;
}

export interface SavingsGoalResult {
  goalAmount: number;
  currentSavings: number;
  amountNeeded: number;
  monthsToGoal: number;
  yearsToGoal: number;
  monthlyContributionNeeded: number;
  totalContributions: number;
  totalInterest: number;
}

export const calculateSavingsGoal = (input: SavingsGoalInput): SavingsGoalResult => {
  const amountNeeded = input.goalAmount - input.currentSavings;
  const monthlyRate = input.interestRate / 100 / 12;

  let monthsToGoal = 0;
  let balance = input.currentSavings;
  
  if (input.monthlyContribution > 0) {
    while (balance < input.goalAmount && monthsToGoal < 1200) {
      balance = balance * (1 + monthlyRate) + input.monthlyContribution;
      monthsToGoal++;
    }
  }

  const yearsToGoal = monthsToGoal / 12;

  let monthlyContributionNeeded = 0;
  if (input.timeframe) {
    const months = input.timeframe * 12;
    if (monthlyRate === 0) {
      monthlyContributionNeeded = amountNeeded / months;
    } else {
      const futureValueOfCurrent = input.currentSavings * Math.pow(1 + monthlyRate, months);
      const remainingNeeded = input.goalAmount - futureValueOfCurrent;
      monthlyContributionNeeded = 
        (remainingNeeded * monthlyRate) / 
        (Math.pow(1 + monthlyRate, months) - 1);
    }
  }

  const totalContributions = input.monthlyContribution * monthsToGoal;
  const totalInterest = input.goalAmount - input.currentSavings - totalContributions;

  return {
    goalAmount: input.goalAmount,
    currentSavings: input.currentSavings,
    amountNeeded,
    monthsToGoal,
    yearsToGoal,
    monthlyContributionNeeded: monthlyContributionNeeded > 0 ? monthlyContributionNeeded : 0,
    totalContributions,
    totalInterest: totalInterest > 0 ? totalInterest : 0
  };
};

// Net Worth Calculator
export interface NetWorthInput {
  cashAndSavings: number;
  investments: number;
  retirement: number;
  homeValue: number;
  vehicleValue: number;
  otherAssets: number;
  mortgage: number;
  studentLoans: number;
  carLoans: number;
  creditCards: number;
  otherDebts: number;
}

export interface NetWorthResult {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  liquidAssets: number;
  debtToAssetRatio: number;
}

export const calculateNetWorth = (input: NetWorthInput): NetWorthResult => {
  const totalAssets = 
    input.cashAndSavings +
    input.investments +
    input.retirement +
    input.homeValue +
    input.vehicleValue +
    input.otherAssets;

  const totalLiabilities = 
    input.mortgage +
    input.studentLoans +
    input.carLoans +
    input.creditCards +
    input.otherDebts;

  const netWorth = totalAssets - totalLiabilities;
  
  const liquidAssets = 
    input.cashAndSavings +
    input.investments;

  const debtToAssetRatio = totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : 0;

  return {
    totalAssets,
    totalLiabilities,
    netWorth,
    liquidAssets,
    debtToAssetRatio
  };
};

// 401k Calculator
export interface FourZeroOneKInput {
  currentAge: number;
  retirementAge: number;
  annualSalary: number;
  currentBalance: number;
  employeeContributionPercent: number;
  employerMatchPercent: number;
  employerMatchLimit: number;
  annualReturnRate: number;
  salaryIncreaseRate: number;
}

export interface FourZeroOneKResult {
  retirementBalance: number;
  employeeContributions: number;
  employerContributions: number;
  investmentGrowth: number;
  yearsToRetirement: number;
  monthlyContribution: number;
  totalContributions: number;
}

export const calculateFourZeroOneK = (input: FourZeroOneKInput): FourZeroOneKResult => {
  const yearsToRetirement = input.retirementAge - input.currentAge;
  let balance = input.currentBalance;
  let totalEmployeeContributions = 0;
  let totalEmployerContributions = 0;
  let currentSalary = input.annualSalary;

  for (let year = 0; year < yearsToRetirement; year++) {
    const employeeContribution = currentSalary * (input.employeeContributionPercent / 100);
    const matchableAmount = Math.min(employeeContribution, currentSalary * (input.employerMatchLimit / 100));
    const employerContribution = matchableAmount * (input.employerMatchPercent / 100);

    totalEmployeeContributions += employeeContribution;
    totalEmployerContributions += employerContribution;

    balance = (balance + employeeContribution + employerContribution) * (1 + input.annualReturnRate / 100);
    currentSalary *= (1 + input.salaryIncreaseRate / 100);
  }

  const investmentGrowth = balance - input.currentBalance - totalEmployeeContributions - totalEmployerContributions;
  const monthlyContribution = (input.annualSalary * (input.employeeContributionPercent / 100)) / 12;

  return {
    retirementBalance: balance,
    employeeContributions: totalEmployeeContributions,
    employerContributions: totalEmployerContributions,
    investmentGrowth,
    yearsToRetirement,
    monthlyContribution,
    totalContributions: totalEmployeeContributions + totalEmployerContributions
  };
};

// Debt Payoff Calculator
export interface DebtItem {
  name: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
}

export interface DebtPayoffInput {
  debts: DebtItem[];
  extraPayment: number;
  strategy: 'avalanche' | 'snowball';
}

export interface DebtPayoffResult {
  totalDebt: number;
  totalMinimumPayment: number;
  monthsToPayoff: number;
  totalInterestPaid: number;
  totalPaid: number;
  payoffSchedule: Array<{
    month: number;
    debtName: string;
    payment: number;
    balance: number;
  }>;
}

export const calculateDebtPayoff = (input: DebtPayoffInput): DebtPayoffResult => {
  const debts = input.debts.map(d => ({ ...d }));
  const totalDebt = debts.reduce((sum, d) => sum + d.balance, 0);
  const totalMinimumPayment = debts.reduce((sum, d) => sum + d.minimumPayment, 0);
  const totalPayment = totalMinimumPayment + input.extraPayment;

  // Sort debts based on strategy
  if (input.strategy === 'avalanche') {
    debts.sort((a, b) => b.interestRate - a.interestRate);
  } else {
    debts.sort((a, b) => a.balance - b.balance);
  }

  let month = 0;
  let totalInterestPaid = 0;
  const payoffSchedule: DebtPayoffResult['payoffSchedule'] = [];

  while (debts.some(d => d.balance > 0) && month < 600) {
    month++;
    let remainingPayment = totalPayment;

    for (const debt of debts) {
      if (debt.balance > 0) {
        const interest = (debt.balance * debt.interestRate / 100) / 12;
        totalInterestPaid += interest;
        debt.balance += interest;

        const payment = Math.min(remainingPayment, debt.balance);
        debt.balance -= payment;
        remainingPayment -= payment;

        if (debt.balance > 0 || payment > 0) {
          payoffSchedule.push({
            month,
            debtName: debt.name,
            payment,
            balance: Math.max(0, debt.balance)
          });
        }

        if (remainingPayment <= 0) break;
      }
    }
  }

  return {
    totalDebt,
    totalMinimumPayment,
    monthsToPayoff: month,
    totalInterestPaid,
    totalPaid: totalDebt + totalInterestPaid,
    payoffSchedule
  };
};

// Tax Calculator (2025 brackets - simplified)
export interface TaxInput {
  income: number;
  filingStatus: 'single' | 'married' | 'head';
  deductions: number;
  state: string;
}

export interface TaxResult {
  grossIncome: number;
  adjustedGrossIncome: number;
  taxableIncome: number;
  federalTax: number;
  stateTax: number;
  ficaTax: number;
  totalTax: number;
  effectiveRate: number;
  takeHomePay: number;
}

export const calculateTax = (input: TaxInput): TaxResult => {
  const standardDeduction = input.filingStatus === 'married' ? 29200 : 14600;
  const totalDeductions = input.deductions > 0 ? input.deductions : standardDeduction;
  
  const adjustedGrossIncome = input.income;
  const taxableIncome = Math.max(0, adjustedGrossIncome - totalDeductions);

  // 2025 Federal Tax Brackets (simplified)
  let federalTax = 0;
  if (input.filingStatus === 'single') {
    if (taxableIncome <= 11600) federalTax = taxableIncome * 0.10;
    else if (taxableIncome <= 47150) federalTax = 1160 + (taxableIncome - 11600) * 0.12;
    else if (taxableIncome <= 100525) federalTax = 5426 + (taxableIncome - 47150) * 0.22;
    else if (taxableIncome <= 191950) federalTax = 17168.50 + (taxableIncome - 100525) * 0.24;
    else if (taxableIncome <= 243725) federalTax = 39110.50 + (taxableIncome - 191950) * 0.32;
    else if (taxableIncome <= 609350) federalTax = 55678.50 + (taxableIncome - 243725) * 0.35;
    else federalTax = 183647.25 + (taxableIncome - 609350) * 0.37;
  } else {
    if (taxableIncome <= 23200) federalTax = taxableIncome * 0.10;
    else if (taxableIncome <= 94300) federalTax = 2320 + (taxableIncome - 23200) * 0.12;
    else if (taxableIncome <= 201050) federalTax = 10852 + (taxableIncome - 94300) * 0.22;
    else if (taxableIncome <= 383900) federalTax = 34337 + (taxableIncome - 201050) * 0.24;
    else if (taxableIncome <= 487450) federalTax = 78221 + (taxableIncome - 383900) * 0.32;
    else if (taxableIncome <= 731200) federalTax = 111357 + (taxableIncome - 487450) * 0.35;
    else federalTax = 196669.50 + (taxableIncome - 731200) * 0.37;
  }

  // State tax (simplified - flat 5%)
  const stateTax = taxableIncome * 0.05;

  // FICA (Social Security + Medicare)
  const socialSecurityTax = Math.min(input.income, 168600) * 0.062;
  const medicareTax = input.income * 0.0145;
  const additionalMedicare = input.income > 200000 ? (input.income - 200000) * 0.009 : 0;
  const ficaTax = socialSecurityTax + medicareTax + additionalMedicare;

  const totalTax = federalTax + stateTax + ficaTax;
  const effectiveRate = (totalTax / input.income) * 100;
  const takeHomePay = input.income - totalTax;

  return {
    grossIncome: input.income,
    adjustedGrossIncome,
    taxableIncome,
    federalTax,
    stateTax,
    ficaTax,
    totalTax,
    effectiveRate,
    takeHomePay
  };
};

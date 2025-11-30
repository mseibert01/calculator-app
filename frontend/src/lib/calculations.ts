import { costOfLivingData, CityCostOfLiving } from '../data/costOfLivingData';

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

  

  // Simplified tax rates

  const federalTaxRate = 0.15;

  const stateTaxRate = 0.05; // This is a major simplification

  const socialSecurityRate = 0.062;

  const medicareRate = 0.0145;



  const federalTax = annualGrossIncome * federalTaxRate;

  const stateTax = annualGrossIncome * stateTaxRate;

  const socialSecurity = annualGrossIncome * socialSecurityRate;

  const medicare = annualGrossIncome * medicareRate;



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

}



export interface CostOfLivingResult {

    equivalentSalary: number;

    difference: number;

    cityIndices: {

        current: CityCostOfLiving['indices'];

        new: CityCostOfLiving['indices'];

    };

}



export const calculateCostOfLivingDifference = (input: CostOfLivingInput): CostOfLivingResult | null => {



    const currentCityData = costOfLivingData.find(c => c.name === input.currentCity);



    const newCityData = costOfLivingData.find(c => c.name === input.newCity);







    if (!currentCityData || !newCityData || input.currentCity === input.newCity) {



        return null;



    }







    const equivalentSalary = (input.currentSalary / currentCityData.indices.overall) * newCityData.indices.overall;



    const difference = equivalentSalary - input.currentSalary;







    return {



        equivalentSalary,



        difference,



        cityIndices: {



            current: currentCityData.indices,



            new: newCityData.indices



        }



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



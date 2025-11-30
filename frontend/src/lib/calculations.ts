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

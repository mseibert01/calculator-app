# Cross-Calculator Integration System

## Vision

Create a seamless flow where calculations from one calculator automatically populate and inform other calculators, providing users with a comprehensive financial planning experience.

## Current Calculators & Their Data

### Existing (7 calculators):
1. **Hourly to Salary** → Produces: `annualSalary`, `hourlyRate`
2. **Take-Home Pay** → Produces: `netPay`, `grossPay`, taxes
3. **Cost of Living** → Produces: `equivalentSalary` for new location
4. **Retirement Calculator** → Consumes: salary; Produces: retirement projections
5. **Loan Calculator** → Consumes: income; Produces: monthly payment
6. **Investment Calculator** → Consumes: contributions; Produces: growth
7. **Interest Calculator** → Consumes: initial investment; Produces: returns

## Data Flow Examples

### Example 1: Salary → Retirement → Investment
```
User inputs hourly rate ($50/hr)
  ↓
Hourly to Salary calculates: $104,000/year
  ↓
Automatically suggests: "Based on $104k salary, save 15% ($15,600/year) for retirement"
  ↓
Opens Retirement Calculator with $15,600 annual contribution pre-filled
  ↓
Shows retirement projection
  ↓
Suggests: "Invest additional $500/month in growth stocks"
  ↓
Opens Investment Calculator with $500/month pre-filled
```

### Example 2: Relocation Planning
```
User earns $80k in Current City
  ↓
Cost of Living Calculator: Need $95k in New City
  ↓
Automatically shows: "Your take-home pay will be..."
  ↓
Opens Take-Home Pay with $95k pre-filled
  ↓
Shows net pay after taxes
  ↓
Suggests: "Can you afford a home loan?"
  ↓
Opens Loan Calculator based on 28% of gross income rule
```

### Example 3: Complete Financial Picture
```
Hourly Rate → Annual Salary
  ↓
Take-Home Pay (after taxes)
  ↓
Budget Calculator (new!) - allocates take-home:
  - Housing: 28%
  - Retirement: 15%
  - Savings: 10%
  - Living expenses: 47%
  ↓
Loan Calculator (max affordable mortgage)
Retirement Calculator (with 15% contribution)
Savings Goal Calculator (new!)
```

## Additional Calculators Needed

### Essential for Integration:

1. **Budget Calculator** ⭐ HIGH PRIORITY
   - **Inputs:** Net income
   - **Outputs:** Recommended allocations (housing, retirement, savings, etc.)
   - **50/30/20 rule:** 50% needs, 30% wants, 20% savings
   - **Integrates with:** All calculators
   - **Why:** Central hub for financial planning

2. **Mortgage Calculator** ⭐ HIGH PRIORITY
   - **Inputs:** Salary, down payment, interest rate
   - **Outputs:** Max affordable home price, monthly payment
   - **Rule:** Max 28% of gross income
   - **Integrates with:** Salary, Take-Home Pay, Budget
   - **Why:** Major financial decision

3. **Savings Goal Calculator** ⭐ MEDIUM PRIORITY
   - **Inputs:** Goal amount, timeframe, current savings
   - **Outputs:** Monthly savings needed
   - **Integrates with:** Budget, Interest Calculator
   - **Why:** Helps users reach specific goals (house, car, vacation)

4. **Net Worth Calculator** ⭐ MEDIUM PRIORITY
   - **Inputs:** Assets (home, investments, savings) - Debts (loans, credit cards)
   - **Outputs:** Net worth, debt-to-income ratio
   - **Integrates with:** All calculators
   - **Why:** Comprehensive financial health snapshot

5. **401k/IRA Calculator** 📊 MEDIUM PRIORITY
   - **Inputs:** Salary, employer match, contribution %
   - **Outputs:** Tax savings, future value, recommended contribution
   - **Integrates with:** Retirement, Take-Home Pay
   - **Why:** Most common retirement vehicle

6. **Debt Payoff Calculator** 💳 MEDIUM PRIORITY
   - **Inputs:** Multiple debts, extra payment amount
   - **Outputs:** Payoff timeline, interest saved (avalanche vs snowball)
   - **Integrates with:** Budget, Take-Home Pay
   - **Why:** Helps users become debt-free

7. **Tax Calculator** 💰 MEDIUM PRIORITY
   - **Inputs:** Income, deductions, filing status
   - **Outputs:** Federal/state tax, effective rate, refund estimate
   - **Integrates with:** Take-Home Pay, Salary calculators
   - **Why:** More accurate tax estimates

8. **Car Affordability Calculator** 🚗 LOW PRIORITY
   - **Inputs:** Income, down payment, trade-in
   - **Outputs:** Max affordable car price, monthly payment
   - **Rule:** Max 10-15% of gross income
   - **Integrates with:** Budget, Loan Calculator
   - **Why:** Second largest purchase

9. **Emergency Fund Calculator** 🏦 LOW PRIORITY
   - **Inputs:** Monthly expenses, job stability
   - **Outputs:** Recommended emergency fund (3-6 months expenses)
   - **Integrates with:** Budget, Savings Goal
   - **Why:** Financial safety net

10. **College Savings Calculator (529)** 🎓 LOW PRIORITY
    - **Inputs:** Child's age, estimated college cost
    - **Outputs:** Monthly savings needed
    - **Integrates with:** Budget, Investment Calculator
    - **Why:** Major expense for families

## Integration Architecture

### Shared Data Context (Already exists!)

We already have `SharedDataContext` - expand it:

```typescript
interface FinancialProfile {
  // Income
  hourlyRate?: number;
  annualSalary?: number;
  grossIncome?: number;
  netIncome?: number;

  // Location
  currentCity?: string;

  // Goals
  retirementAge?: number;
  monthlyRetirementSavings?: number;

  // Housing
  monthlyRent?: number;
  homePrice?: number;
  downPayment?: number;

  // Debts
  totalDebt?: number;
  monthlyDebtPayment?: number;

  // Investments
  currentInvestments?: number;
  monthlyInvestment?: number;
}
```

### UI Components for Integration

1. **Suggestion Cards**
   ```tsx
   <SuggestionCard
     title="Ready for the next step?"
     description="Based on your $104k salary, let's plan your retirement"
     action="Calculate Retirement Savings"
     calculator="/retirement-calculator"
     prefillData={{ annualSalary: 104000 }}
   />
   ```

2. **Data Flow Indicator**
   ```tsx
   <DataFlowBadge
     from="Hourly to Salary"
     value={formatCurrency(annualSalary)}
     label="Annual Salary"
   />
   ```

3. **Calculator Navbar**
   - Show all related calculators
   - Highlight which have pre-filled data
   - Quick navigation between related tools

## Implementation Priority

### Phase 1: Foundation (Week 1)
- ✅ Enhanced SharedDataContext with FinancialProfile
- ✅ Suggestion Card component
- ✅ Update existing calculators to save data to context

### Phase 2: High Priority Calculators (Week 2-3)
- Budget Calculator (50/30/20 rule)
- Mortgage Calculator
- Savings Goal Calculator

### Phase 3: Integration UI (Week 3-4)
- Calculator suggestions after each calculation
- "Your Financial Picture" dashboard
- Pre-fill indicators and data flow badges

### Phase 4: Additional Calculators (Week 4-6)
- Net Worth Calculator
- 401k Calculator
- Debt Payoff Calculator
- Tax Calculator

### Phase 5: Advanced Features (Week 6-8)
- Financial health score
- Personalized recommendations
- Multi-scenario comparisons
- Export/save financial plan

## User Journey Example

**Complete Flow:**

1. **Entry:** User starts with hourly rate ($50/hr)
   - Sees: "You'll earn $104,000/year"
   - Suggestion: "Calculate your take-home pay"

2. **Take-Home Pay:** Auto-fills $104k
   - Shows: "$78,000/year after taxes"
   - Suggestion: "Create a budget"

3. **Budget Calculator:** Auto-fills $78k net income
   - Shows breakdown:
     - Housing: $21,840/year ($1,820/month)
     - Retirement: $11,700/year
     - Savings: $7,800/year
     - Living: $36,660/year
   - Multiple suggestions appear

4. **User chooses:** "How much house can I afford?"
   - Mortgage Calculator opens
   - Pre-filled: $104k salary, $1,820 max payment
   - Shows: Can afford $400k home with 20% down

5. **User chooses:** "Plan for retirement"
   - Retirement Calculator opens
   - Pre-filled: $11,700/year contribution
   - Shows: $2.1M at age 65

6. **Dashboard:** "Your Financial Picture"
   - Income: $104k → Take-home: $78k
   - Housing budget: $1,820/month
   - Retirement goal: $2.1M
   - Savings goal: $7,800/year

## Benefits

1. **User Experience:**
   - No re-entering data
   - Discover related tools naturally
   - See complete financial picture

2. **Engagement:**
   - Users explore more calculators
   - Longer session time
   - Higher return rate

3. **SEO:**
   - Lower bounce rate
   - More page views
   - Better engagement metrics

4. **Monetization:**
   - More ad impressions
   - Affiliate opportunities (mortgage, investment platforms)
   - Premium features (save plans, export reports)

## Next Steps

Which calculators should we build first?

**Recommendation:** Start with Budget Calculator - it's the central hub that connects to everything.

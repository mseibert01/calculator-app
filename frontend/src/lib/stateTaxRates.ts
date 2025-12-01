// 2025 State Income Tax Rates
export interface StateTaxBracket {
  rate: number;
  min: number;
  max: number | null;
}


export interface StateInfo {
  name: string;
  hasIncomeTax: boolean;
  brackets?: {
    single: StateTaxBracket[];
    married: StateTaxBracket[];
  };
  flatRate?: number;
  deductions?: {
    single: number;
    married: number;
  };
}


export const STATE_TAX_DATA: Record<string, StateInfo> = {
  AL: {
    name: 'Alabama',
    hasIncomeTax: true,
    brackets: {
      single: [
        { rate: 2, min: 0, max: 500 },
        { rate: 4, min: 500, max: 3000 },
        { rate: 5, min: 3000, max: null }
      ],
      married: [
        { rate: 2, min: 0, max: 1000 },
        { rate: 4, min: 1000, max: 6000 },
        { rate: 5, min: 6000, max: null }
      ]
    }
  },
  AK: { name: 'Alaska', hasIncomeTax: false },
  AZ: {
    name: 'Arizona',
    hasIncomeTax: true,
    flatRate: 2.5
  },
  AR: {
    name: 'Arkansas',
    hasIncomeTax: true,
    brackets: {
      single: [
        { rate: 2, min: 0, max: 5099 },
        { rate: 3, min: 5099, max: 10199 },
        { rate: 3.4, min: 10199, max: 14299 },
        { rate: 4.4, min: 14299, max: null }
      ],
      married: [
        { rate: 2, min: 0, max: 5099 },
        { rate: 3, min: 5099, max: 10199 },
        { rate: 3.4, min: 10199, max: 14299 },
        { rate: 4.4, min: 14299, max: null }
      ]
    }
  },
  CA: {
    name: 'California',
    hasIncomeTax: true,
    deductions: {
      single: 5540,
      married: 11080
    },
    brackets: {
      single: [
        { rate: 1, min: 0, max: 10412 },
        { rate: 2, min: 10412, max: 24684 },
        { rate: 4, min: 24684, max: 38959 },
        { rate: 6, min: 38959, max: 54081 },
        { rate: 8, min: 54081, max: 68350 },
        { rate: 9.3, min: 68350, max: 349137 },
        { rate: 10.3, min: 349137, max: 418961 },
        { rate: 11.3, min: 418961, max: 698271 },
        { rate: 12.3, min: 698271, max: null }
      ],
      married: [
        { rate: 1, min: 0, max: 20824 },
        { rate: 2, min: 20824, max: 49368 },
        { rate: 4, min: 49368, max: 77918 },
        { rate: 6, min: 77918, max: 108162 },
        { rate: 8, min: 108162, max: 136700 },
        { rate: 9.3, min: 136700, max: 698274 },
        { rate: 10.3, min: 698274, max: 837922 },
        { rate: 11.3, min: 837922, max: 1396542 },
        { rate: 12.3, min: 1396542, max: null }
      ]
    }
  },
  CO: {
    name: 'Colorado',
    hasIncomeTax: true,
    flatRate: 4.4
  },
  CT: {
    name: 'Connecticut',
    hasIncomeTax: true,
    brackets: {
      single: [
        { rate: 2, min: 0, max: 10000 },
        { rate: 4.5, min: 10000, max: 50000 },
        { rate: 5.5, min: 50000, max: 100000 },
        { rate: 6, min: 100000, max: 200000 },
        { rate: 6.5, min: 200000, max: 250000 },
        { rate: 6.9, min: 250000, max: 500000 },
        { rate: 6.99, min: 500000, max: null }
      ],
      married: [
        { rate: 2, min: 0, max: 20000 },
        { rate: 4.5, min: 20000, max: 100000 },
        { rate: 5.5, min: 100000, max: 200000 },
        { rate: 6, min: 200000, max: 400000 },
        { rate: 6.5, min: 400000, max: 500000 },
        { rate: 6.9, min: 500000, max: 1000000 },
        { rate: 6.99, min: 1000000, max: null }
      ]
    }
  },
  DE: {
    name: 'Delaware',
    hasIncomeTax: true,
    brackets: {
      single: [
        { rate: 2.2, min: 0, max: 2000 },
        { rate: 3.9, min: 2000, max: 5000 },
        { rate: 4.8, min: 5000, max: 10000 },
        { rate: 5.2, min: 10000, max: 20000 },
        { rate: 5.55, min: 20000, max: 25000 },
        { rate: 6.6, min: 25000, max: 60000 },
        { rate: 6.6, min: 60000, max: null }
      ],
      married: [
        { rate: 2.2, min: 0, max: 2000 },
        { rate: 3.9, min: 2000, max: 5000 },
        { rate: 4.8, min: 5000, max: 10000 },
        { rate: 5.2, min: 10000, max: 20000 },
        { rate: 5.55, min: 20000, max: 25000 },
        { rate: 6.6, min: 25000, max: 60000 },
        { rate: 6.6, min: 60000, max: null }
      ]
    }
  },
  FL: { name: 'Florida', hasIncomeTax: false },
  GA: {
    name: 'Georgia',
    hasIncomeTax: true,
    brackets: {
      single: [
        { rate: 1, min: 0, max: 750 },
        { rate: 2, min: 750, max: 2250 },
        { rate: 3, min: 2250, max: 3750 },
        { rate: 4, min: 3750, max: 5250 },
        { rate: 5, min: 5250, max: 7000 },
        { rate: 5.75, min: 7000, max: null }
      ],
      married: [
        { rate: 1, min: 0, max: 1000 },
        { rate: 2, min: 1000, max: 3000 },
        { rate: 3, min: 3000, max: 5000 },
        { rate: 4, min: 5000, max: 7000 },
        { rate: 5, min: 7000, max: 10000 },
        { rate: 5.75, min: 10000, max: null }
      ]
    }
  },
  HI: {
    name: 'Hawaii',
    hasIncomeTax: true,
    brackets: {
      single: [
        { rate: 1.4, min: 0, max: 2400 },
        { rate: 3.2, min: 2400, max: 4800 },
        { rate: 5.5, min: 4800, max: 9600 },
        { rate: 6.4, min: 9600, max: 14400 },
        { rate: 6.8, min: 14400, max: 19200 },
        { rate: 7.2, min: 19200, max: 24000 },
        { rate: 7.6, min: 24000, max: 36000 },
        { rate: 7.9, min: 36000, max: 48000 },
        { rate: 8.25, min: 48000, max: 150000 },
        { rate: 9, min: 150000, max: 175000 },
        { rate: 10, min: 175000, max: 200000 },
        { rate: 11, min: 200000, max: null }
      ],
      married: [
        { rate: 1.4, min: 0, max: 4800 },
        { rate: 3.2, min: 4800, max: 9600 },
        { rate: 5.5, min: 9600, max: 19200 },
        { rate: 6.4, min: 19200, max: 28800 },
        { rate: 6.8, min: 28800, max: 38400 },
        { rate: 7.2, min: 38400, max: 48000 },
        { rate: 7.6, min: 48000, max: 72000 },
        { rate: 7.9, min: 72000, max: 96000 },
        { rate: 8.25, min: 96000, max: 300000 },
        { rate: 9, min: 300000, max: 350000 },
        { rate: 10, min: 350000, max: 400000 },
        { rate: 11, min: 400000, max: null }
      ]
    }
  },
  ID: {
    name: 'Idaho',
    hasIncomeTax: true,
    flatRate: 5.8
  },
  IL: {
    name: 'Illinois',
    hasIncomeTax: true,
    flatRate: 4.95
  },
  IN: {
    name: 'Indiana',
    hasIncomeTax: true,
    flatRate: 3.15
  },
  IA: {
    name: 'Iowa',
    hasIncomeTax: true,
    flatRate: 3.8
  },
  KS: {
    name: 'Kansas',
    hasIncomeTax: true,
    brackets: {
      single: [
        { rate: 3.1, min: 0, max: 15000 },
        { rate: 5.25, min: 15000, max: 30000 },
        { rate: 5.7, min: 30000, max: null }
      ],
      married: [
        { rate: 3.1, min: 0, max: 30000 },
        { rate: 5.25, min: 30000, max: 60000 },
        { rate: 5.7, min: 60000, max: null }
      ]
    }
  },
  KY: {
    name: 'Kentucky',
    hasIncomeTax: true,
    flatRate: 4.5
  },
  LA: {
    name: 'Louisiana',
    hasIncomeTax: true,
    flatRate: 3
  },
  ME: {
    name: 'Maine',
    hasIncomeTax: true,
    brackets: {
      single: [
        { rate: 5.8, min: 0, max: 24500 },
        { rate: 6.75, min: 24500, max: 58050 },
        { rate: 7.15, min: 58050, max: null }
      ],
      married: [
        { rate: 5.8, min: 0, max: 49050 },
        { rate: 6.75, min: 49050, max: 116100 },
        { rate: 7.15, min: 116100, max: null }
      ]
    }
  },
  MD: {
    name: 'Maryland',
    hasIncomeTax: true,
    brackets: {
      single: [
        { rate: 2, min: 0, max: 1000 },
        { rate: 3, min: 1000, max: 2000 },
        { rate: 4, min: 2000, max: 3000 },
        { rate: 4.75, min: 3000, max: 100000 },
        { rate: 5, min: 100000, max: 125000 },
        { rate: 5.25, min: 125000, max: 150000 },
        { rate: 5.5, min: 150000, max: 250000 },
        { rate: 5.75, min: 250000, max: null }
      ],
      married: [
        { rate: 2, min: 0, max: 1000 },
        { rate: 3, min: 1000, max: 2000 },
        { rate: 4, min: 2000, max: 3000 },
        { rate: 4.75, min: 3000, max: 150000 },
        { rate: 5, min: 150000, max: 175000 },
        { rate: 5.25, min: 175000, max: 225000 },
        { rate: 5.5, min: 225000, max: 300000 },
        { rate: 5.75, min: 300000, max: null }
      ]
    }
  },
  MA: {
    name: 'Massachusetts',
    hasIncomeTax: true,
    flatRate: 5
  },
  MI: {
    name: 'Michigan',
    hasIncomeTax: true,
    flatRate: 4.25
  },
  MN: {
    name: 'Minnesota',
    hasIncomeTax: true,
    brackets: {
      single: [
        { rate: 5.35, min: 0, max: 30070 },
        { rate: 6.8, min: 30070, max: 98760 },
        { rate: 7.85, min: 98760, max: 183340 },
        { rate: 9.85, min: 183340, max: null }
      ],
      married: [
        { rate: 5.35, min: 0, max: 43950 },
        { rate: 6.8, min: 43950, max: 174610 },
        { rate: 7.85, min: 174610, max: 304970 },
        { rate: 9.85, min: 304970, max: null }
      ]
    }
  },
  MS: {
    name: 'Mississippi',
    hasIncomeTax: true,
    flatRate: 4.7
  },
  MO: {
    name: 'Missouri',
    hasIncomeTax: true,
    deductions: {
      single: 15750,
      married: 31500
    },
    brackets: {
      single: [
        { rate: 2, min: 0, max: 1207 },
        { rate: 2.5, min: 1207, max: 2414 },
        { rate: 3, min: 2414, max: 3621 },
        { rate: 3.5, min: 3621, max: 4828 },
        { rate: 4, min: 4828, max: 6035 },
        { rate: 4.5, min: 6035, max: 7242 },
        { rate: 4.8, min: 7242, max: 8449 },
        { rate: 4.95, min: 8449, max: null }
      ],
      married: [
        { rate: 2, min: 0, max: 1207 },
        { rate: 2.5, min: 1207, max: 2414 },
        { rate: 3, min: 2414, max: 3621 },
        { rate: 3.5, min: 3621, max: 4828 },
        { rate: 4, min: 4828, max: 6035 },
        { rate: 4.5, min: 6035, max: 7242 },
        { rate: 4.8, min: 7242, max: 8449 },
        { rate: 4.95, min: 8449, max: null }
      ]
    }
  },
  MT: {
    name: 'Montana',
    hasIncomeTax: true,
    brackets: {
      single: [
        { rate: 4.7, min: 0, max: 20500 },
        { rate: 5.9, min: 20500, max: 51600 },
        { rate: 6.75, min: 51600, max: null }
      ],
      married: [
        { rate: 4.7, min: 0, max: 41000 },
        { rate: 5.9, min: 41000, max: 103200 },
        { rate: 6.75, min: 103200, max: null }
      ]
    }
  },
  NE: {
    name: 'Nebraska',
    hasIncomeTax: true,
    brackets: {
      single: [
        { rate: 2.46, min: 0, max: 3700 },
        { rate: 3.51, min: 3700, max: 22170 },
        { rate: 5.01, min: 22170, max: 35730 },
        { rate: 6.84, min: 35730, max: null }
      ],
      married: [
        { rate: 2.46, min: 0, max: 7390 },
        { rate: 3.51, min: 7390, max: 44350 },
        { rate: 5.01, min: 44350, max: 71460 },
        { rate: 6.84, min: 71460, max: null }
      ]
    }
  },
  NV: { name: 'Nevada', hasIncomeTax: false },
  NH: { name: 'New Hampshire', hasIncomeTax: false },
  NJ: {
    name: 'New Jersey',
    hasIncomeTax: true,
    brackets: {
      single: [
        { rate: 1.4, min: 0, max: 20000 },
        { rate: 1.75, min: 20000, max: 35000 },
        { rate: 3.5, min: 35000, max: 40000 },
        { rate: 5.525, min: 40000, max: 75000 },
        { rate: 6.37, min: 75000, max: 500000 },
        { rate: 8.97, min: 500000, max: 1000000 },
        { rate: 10.75, min: 1000000, max: null }
      ],
      married: [
        { rate: 1.4, min: 0, max: 20000 },
        { rate: 1.75, min: 20000, max: 50000 },
        { rate: 2.45, min: 50000, max: 70000 },
        { rate: 3.5, min: 70000, max: 80000 },
        { rate: 5.525, min: 80000, max: 150000 },
        { rate: 6.37, min: 150000, max: 500000 },
        { rate: 8.97, min: 500000, max: 1000000 },
        { rate: 10.75, min: 1000000, max: null }
      ]
    }
  },
  NM: {
    name: 'New Mexico',
    hasIncomeTax: true,
    brackets: {
      single: [
        { rate: 1.7, min: 0, max: 5500 },
        { rate: 3.2, min: 5500, max: 11000 },
        { rate: 4.7, min: 11000, max: 16000 },
        { rate: 4.9, min: 16000, max: 210000 },
        { rate: 5.9, min: 210000, max: null }
      ],
      married: [
        { rate: 1.7, min: 0, max: 8000 },
        { rate: 3.2, min: 8000, max: 16000 },
        { rate: 4.7, min: 16000, max: 24000 },
        { rate: 4.9, min: 24000, max: 315000 },
        { rate: 5.9, min: 315000, max: null }
      ]
    }
  },
  NY: {
    name: 'New York',
    hasIncomeTax: true,
    brackets: {
      single: [
        { rate: 4, min: 0, max: 8500 },
        { rate: 4.5, min: 8500, max: 11700 },
        { rate: 5.25, min: 11700, max: 13900 },
        { rate: 5.5, min: 13900, max: 80650 },
        { rate: 6, min: 80650, max: 215400 },
        { rate: 6.85, min: 215400, max: 1077550 },
        { rate: 9.65, min: 1077550, max: 5000000 },
        { rate: 10.3, min: 5000000, max: 25000000 },
        { rate: 10.9, min: 25000000, max: null }
      ],
      married: [
        { rate: 4, min: 0, max: 17150 },
        { rate: 4.5, min: 17150, max: 23600 },
        { rate: 5.25, min: 23600, max: 27900 },
        { rate: 5.5, min: 27900, max: 161550 },
        { rate: 6, min: 161550, max: 323200 },
        { rate: 6.85, min: 323200, max: 2155350 },
        { rate: 9.65, min: 2155350, max: 5000000 },
        { rate: 10.3, min: 5000000, max: 25000000 },
        { rate: 10.9, min: 25000000, max: null }
      ]
    }
  },
  NC: {
    name: 'North Carolina',
    hasIncomeTax: true,
    flatRate: 4.5
  },
  ND: {
    name: 'North Dakota',
    hasIncomeTax: true,
    flatRate: 2.9
  },
  OH: {
    name: 'Ohio',
    hasIncomeTax: true,
    brackets: {
      single: [
        { rate: 0, min: 0, max: 26050 },
        { rate: 2.75, min: 26050, max: 46100 },
        { rate: 3.226, min: 46100, max: 92150 },
        { rate: 3.688, min: 92150, max: 115300 },
        { rate: 3.99, min: 115300, max: null }
      ],
      married: [
        { rate: 0, min: 0, max: 26050 },
        { rate: 2.75, min: 26050, max: 46100 },
        { rate: 3.226, min: 46100, max: 92150 },
        { rate: 3.688, min: 92150, max: 115300 },
        { rate: 3.99, min: 115300, max: null }
      ]
    }
  },
  OK: {
    name: 'Oklahoma',
    hasIncomeTax: true,
    brackets: {
      single: [
        { rate: 0.25, min: 0, max: 1000 },
        { rate: 0.75, min: 1000, max: 2500 },
        { rate: 1.75, min: 2500, max: 3750 },
        { rate: 2.75, min: 3750, max: 4900 },
        { rate: 3.75, min: 4900, max: 7200 },
        { rate: 4.75, min: 7200, max: null }
      ],
      married: [
        { rate: 0.25, min: 0, max: 2000 },
        { rate: 0.75, min: 2000, max: 5000 },
        { rate: 1.75, min: 5000, max: 7500 },
        { rate: 2.75, min: 7500, max: 9800 },
        { rate: 3.75, min: 9800, max: 12200 },
        { rate: 4.75, min: 12200, max: null }
      ]
    }
  },
  OR: {
    name: 'Oregon',
    hasIncomeTax: true,
    brackets: {
      single: [
        { rate: 4.75, min: 0, max: 4050 },
        { rate: 6.75, min: 4050, max: 10200 },
        { rate: 8.75, min: 10200, max: 125000 },
        { rate: 9.9, min: 125000, max: null }
      ],
      married: [
        { rate: 4.75, min: 0, max: 8100 },
        { rate: 6.75, min: 8100, max: 20400 },
        { rate: 8.75, min: 20400, max: 250000 },
        { rate: 9.9, min: 250000, max: null }
      ]
    }
  },
  PA: {
    name: 'Pennsylvania',
    hasIncomeTax: true,
    flatRate: 3.07
  },
  RI: {
    name: 'Rhode Island',
    hasIncomeTax: true,
    brackets: {
      single: [
        { rate: 3.75, min: 0, max: 73450 },
        { rate: 4.75, min: 73450, max: 166950 },
        { rate: 5.99, min: 166950, max: null }
      ],
      married: [
        { rate: 3.75, min: 0, max: 73450 },
        { rate: 4.75, min: 73450, max: 166950 },
        { rate: 5.99, min: 166950, max: null }
      ]
    }
  },
  SC: {
    name: 'South Carolina',
    hasIncomeTax: true,
    brackets: {
      single: [
        { rate: 0, min: 0, max: 3200 },
        { rate: 3, min: 3200, max: 16040 },
        { rate: 6.4, min: 16040, max: null }
      ],
      married: [
        { rate: 0, min: 0, max: 3200 },
        { rate: 3, min: 3200, max: 16040 },
        { rate: 6.4, min: 16040, max: null }
      ]
    }
  },
  SD: { name: 'South Dakota', hasIncomeTax: false },
  TN: { name: 'Tennessee', hasIncomeTax: false },
  TX: { name: 'Texas', hasIncomeTax: false },
  UT: {
    name: 'Utah',
    hasIncomeTax: true,
    flatRate: 4.65
  },
  VT: {
    name: 'Vermont',
    hasIncomeTax: true,
    brackets: {
      single: [
        { rate: 3.35, min: 0, max: 45400 },
        { rate: 6.6, min: 45400, max: 110050 },
        { rate: 7.6, min: 110050, max: 229550 },
        { rate: 8.75, min: 229550, max: null }
      ],
      married: [
        { rate: 3.35, min: 0, max: 75850 },
        { rate: 6.6, min: 75850, max: 183400 },
        { rate: 7.6, min: 183400, max: 279450 },
        { rate: 8.75, min: 279450, max: null }
      ]
    }
  },
  VA: {
    name: 'Virginia',
    hasIncomeTax: true,
    brackets: {
      single: [
        { rate: 2, min: 0, max: 3000 },
        { rate: 3, min: 3000, max: 5000 },
        { rate: 5, min: 5000, max: 17000 },
        { rate: 5.75, min: 17000, max: null }
      ],
      married: [
        { rate: 2, min: 0, max: 3000 },
        { rate: 3, min: 3000, max: 5000 },
        { rate: 5, min: 5000, max: 17000 },
        { rate: 5.75, min: 17000, max: null }
      ]
    }
  },
  WA: { name: 'Washington', hasIncomeTax: false },
  WV: {
    name: 'West Virginia',
    hasIncomeTax: true,
    brackets: {
      single: [
        { rate: 2.36, min: 0, max: 10000 },
        { rate: 3.15, min: 10000, max: 25000 },
        { rate: 3.54, min: 25000, max: 40000 },
        { rate: 4.72, min: 40000, max: 60000 },
        { rate: 5.12, min: 60000, max: null }
      ],
      married: [
        { rate: 2.36, min: 0, max: 10000 },
        { rate: 3.15, min: 10000, max: 25000 },
        { rate: 3.54, min: 25000, max: 40000 },
        { rate: 4.72, min: 40000, max: 60000 },
        { rate: 5.12, min: 60000, max: null }
      ]
    }
  },
  WI: {
    name: 'Wisconsin',
    hasIncomeTax: true,
    brackets: {
      single: [
        { rate: 3.54, min: 0, max: 13810 },
        { rate: 4.65, min: 13810, max: 27630 },
        { rate: 5.3, min: 27630, max: 304170 },
        { rate: 7.65, min: 304170, max: null }
      ],
      married: [
        { rate: 3.54, min: 0, max: 18420 },
        { rate: 4.65, min: 18420, max: 36840 },
        { rate: 5.3, min: 36840, max: 405560 },
        { rate: 7.65, min: 405560, max: null }
      ]
    }
  },
  WY: { name: 'Wyoming', hasIncomeTax: false }
};

export function calculateStateTax(income: number, state: string, filingStatus: 'single' | 'married'): number {
  const stateInfo = STATE_TAX_DATA[state];

  if (!stateInfo || !stateInfo.hasIncomeTax) {
    return 0;
  }

  const deduction = stateInfo.deductions ? stateInfo.deductions[filingStatus] : 0;
  const taxableIncome = Math.max(0, income - deduction);

  // Flat rate states
  if (stateInfo.flatRate) {
    return taxableIncome * (stateInfo.flatRate / 100);
  }

  // Progressive tax states
  if (stateInfo.brackets) {
    const brackets = stateInfo.brackets[filingStatus];
    let tax = 0;
    let lastBracketMax = 0;
    for (const bracket of brackets) {
      if (taxableIncome > bracket.min) {
        const taxableUpto = Math.min(taxableIncome, bracket.max || Infinity);
        const taxableInBracket = taxableUpto - Math.max(bracket.min, lastBracketMax);
        if (taxableInBracket > 0) {
            tax += taxableInBracket * (bracket.rate / 100);
        }
      }
      lastBracketMax = bracket.max || 0;
    }
    return tax;
  }

  return 0;
}

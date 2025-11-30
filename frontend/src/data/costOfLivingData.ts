// frontend/src/data/costOfLivingData.ts

export interface CityCostOfLiving {
  name: string;
  country: string;
  indices: {
    groceries: number;
    housing: number;
    utilities: number;
    transportation: number;
    overall: number;
  };
}

export const costOfLivingData: CityCostOfLiving[] = [
  {
    name: 'New York, NY',
    country: 'USA',
    indices: {
      groceries: 110,
      housing: 180,
      utilities: 115,
      transportation: 120,
      overall: 150,
    },
  },
  {
    name: 'San Francisco, CA',
    country: 'USA',
    indices: {
      groceries: 120,
      housing: 250,
      utilities: 130,
      transportation: 110,
      overall: 180,
    },
  },
  {
    name: 'Austin, TX',
    country: 'USA',
    indices: {
      groceries: 95,
      housing: 110,
      utilities: 98,
      transportation: 95,
      overall: 105,
    },
  },
  {
    name: 'Chicago, IL',
    country: 'USA',
    indices: {
      groceries: 98,
      housing: 95,
      utilities: 90,
      transportation: 105,
      overall: 100,
    },
  },
  {
    name: 'Denver, CO',
    country: 'USA',
    indices: {
      groceries: 102,
      housing: 120,
      utilities: 95,
      transportation: 100,
      overall: 110,
    },
  },
   {
    name: 'Miami, FL',
    country: 'USA',
    indices: {
      groceries: 108,
      housing: 130,
      utilities: 105,
      transportation: 110,
      overall: 120,
    },
  },
  {
    name: 'Seattle, WA',
    country: 'USA',
    indices: {
      groceries: 115,
      housing: 160,
      utilities: 110,
      transportation: 115,
      overall: 140,
    },
  }
];

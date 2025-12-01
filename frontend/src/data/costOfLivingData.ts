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
  // Very High Cost (150+)
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
    name: 'Honolulu, HI',
    country: 'USA',
    indices: {
      groceries: 145,
      housing: 200,
      utilities: 140,
      transportation: 125,
      overall: 165,
    },
  },
  {
    name: 'San Jose, CA',
    country: 'USA',
    indices: {
      groceries: 118,
      housing: 240,
      utilities: 125,
      transportation: 108,
      overall: 175,
    },
  },
  {
    name: 'Boston, MA',
    country: 'USA',
    indices: {
      groceries: 105,
      housing: 165,
      utilities: 120,
      transportation: 110,
      overall: 145,
    },
  },

  // High Cost (120-149)
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
  },
  {
    name: 'Washington, DC',
    country: 'USA',
    indices: {
      groceries: 108,
      housing: 155,
      utilities: 115,
      transportation: 112,
      overall: 138,
    },
  },
  {
    name: 'Los Angeles, CA',
    country: 'USA',
    indices: {
      groceries: 110,
      housing: 145,
      utilities: 120,
      transportation: 115,
      overall: 135,
    },
  },
  {
    name: 'San Diego, CA',
    country: 'USA',
    indices: {
      groceries: 112,
      housing: 150,
      utilities: 115,
      transportation: 110,
      overall: 137,
    },
  },
  {
    name: 'Portland, OR',
    country: 'USA',
    indices: {
      groceries: 105,
      housing: 135,
      utilities: 98,
      transportation: 108,
      overall: 125,
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

  // Above Average Cost (105-119)
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
    name: 'Atlanta, GA',
    country: 'USA',
    indices: {
      groceries: 96,
      housing: 105,
      utilities: 92,
      transportation: 98,
      overall: 103,
    },
  },
  {
    name: 'Philadelphia, PA',
    country: 'USA',
    indices: {
      groceries: 100,
      housing: 115,
      utilities: 110,
      transportation: 105,
      overall: 110,
    },
  },
  {
    name: 'Minneapolis, MN',
    country: 'USA',
    indices: {
      groceries: 98,
      housing: 108,
      utilities: 95,
      transportation: 100,
      overall: 105,
    },
  },
  {
    name: 'Sacramento, CA',
    country: 'USA',
    indices: {
      groceries: 102,
      housing: 115,
      utilities: 105,
      transportation: 103,
      overall: 110,
    },
  },
  {
    name: 'Salt Lake City, UT',
    country: 'USA',
    indices: {
      groceries: 93,
      housing: 105,
      utilities: 88,
      transportation: 95,
      overall: 100,
    },
  },
  {
    name: 'Raleigh, NC',
    country: 'USA',
    indices: {
      groceries: 94,
      housing: 100,
      utilities: 90,
      transportation: 94,
      overall: 98,
    },
  },

  // Average Cost (95-104)
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
    name: 'Dallas, TX',
    country: 'USA',
    indices: {
      groceries: 92,
      housing: 95,
      utilities: 94,
      transportation: 96,
      overall: 96,
    },
  },
  {
    name: 'Houston, TX',
    country: 'USA',
    indices: {
      groceries: 90,
      housing: 92,
      utilities: 96,
      transportation: 95,
      overall: 94,
    },
  },
  {
    name: 'Phoenix, AZ',
    country: 'USA',
    indices: {
      groceries: 95,
      housing: 98,
      utilities: 100,
      transportation: 97,
      overall: 98,
    },
  },
  {
    name: 'Tampa, FL',
    country: 'USA',
    indices: {
      groceries: 96,
      housing: 100,
      utilities: 98,
      transportation: 95,
      overall: 99,
    },
  },
  {
    name: 'Charlotte, NC',
    country: 'USA',
    indices: {
      groceries: 94,
      housing: 98,
      utilities: 92,
      transportation: 96,
      overall: 97,
    },
  },
  {
    name: 'Nashville, TN',
    country: 'USA',
    indices: {
      groceries: 93,
      housing: 100,
      utilities: 88,
      transportation: 94,
      overall: 97,
    },
  },
  {
    name: 'Las Vegas, NV',
    country: 'USA',
    indices: {
      groceries: 96,
      housing: 102,
      utilities: 94,
      transportation: 98,
      overall: 100,
    },
  },
  {
    name: 'Orlando, FL',
    country: 'USA',
    indices: {
      groceries: 95,
      housing: 98,
      utilities: 96,
      transportation: 94,
      overall: 97,
    },
  },

  // Below Average Cost (85-94)
  {
    name: 'San Antonio, TX',
    country: 'USA',
    indices: {
      groceries: 88,
      housing: 85,
      utilities: 92,
      transportation: 90,
      overall: 88,
    },
  },
  {
    name: 'Columbus, OH',
    country: 'USA',
    indices: {
      groceries: 90,
      housing: 88,
      utilities: 86,
      transportation: 92,
      overall: 90,
    },
  },
  {
    name: 'Indianapolis, IN',
    country: 'USA',
    indices: {
      groceries: 88,
      housing: 82,
      utilities: 88,
      transportation: 90,
      overall: 87,
    },
  },
  {
    name: 'Kansas City, MO',
    country: 'USA',
    indices: {
      groceries: 87,
      housing: 83,
      utilities: 90,
      transportation: 89,
      overall: 87,
    },
  },
  {
    name: 'Pittsburgh, PA',
    country: 'USA',
    indices: {
      groceries: 92,
      housing: 85,
      utilities: 95,
      transportation: 88,
      overall: 90,
    },
  },
  {
    name: 'Cincinnati, OH',
    country: 'USA',
    indices: {
      groceries: 89,
      housing: 82,
      utilities: 87,
      transportation: 88,
      overall: 87,
    },
  },
  {
    name: 'Richmond, VA',
    country: 'USA',
    indices: {
      groceries: 91,
      housing: 88,
      utilities: 89,
      transportation: 90,
      overall: 90,
    },
  },
  {
    name: 'Milwaukee, WI',
    country: 'USA',
    indices: {
      groceries: 90,
      housing: 86,
      utilities: 88,
      transportation: 91,
      overall: 89,
    },
  },
  {
    name: 'St. Louis, MO',
    country: 'USA',
    indices: {
      groceries: 87,
      housing: 80,
      utilities: 92,
      transportation: 89,
      overall: 86,
    },
  },

  // Low Cost (75-84)
  {
    name: 'Oklahoma City, OK',
    country: 'USA',
    indices: {
      groceries: 84,
      housing: 75,
      utilities: 88,
      transportation: 86,
      overall: 81,
    },
  },
  {
    name: 'Detroit, MI',
    country: 'USA',
    indices: {
      groceries: 86,
      housing: 72,
      utilities: 90,
      transportation: 87,
      overall: 82,
    },
  },
  {
    name: 'Memphis, TN',
    country: 'USA',
    indices: {
      groceries: 83,
      housing: 73,
      utilities: 85,
      transportation: 84,
      overall: 80,
    },
  },
  {
    name: 'Birmingham, AL',
    country: 'USA',
    indices: {
      groceries: 82,
      housing: 70,
      utilities: 88,
      transportation: 83,
      overall: 78,
    },
  },
  {
    name: 'Cleveland, OH',
    country: 'USA',
    indices: {
      groceries: 85,
      housing: 68,
      utilities: 92,
      transportation: 85,
      overall: 80,
    },
  },
  {
    name: 'Louisville, KY',
    country: 'USA',
    indices: {
      groceries: 84,
      housing: 74,
      utilities: 86,
      transportation: 85,
      overall: 81,
    },
  },
  {
    name: 'Tulsa, OK',
    country: 'USA',
    indices: {
      groceries: 82,
      housing: 72,
      utilities: 87,
      transportation: 84,
      overall: 79,
    },
  },
  {
    name: 'Albuquerque, NM',
    country: 'USA',
    indices: {
      groceries: 85,
      housing: 76,
      utilities: 84,
      transportation: 86,
      overall: 82,
    },
  },
  {
    name: 'Tupelo, MS',
    country: 'USA',
    indices: {
      groceries: 80,
      housing: 70,
      utilities: 85,
      transportation: 80,
      overall: 79,
    },
  },
  {
    name: 'Decatur, IL',
    country: 'USA',
    indices: {
      groceries: 80,
      housing: 70,
      utilities: 85,
      transportation: 80,
      overall: 79,
    },
  },
  {
    name: 'Harlingen, TX',
    country: 'USA',
    indices: {
      groceries: 81,
      housing: 71,
      utilities: 86,
      transportation: 81,
      overall: 80,
    },
  },
  {
    name: 'McAllen, TX',
    country: 'USA',
    indices: {
      groceries: 81,
      housing: 71,
      utilities: 86,
      transportation: 81,
      overall: 80,
    },
  },
  {
    name: 'Richmond, IN',
    country: 'USA',
    indices: {
      groceries: 82,
      housing: 72,
      utilities: 87,
      transportation: 82,
      overall: 81,
    },
  },
];

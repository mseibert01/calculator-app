# Financial Calculators

Free financial calculators for smart money decisions. Built with React, TypeScript, and Cloudflare.

## Features

- **Hourly to Salary Calculator** - Convert hourly wages to annual salary
- **Take-Home Pay Calculator** - Calculate net pay after taxes (Coming Soon)
- **Cost of Living Calculator** - Compare expenses between cities (Coming Soon)
- Dark mode support
- Mobile-first responsive design
- Privacy-focused (all calculations in browser)

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Hosting**: Cloudflare Pages
- **Backend**: Cloudflare Workers
- **Database**: Cloudflare D1
- **Forms**: React Hook Form + Zod validation

## Development

### Prerequisites

- Node.js 18+ and npm
- Cloudflare account (for deployment)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

### Worker Setup

```bash
cd worker
npm install
npx wrangler dev
```

The worker will be available at `http://localhost:8787`

## Deployment

### Deploy Frontend to Cloudflare Pages

```bash
cd frontend
npm run build
npx wrangler pages deploy dist --project-name=financial-calculators
```

### Deploy Worker

```bash
cd worker
npx wrangler deploy
```

### Set up D1 Database

```bash
# Create D1 database
npx wrangler d1 create financial-calculators-db

# Update wrangler.toml with the database ID returned

# Run migrations
npx wrangler d1 execute financial-calculators-db --file=schema.sql
```

## Project Structure

```
calculator-app/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── lib/          # Utilities and calculations
│   │   └── data/         # Static data
│   └── public/           # Static assets
├── worker/               # Cloudflare Worker
│   ├── src/             # Worker source code
│   └── schema.sql       # D1 database schema
└── PROJECT_STATE.md     # Current state for AI model handoff
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

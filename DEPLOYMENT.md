# Deployment Information

**Deployment Date**: 2025-11-30

## Live URLs

### Production Site
- **Cloudflare Pages**: https://fcc34ceb.financial-calculators-f0u.pages.dev
- **Custom Domain**: Not configured yet (you can add your own domain in Cloudflare Pages dashboard)

### Backend API
- **Cloudflare Worker**: https://financial-calculators-worker.seibertmark1212.workers.dev

### Repository
- **GitHub**: https://github.com/mseibert01/calculator-app

## Cloudflare Resources

### Pages Project
- **Project Name**: financial-calculators
- **Production Branch**: main
- **Dashboard**: https://dash.cloudflare.com/c1f6d122a8c3ac94eba60bec3e348b33/pages/view/financial-calculators

### Worker
- **Worker Name**: financial-calculators-worker
- **Dashboard**: https://dash.cloudflare.com/c1f6d122a8c3ac94eba60bec3e348b33/workers/services/view/financial-calculators-worker

### D1 Database
- **Database Name**: financial-calculators-db
- **Database ID**: 5928c053-fb18-4f3f-bf45-ad6e917ab80e
- **Region**: ENAM
- **Dashboard**: https://dash.cloudflare.com/c1f6d122a8c3ac94eba60bec3e348b33/workers/d1

## Next Steps

### 1. Add Custom Domain
To add your own domain:
```bash
# In Cloudflare Pages dashboard, go to:
# Pages > financial-calculators > Custom domains > Set up a custom domain
```

### 2. Set Up Continuous Deployment
The project is already connected to GitHub. To enable automatic deployments:
1. Go to Pages > financial-calculators > Settings > Builds & deployments
2. Configure build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `frontend`

### 3. Connect Pages to Worker
If you want the Pages site to use the Worker API:
1. Update the API URL in your frontend code
2. Or set up a _routes.json file to route API calls to the Worker

### 4. Monitor Analytics
- Enable Cloudflare Web Analytics in the Pages dashboard
- View traffic and performance metrics

### 5. Add Ad Revenue
Locations ready for ads (add in the future):
- Homepage hero section (below CTA)
- Between calculator cards
- Calculator results page (sidebar)

### 6. Implement Remaining Calculators
Currently only **Hourly to Salary** is fully functional. Implement:
- Take-Home Pay Calculator
- Cost of Living Calculator
- Freelance Rate Calculator
- Salary Negotiation Calculator

## API Endpoints

### Health Check
```bash
curl https://financial-calculators-worker.seibertmark1212.workers.dev/api/health
```

### Subscribe to Newsletter
```bash
curl -X POST https://financial-calculators-worker.seibertmark1212.workers.dev/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","calculatorId":"hourly-to-salary"}'
```

## Database Schema

The D1 database has one table:
```sql
subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  calculator_id TEXT,
  created_at TEXT NOT NULL
)
```

## Environment Variables

Currently no environment variables are needed. If you add any in the future:
- Set them in Cloudflare Pages Settings > Environment variables
- Set them in Cloudflare Worker Settings > Variables

## Security Notes

1. **CORS is enabled** - Currently allows all origins (`*`). Consider restricting to your domain in production.
2. **No authentication** - The subscribe endpoint is public. Add rate limiting if needed.
3. **Client-side calculations** - All calculator logic runs in the browser for privacy.

## Performance Optimization

Current bundle size: 1,031.70 kB (215.86 kB gzipped)

To improve:
1. Implement code splitting with React.lazy()
2. Use dynamic imports for calculator components
3. Optimize bundle with rollup config

## Cost Estimates

Cloudflare Free Tier includes:
- **Pages**: Unlimited requests, 500 builds/month
- **Workers**: 100,000 requests/day
- **D1**: 5GB storage, 5M reads/day, 100K writes/day

Your current setup should stay free unless you get significant traffic!

## Support

If you need help:
- Check PROJECT_STATE.md for current project status
- Review README.md for development setup
- See worker/src/index.ts for API implementation
- Check frontend/src/components/calculators/HourlyToSalary.tsx for calculator example

## Maintenance

### Update Dependencies
```bash
# Frontend
cd frontend
npm update

# Worker
cd worker
npm update
```

### Redeploy
```bash
# Frontend
cd frontend
npm run build
npx wrangler pages deploy dist --project-name=financial-calculators

# Worker
cd worker
npx wrangler deploy
```

### View Logs
```bash
# Worker logs
npx wrangler tail financial-calculators-worker

# Pages logs - available in dashboard
```

## Congratulations!

Your Financial Calculator app is now live on Cloudflare! You have:
- A production-ready React app with dark mode
- A functional Hourly to Salary calculator
- Backend API with database
- GitHub repository for version control
- Professional, mobile-first design

Next: Add the remaining calculators and start driving traffic to generate ad revenue!

# Cloudflare Pages Build Configuration

## Current Issue
Your Pages Functions are not being deployed because the build configuration is incorrect. The build command changes directory to `frontend/`, causing Pages to miss the `functions/` directory at the root level.

## Fix: Update Build Configuration in Dashboard

Go to your Pages project settings:
https://dash.cloudflare.com/c1f6d122a8c3ac94eba60bec3e348b33/pages/view/financial-calculator/settings/builds

### Update these settings:

1. **Framework preset**: None
2. **Build command**: `npm run build`
3. **Build output directory**: `frontend/dist`
4. **Root directory (advanced)**: Leave empty (uses repository root)

### Current (Wrong) Configuration:
```
Build command: cd frontend && npm run build
Build output: dist or frontend/dist
```

### Correct Configuration:
```
Build command: npm run build
Build output: frontend/dist
Root directory: (empty)
```

## Why This Works

With the correct configuration:
1. Build runs from repository root → `npm run build` → executes `cd frontend && npm run build`
2. Functions directory at root level (`/functions`) is recognized by Pages
3. Build output at `frontend/dist` is correctly identified
4. Pages Functions in `/functions/admin/*.ts` and `/functions/api/*.ts` are deployed

## After Updating

1. Save the new build configuration
2. Trigger a new deployment (Retry deployment)
3. Pages Functions will be available at:
   - `POST /admin/login`
   - `GET /admin/stats`
   - `GET /api/health`
   - etc.

## Verification

After deployment, test:
```bash
curl -X POST https://calc.msei.dev/admin/login \
  -H "Content-Type: application/json" \
  -d '{"password":"admin"}'
```

Should return: `{"success":true}` or `{"success":false}` (not 405)

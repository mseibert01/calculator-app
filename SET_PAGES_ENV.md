# Setting Pages Environment Variables

Your Cloudflare Pages project `financial-calculator` needs the `ADMIN_PASSWORD` environment variable set.

## Option 1: Via Cloudflare Dashboard (Recommended)

1. Go to https://dash.cloudflare.com/
2. Navigate to **Workers & Pages**
3. Click on **financial-calculator**
4. Go to **Settings** tab
5. Click **Environment variables**
6. Click **Add variable**
7. Set:
   - **Variable name**: `ADMIN_PASSWORD`
   - **Value**: `htSEfMBUBnYm0eqmO4sX6Hxg` (or check ADMIN_PASSWORD.txt)
   - **Environment**: Production (and Preview if you want)
8. Click **Save**
9. Trigger a new deployment for changes to take effect

## Option 2: Via Wrangler CLI

Unfortunately, Wrangler doesn't support setting Pages environment variables via CLI yet. Use Option 1 above.

## After Setting the Variable

The Pages Functions will automatically use the `ADMIN_PASSWORD` environment variable, and your admin login at https://calc.msei.dev/admin will work.

## Current Password

See `ADMIN_PASSWORD.txt` for the current production password.

# Admin Setup Guide

## Running the Application Locally

To run both frontend and backend together:

```bash
# Install root dependencies (for dev server orchestration)
npm install

# Install frontend dependencies
cd frontend && npm install && cd ..

# Install backend dependencies
cd functions && npm install && cd ..

# Run both frontend and backend concurrently
npm run dev
```

This will start:
- Frontend on `http://localhost:5173`
- Backend worker on `http://localhost:8787`

The frontend is configured to proxy `/api` and `/admin` requests to the backend.

## Setting Up Admin Password

The admin authentication system uses environment variables for security. Follow these steps:

### Local Development

1. The password is set in `functions/.dev.vars` (defaults to `admin`)
2. To change it, edit `functions/.dev.vars`:
   ```
   ADMIN_PASSWORD=your_secure_password_here
   ```
3. Restart your dev server for changes to take effect

**Current default password: `admin`**

### Production (Cloudflare Workers)

The production password is stored as a Cloudflare Secret (encrypted and secure).

**Setting/Updating the Password:**

```bash
# From the functions directory
echo "your-secure-password" | npx wrangler secret put ADMIN_PASSWORD
```

**Current Production Setup:**
- Password is stored as a Cloudflare Worker secret
- See `ADMIN_PASSWORD.txt` (not in git) for the current password
- To rotate the password, use the command above with a new password

**For Cloudflare Pages (if using Pages instead of Workers):**

1. Go to your Cloudflare dashboard
2. Navigate to **Pages** > **Your Project** > **Settings** > **Environment Variables**
3. Add a new environment variable:
   - **Variable name**: `ADMIN_PASSWORD`
   - **Value**: Your secure password
   - **Environment**: Production (and Preview if needed)
4. Click **Save**
5. Redeploy your application for changes to take effect

### Current Setup

- **Default password for local dev**: `admin`
- **Location**: `functions/.dev.vars` (not committed to git)
- **Backend implementations**:
  - Cloudflare Worker: `functions/src/index.ts`
  - Pages Functions: `functions/admin/login.ts`

### Security Notes

- Never commit `.dev.vars` to git (already in `.gitignore`)
- Use a strong password in production
- The password is compared in plain text - consider adding hashing for production use
- Admin authentication uses localStorage - clear it to log out

### Accessing Admin Dashboard

1. Navigate to `/admin`
2. Enter your password
3. You'll be redirected to `/admin/dashboard`
4. From there you can:
   - View usage statistics
   - Configure ad providers (Google AdSense, Media.net, or disable ads)

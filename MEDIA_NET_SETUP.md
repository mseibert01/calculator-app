# Media.net Setup Guide

## What is Media.net?

Media.net is a contextual advertising network (alternative to Google AdSense) powered by Yahoo and Bing. It's a good alternative ad provider for your financial calculator site.

## Steps to Set Up Media.net

### 1. Sign Up for Media.net

1. Go to https://www.media.net/
2. Click **"Sign Up"** or **"Get Started"**
3. Fill out the application form:
   - **Website URL**: `https://calc.msei.dev`
   - **Website Category**: Finance / Financial Services
   - **Traffic Sources**: Organic, Direct, Social Media
   - **Monthly Page Views**: Enter your estimate
   - **Contact Information**: Your business details

### 2. Wait for Approval

- Media.net reviews applications (usually 1-3 business days)
- They prefer quality sites with good content and traffic
- Your financial calculator site should be a good fit
- **Tip**: Make sure your site has clear content and privacy policy

### 3. Get Your Site ID

Once approved:
1. Login to your Media.net dashboard
2. Go to **Setup** → **Ad Units**
3. Look for your **Site ID** (usually looks like: `123456`)
4. Copy this ID

### 4. Configure in Your Admin Dashboard

1. Go to https://calc.msei.dev/admin
2. Login with password: `htSEfMBUBnYm0eqmO4sX6Hxg`
3. Click **"Ad Provider Settings"** tab
4. Under **"Media.net Configuration"**:
   - ✅ Check "Enable Media.net"
   - Enter your Site ID in the "Site ID" field
5. Under **"Active Ad Provider"**:
   - Select **"Media.net"** radio button
6. Click **"Save Ad Configuration"**
7. Page will reload with Media.net ads active

## Alternative Ad Networks (If Media.net Doesn't Work)

If Media.net doesn't approve your site or you want other options:

### 1. **Ezoic** (Recommended)
   - Easy approval
   - AI-optimized ad placements
   - Good for smaller sites
   - Sign up: https://www.ezoic.com/

### 2. **AdThrive** (High Traffic Required)
   - Requires 100k+ monthly pageviews
   - Higher revenue share
   - Sign up: https://www.adthrive.com/

### 3. **Mediavine** (High Traffic Required)
   - Requires 50k+ monthly sessions
   - Premium ad network
   - Sign up: https://www.mediavine.com/

### 4. **PropellerAds**
   - Easy approval
   - Multiple ad formats
   - Sign up: https://propellerads.com/

### 5. **Infolinks**
   - In-text ads
   - Easy to set up
   - Sign up: https://www.infolinks.com/

## Current Setup

Your app currently supports:
- ✅ Google AdSense (default, already configured)
- ✅ Media.net (requires Site ID from their dashboard)
- ✅ None (disable ads completely)

You can switch between providers anytime from the Admin Dashboard without touching code!

## Tips for Ad Approval

1. **Have quality content**: Your calculators are good content
2. **Add a Privacy Policy**: Create a page about data collection
3. **Add About/Contact pages**: Shows legitimacy
4. **Clean design**: Your site looks professional ✓
5. **No prohibited content**: Your finance site is fine ✓
6. **Reasonable traffic**: Even low traffic can get approved

## Testing

To test if ads are working:
1. Switch to "Media.net" in admin
2. Save configuration
3. Visit your homepage or any calculator page
4. Look for ad placeholders (they show during development)
5. In production, Media.net ads will appear once configured

## Need Help?

- Check Media.net documentation: https://www.media.net/adnetwork-helpcenter
- Contact their support if you have issues with approval
- You can always stay with Google AdSense (already working)

# Google AdSense Setup Guide

This application is configured to display Google AdSense ads. Follow these steps to complete the setup:

## Prerequisites

1. A Google AdSense account (sign up at https://www.google.com/adsense)
2. Your site must be approved by Google AdSense
3. You'll receive a Publisher ID and Ad Slot IDs from Google

## Configuration Steps

### 1. Update Publisher ID

In `frontend/index.html`, replace `YOUR_PUBLISHER_ID` with your actual Google AdSense Publisher ID:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
 crossorigin="anonymous"></script>
```

Example:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456"
 crossorigin="anonymous"></script>
```

### 2. Update Ad Slot IDs

In `frontend/src/components/ui/AdPlaceholder.tsx`, update the default slot ID and add your Publisher ID:

```typescript
// Line 19 - Change the default slot
slot = 'YOUR_AD_SLOT_ID',

// Line 54 - Update the publisher ID
data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
```

Example:
```typescript
slot = '1234567890',
data-ad-client="ca-pub-1234567890123456"
```

### 3. Create Multiple Ad Units (Optional)

You can create different ad units for different pages. In `CalculatorLayout.tsx`, pass custom slot IDs:

```tsx
<AdPlaceholder slot="1234567890" format="vertical" />
```

## Ad Placement

Ads are currently placed in:
- Sidebar on all calculator pages (responsive - hidden on mobile, shown on large screens)

You can add more ad placements by importing and using the `AdPlaceholder` component:

```tsx
import AdPlaceholder from '../ui/AdPlaceholder';

// In your component
<AdPlaceholder slot="YOUR_SLOT_ID" format="rectangle" />
```

## Ad Formats

Available formats:
- `auto` - Responsive, adapts to container
- `fluid` - Flexible sizing
- `rectangle` - Fixed rectangle
- `vertical` - Vertical banner

## Testing Ads

1. Google AdSense may take 24-48 hours to start showing ads
2. During development, you'll see placeholder boxes
3. Never click on your own ads - this violates AdSense policies
4. Use AdSense preview mode or test devices to verify placement

## Important Notes

- **Do not click your own ads** - this can get your account banned
- Ads may not show immediately after setup - allow 24-48 hours
- Ensure your site complies with AdSense policies
- Place ads where they're visible but not intrusive
- Maximum of 3 ad units per page is recommended

## Troubleshooting

If ads aren't showing:
1. Verify your Publisher ID is correct
2. Check that your site is approved in AdSense dashboard
3. Ensure ad slot IDs match those in your AdSense account
4. Check browser console for errors
5. Wait 24-48 hours after initial setup

## Revenue Optimization Tips

1. Place ads above the fold when possible
2. Use responsive ad units for better mobile performance
3. Test different ad placements and formats
4. Monitor performance in Google AdSense dashboard
5. Ensure good user experience - don't overload pages with ads

// src/components/ui/AdPlaceholder.tsx

import React, { useEffect } from 'react';

interface AdPlaceholderProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical';
  responsive?: boolean;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  slot = '3764792675',
  format = 'auto',
  responsive = true,
  className = ''
}) => {
  useEffect(() => {
    try {
      // Push ad to Google AdSense
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  // For development/preview - show placeholder when AdSense is not configured
  const isAdSenseConfigured = slot !== 'YOUR_AD_SLOT_ID';

  if (!isAdSenseConfigured) {
    return (
      <div className={`flex items-center justify-center min-h-[250px] w-full bg-gray-200 dark:bg-gray-700 border-2 border-dashed border-gray-400 dark:border-gray-500 rounded-lg ${className}`}>
        <div className="text-center p-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-semibold mb-2">Advertisement</p>
          <p className="text-gray-400 dark:text-gray-500 text-xs">Configure AdSense in AdPlaceholder.tsx</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-w-[300px] ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '250px' }}
        data-ad-client="ca-pub-2928849251278370"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
};

export default AdPlaceholder;

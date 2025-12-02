// Google AdSense component

import React, { useEffect } from 'react';
import { AdPlacementProps } from '../../types/ads';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface GoogleAdSenseProps extends AdPlacementProps {
  publisherId: string;
}

export const GoogleAdSense: React.FC<GoogleAdSenseProps> = ({
  publisherId,
  slot = '3764792675',
  format = 'auto',
  responsive = true,
  className = ''
}) => {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={`min-w-[300px] ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '250px' }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
};

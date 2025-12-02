// PropellerAds component

import React, { useEffect, useRef } from 'react';
import { AdPlacementProps } from '../../types/ads';

declare global {
  interface Window {
    _paq?: unknown[];
  }
}

interface PropellerAdsProps extends AdPlacementProps {
  zoneId: string;
}

export const PropellerAds: React.FC<PropellerAdsProps> = ({
  zoneId,
  className = ''
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const scriptId = `propeller-ad-${zoneId}`;

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && zoneId && adRef.current) {
        // Check if script already exists
        if (!document.getElementById(scriptId)) {
          const script = document.createElement('script');
          script.id = scriptId;
          script.src = `//api.propellerads.com/adserve/${zoneId}.js`;
          script.async = true;
          script.onload = () => {
            console.log('PropellerAds loaded');
          };
          script.onerror = () => {
            console.error('Failed to load PropellerAds');
          };
          document.body.appendChild(script);
        }
      }
    } catch (err) {
      console.error('PropellerAds error:', err);
    }
  }, [zoneId, scriptId]);

  return (
    <div ref={adRef} className={`min-w-[300px] ${className}`}>
      <div style={{ minHeight: '250px', display: 'block' }}>
        {/* PropellerAds will render here */}
      </div>
    </div>
  );
};

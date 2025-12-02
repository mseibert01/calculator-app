// Adsterra ad component

import React, { useEffect, useRef } from 'react';
import { AdPlacementProps } from '../../types/ads';

declare global {
  interface Window {
    atOptions?: {
      key: string;
      format: string;
      height: number;
      width: number;
      params: Record<string, unknown>;
    };
  }
}

interface AdsterraAdProps extends AdPlacementProps {
  publisherId: string;
}

export const AdsterraAd: React.FC<AdsterraAdProps> = ({
  publisherId,
  className = ''
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const scriptId = `adsterra-ad-${publisherId}`;

  console.log('AdsterraAd component received publisherId:', publisherId, 'length:', publisherId?.length);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && publisherId && adRef.current) {
        console.log('Loading Adsterra with publisher ID:', publisherId);

        // Check if script already exists
        if (!document.getElementById(scriptId)) {
          // Configure Adsterra options BEFORE loading script
          window.atOptions = {
            key: publisherId,
            format: 'iframe',
            height: 250,
            width: 300,
            params: {}
          };

          const script = document.createElement('script');
          script.id = scriptId;
          script.type = 'text/javascript';
          script.src = `https://www.highperformanceformat.com/${publisherId}/invoke.js`;
          script.async = true;
          script.onload = () => {
            console.log('Adsterra script loaded successfully');
          };
          script.onerror = (e) => {
            console.error('Failed to load Adsterra script:', e);
            console.error('Script URL:', `https://www.highperformanceformat.com/${publisherId}/invoke.js`);
            console.error('Publisher ID:', publisherId);
          };

          // Append to the ad container instead of head
          adRef.current.appendChild(script);
        }
      }
    } catch (err) {
      console.error('Adsterra initialization error:', err);
    }
  }, [publisherId, scriptId]);

  return (
    <div ref={adRef} className={`min-w-[300px] ${className}`} style={{ minHeight: '250px', display: 'block' }}>
      {/* Adsterra ad will render here */}
    </div>
  );
};

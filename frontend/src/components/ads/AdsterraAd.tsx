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

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && publisherId && adRef.current) {
        // Check if script already exists
        if (!document.getElementById(scriptId)) {
          // Configure Adsterra options
          window.atOptions = {
            key: publisherId,
            format: 'iframe',
            height: 250,
            width: 300,
            params: {}
          };

          const script = document.createElement('script');
          script.id = scriptId;
          script.src = `//www.topcreativeformat.com/${publisherId}/invoke.js`;
          script.async = true;
          script.onload = () => {
            console.log('Adsterra loaded');
          };
          script.onerror = () => {
            console.error('Failed to load Adsterra');
          };

          if (adRef.current) {
            adRef.current.appendChild(script);
          }
        }
      }
    } catch (err) {
      console.error('Adsterra error:', err);
    }
  }, [publisherId, scriptId]);

  return (
    <div ref={adRef} className={`min-w-[300px] ${className}`}>
      <div style={{ minHeight: '250px', display: 'block' }}>
        {/* Adsterra ad will render here */}
      </div>
    </div>
  );
};

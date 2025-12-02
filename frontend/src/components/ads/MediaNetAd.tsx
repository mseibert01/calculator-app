// Media.net ad component

import React, { useEffect, useRef } from 'react';
import { AdPlacementProps } from '../../types/ads';

declare global {
  interface Window {
    _mNHandle?: {
      queue: Array<{
        placement: string;
        keywords?: string;
      }>;
    };
  }
}

interface MediaNetAdProps extends AdPlacementProps {
  siteId: string;
}

export const MediaNetAd: React.FC<MediaNetAdProps> = ({
  siteId,
  className = ''
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const adId = useRef(`mnet-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && siteId && adRef.current) {
        // Initialize Media.net queue if not exists
        window._mNHandle = window._mNHandle || { queue: [] };

        // Push ad placement to queue
        window._mNHandle.queue.push({
          placement: adId.current,
          keywords: 'financial,calculator,money,finance'
        });

        // Create script element if not already loaded
        const scriptId = 'medianet-script';
        if (!document.getElementById(scriptId)) {
          const script = document.createElement('script');
          script.id = scriptId;
          script.src = `https://contextual.media.net/dmedianet.js?cid=${siteId}`;
          script.async = true;
          document.body.appendChild(script);
        }
      }
    } catch (err) {
      console.error('Media.net error:', err);
    }
  }, [siteId]);

  return (
    <div ref={adRef} className={`min-w-[300px] ${className}`}>
      <div id={adId.current} style={{ minHeight: '250px', display: 'block' }}>
        {/* Media.net ad will be rendered here */}
      </div>
    </div>
  );
};

// src/components/ui/AdPlaceholder.tsx

import React, { useEffect, useState } from 'react';
import { adService } from '../../services/adService';
import { GoogleAdSense } from '../ads/GoogleAdSense';
import { MediaNetAd } from '../ads/MediaNetAd';
import { PropellerAds } from '../ads/PropellerAds';
import { AdsterraAd } from '../ads/AdsterraAd';
import { AdPlacementProps } from '../../types/ads';

const AdPlaceholder: React.FC<AdPlacementProps> = ({
  slot = '3764792675',
  format = 'auto',
  responsive = true,
  className = ''
}) => {
  const [provider, setProvider] = useState(adService.getActiveProvider());
  const [config, setConfig] = useState(adService.getConfig());

  useEffect(() => {
    const handleConfigChange = () => {
      const newProvider = adService.getActiveProvider();
      const newConfig = adService.getConfig();
      console.log('Ad config changed:', { provider: newProvider, config: newConfig });
      setProvider(newProvider);
      setConfig(newConfig);
    };

    window.addEventListener('ad-config-changed', handleConfigChange);

    // Also reload config on mount
    handleConfigChange();

    return () => {
      window.removeEventListener('ad-config-changed', handleConfigChange);
    };
  }, []);

  // Show placeholder when ads are disabled
  if (provider === 'none') {
    return (
      <div className={`flex items-center justify-center min-h-[250px] w-full bg-gray-200 dark:bg-gray-700 border-2 border-dashed border-gray-400 dark:border-gray-500 rounded-lg ${className}`}>
        <div className="text-center p-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-semibold mb-2">Advertisement</p>
          <p className="text-gray-400 dark:text-gray-500 text-xs">Ads are currently disabled</p>
        </div>
      </div>
    );
  }

  // Render Google AdSense
  if (provider === 'google-adsense' && config.googleAdSense?.enabled) {
    return (
      <GoogleAdSense
        publisherId={config.googleAdSense.publisherId}
        slot={slot}
        format={format}
        responsive={responsive}
        className={className}
      />
    );
  }

  // Render Media.net
  if (provider === 'media-net' && config.mediaNet?.enabled && config.mediaNet.siteId) {
    return (
      <MediaNetAd
        siteId={config.mediaNet.siteId}
        className={className}
      />
    );
  }

  // Render PropellerAds
  if (provider === 'propeller-ads' && config.propellerAds?.enabled && config.propellerAds.zoneId) {
    return (
      <PropellerAds
        zoneId={config.propellerAds.zoneId}
        className={className}
      />
    );
  }

  // Render Adsterra
  if (provider === 'adsterra' && config.adsterra?.enabled && config.adsterra.publisherId) {
    return (
      <AdsterraAd
        publisherId={config.adsterra.publisherId}
        className={className}
      />
    );
  }

  // Fallback placeholder
  return (
    <div className={`flex items-center justify-center min-h-[250px] w-full bg-gray-200 dark:bg-gray-700 border-2 border-dashed border-gray-400 dark:border-gray-500 rounded-lg ${className}`}>
      <div className="text-center p-4">
        <p className="text-gray-500 dark:text-gray-400 text-sm font-semibold mb-2">Advertisement</p>
        <p className="text-gray-400 dark:text-gray-500 text-xs">Ad provider not configured</p>
      </div>
    </div>
  );
};

export default AdPlaceholder;

// Utility for dynamically loading ad provider scripts

import { adService } from '../services/adService';

export class AdScriptLoader {
  private static googleAdSenseLoaded = false;
  private static mediaNetLoaded = false;
  private static propellerAdsLoaded = false;
  private static adsterraLoaded = false;

  static loadGoogleAdSense(publisherId: string): void {
    if (this.googleAdSenseLoaded) return;

    const script = document.createElement('script');
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      this.googleAdSenseLoaded = true;
      console.log('Google AdSense script loaded');
    };
    script.onerror = () => {
      console.error('Failed to load Google AdSense script');
    };
    document.head.appendChild(script);
  }

  static loadMediaNet(siteId: string): void {
    if (this.mediaNetLoaded) return;

    const script = document.createElement('script');
    script.src = `https://contextual.media.net/dmedianet.js?cid=${siteId}`;
    script.async = true;
    script.onload = () => {
      this.mediaNetLoaded = true;
      console.log('Media.net script loaded');
    };
    script.onerror = () => {
      console.error('Failed to load Media.net script');
    };
    document.body.appendChild(script);
  }

  static loadPropellerAds(): void {
    // PropellerAds loads its own script in the component
    // We just mark it as loaded to prevent duplicate initialization
    if (this.propellerAdsLoaded) return;
    this.propellerAdsLoaded = true;
    console.log('PropellerAds will load its own scripts');
  }

  static loadAdsterra(): void {
    // Adsterra loads its own script in the component
    // We just mark it as loaded to prevent duplicate initialization
    if (this.adsterraLoaded) return;
    this.adsterraLoaded = true;
    console.log('Adsterra will load its own scripts');
  }

  static async loadScriptsBasedOnConfig(): Promise<void> {
    // Wait for config to be loaded from server
    await adService.waitForConfig();

    const config = adService.getConfig();
    console.log('Loading ad scripts for provider:', config.provider, config);

    // Load Google AdSense if enabled
    if (config.provider === 'google-adsense' && config.googleAdSense?.enabled) {
      this.loadGoogleAdSense(config.googleAdSense.publisherId);
    }

    // Load Media.net if enabled
    if (config.provider === 'media-net' && config.mediaNet?.enabled && config.mediaNet.siteId) {
      this.loadMediaNet(config.mediaNet.siteId);
    }

    // Load PropellerAds if enabled
    if (config.provider === 'propeller-ads' && config.propellerAds?.enabled) {
      this.loadPropellerAds();
    }

    // Load Adsterra if enabled
    if (config.provider === 'adsterra' && config.adsterra?.enabled) {
      this.loadAdsterra();
    }
  }
}

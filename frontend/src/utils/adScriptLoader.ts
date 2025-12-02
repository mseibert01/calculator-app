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
    if (this.propellerAdsLoaded) return;

    const script = document.createElement('script');
    script.src = '//niphaumeenses.net/vignette.min.js';
    script.async = true;
    script.setAttribute('data-zone', 'default');
    script.setAttribute('data-sdk', 'show_8054058');
    script.onload = () => {
      this.propellerAdsLoaded = true;
      console.log('PropellerAds script loaded');
    };
    script.onerror = () => {
      console.error('Failed to load PropellerAds script');
    };
    document.body.appendChild(script);
  }

  static loadAdsterra(): void {
    if (this.adsterraLoaded) return;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//pl25005003.profitablegatetocontent.com/78/b4/15/78b415c370c2cc47bbf44ed66d2fdeef.js';
    script.async = true;
    script.onload = () => {
      this.adsterraLoaded = true;
      console.log('Adsterra script loaded');
    };
    script.onerror = () => {
      console.error('Failed to load Adsterra script');
    };
    document.body.appendChild(script);
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

// Ad service for managing ad providers

import { AdProvider, AdConfig } from '../types/ads';

const AD_CONFIG_KEY = 'ad_config';

const DEFAULT_CONFIG: AdConfig = {
  provider: 'google-adsense',
  googleAdSense: {
    publisherId: 'ca-pub-2928849251278370',
    enabled: true,
  },
  mediaNet: {
    siteId: '', // To be configured in admin
    enabled: false,
  },
};

export class AdService {
  private static instance: AdService;
  private config: AdConfig;

  private constructor() {
    this.config = this.loadConfig();
  }

  public static getInstance(): AdService {
    if (!AdService.instance) {
      AdService.instance = new AdService();
    }
    return AdService.instance;
  }

  private loadConfig(): AdConfig {
    try {
      const stored = localStorage.getItem(AD_CONFIG_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load ad config:', error);
    }
    return DEFAULT_CONFIG;
  }

  public saveConfig(config: AdConfig): void {
    try {
      localStorage.setItem(AD_CONFIG_KEY, JSON.stringify(config));
      this.config = config;
      // Trigger page reload to apply new ad provider
      window.dispatchEvent(new CustomEvent('ad-config-changed', { detail: config }));
    } catch (error) {
      console.error('Failed to save ad config:', error);
    }
  }

  public getConfig(): AdConfig {
    return { ...this.config };
  }

  public getActiveProvider(): AdProvider {
    return this.config.provider;
  }

  public setProvider(provider: AdProvider): void {
    this.config.provider = provider;
    this.saveConfig(this.config);
  }

  public updateGoogleAdSenseConfig(publisherId: string, enabled: boolean): void {
    this.config.googleAdSense = { publisherId, enabled };
    this.saveConfig(this.config);
  }

  public updateMediaNetConfig(siteId: string, enabled: boolean): void {
    this.config.mediaNet = { siteId, enabled };
    this.saveConfig(this.config);
  }

  public isProviderEnabled(provider: AdProvider): boolean {
    switch (provider) {
      case 'google-adsense':
        return this.config.googleAdSense?.enabled ?? false;
      case 'media-net':
        return this.config.mediaNet?.enabled ?? false;
      case 'none':
        return true;
      default:
        return false;
    }
  }
}

export const adService = AdService.getInstance();

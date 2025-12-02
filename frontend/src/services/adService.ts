// Ad service for managing ad providers

import { AdProvider, AdConfig } from '../types/ads';

const DEFAULT_CONFIG: AdConfig = {
  provider: 'google-adsense',
  googleAdSense: {
    publisherId: 'ca-pub-2928849251278370',
    enabled: true,
  },
  mediaNet: {
    siteId: '',
    enabled: false,
  },
  propellerAds: {
    zoneId: '',
    enabled: false,
  },
  adsterra: {
    publisherId: '',
    enabled: false,
  },
};

export class AdService {
  private static instance: AdService;
  private config: AdConfig;

  private constructor() {
    this.config = DEFAULT_CONFIG;
    this.loadConfigFromServer();
  }

  public static getInstance(): AdService {
    if (!AdService.instance) {
      AdService.instance = new AdService();
    }
    return AdService.instance;
  }

  private async loadConfigFromServer(): Promise<void> {
    try {
      const response = await fetch('/api/ad-config');
      if (response.ok) {
        this.config = await response.json();
        window.dispatchEvent(new CustomEvent('ad-config-changed', { detail: this.config }));
      }
    } catch (error) {
      console.error('Failed to load ad config from server:', error);
    }
  }

  public async saveConfig(config: AdConfig, adminPassword: string): Promise<boolean> {
    try {
      const response = await fetch('/admin/ad-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminPassword}`
        },
        body: JSON.stringify(config)
      });

      if (response.ok) {
        this.config = config;
        window.dispatchEvent(new CustomEvent('ad-config-changed', { detail: config }));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to save ad config:', error);
      return false;
    }
  }

  public async refreshConfig(): Promise<void> {
    await this.loadConfigFromServer();
  }

  public getConfig(): AdConfig {
    return { ...this.config };
  }

  public getActiveProvider(): AdProvider {
    return this.config.provider;
  }

  public isProviderEnabled(provider: AdProvider): boolean {
    switch (provider) {
      case 'google-adsense':
        return this.config.googleAdSense?.enabled ?? false;
      case 'media-net':
        return this.config.mediaNet?.enabled ?? false;
      case 'propeller-ads':
        return this.config.propellerAds?.enabled ?? false;
      case 'adsterra':
        return this.config.adsterra?.enabled ?? false;
      case 'none':
        return true;
      default:
        return false;
    }
  }
}

export const adService = AdService.getInstance();

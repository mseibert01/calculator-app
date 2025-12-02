// Ad provider types and configuration

export type AdProvider = 'google-adsense' | 'media-net' | 'none';

export interface AdConfig {
  provider: AdProvider;
  googleAdSense?: {
    publisherId: string;
    enabled: boolean;
  };
  mediaNet?: {
    siteId: string;
    enabled: boolean;
  };
}

export interface AdPlacementProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical';
  responsive?: boolean;
  className?: string;
}

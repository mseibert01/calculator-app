// functions/api/ad-config.ts
interface Env {
  DB: D1Database;
}

export const onRequestGet = async ({ env }: { env: Env }) => {
  try {
    const result = await env.DB.prepare(
      'SELECT setting_value FROM site_settings WHERE setting_key = ?'
    ).bind('ad_config').first();

    if (result && result.setting_value) {
      // setting_value is already a JSON string, return it directly
      return new Response(result.setting_value as string, {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Return default config if not found
    const defaultConfig = {
      provider: 'google-adsense',
      googleAdSense: { publisherId: 'ca-pub-2928849251278370', enabled: true },
      mediaNet: { siteId: '', enabled: false },
      propellerAds: { zoneId: '', enabled: false },
      adsterra: { publisherId: '', enabled: false }
    };

    return new Response(JSON.stringify(defaultConfig), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Failed to fetch ad config:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch ad config' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

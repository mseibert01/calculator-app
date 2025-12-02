// functions/admin/ad-config.ts
interface Env {
  DB: D1Database;
  ADMIN_PASSWORD?: string;
}

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  try {
    // Check for admin authentication
    const authHeader = request.headers.get('Authorization');
    const adminPassword = env.ADMIN_PASSWORD || 'admin';

    if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
      return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const config = await request.json();

    await env.DB.prepare(
      "INSERT OR REPLACE INTO site_settings (id, setting_key, setting_value, updated_at) VALUES (1, ?, ?, datetime('now'))"
    ).bind('ad_config', JSON.stringify(config)).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Failed to save ad config:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to save ad config' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// functions/admin/ad-config.ts
interface Env {
  DB: D1Database;
}

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  try {
    const config = await request.json();

    await env.DB.prepare(
      'INSERT OR REPLACE INTO site_settings (id, setting_key, setting_value, updated_at) VALUES (1, ?, ?, datetime(?))'
    ).bind('ad_config', JSON.stringify(config), 'now').run();

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

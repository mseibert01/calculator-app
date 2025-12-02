// functions/admin/stats.ts
interface Env {
  DB: D1Database;
}

export const onRequestGet = async ({ env }: { env: Env }) => {
  try {
    const { results } = await env.DB.prepare(
      'SELECT calculator_name, COUNT(*) as count FROM usage_stats GROUP BY calculator_name'
    ).all();

    return new Response(JSON.stringify({ stats: results }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch stats', stats: [] }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

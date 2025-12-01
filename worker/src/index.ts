export interface Env {
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (url.pathname === '/api/subscribe' && request.method === 'POST') {
      try {
        const { email, calculatorId } = await request.json() as { email: string; calculatorId: string };

        if (!email || !calculatorId) {
          return new Response(JSON.stringify({ error: 'Email and calculatorId are required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        await env.DB.prepare(
          'INSERT INTO subscribers (email, calculator_id, created_at) VALUES (?, ?, ?)'
        ).bind(email, calculatorId, new Date().toISOString()).run();

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to subscribe' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    if (url.pathname === '/api/track' && request.method === 'POST') {
      try {
        const { calculatorName, financialHealthScore } = await request.json() as { calculatorName: string; financialHealthScore?: number };

        if (!calculatorName) {
          return new Response(JSON.stringify({ error: 'calculatorName is required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        await env.DB.prepare(
          'INSERT INTO usage_stats (calculator_name, timestamp, financial_health_score) VALUES (?, ?, ?)'
        ).bind(calculatorName, new Date().toISOString(), financialHealthScore).run();

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to track usage' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    if (url.pathname === '/api/health') {
      return new Response(JSON.stringify({ status: 'ok' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response('Not found', { status: 404, headers: corsHeaders });
  }
};

// functions/api/track.ts
export const onRequestPost = async ({ request, env }) => {
  try {
    const { calculatorName, financialHealthScore } = await request.json();

    if (!calculatorName) {
      return new Response(JSON.stringify({ error: 'calculatorName is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await env.DB.prepare(
      'INSERT INTO usage_stats (calculator_name, timestamp, financial_health_score) VALUES (?, ?, ?)'
    ).bind(calculatorName, new Date().toISOString(), financialHealthScore).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to track usage' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

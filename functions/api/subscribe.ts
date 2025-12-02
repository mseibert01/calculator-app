// functions/api/subscribe.ts
export const onRequestPost = async ({ request, env }) => {
  try {
    const { email, calculatorId } = await request.json();

    if (!email || !calculatorId) {
      return new Response(JSON.stringify({ error: 'Email and calculatorId are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await env.DB.prepare(
      'INSERT INTO subscribers (email, calculator_id, created_at) VALUES (?, ?, ?)'
    ).bind(email, calculatorId, new Date().toISOString()).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to subscribe' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

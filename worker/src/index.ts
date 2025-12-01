import { Hono } from 'hono';
import { cors } from 'hono/cors';

export interface Env {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Env }>();

app.use('*', cors());

app.post('/api/subscribe', async (c) => {
  try {
    const { email, calculatorId } = await c.req.json() as { email: string; calculatorId: string };

    if (!email || !calculatorId) {
      return c.json({ error: 'Email and calculatorId are required' }, 400);
    }

    await c.env.DB.prepare(
      'INSERT INTO subscribers (email, calculator_id, created_at) VALUES (?, ?, ?)'
    ).bind(email, calculatorId, new Date().toISOString()).run();

    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: 'Failed to subscribe' }, 500);
  }
});

app.post('/api/track', async (c) => {
  try {
    const { calculatorName, financialHealthScore } = await c.req.json() as { calculatorName: string; financialHealthScore?: number };

    if (!calculatorName) {
      return c.json({ error: 'calculatorName is required' }, 400);
    }

    await c.env.DB.prepare(
      'INSERT INTO usage_stats (calculator_name, timestamp, financial_health_score) VALUES (?, ?, ?)'
    ).bind(calculatorName, new Date().toISOString(), financialHealthScore).run();

    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: 'Failed to track usage' }, 500);
  }
});

app.get('/api/health', (c) => {
  return c.json({ status: 'ok' });
});

// Admin routes
const admin = new Hono<{ Bindings: Env }>();

admin.post('/login', async (c) => {
  const { password } = await c.req.json();

  if (password === 'admin') {
    return c.json({ success: true });
  } else {
    return c.json({ success: false }, 401);
  }
});

admin.get('/stats', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      'SELECT calculator_name, COUNT(*) as count FROM usage_stats GROUP BY calculator_name'
    ).all();
    return c.json({ stats: results });
  } catch (error) {
    return c.json({ error: 'Failed to fetch stats' }, 500);
  }
});

app.route('/admin', admin);

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    return app.fetch(request, env, ctx);
  }
};


// worker/src/admin.ts
import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();

app.use('/admin/*', cors());

app.post('/admin/login', async (c) => {
  const { password } = await c.req.json();

  if (password === 'admin') {
    return c.json({ success: true });
  } else {
    return c.json({ success: false }, 401);
  }
});

app.get('/admin/stats', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      'SELECT calculator_name, COUNT(*) as count FROM usage_stats GROUP BY calculator_name'
    ).all();
    return c.json({ stats: results });
  } catch (error) {
    return c.json({ error: 'Failed to fetch stats' }, 500);
  }
});

export default app;

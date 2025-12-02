// functions/admin/login.ts
export const onRequestPost = async ({ request, env }) => {
  try {
    const body = await request.json() as { password: string };
    const { password } = body;

    // Get admin password from environment variable, fallback to 'admin' for development
    const adminPassword = env.ADMIN_PASSWORD || 'admin';

    if (password === adminPassword) {
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({ success: false }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

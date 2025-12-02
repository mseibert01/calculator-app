// functions/admin/login.ts
export const onRequestPost = async ({ request, env }) => {
  const { password } = await request.json();

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
};

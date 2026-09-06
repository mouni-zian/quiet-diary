export async function onRequestPost(context) {
  const { request, env } = context;
  
  const cookie = request.headers.get('Cookie') || '';
  if (!cookie.includes('authed=true')) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  const { date, content, title } = await request.json();
  
  if (!date || !content) {
    return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
  
  await env.DIARY_KV.put(`diary:${date}`, JSON.stringify({ title, content, date, createdAt: Date.now() }));
  
  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
export async function onRequestPost(context) {
  const { request, env } = context;
  
  const cookie = request.headers.get('Cookie') || '';
  if (!cookie.includes('authed=true')) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  const { date } = await request.json();
  
  if (!date) {
    return new Response(JSON.stringify({ error: 'Missing date' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
  
  await env.DIARY_KV.delete(`diary:${date}`);
  
  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
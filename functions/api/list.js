export async function onRequestGet(context) {
  const { env } = context;
  
  const cookie = context.request.headers.get('Cookie') || '';
  if (!cookie.includes('authed=true')) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  const { keys } = await env.DIARY_KV.list({ prefix: 'diary:' });
  
  const entries = [];
  for (const key of keys) {
    const value = await env.DIARY_KV.get(key.name);
    if (value) {
      entries.push(JSON.parse(value));
    }
  }
  
  entries.sort((a, b) => b.date.localeCompare(a.date));
  
  return new Response(JSON.stringify(entries), {
    headers: { 'Content-Type': 'application/json' }
  });
}

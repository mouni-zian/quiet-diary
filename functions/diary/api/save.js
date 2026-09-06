export async function onRequestPost({ request, env }) {
  const { date, title, content } = await request.json();
  if (!content) return Response.json({ error: 'Missing content' }, { status: 400 });
  const key = 'entry:' + date + ':' + Date.now();
  await env.DIARY_KV.put(key, JSON.stringify({ date, title, content, created: Date.now() }));
  return Response.json({ ok: true });
}
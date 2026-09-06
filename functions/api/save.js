export async function onRequestPost({ request, env }) {
  const { date, title, content } = await request.json();
  if (!date || !content) return Response.json({ error: 'Missing fields' }, { status: 400 });
  await env.DIARY_KV.put('entry:' + date, JSON.stringify({ date, title, content }));
  return Response.json({ ok: true });
}
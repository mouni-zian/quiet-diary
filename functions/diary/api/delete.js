export async function onRequestPost({ request, env }) {
  const { key } = await request.json();
  if (!key) return Response.json({ error: 'Missing key' }, { status: 400 });
  await env.DIARY_KV.delete(key);
  return Response.json({ ok: true, deleted: key });
}
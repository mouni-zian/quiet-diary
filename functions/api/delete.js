export async function onRequestPost({ request, env }) {
  const { date } = await request.json();
  if (!date) return Response.json({ error: 'Missing date' }, { status: 400 });
  await env.DIARY_KV.delete('entry:' + date);
  return Response.json({ ok: true });
}
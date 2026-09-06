export async function onRequestGet({ env }) {
  const { keys } = await env.DIARY_KV.list({ prefix: 'entry:' });
  const entries = [];
  for (const k of keys) {
    const v = await env.DIARY_KV.get(k.name);
    if (v) entries.push(JSON.parse(v));
  }
  entries.sort((a, b) => b.date.localeCompare(a.date));
  return Response.json(entries);
}
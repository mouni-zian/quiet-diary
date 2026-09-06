export async function onRequestGet({ env }) {
  const { keys } = await env.DIARY_KV.list({ prefix: 'entry:' });
  const entries = [];
  for (const k of keys) {
    const v = await env.DIARY_KV.get(k.name);
    if (v) {
      const entry = JSON.parse(v);
      entry._key = k.name;
      entries.push(entry);
    }
  }
  entries.sort((a, b) => {
    const aTime = a.created || Date.parse(a.date) || 0;
    const bTime = b.created || Date.parse(b.date) || 0;
    return bTime - aTime;
  });
  return Response.json(entries);
}
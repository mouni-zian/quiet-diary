export async function onRequestGet(context) {
  const { env } = context;
  try {
    const { keys } = await env.DIARY_KV.list({ prefix: 'entry:' });
    const entries = [];
    for (const key of keys) {
      const value = await env.DIARY_KV.get(key.name);
      if (value) entries.push(JSON.parse(value));
    }
    // 按日期倒序
    entries.sort((a, b) => b.date.localeCompare(a.date));
    return new Response(JSON.stringify(entries), { 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch(e) {
    return new Response(JSON.stringify([]), { status: 500 });
  }
}
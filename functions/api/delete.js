export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const body = await request.json();
    const { date } = body;
    if (!date) return new Response(JSON.stringify({ error: 'Missing date' }), { status: 400 });
    await env.DIARY_KV.delete('entry:' + date);
    return new Response(JSON.stringify({ ok: true }), { 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch(e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const body = await request.json();
    const { date, title, content } = body;
    if (!date || !content) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
    }
    await env.DIARY_KV.put('entry:' + date, JSON.stringify({ date, title, content }));
    return new Response(JSON.stringify({ ok: true }), { 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch(e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
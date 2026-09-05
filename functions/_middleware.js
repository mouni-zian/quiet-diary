export async function onRequest(context) {
  const { request, next } = context;
  
  const cookie = request.headers.get('Cookie') || '';
  if (cookie.includes('authed=true')) {
    return next();
  }
  
  const auth = request.headers.get('Authorization');
  const VALID_PASSWORD = context.env && context.env.CFP_PASSWORD;
  
  if (!auth) {
    return new Response('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="安静日记"' }
    });
  }
  
  const [scheme, encoded] = auth.split(' ');
  if (scheme !== 'Basic' || !encoded) {
    return new Response('Invalid auth', { status: 401 });
  }
  
  const decoded = atob(encoded);
  const [, password] = decoded.split(':');
  
  if (password === VALID_PASSWORD) {
    const resp = await next();
    resp.headers.set('Set-Cookie', 'authed=true; Max-Age=86400; Path=/');
    return resp;
  }
  
  return new Response('Invalid password', { status: 401 });
}
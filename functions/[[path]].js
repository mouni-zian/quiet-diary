export async function onRequest(context) {
  const { request, next, env } = context;

  // 1. 已认证的 Cookie 直接放行
  const cookie = request.headers.get('Cookie') || '';
  if (cookie.includes('authed=true')) {
    return next();
  }

  // 2. 读取环境变量里的密码
  const VALID_PASSWORD = env.CFP_PASSWORD;

  // 3. 没有 Authorization 头 → 要求浏览器弹登录框
  const auth = request.headers.get('Authorization');
  if (!auth) {
    return new Response('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="安静日记"' }
    });
  }

  // 4. 解析 Basic Auth
  const [scheme, encoded] = auth.split(' ');
  if (scheme !== 'Basic' || !encoded) {
    return new Response('Invalid auth', { status: 401 });
  }
  const decoded = atob(encoded);
  const [, password] = decoded.split(':');

  // 5. 校验密码
  if (password === VALID_PASSWORD) {
    const resp = await next();
    resp.headers.set('Set-Cookie', 'authed=true; Max-Age=86400; Path=/');
    return resp;
  }

  // 6. 密码错误 → 401
  return new Response('Invalid password', { status: 401 });
}
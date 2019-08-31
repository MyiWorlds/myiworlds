import cookie from 'cookie';

// https://www.youtube.com/watch?v=_AYuhmz-fX4
// Ben Awads video on persisting state with cookies/nextjs
export function parseCookies(req: { headers: { cookie: any } }) {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie);
}

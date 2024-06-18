import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } from '$env/static/private';
import type { Handle } from '@sveltejs/kit';
import type { RESTPostOAuth2AccessTokenResult } from 'discord-api-types/v10';

export const handle: Handle = async ({ event, resolve }) => {
  let accessToken = event.cookies.get('access_token');
  let refreshToken = event.cookies.get('refresh_token');

  event.locals.getUser = async () => {
    if (!accessToken && refreshToken) {
      const res = await event.fetch(
        `https://discord.com/api/v10/oauth2/token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: DISCORD_CLIENT_ID,
            client_secret: DISCORD_CLIENT_SECRET,
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            redirect_uri: encodeURI(`${event.url.origin}/callback`),
          }),
        },
      );

      if (!res.ok) {
        throw new Error('Failed to refresh token');
      }

      const data: RESTPostOAuth2AccessTokenResult = await res.json();

      event.cookies.set('access_token', data.access_token, {
        maxAge: data.expires_in,
        sameSite: 'strict',
        path: '/',
      });

      accessToken = data.access_token;
    }

    if (!accessToken) {
      return null;
    }

    const userRes = await event.fetch(`https://discord.com/api/v10/users/@me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Cache-Control': 'public, max-age=3600',
      },
    });

    if (!userRes.ok) {
      return null;
    }

    return await userRes.json();
  };

  return await resolve(event);
};

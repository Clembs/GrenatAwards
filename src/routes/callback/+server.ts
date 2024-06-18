import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } from '$env/static/private';
import { db } from '$lib/db';
import { users } from '$lib/db/schema';
import {
  type RESTGetAPIUserResult,
  type RESTPostOAuth2AccessTokenResult,
} from 'discord-api-types/v10';

export const GET: RequestHandler = async ({ url, fetch, cookies }) => {
  const code = url.searchParams.get('code');

  if (!code) {
    throw error(400, 'Bad Request');
  }

  const res = await fetch(`https://discord.com/api/v10/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: DISCORD_CLIENT_ID,
      client_secret: DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
      redirect_uri: encodeURI(`${url.origin}/callback`),
    }),
  });

  if (!res.ok) {
    throw error(500);
  }

  const data: RESTPostOAuth2AccessTokenResult = await res.json();

  cookies.set('access_token', data.access_token, {
    maxAge: data.expires_in,
    path: '/',
  });

  cookies.set('refresh_token', data.refresh_token, {
    path: '/',
  });

  const userRes = await fetch(`https://discord.com/api/v10/users/@me`, {
    headers: {
      Authorization: `Bearer ${data.access_token}`,
    },
  });

  if (!userRes.ok) {
    throw error(500);
  }

  const userData: RESTGetAPIUserResult = await userRes.json();

  await db.insert(users).values({ id: userData.id }).onConflictDoNothing();

  throw redirect(302, '/vote');
};

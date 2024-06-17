import type { RequestHandler } from './$types';
import { DISCORD_CLIENT_ID } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
  const urlParams = new URLSearchParams();

  urlParams.append('client_id', DISCORD_CLIENT_ID);
  urlParams.append('response_type', 'code');
  urlParams.append('redirect_uri', encodeURI(`${url.origin}/callback`));
  urlParams.append('scope', 'identify');

  throw redirect(
    302,
    `https://discord.com/api/v10/oauth2/authorize?${urlParams}`,
  );
};

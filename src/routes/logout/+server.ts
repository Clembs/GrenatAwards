import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals: { getUser }, cookies }) => {
  const user = await getUser();

  if (user) {
    cookies.delete('access_token', {
      path: '/',
    });
    cookies.delete('refresh_token', {
      path: '/',
    });
  }

  throw redirect(302, '/');
};

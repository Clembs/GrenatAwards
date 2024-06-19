import { DISCORD_ADMIN_ID } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export const load = async ({ parent }) => {
  const { user } = await parent();
  if (!user || user.id !== DISCORD_ADMIN_ID) throw redirect(302, '/');

  return {
    user,
  };
};

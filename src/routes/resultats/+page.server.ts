import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/db';

export const load: PageServerLoad = async ({ parent }) => {
  const { user } = await parent();

  if (!user) throw redirect(302, '/login');

  const votes = await db.query.votes.findMany({
    where: ({ userId }, { eq }) => eq(userId, user.id),
    with: {
      category: true,
      nominee: true,
    },
  });

  const categories = await db.query.categories.findMany();

  return {
    votes,
    categories,
  };
};

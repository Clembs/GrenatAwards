import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/db';

export const load: PageServerLoad = async ({ parent }) => {
  const { user } = await parent();

  if (!user) throw redirect(302, '/login');

  const votes = await db.query.votes.findMany({
    orderBy: ({ categoryId }, { asc }) => asc(categoryId),
    with: {
      category: true,
      nominee: true,
    },
  });

  const userVotes = votes.filter((vote) => vote.userId === user.id);

  const categories = await db.query.categories.findMany();

  return {
    userVotes,
    votes: votes.map((vote) => ({
      ...vote,
      userId: undefined,
    })),
    categories,
  };
};

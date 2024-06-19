import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/db';
import { nominees, votes } from '$lib/db/schema';
import { and, count, eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ parent, setHeaders }) => {
  const { user } = await parent();

  if (!user) throw redirect(302, '/login');

  // Find the last vote from the current user by category ID
  const lastVote = await db.query.votes.findFirst({
    where: ({ userId, votes }, { and, lt, eq }) =>
      and(eq(userId, user.id), lt(votes, 2)),
    orderBy: ({ categoryId }, { asc }) => asc(categoryId),
  });

  // If the user hasn't voted on any category yet, show the first category
  const nextCategoryId = lastVote ? lastVote.categoryId : 1;

  // Get all the categories
  const categories = await db.query.categories.findMany();

  // Find the next category details
  const nextCategory = categories.find(
    (category) => category.id === nextCategoryId,
  );

  // If there are no more categories, show the results
  if (!nextCategory) throw redirect(302, '/resultats');

  // Top 4 nominees
  const topNominees = await db
    .select({
      nominee: nominees,
      votes: count(),
    })
    .from(votes)
    .fullJoin(nominees, eq(nominees.id, votes.nomineeId))
    .where(eq(votes.categoryId, nextCategoryId))
    .groupBy(votes.nomineeId, votes.categoryId, votes.votes, nominees.id)
    .orderBy()
    .limit(4);

  setHeaders({ 'Cache-Control': 'no-store' });

  return {
    user,
    category: nextCategory,
    categories,
    nominees: topNominees,
  };
};

export const actions: Actions = {
  default: async ({ locals: { getUser }, request }) => {
    const user = await getUser();
    if (!user) throw redirect(302, '/login');

    const formData = await request.formData();
    const nomineeId = Number(formData.get('nominee')?.toString());

    // If the nominee ID is not a number, redirect to the vote page
    if (!nomineeId || isNaN(nomineeId)) throw redirect(302, '/final-vote');

    // Get all the categories
    const categories = await db.query.categories.findMany();

    // Find the last vote from the current user by category ID
    const lastVote = await db.query.votes.findFirst({
      where: ({ userId, votes }, { and, lt, eq }) =>
        and(eq(userId, user.id), lt(votes, 2)),
      orderBy: ({ categoryId }, { asc }) => asc(categoryId),
    });

    // If the user hasn't voted on any category yet, show the first category
    const currentCategoryId = lastVote ? lastVote.categoryId : 1;

    // Get user's vote for the current category and nominee
    const userVote = await db.query.votes.findFirst({
      where: ({ userId, categoryId, nomineeId: nId }, { and, eq }) =>
        and(
          eq(userId, user.id),
          eq(categoryId, currentCategoryId),
          eq(nId, nomineeId),
        ),
    });

    // If the user has already voted for the current category, update the vote
    if (userVote) {
      await db
        .update(votes)
        .set({
          votes: 2,
        })
        .where(
          and(
            eq(votes.userId, user.id),
            eq(votes.categoryId, currentCategoryId),
            eq(votes.nomineeId, nomineeId),
          ),
        );
    } else {
      // Otherwise, insert a new vote
      await db.insert(votes).values({
        userId: user.id,
        categoryId: currentCategoryId,
        nomineeId,
        votes: 2,
      });
    }

    // If there are no more categories, show the results
    if (currentCategoryId === categories.length) {
      throw redirect(302, '/resultats');
    }

    // Otherwise, redirect to the next category
    throw redirect(302, '/final-vote');
  },
};

import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/db';
import { votes } from '$lib/db/schema';

export const load: PageServerLoad = async ({ parent, setHeaders }) => {
  const { user } = await parent();

  if (!user) throw redirect(302, '/login');

  // Find the last vote from the current user by category ID
  const lastVote = await db.query.votes.findFirst({
    where: ({ userId }, { eq }) => eq(userId, user.id),
    orderBy: ({ categoryId }, { desc }) => desc(categoryId),
  });

  // If the user hasn't voted on any category yet, show the first category
  const nextCategoryId = lastVote ? lastVote.categoryId + 1 : 1;

  // Get all the categories
  const categories = await db.query.categories.findMany();

  // Find the next category details
  const nextCategory = categories.find(
    (category) => category.id === nextCategoryId,
  );

  // If there are no more categories, show the results
  if (!nextCategory) throw redirect(302, '/resultats');

  // Nominees are always of class 0, except for the penultimate
  // category which is class 1
  // And the last category which is class 2
  let nomineesClass = 0;
  if (nextCategoryId === categories.length - 1) {
    nomineesClass = 1;
  } else if (nextCategoryId === categories.length) {
    nomineesClass = 2;
  }

  // Get the nominees for the next category
  const nominees = await db.query.nominees.findMany({
    orderBy: ({ name }, { asc }) => asc(name),
    where: ({ class: classInt }, { eq }) => eq(classInt, nomineesClass),
  });

  setHeaders({ 'Cache-Control': 'no-store' });

  return {
    user,
    category: nextCategory,
    categories,
    nominees,
  };
};

export const actions: Actions = {
  default: async ({ locals: { getUser }, request }) => {
    const user = await getUser();
    if (!user) throw redirect(302, '/login');

    const formData = await request.formData();
    const nomineeId = Number(formData.get('nominee')?.toString());

    // If the nominee ID is not a number, redirect to the vote page
    if (!nomineeId || isNaN(nomineeId)) throw redirect(302, '/vote');

    // Get all the categories
    const categories = await db.query.categories.findMany();

    // Find the last vote from the current user by category ID
    const lastVote = await db.query.votes.findFirst({
      where: ({ userId }, { eq }) => eq(userId, user.id),
      orderBy: ({ categoryId }, { desc }) => desc(categoryId),
    });

    // If the user hasn't voted on any category yet, show the first category
    const currentCategoryId = lastVote ? lastVote.categoryId + 1 : 1;

    await db.insert(votes).values({
      userId: user.id,
      categoryId: currentCategoryId,
      nomineeId,
    });

    // If there are no more categories, show the results
    if (currentCategoryId === categories.length) {
      throw redirect(302, '/resultats');
    }

    // Otherwise, redirect to the next category
    throw redirect(302, '/vote');
  },
};

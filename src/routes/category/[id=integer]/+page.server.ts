import { db } from '$lib/db';
import { error, redirect } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
  const user = await locals.getUser();
  if (!user) throw redirect(302, '/login');

  const categoryId = parseInt(params.id);

  const category = await db.query.categories.findFirst({
    where: (categories, { eq }) => eq(categories.id, categoryId),
  });
  if (!category)
    throw error(404, {
      message: 'Category not found',
    });

  return {
    category,
  };
};

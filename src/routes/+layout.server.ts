import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({
  setHeaders,
  locals: { getUser },
}) => {
  const user = await getUser();

  setHeaders({
    'cache-control': 'public, max-age=3600',
  });

  return {
    user,
  };
};

import searchCircles from './functions/searchCircles';
import { Context, ResolverMap, SearchCircle } from '@myiworlds/types';
import { stackdriver } from '@myiworlds/cloud-services';

export const resolvers: ResolverMap = {
  Query: {
    searchCirclesByTags: async (
      _: null,
      args: {
        circle: SearchCircle;
      },
      context: Context,
    ) => {
      try {
        return await searchCircles(args.circle, context);
      } catch (error) {
        stackdriver.report(error);
        return null;
      }
    },
  },
};

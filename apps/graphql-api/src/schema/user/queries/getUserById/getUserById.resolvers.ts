import getUserById from './getUserById';
import { Context, ResolverMap } from '@myiworlds/types';

const getUserByIdResolvers: ResolverMap = {
  Query: {
    getUserById: async (_: null, __: null, context: Context) =>
      getUserById(context.userId),
  },
};

export default getUserByIdResolvers;

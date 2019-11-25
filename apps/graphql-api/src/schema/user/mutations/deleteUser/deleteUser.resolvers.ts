import deleteUser from './deleteUser';
import { Context, ResolverMap } from '@myiworlds/types';

const deleteUserResolver: ResolverMap = {
  Mutation: {
    deleteUser: async (_: null, __: null, context: Context) =>
      deleteUser(context),
  },
};

export default deleteUserResolver;

import isSystemAdmin from '../../user/functions/isSystemAdmin';
import { Context, ResolverMap } from '@myiworlds/types';
import { createServiceKeys } from '@myiworlds/services';

const createServiceKeysResolver: ResolverMap = {
  Mutation: {
    createServiceKeys: async (_: null, __: null, context: Context) => {
      if (await isSystemAdmin(context.userId)) {
        return createServiceKeys();
      }
      return {
        totalCreated: 0,
        wasSuccessful: false,
      };
    },
  },
};

export default createServiceKeysResolver;

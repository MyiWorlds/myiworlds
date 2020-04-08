import isSystemAdmin from './../../../user/functions/isSystemAdmin';
import { Context } from '@myiworlds/types';
import { createServiceKeys } from '@myiworlds/services';
import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from 'graphql';

const createServiceKeysMutation = {
  name: 'CreateServiceKeys',
  resolve: async (_: null, args: {}, context: Context) => {
    if (await isSystemAdmin(context.userId)) {
      return createServiceKeys();
    }
    return {
      totalCreated: 0,
      wasSuccessful: false,
    };
  },
  type: new GraphQLObjectType({
    name: 'CreateServiceKeysPayload',
    fields: () => ({
      status: {
        type: GraphQLString,
      },
      message: {
        type: GraphQLString,
      },
      totalCreated: {
        type: GraphQLBoolean,
      },
    }),
  }),
};

export default createServiceKeysMutation;

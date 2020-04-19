import deleteUser from './deleteUser';
import { Context } from '@myiworlds/types';
import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLNonNull,
} from 'graphql';

const deleteUserMutation = {
  name: 'DeleteUser',
  resolve: (_: null, args: null, context: Context) => deleteUser(context),
  type: new GraphQLObjectType({
    name: 'DeleteUserPayload',
    fields: () => ({
      status: { type: GraphQLNonNull(GraphQLString) },
      message: { type: GraphQLNonNull(GraphQLString) },
      userDeleted: { type: GraphQLNonNull(GraphQLBoolean) },
    }),
  }),
};

export default deleteUserMutation;

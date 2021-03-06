import createUser from './createUser';
import getUserById from '../../queries/getUserById/getUserById';
import UserType from '../../UserType';
import { CreateUserResponse } from './createUserTypes.d';
import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

const createUserMutation = {
  name: 'CreateUser',
  args: {
    id: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    photoURL: { type: GraphQLString },
  },
  resolve: (_: null, args: any) => {
    return createUser(args.id, args.email, args.photoURL);
  },
  type: new GraphQLObjectType({
    name: 'CreateUserPayload',
    fields: () => ({
      status: { type: GraphQLString },
      message: { type: GraphQLString },
      createdUser: {
        type: UserType,
        resolve: async (response: CreateUserResponse) => {
          if (response.createdDocumentId) {
            return getUserById(response.createdDocumentId);
          } else {
            return null;
          }
        },
      },
    }),
  }),
};

export default createUserMutation;

import createUser from './createCircle';
import getUserById from '../../queries/getUserById/getCircleById';
import UserType from '../../CircleType';
import { CreateUserResponse } from './createCircleTypes';
import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
} from 'graphql';

const createUserMutation = {
  name: 'createUser',
  args: {
    id: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    photoURL: { type: GraphQLString },
  },
  resolve: (_: null, args: any) => {
    return createUser(args.id, args.email, args.photoURL)
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
      }
    }),
  }),
};

export default createUserMutation;

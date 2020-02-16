import createServiceKeysMutation from './admin/mutations/createServiceKeys/createServiceKeysMutation';
import CreateUserMutation from './user/mutations/createUser/createUserMutation';
import deleteUserMutation from './user/mutations/deleteUser/deleteUserMutation';
import getUserByIdQuery from './user/queries/getUserById/getUserByIdQuery';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';


export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      getUserById: getUserByIdQuery,
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createUser: CreateUserMutation,
      deleteUser: deleteUserMutation,
      createServiceKeys: createServiceKeysMutation,
    },
  }),
});

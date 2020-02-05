import bigIntTypeDefs from '../schema/shared/bigInt.typeDefs';
import createServiceKeysResolver from '../schema/admin/mutations/createServiceKeys.resolvers';
import createServiceKeysTypeDefs from '../schema/admin/mutations/createServiceKeys.typeDefs';
import createUserResolver from './../schema/user/mutations/createUser/createUser.resolvers';
import createUserTypeDefs from '../schema/user/mutations/createUser/createUser.typeDefs';
import deleteUserResolver from '../schema/user/mutations/deleteUser/deleteUser.resolvers';
import deleteUserTypeDefs from './../schema/user/mutations/deleteUser/deleteUser.typeDefs';
import getUserByIdResolvers from '../schema/user/queries/getUserById/getUserById.resolvers';
import getUserByIdTypeDefs from '../schema/user/queries/getUserById/getUserById.typeDefs';
import jsonTypeDefs from '../schema/shared/json.typeDefs';
import sharedResolvers from '../schema/shared/shared.resolvers';
import uploadTypeDefs from '../schema/shared/upload.typeDefs';
import userResolvers from '../schema/user/shared/user.resolvers';
import userTypeDefs from '../schema/user/shared/user.typeDefs';
import { makeExecutableSchema } from 'graphql-tools';
import { mergeResolvers, mergeTypes } from 'merge-graphql-schemas';

export const genSchema = () => {
  try {
    const typeDefs = [
      bigIntTypeDefs,
      jsonTypeDefs,
      uploadTypeDefs,
      userTypeDefs,
      getUserByIdTypeDefs,
      createUserTypeDefs,
      deleteUserTypeDefs,
      createServiceKeysTypeDefs,
    ];
    const resolvers = [
      userResolvers,
      getUserByIdResolvers,
      sharedResolvers,
      createUserResolver,
      deleteUserResolver,
      createServiceKeysResolver,
    ];

    return makeExecutableSchema({
      typeDefs: mergeTypes(typeDefs),
      resolvers: mergeResolvers(resolvers),
    });
  } catch (error) {
    console.error('genSchema Error', '\n', error);
  }
};

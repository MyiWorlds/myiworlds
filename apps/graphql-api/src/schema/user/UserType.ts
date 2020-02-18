import ProfileType from './../profile/ProfileType';
import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
  } from 'graphql';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const GraphQLBigInt = require('graphql-bigint');

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'user who can create and interact with circles.',

  fields: () => ({
    id: { type: GraphQLString },
    collection: { type: GraphQLString },
    email: { type: GraphQLString },
    photoURL: { type: GraphQLString },
    dateCreated: { type: GraphQLBigInt },
    dateUpdated: { type: GraphQLBigInt },
    isSystemAdmin: { type: GraphQLBoolean },
    canCreate: { type: GraphQLBoolean },
    profiles: { type: GraphQLList(ProfileType) },
  }),
});

export default UserType;

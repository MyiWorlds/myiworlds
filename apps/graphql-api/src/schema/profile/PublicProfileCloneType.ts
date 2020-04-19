import CircleType from '../circle/CircleType';
import { Context } from '@myiworlds/types';
import { GraphQLObjectType, GraphQLString } from 'graphql';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const GraphQLBigInt = require('graphql-bigint');

const PublicProfileCloneType = new GraphQLObjectType({
  name: 'PublicProfileClone',
  description: 'A cloned public profile',

  fields: () => ({
    id: { type: GraphQLString },
    collection: { type: GraphQLString },
    clonedFrom: { type: GraphQLString },
    username: { type: GraphQLString },
    dateCreated: { type: GraphQLBigInt },
    dateUpdated: { type: GraphQLBigInt },
    media: {
      type: CircleType,
      resolve: async (publicProfile, args, context: Context) => {
        if (publicProfile.media) {
          return context.circleLoader.load(publicProfile.media);
        }
        return null;
      },
    },
    theme: {
      type: CircleType,
      resolve: async (publicProfile, args, context: Context) => {
        if (publicProfile.theme) {
          return context.circleLoader.load(publicProfile.theme);
        }
        return null;
      },
    },
    publicHome: {
      type: CircleType,
      resolve: async (publicProfile, args, context: Context) => {
        if (publicProfile.publicHome) {
          return context.circleLoader.load(publicProfile.publicHome);
        }
        return null;
      },
    },
    circleUIs: {
      type: CircleType,
      resolve: async (profile, args, context: Context) => {
        if (profile.circleUIs) {
          return context.circleLoader.load(profile.circleUIs);
        }
        return null;
      },
    },
  }),
});

export default PublicProfileCloneType;

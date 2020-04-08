import CircleType from '../circle/CircleType';
import { Context } from '@myiworlds/types';
import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from 'graphql';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const GraphQLBigInt = require('graphql-bigint');

const ProfileCloneType = new GraphQLObjectType({
  name: 'ProfileClone',
  description: 'Profile which only a user can access clone.',

  fields: () => ({
    id: { type: GraphQLString },
    collection: { type: GraphQLString },
    clonedFrom: { type: GraphQLString },
    username: { type: GraphQLString },
    dateCreated: { type: GraphQLBigInt },
    dateUpdated: { type: GraphQLBigInt },
    addToHistory: { type: GraphQLBoolean },
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
      resolve: async (profile, args, context: Context) => {
        if (profile.theme) {
          return context.circleLoader.load(profile.theme);
        }
        return null;
      },
    },
    publicHome: {
      type: CircleType,
      resolve: async (profile, args, context: Context) => {
        if (profile.publicHome) {
          return context.circleLoader.load(profile.publicHome);
        }
        return null;
      },
    },
    home: {
      type: CircleType,
      resolve: async (profile, args, context: Context) => {
        if (profile.home) {
          return context.circleLoader.load(profile.home);
        }
        return null;
      },
    },
    history: {
      type: CircleType,
      resolve: async (profile, args, context: Context) => {
        if (profile.history) {
          return context.circleLoader.load(profile.history);
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

export default ProfileCloneType;

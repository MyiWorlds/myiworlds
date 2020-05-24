import CircleType from './../circle/CircleType';
import { Context } from '@myiworlds/types';
import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from 'graphql';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const GraphQLBigInt = require('graphql-bigint');

const ProfileType = new GraphQLObjectType({
  name: 'CreatedProfile',
  description: 'user who can create and interact with circles.',

  fields: () => ({
    id: { type: GraphQLString },
    collection: { type: GraphQLString },
    username: { type: GraphQLString },
    dateCreated: { type: GraphQLBigInt },
    dateUpdated: { type: GraphQLBigInt },
    addToHistory: { type: GraphQLBoolean },
    userId: { type: GraphQLString },
    media: {
      type: CircleType,
      resolve: async (profile, args, context: Context) => {
        if (profile.media) {
          return context.circleLoader.load(profile.media);
        }
        return null;
      },
    },
    rating: {
      type: CircleType,
      resolve: async (profile, args, context: Context) => {
        if (profile.rating) {
          return context.circleLoader.load(profile.rating);
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
    overrideCircleUIs: { type: GraphQLBoolean },
    circleUIs: {
      type: CircleType,
      resolve: async (profile, args, context: Context) => {
        if (profile.circleUIs) {
          return context.circleLoader.load(profile.circleUIs);
        }
        return null;
      },
    },
    following: {
      type: CircleType,
      resolve: async (profile, args, context: Context) => {
        if (profile.following) {
          return context.circleLoader.load(profile.following);
        }
        return null;
      },
    },
    level: {
      type: CircleType,
      resolve: async (profile, args, context: Context) => {
        if (profile.level) {
          return context.circleLoader.load(profile.level);
        }
        return null;
      },
    },
  }),
});

export default ProfileType;

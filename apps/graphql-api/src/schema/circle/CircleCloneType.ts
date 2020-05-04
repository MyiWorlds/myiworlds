import CircleType from './CircleType';
import PublicProfileType from '../profile/PublicProfileType';
import { Context } from '@myiworlds/types';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const GraphQLBigInt = require('graphql-bigint');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { GraphQLJSON } = require('graphql-type-json');
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const CircleCloneType: any = new GraphQLObjectType({
  name: 'CircleClone',
  description: 'A circle in a graph that can assemble to be anything.',

  fields: () => ({
    id: { type: GraphQLString },
    collection: { type: GraphQLString },
    cached: { type: GraphQLBoolean },
    pii: { type: GraphQLBoolean },
    autoUpdate: { type: GraphQLBoolean },
    parent: {
      type: CircleType,
      resolve: async (circle, args, context: Context) => {
        if (circle.parent) {
          return context.circleLoader.load(circle.parent);
        }
        return null;
      },
    },
    clonedFrom: {
      type: CircleType,
      resolve: async (circle, args, context: Context) => {
        if (circle.clonedFrom) {
          return context.circleLoader.load(circle.clonedFrom);
        }
        return null;
      },
    },
    copiedFrom: {
      type: CircleType,
      resolve: async (circle, args, context: Context) => {
        if (circle.copiedFrom && circle.copiedFromClone) {
          return context.circleCloneLoader.load(circle.copiedFrom);
        } else if (circle.copiedFrom) {
          return context.circleLoader.load(circle.copiedFrom);
        }
        return null;
      },
    },
    copiedFromClone: { type: GraphQLBoolean },
    slug: { type: GraphQLString },
    public: { type: GraphQLBoolean },
    passwordRequired: { type: GraphQLBoolean },
    type: { type: GraphQLString },
    tags: { type: GraphQLList(GraphQLString) },
    title: { type: GraphQLString },
    subtitle: { type: GraphQLString },
    description: { type: GraphQLString },
    media: {
      type: CircleType,
      resolve: async (circle, args, context: Context) => {
        if (circle.media) {
          return context.circleLoader.load(circle.media);
        }
        return null;
      },
    },
    creator: {
      description:
        'A publicly viewable profile of the User who created this piece of content',
      type: PublicProfileType,
      resolve: async (circle, args, context: Context) => {
        if (circle.creator) {
          return context.profileLoader.load(circle.creator);
        }
        return null;
      },
    },
    owner: {
      description:
        'A publicly viewable profile of the User who created this piece of content',
      type: PublicProfileType,
      resolve: async (circle, args, context: Context) => {
        if (circle.owner) {
          return context.profileLoader.load(circle.owner);
        }
        return null;
      },
    },
    viewers: {
      type: new GraphQLList(PublicProfileType),
      resolve: (circle, args, context: Context) => {
        if (circle.viewers && circle.viewers.length) {
          if (typeof circle.viewers[0] === 'string') {
            return context.profileLoader.loadMany(circle.viewers);
          } else {
            return circle.viewers;
          }
        }
        return [];
      },
    },
    editors: {
      type: new GraphQLList(PublicProfileType),
      resolve: (circle, args, context: Context) => {
        if (circle.lines && circle.lines.length) {
          if (typeof circle.lines[0] === 'string') {
            return context.profileLoader.loadMany(circle.lines);
          } else {
            return circle.lines;
          }
        }
        return [];
      },
    },
    ui: {
      type: CircleType,
      resolve: async (circle, args, context: Context) => {
        if (circle.ui) {
          return context.circleLoader.load(circle.ui);
        }
        return null;
      },
    },
    dateCreated: { type: GraphQLBigInt },
    dateUpdated: { type: GraphQLBigInt },
    key: { type: GraphQLString },
    string: { type: GraphQLString },
    data: { type: GraphQLJSON },
    number: { type: GraphQLInt },
    bigNumber: { type: GraphQLBigInt },
    boolean: { type: GraphQLBoolean },
    date: { type: GraphQLBigInt },
    geoPoint: { type: GraphQLString },
    line: {
      type: CircleType,
      resolve: async (circle, args, context: Context) => {
        if (circle.line) {
          return context.circleLoader.load(circle.line);
        }
        return null;
      },
    },
    lines: {
      type: new GraphQLList(CircleType),
      resolve: (circle, args, context: Context) => {
        if (circle.lines && circle.lines.length) {
          if (typeof circle.lines[0] === 'string') {
            return context.circleLoader.loadMany(circle.lines);
          } else {
            return circle.lines;
          }
        }
        return [];
      },
    },
  }),
});

export default CircleCloneType;

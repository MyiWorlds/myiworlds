import PublicProfileType from './../profile/PublicProfileType';
import { Context } from '@myiworlds/types';
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
  } from 'graphql';
/* eslint-disable @typescript-eslint/no-var-requires */
const GraphQLBigInt = require('graphql-bigint');
const GraphQLJSON = require('graphql-type-json');

const CircleType: GraphQLObjectType<any, Context, {
  [key: string]: any;
}> = new GraphQLObjectType({
  name: 'Circle',
  description: 'A circle in a graph that can assemble to be anything.',

  fields: () => ({
    id: { type: GraphQLString },
    collection: { type: GraphQLString },
    cached: { type: GraphQLBoolean },
    pii: { type: GraphQLBoolean },
    parent: {
      type: CircleType,
      resolve: async (circle, args, context: Context) => {
        if (circle.parent) {
          return context.circleLoader.load(circle.parent);
        }
        return null;
      },
    },
    copiedFrom: {
      type: CircleType,
      resolve: async (circle, args, context: Context) => {
        if (circle.copiedFrom) {
          return context.circleLoader.load(circle.copiedFrom);
        }
        return null;
      },
    },
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
    }
  }),
});

export default CircleType;

import CircleType from '../../CircleType';
import createCircle from './createCircle';
import getDocumentById from '../../../../services/firebase/firestore/queries/getDocumentById';
import { Circle, Context } from '@myiworlds/types';
import { CreateCircleResponse } from './createCircleTypes';
import { FIRESTORE_COLLECTIONS } from '@myiworlds/enums';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { GraphQLJSON } = require('graphql-type-json');

import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// eslint-disable-next-line @typescript-eslint/no-var-requires
const GraphQLBigInt = require('graphql-bigint');

const createCircleMutation = {
  name: 'CreateCircle',
  args: {
    id: { type: GraphQLString },
    collection: { type: GraphQLString },
    type: { type: GraphQLString },
    parent: { type: GraphQLString },
    cached: { type: GraphQLBoolean },
    cache: { type: GraphQLJSON },
    pii: { type: GraphQLBoolean },
    copiedFrom: { type: GraphQLString },
    autoUpdate: { type: GraphQLBoolean },
    slug: { type: GraphQLString },
    public: { type: GraphQLBoolean },
    passwordRequired: { type: GraphQLBoolean },
    tags: { type: GraphQLList(GraphQLString) },
    title: { type: GraphQLString },
    subtitle: { type: GraphQLString },
    description: { type: GraphQLString },
    media: { type: GraphQLString },
    creator: { type: GraphQLString },
    owner: { type: GraphQLString },
    viewers: { type: GraphQLList(GraphQLString) },
    editors: { type: GraphQLList(GraphQLString) },
    ui: { type: GraphQLString },
    layouts: { type: GraphQLString },
    dateCreated: { type: GraphQLBigInt },
    dateUpdated: { type: GraphQLBigInt },
    key: { type: GraphQLString },
    string: { type: GraphQLString },
    data: { type: GraphQLJSON },
    number: { type: GraphQLInt },
    bigNumber: { type: GraphQLBigInt },
    boolean: { type: GraphQLBoolean },
    date: { type: GraphQLString },
    geoPoint: { type: GraphQLString },
    line: { type: GraphQLString },
    lines: { type: GraphQLList(GraphQLString) },
  },
  resolve: (_: null, args: Circle, context: Context) =>
    createCircle(args, context),
  type: new GraphQLObjectType({
    name: 'CreateCirclePayload',
    fields: () => ({
      status: { type: GraphQLString },
      message: { type: GraphQLString },
      createdCircle: {
        type: CircleType,
        resolve: async (response: CreateCircleResponse, context: Context) => {
          if (response.createdDocumentId) {
            return getDocumentById(
              FIRESTORE_COLLECTIONS.CIRCLES,
              response.createdDocumentId,
              context,
            );
          } else {
            return null;
          }
        },
      },
    }),
  }),
};

export default createCircleMutation;

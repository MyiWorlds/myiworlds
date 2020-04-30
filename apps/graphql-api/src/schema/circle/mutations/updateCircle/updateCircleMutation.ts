import CircleType from '../../CircleType';
import getDocumentById from '../../../../services/firebase/firestore/queries/getDocumentById';
import updateDocumentById from '../../../../services/firebase/firestore/mutations/updateDocumentById';
import { Context, UpdateCircleMutation } from '@myiworlds/types';
import { FIRESTORE_COLLECTIONS } from '@myiworlds/enums';
import { UpdateCircleResponse } from './updateCircleTypes';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { GraphQLJSON } = require('graphql-type-json');

import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const GraphQLBigInt = require('graphql-bigint');

const updateCircleMutation = {
  name: 'UpdateCircle',
  args: {
    merge: { type: GraphQLNonNull(GraphQLBoolean) },
    id: { type: GraphQLNonNull(GraphQLString) },
    type: { type: GraphQLString },
    parent: { type: GraphQLString },
    cached: { type: GraphQLBoolean },
    // cache: { type: GraphQLJSON }, // Created by backend
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
    line: { type: GraphQLString },
    lines: { type: GraphQLList(GraphQLString) },
  },
  resolve: (_: null, args: UpdateCircleMutation, context: Context) => {
    const merge = args.merge ? args.merge : false;
    delete args.merge;
    return updateDocumentById(
      {
        ...args,
        collection: FIRESTORE_COLLECTIONS.CIRCLES,
      },
      context,
      merge,
    );
  },
  type: new GraphQLObjectType({
    name: 'UpdateCirclePayload',
    fields: () => ({
      status: { type: GraphQLString },
      message: { type: GraphQLString },
      updatedCircle: {
        type: CircleType,
        resolve: async (response: UpdateCircleResponse, context: Context) => {
          if (response.updatedDocumentId) {
            return getDocumentById(
              FIRESTORE_COLLECTIONS.CIRCLES,
              response.updatedDocumentId,
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

export default updateCircleMutation;

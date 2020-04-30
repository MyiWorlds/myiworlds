import CircleCloneType from '../../CircleCloneType';
import getDocumentsByFilters from '../../../../services/firebase/firestore/queries/getDocumentsByFilters';
import { Context } from '@myiworlds/types';
import { FIRESTORE_COLLECTIONS } from '@myiworlds/enums';
import { GetDocumenByFiltersResponse } from './../../../../services/firebase/firestore/queries/getDocumentsByFilters';
import { GraphQLBoolean } from 'graphql';
import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType,
} from 'graphql';

const getCircleClonesByIdQuery = {
  name: 'GetCircleClonesById',
  args: {
    id: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: (query: null, args: { id: string }, context: Context) =>
    getDocumentsByFilters(
      FIRESTORE_COLLECTIONS.CIRCLES_CLONES,
      [
        {
          property: 'clonedFrom',
          condition: '==',
          value: args.id,
        },
      ],
      {
        property: 'dateUpdated',
        ascending: false,
      },
      20,
      null,
      context,
    ),
  type: new GraphQLObjectType({
    name: 'GetCircleClonesByIdResponse',
    fields: () => ({
      status: { type: GraphQLString },
      hasMoreResults: { type: GraphQLBoolean },
      cursor: { type: GraphQLString },
      clones: {
        type: GraphQLList(CircleCloneType),
        resolve: (response: GetDocumenByFiltersResponse) => response.results,
      },
    }),
  }),
};

export default getCircleClonesByIdQuery;

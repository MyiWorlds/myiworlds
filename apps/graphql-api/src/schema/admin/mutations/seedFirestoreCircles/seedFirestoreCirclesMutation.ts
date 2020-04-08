import CircleType from '../../../circle/CircleType';
import getDocumentsByIds from '../../../../services/firebase/firestore/queries/getDocumentsByIds';
import isSystemAdmin from '../../../user/functions/isSystemAdmin';
import { Context } from '@myiworlds/types';
import { FIRESTORE_COLLECTIONS } from '@myiworlds/enums';
import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { RESPONSE_CODES } from '@myiworlds/enums';
import { seedCircles } from '../../../../services/firebase/firestore/seed/seedCircles';
// import { context as adminContext } from '../../../../services/firebase/firestore/seed/adminContext';

export interface SeedFirestoreCirclesResponse {
  status: string;
  message: string;
  created: string[];
  edited: string[];
}

const seedFirestoreCirclesMutation = {
  name: 'SeedFirestoreCircles',
  resolve: async (_: null, args: {}, context: Context) => {
    if (await isSystemAdmin(context.userId)) {
      return seedCircles();
    } else {
      return {
        status: RESPONSE_CODES.DENIED,
        message: 'You must be a system admin to seed the database.',
        created: [],
        edited: [],
      };
    }
  },
  type: new GraphQLObjectType({
    name: 'SeedFirestoreCirclesPayload',
    fields: () => ({
      status: {
        type: GraphQLString,
      },
      message: {
        type: GraphQLString,
      },
      created: {
        type: new GraphQLList(CircleType),
        resolve: (response: SeedFirestoreCirclesResponse, context: Context) => {
          // resolve: (response: SeedFirestoreCirclesResponse) => {
          if (response.created && response.created.length) {
            if (typeof response.created[0] === 'string') {
              return getDocumentsByIds(
                FIRESTORE_COLLECTIONS.CIRCLES,
                response.created,
                // adminContext,
                context,
              );
            } else {
              return response.created;
            }
          }
          return [];
        },
      },
      edited: {
        type: new GraphQLList(CircleType),
        resolve: (response: SeedFirestoreCirclesResponse, context: Context) => {
          // resolve: (response: SeedFirestoreCirclesResponse) => {
          if (response.edited && response.edited.length) {
            if (typeof response.edited[0] === 'string') {
              return getDocumentsByIds(
                FIRESTORE_COLLECTIONS.CIRCLES,
                response.edited,
                // adminContext,
                context,
              );
            } else {
              return response.edited;
            }
          }
          return [];
        },
      },
    }),
  }),
};

export default seedFirestoreCirclesMutation;

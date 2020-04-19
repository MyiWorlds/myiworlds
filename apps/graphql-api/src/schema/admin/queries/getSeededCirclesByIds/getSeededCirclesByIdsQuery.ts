import CircleType from '../../../circle/CircleType';
import getDocumentsByIds from '../../../../services/firebase/firestore/queries/getDocumentsByIds';
import isSystemAdmin from './../../../user/functions/isSystemAdmin';
import { circlesToCreate } from '../../../../services/firebase/firestore/seed/seedCircles';
import { Context } from '@myiworlds/types';
import { FIRESTORE_COLLECTIONS } from '@myiworlds/enums';
import { GraphQLList } from 'graphql';

const getSeededCirclesByIdsQuery = {
  name: 'GetSeededCirclesByIds',
  type: GraphQLList(CircleType),
  resolve: async (query: null, args: null, context: Context) => {
    if (!(await isSystemAdmin(context.userId))) {
      return [];
    }

    const circleIds: string[] = [];

    circlesToCreate.forEach(circle => {
      if (circle.id) {
        circleIds.push(circle.id);
      }
    });

    return getDocumentsByIds(FIRESTORE_COLLECTIONS.CIRCLES, circleIds, context);
  },
};

export default getSeededCirclesByIdsQuery;

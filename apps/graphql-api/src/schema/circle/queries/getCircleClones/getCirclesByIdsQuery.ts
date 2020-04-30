import CircleType from '../../CircleType';
import { Context } from '@myiworlds/types';
import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';

const getCirclesByIdsQuery = {
  name: 'GetCirclesByIds',
  type: GraphQLList(CircleType),
  args: {
    ids: { type: GraphQLNonNull(GraphQLList(GraphQLString)) },
  },
  resolve: (query: null, args: { ids: string[] }, context: Context) =>
    context.circleLoader.loadMany(args.ids),
};

export default getCirclesByIdsQuery;

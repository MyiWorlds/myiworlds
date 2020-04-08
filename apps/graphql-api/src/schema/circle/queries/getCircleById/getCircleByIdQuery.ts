import CircleType from '../../CircleType';
import getCircleById from './getCircleById';
import { Context } from '@myiworlds/types';
import { GraphQLNonNull, GraphQLString } from 'graphql';

const getCircleByIdQuery = {
  name: 'GetCircleById',
  type: CircleType,
  args: {
    id: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: (query: null, args: { id: string }, context: Context) =>
    getCircleById(args.id, context),
};

export default getCircleByIdQuery;

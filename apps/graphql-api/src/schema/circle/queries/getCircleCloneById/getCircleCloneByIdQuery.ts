import CircleCloneType from '../../CircleCloneType';
import getCircleCloneById from './getCircleCloneById';
import { Context } from '@myiworlds/types';
import { GraphQLNonNull, GraphQLString } from 'graphql';

const getCircleCloneByIdQuery = {
  name: 'GetCircleCloneById',
  type: CircleCloneType,
  args: {
    id: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: (query: null, args: { id: string }, context: Context) =>
    getCircleCloneById(args.id, context),
};

export default getCircleCloneByIdQuery;

import getProfileCloneById from './getProfileCloneById';
import ProfileCloneType from '../../ProfileCloneType';
import { Context } from '@myiworlds/types';
import { GraphQLNonNull, GraphQLString } from 'graphql';

const getProfileCloneByIdQuery = {
  name: 'GetProfileCloneById',
  type: ProfileCloneType,
  args: {
    id: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: (query: null, args: { id: string }, context: Context) =>
    getProfileCloneById(args.id, context),
};

export default getProfileCloneByIdQuery;

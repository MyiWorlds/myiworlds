import getPublicProfileById from './getPublicProfileById';
import PublicProfileType from '../../PublicProfileType';
import { Context } from '@myiworlds/types';
import { GraphQLNonNull, GraphQLString } from 'graphql';

const getPublicProfileByIdQuery = {
  name: 'GetPublicProfileById',
  type: PublicProfileType,
  args: {
    id: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: (query: null, args: { id: string }, context: Context) =>
    getPublicProfileById(args.id, context),
};

export default getPublicProfileByIdQuery;

import PublicProfileType from '../../PublicProfileType';
import { Context } from '@myiworlds/types';
import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';

const getPublicProfilesByIdsQuery = {
  name: 'GetPublicProfilesByIds',
  type: GraphQLList(PublicProfileType),
  args: {
    ids: { type: GraphQLNonNull(GraphQLList(GraphQLString)) },
  },
  resolve: (query: null, args: { ids: string[] }, context: Context) =>
    context.profileLoader.loadMany(args.ids),
};

export default getPublicProfilesByIdsQuery;

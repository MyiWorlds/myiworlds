import getProfileById from './getProfileById';
import ProfileType from '../../ProfileType';
import { Context } from '@myiworlds/types';
import { GraphQLNonNull, GraphQLString } from 'graphql';

const getProfileByIdQuery = {
  name: 'GetProfileById',
  type: ProfileType,
  args: {
    id: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: (query: null, args: { id: string }, context: Context) =>
    getProfileById(args.id, context),
};

export default getProfileByIdQuery;

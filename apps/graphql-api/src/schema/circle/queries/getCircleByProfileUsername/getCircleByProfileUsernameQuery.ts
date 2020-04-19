import CircleType from '../../CircleType';
import getCircleByProfileUsername from './getCircleByProfileUsername';
import { Context } from '@myiworlds/types';
import { GraphQLNonNull, GraphQLString } from 'graphql';

const getCircleByProfileUsernameQuery = {
  name: 'GetCircleByUsername',
  type: CircleType,
  args: {
    username: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: (
    query: null,
    args: {
      username: string;
    },
    context: Context,
  ) => getCircleByProfileUsername(args.username, context),
};

export default getCircleByProfileUsernameQuery;

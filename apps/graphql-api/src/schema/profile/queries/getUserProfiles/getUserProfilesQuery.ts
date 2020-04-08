import getUserProfiles from './getUserProfiles';
import ProfileType from './../../ProfileType';
import { Context } from '@myiworlds/types';
import { GraphQLList } from 'graphql';

const getUserProfilesQuery = {
  name: 'GetUserProfiles',
  type: GraphQLList(ProfileType),
  resolve: (query: null, args: {}, context: Context) =>
    getUserProfiles(context.userId),
};

export default getUserProfilesQuery;

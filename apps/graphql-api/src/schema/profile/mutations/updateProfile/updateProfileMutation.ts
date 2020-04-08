import getDocumentById from '../../../../services/firebase/firestore/queries/getDocumentById';
import ProfileType from './../../ProfileType';
import updateProfile from './updateProfile';
import { Context } from '@myiworlds/types';
import { FIRESTORE_COLLECTIONS } from '@myiworlds/enums';
import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UpdateProfileResponse } from './updateProfileTypes.d';

/*
  After a profile has been created you would be editing the circles
  it has attached to it directly.  Not through the profile.
  This is only the things a User wants to update on the profile itself
*/

const updateProfileMutation = {
  name: 'UpdateProfile',
  args: {
    id: { type: GraphQLNonNull(GraphQLString) },
    username: { type: GraphQLString },
  },
  resolve: (
    _: null,
    args: { id: string; username: string },
    context: Context,
  ) =>
    updateProfile(
      {
        id: args.id,
        username: args.username,
      },
      context,
    ),
  type: new GraphQLObjectType({
    name: 'UpdateProfilePayload',
    fields: () => ({
      status: { type: GraphQLString },
      message: { type: GraphQLString },
      updatedProfile: {
        type: ProfileType,
        resolve: async (response: UpdateProfileResponse, context: Context) => {
          if (response.updatedDocumentId) {
            return getDocumentById(
              FIRESTORE_COLLECTIONS.PROFILES,
              response.updatedDocumentId,
              context,
            );
          } else {
            return null;
          }
        },
      },
    }),
  }),
};

export default updateProfileMutation;

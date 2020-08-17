import getDocumentById from '../../../../services/firebase/firestore/queries/getDocumentById';
import ProfileType from './../../ProfileType';
import updateDocumentById from '../../../../services/firebase/firestore/mutations/updateDocumentById';
import { Context, UserProfileData } from '@myiworlds/types';
import { FIRESTORE_COLLECTIONS } from '@myiworlds/enums';
import { UpdateProfileResponse } from './updateProfileTypes.d';
import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const GraphQLBigInt = require('graphql-bigint');
/*
  After a profile has been created you would be editing the circles
  it has attached to it directly.  Not through the profile.
  This is only the things a User wants to update on the profile itself
*/

interface UpdateProfileMutation extends UserProfileData {
  merge: boolean;
}

const updateProfileMutation = {
  name: 'UpdateProfile',
  args: {
    merge: { type: GraphQLNonNull(GraphQLBoolean) },
    id: { type: GraphQLNonNull(GraphQLString) },
    username: { type: GraphQLString },
    dateCreated: { type: GraphQLBigInt },
    dateUpdated: { type: GraphQLBigInt },
    addToHistory: { type: GraphQLBoolean },
    home: { type: GraphQLString },
    history: { type: GraphQLString },
    overrideCircleUIs: { type: GraphQLBoolean },
    userId: { type: GraphQLString },
    media: { type: GraphQLString },
    theme: { type: GraphQLString },
    rating: { type: GraphQLString },
    following: { type: GraphQLString },
    level: { type: GraphQLString },
    publicHome: { type: GraphQLString },
    circleUis: { type: GraphQLString },
  },
  resolve: (_: null, args: UpdateProfileMutation, context: Context) =>
    updateDocumentById(
      {
        ...args,
        collection: FIRESTORE_COLLECTIONS.PROFILES,
      },
      context,
      args.merge,
      context.addToHistory,
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

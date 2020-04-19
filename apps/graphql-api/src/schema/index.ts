import copyCircleMutation from './circle/mutations/copyCircle/copyCircleMutation';
import createCircleMutation from './circle/mutations/createCircle/createCircleMutation';
import createProfileMutation from './profile/mutations/createProfile/createProfileMutation';
import createServiceKeysMutation from './admin/mutations/createServiceKeys/createServiceKeysMutation';
import createUserMutation from './user/mutations/createUser/createUserMutation';
import deleteUserMutation from './user/mutations/deleteUser/deleteUserMutation';
import getCircleByIdQuery from './circle/queries/getCircleById/getCircleByIdQuery';
import getCircleByProfileUsernameQuery from './circle/queries/getCircleByProfileUsername/getCircleByProfileUsernameQuery';
import getCircleCloneByIdQuery from './circle/queries/getCircleCloneById/getCircleCloneByIdQuery';
import getProfileByIdQuery from './profile/queries/getProfileById/getProfileByIdQuery';
import getProfileByUsernameQuery from './profile/queries/getProfileByUsername/getProfileByUsernameQuery';
import getProfileCloneByIdQuery from './profile/queries/getProfileCloneById/getProfileCloneByIdQuery';
import getPublicProfileByIdQuery from './profile/queries/getPublicProfileById/getPublicProfileByIdQuery';
import getSeededCirclesByIdsQuery from './admin/queries/getSeededCirclesByIds/getSeededCirclesByIdsQuery';
import getUserByIdQuery from './user/queries/getUserById/getUserByIdQuery';
import getUserProfilesQuery from './profile/queries/getUserProfiles/getUserProfilesQuery';
import seedFirestoreCirclesMutation from './admin/mutations/seedFirestoreCircles/seedFirestoreCirclesMutation';
import updateCircleMutation from './circle/mutations/updateCircle/updateCircleMutation';
import updateProfileMutation from './profile/mutations/updateProfile/updateProfileMutation';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      getSeededCirclesByIds: getSeededCirclesByIdsQuery,
      getUserById: getUserByIdQuery,
      getCircleById: getCircleByIdQuery,
      getCircleCloneById: getCircleCloneByIdQuery,
      getCircleByProfileUsername: getCircleByProfileUsernameQuery,
      getProfileById: getProfileByIdQuery,
      getPublicProfileById: getPublicProfileByIdQuery,
      getProfileCloneById: getProfileCloneByIdQuery,
      getProfileByUsername: getProfileByUsernameQuery,
      getUserProfiles: getUserProfilesQuery,
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      seedFirestoreCircles: seedFirestoreCirclesMutation,
      createServiceKeys: createServiceKeysMutation,
      createUser: createUserMutation,
      deleteUser: deleteUserMutation,
      createProfile: createProfileMutation,
      updateProfile: updateProfileMutation,
      copyCircle: copyCircleMutation,
      createCircle: createCircleMutation,
      updateCircle: updateCircleMutation,
    },
  }),
});

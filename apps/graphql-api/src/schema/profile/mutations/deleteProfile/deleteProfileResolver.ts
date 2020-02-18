import deleteProfile from './deleteProfile';
import { Context, ResolverMap } from '@myiworlds/types';
import { IDeleteProfileResponse } from './deleteProfileTypes';

const deleteProfileResolver: ResolverMap = {
  Mutation: {
    deleteProfile: async (
      _: null,
      args: {
        id: string;
      },
      context: Context
    ) => deleteProfile(args.id, context)
  },
  DeleteProfileResponse: {
    status: (response: IDeleteProfileResponse) => response.status,
    message: (response: IDeleteProfileResponse) => response.message,
    profileIdToDelete: (response: IDeleteProfileResponse) =>
      response.profileIdToDelete,
    profileDeleted: (response: IDeleteProfileResponse) =>
      response.profileDeleted,
    numberOfPiiCircles: (response: IDeleteProfileResponse) =>
      response.numberOfPiiCircles,
    piiCirclesDeleted: (response: IDeleteProfileResponse) =>
      response.piiCirclesDeleted,
    numberOfPiiCircleClones: (response: IDeleteProfileResponse) =>
      response.numberOfPiiCircleClones,
    piiCircleClonesDeleted: (response: IDeleteProfileResponse) =>
      response.piiCircleClonesDeleted,
    numberOfAppCreatedCirclesForProfile: (response: IDeleteProfileResponse) =>
      response.numberOfAppCreatedCirclesForProfile,
    appCreatedCirclesForProfileDeleted: (response: IDeleteProfileResponse) =>
      response.appCreatedCirclesForProfileDeleted,
    numberOfAppCreatedCircleClonesForProfile: (
      response: IDeleteProfileResponse
    ) => response.numberOfAppCreatedCircleClonesForProfile,
    appCreatedCircleClonesForProfileDeleted: (
      response: IDeleteProfileResponse
    ) => response.appCreatedCircleClonesForProfileDeleted
  }
};

export default deleteProfileResolver;

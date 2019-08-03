import { firestore, stackdriver } from '@myiworlds/cloud-services';
import { isAllowedUsername } from '../../mutations/shared/isAllowedUsername';
import { ResolverMap } from '@myiworlds/types';

interface Response {
  usernameAvailable: boolean;
  usernameInvalid: boolean;
}

export const resolvers: ResolverMap = {
  Query: {
    getProfileByUsername: async (_: null, args: { username: string }) => {
      const username = args.username.toLowerCase();

      if (!isAllowedUsername(username)) {
        const response: Response = {
          usernameAvailable: false,
          usernameInvalid: true,
        };
        return response;
      }

      try {
        const checkIfUsernameIsTaken = await firestore
          .collection('profiles')
          .where('username', '==', username)
          .limit(1)
          .get()
          .then((response: any) => {
            return response.docs;
          });

        if (checkIfUsernameIsTaken.length) {
          const response: Response = {
            usernameAvailable: false,
            usernameInvalid: false,
          };
          return response;
        } else {
          const response: Response = {
            usernameAvailable: true,
            usernameInvalid: false,
          };
          return response;
        }
      } catch (error) {
        stackdriver.report(error);
        const response: Response = {
          usernameAvailable: false,
          usernameInvalid: false,
        };
        return response;
      }
    },
  },
};

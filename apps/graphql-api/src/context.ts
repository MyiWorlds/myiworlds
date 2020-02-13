import * as cookie from 'cookie';
import getUserId from './services/firebase/authentication/getUserId';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';

const Context = async (req: ExpressContext['req']) => {
  try {
    const cookies = cookie.parse(
      req.headers.cookies ? req.headers.cookies.toString() : '',
    );
    let selectedProfileId = null;

    const userId = async () => {
      const decodedUserId = await getUserId(cookies.token);
      const userIdFromClient = cookies.userId;
      const decodedUserIdIsSameAsClientId = decodedUserId === userIdFromClient;
      let usersId = null;

      if (decodedUserIdIsSameAsClientId) {
        usersId = decodedUserId;
      }
      return usersId;
    };

    if (userId && cookies.selectedProfileId) {
      selectedProfileId = cookies.selectedProfileId;
    }

    const context = {
      userId,
      selectedProfileId,
    };

    return context;
  } catch (error) {
    console.error('Context had an error', '\n', error);
    return null;
  }
};

export default Context;

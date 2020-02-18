import * as cookie from 'cookie';
import DataLoader from 'dataloader';
import getDocumentsByIds from './services/firebase/firestore/queries/getDocumentsByIds';
import getUserId from './services/firebase/authentication/getUserId';
import { Context } from '@myiworlds/types';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { stackdriver } from '@myiworlds/services';

const Context = async (req: ExpressContext['req']) => {
  try {
    const cookies = cookie.parse(
      req.headers.cookies ? req.headers.cookies.toString() : '',
    );
    let selectedProfileId = null;
    let profileHistoryId = null;
    const decodedUserId = await getUserId(cookies.token);
    const userIdFromClient = cookies.userId;
    const decodedUserIdIsSameAsClientId = decodedUserId === userIdFromClient;
    let userId = null;

    if (decodedUserIdIsSameAsClientId) {
      userId = decodedUserId;
    }

    if (
      userId &&
      cookies.selectedProfileId &&
      cookies.selectedProfileId !== ''
    ) {
      selectedProfileId = cookies.selectedProfileId;
      profileHistoryId = cookies.profileHistoryId;
    }

    const context: Context = {
      userId,
      selectedProfileId,
      addToHistory: userId && cookies.addToHistory ? true : false,
      profileHistoryId,

      // Data loaders
      circleLoader: new DataLoader(async (keys: string[]) =>
        getDocumentsByIds('circles', keys, context, false)
      ),
      profileLoader: new DataLoader(async (keys: string[]) =>
        getDocumentsByIds('profiles', keys, context, false)
      )
    };

    return context;
  } catch (error) {
    stackdriver.report(`Context had an error', '\n', ${error}`);
    return null;
  }
};

export default Context;

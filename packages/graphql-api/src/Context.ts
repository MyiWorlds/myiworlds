import cookie from 'cookie';
import DataLoader from 'dataloader';
import getUserId from './services/firebase/authentication/getUserId';
import { firestore, stackdriver } from '@myiworlds/cloud-services';
import { getDocumentsByIds } from './services/firebase/firestore/queries';

const Context = async (req: any) => {
  const cookies = cookie.parse(req.headers.cookie);

  const profileHistoryId =
    req.headers['profile-history-id'] !== 'null' || '' || 'guest'
      ? req.headers['profile-history-id']
      : null;
  const addToHistory = req.headers['add-to-history'] === 'true' ? true : false;
  const selectedProfileId =
    req.headers['selected-profile-id'] !== 'null' || ''
      ? req.headers['selected-profile-id']
      : null;

  const headers = {
    validated: false,
    userId: await getUserId(cookies.token),
    queriedUserId: req.headers['user-id'],
    selectedProfileId,
    addToHistory,
    profileHistoryId,
  };

  if (headers.userId) {
    let userId = null;
    try {
      const userExists = await firestore.doc(`users/${headers.userId}`).get();
      if (userExists) {
        userId = userExists.id;
      }
    } catch (error) {
      stackdriver.report('Error seeing if User exists in Context', error);
    }

    headers.queriedUserId = userId ? userId : null;
  }

  if (headers.userId === headers.queriedUserId) {
    headers.validated = true;
  } else {
    headers.userId = null;
    headers.queriedUserId = null;
    headers.selectedProfileId = null;
    headers.profileHistoryId = null;
  }

  const context = {
    ...headers,
    circleLoader: new DataLoader(async (keys: string[]) =>
      getDocumentsByIds('circles', keys, headers, false),
    ),
    profileLoader: new DataLoader(async (keys: string[]) =>
      getDocumentsByIds('profiles', keys, headers, false),
    ),
  };

  return context;
};

export default Context;

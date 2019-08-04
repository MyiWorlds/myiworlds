import DataLoader from 'dataloader';
import getUserId from './services/firebase/authentication/getUserId';
import { firestore } from '@myiworlds/cloud-services';
import { getDocumentsByIds } from './services/firebase/firestore/queries';

const Context = async (req: any) => {
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
    userId: await getUserId(req.headers.token),
    queriedUserId: req.headers['user-id'],
    selectedProfileId,
    addToHistory,
    profileHistoryId,
  };

  if (
    headers.userId &&
    (headers.queriedUserId === 'null' || headers.queriedUserId === '')
  ) {
    const user = await firestore
      .doc(`users/${headers.userId}`)
      .get()
      .then((result: any) => result.data());

    headers.queriedUserId = user ? user.id : null;
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

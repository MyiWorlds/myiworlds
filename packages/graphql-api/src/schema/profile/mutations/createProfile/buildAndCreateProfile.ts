import isUsernameTaken from '../shared/isUsernameTaken';
import { Context } from '@myiworlds/types';
import { firestore, stackdriver } from '@myiworlds/cloud-services';
import { isAllowedUsername } from '../shared/isAllowedUsername';
import {
  updateDocumentById,
  createDocument,
} from '../../../../services/firebase/firestore/mutations';

interface Response {
  status: string;
  message: string;
  createdDocumentId: string | null;
}

// This should be in a cloud function
export default async function buildAndCreateProfile(
  username: string,
  context: Context,
  systemCreateOverride?: boolean,
) {
  if (!systemCreateOverride) {
    username = username.toLowerCase();
  }

  if (!isAllowedUsername(username) && !systemCreateOverride) {
    const isNotAllowedUsernameResponse: Response = {
      status: 'DENIED',
      message:
        'I am sorry, I can not let you use that username.  Please try another',
      createdDocumentId: null,
    };
    return isNotAllowedUsernameResponse;
  }

  try {
    if (await isUsernameTaken(username)) {
      const usernameTakenResponse: Response = {
        status: 'DENIED',
        message: 'I am sorry, that username is already taken',
        createdDocumentId: null,
      };
      return usernameTakenResponse;
    }

    const profileId = systemCreateOverride
      ? username
      : firestore.collection('profiles').doc().id;

    const profile = {
      id: profileId,
      collection: 'profiles',
      public: true,
      username,
      canCreate: true,
      isDarkTheme: true,
      overrideCircleTypes: false,
      addToHistory: true,
      dateCreated: Date.now(),
      dateUpdated: Date.now(),
    };

    // I must create username outside of create document and share the logic
    // Because it requires profile username which could not be on a user yet
    // if they have no profiles/logged into that profile atm
    await firestore
      .collection(profile.collection)
      .doc(profile.id)
      .set(profile);

    // Use the newly created profileId as the profile that creates the following
    context.selectedProfileId = profile.id;

    const level = await createDocument(
      {
        public: true,
        collection: 'circles',
        type: 'LINES',
        creator: 'APP',
        owner: 'APP',
        editors: [profile.id],
        data: {},
      },
      context,
    );

    const rating = await createDocument(
      {
        collection: 'circles',
        type: 'LINES_TOTALED',
        creator: 'APP',
        owner: 'APP',
        editors: [profile.id],
        lines: [],
      },
      context,
    );

    const circleTypeOverrides = await createDocument(
      {
        collection: 'circles',
        type: 'LINES',
        creator: 'APP',
        owner: 'APP',
        editors: [profile.id],
        lines: [],
      },
      context,
    );

    const myTheme = await createDocument(
      {
        collection: 'circles',
        title: 'My Theme',
        description:
          'The theme that this profile uses to interact with the application.',
        type: 'DATA',
        creator: 'APP',
        owner: 'APP',
        editors: [profile.id],
        data: {
          palette: {
            primary: {
              main: '#2196F3',
            },
            secondary: {
              main: '#f44336',
            },
          },
        },
      },
      context,
    );

    const homePublic = await createDocument(
      {
        public: true,
        collection: 'circles',
        type: 'LINES',
        creator: 'APP',
        owner: 'APP',
        editors: [profile.id],
        lines: [],
      },
      context,
    );

    const home = await createDocument(
      {
        public: false,
        pii: true,
        collection: 'circles',
        type: 'LINES',
        creator: 'APP',
        owner: 'APP',
        editors: [profile.id],
        lines: [],
      },
      context,
    );

    const following = await createDocument(
      {
        public: true,
        collection: 'circles',
        type: 'LINES',
        creator: 'APP',
        owner: 'APP',
        editors: [profile.id],
        lines: [],
      },
      context,
    );

    const historyRef = firestore.collection('circles').doc();
    const historyId = historyRef.id;

    const history = await createDocument(
      {
        id: historyId,
        public: true,
        collection: 'circles',
        type: 'GET_INTERFACED_CIRCLES_BY_FILTERS',
        data: {
          cursor: null,
          filters: [
            {
              condition: '==',
              property: 'parent',
              value: historyId,
            },
          ],
          numberOfResults: 12,
          orderBy: {
            property: 'dateCreated',
            ascending: false,
          },
        },
        creator: 'APP',
        owner: 'APP',
        editors: [profile.id],
        title: 'My History',
        description:
          'The history of what I have done on the platform.  This can be turned on/off through the profile controls.',
      },
      context,
    );

    const updatedProfile = {
      id: profile.id,
      collection: 'profiles',
      profileMedia: '',
      level: level.createdDocumentId,
      rating: rating.createdDocumentId,
      circleTypeOverrides: circleTypeOverrides.createdDocumentId,
      myTheme: myTheme.createdDocumentId,
      homePublic: homePublic.createdDocumentId,
      home: home.createdDocumentId,
      following: following.createdDocumentId,
      history: history.createdDocumentId,
    };

    await updateDocumentById(updatedProfile, context, true, false);

    const user = await firestore
      .collection('users')
      .doc(context.userId)
      .get()
      .then((res: any) => res.data());

    const updatedUser = {
      id: context.userId,
      collection: 'users',
      profiles:
        user.profiles && user.profiles.length
          ? [...user.profiles, profile.id]
          : [profile.id],
    };

    await updateDocumentById(updatedUser, context, true);

    const response: Response = {
      status: 'SUCCESS',
      message: 'I created that profile for you',
      createdDocumentId: profile.id,
    };
    return response;
  } catch (error) {
    stackdriver.report(error);
    throw error;
  }
}

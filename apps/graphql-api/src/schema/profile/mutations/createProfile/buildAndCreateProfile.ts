import copyCircle from '../../../circle/mutations/copyCircle/copyCircle';
import isUsernameTaken from '../shared/isUsernameTaken';
import { Context, UserProfileData } from '@myiworlds/types';
import { createCollectionId } from './../../../../services/firebase/firestore/functions/createCollectionId';
import { CreateProfileResponse } from './createProfileTypes.d';
import { firestore } from 'firebase-admin';
import { FIRESTORE_COLLECTIONS, RESPONSE_CODES } from '@myiworlds/enums';
import { firestoreAdmin, stackdriver } from '@myiworlds/services';
import { isAllowedUsername } from '../shared/isAllowedUsername';
import { ProfileFactory } from '@myiworlds/factories';
import { updateDocumentById } from '../../../../services/firebase/firestore/mutations';

export default async function buildAndCreateProfile(
  username: string,
  context: Context,
  systemCreateOverride?: boolean,
) {
  const response: CreateProfileResponse = {
    status: '',
    message: '',
    createdDocumentId: null,
  };

  if (!context.userId) {
    response.status = RESPONSE_CODES.DENIED;
    response.message =
      'I was given no user id, it is required to create a profile.';
    return response;
  }

  if (!systemCreateOverride) {
    username = username.toLowerCase();
  }

  if (!isAllowedUsername(username) && !systemCreateOverride) {
    response.status = RESPONSE_CODES.DENIED;
    response.message =
      'I am sorry, I can not let you use that username.  Please try another';
    return response;
  }

  try {
    if (await isUsernameTaken(username)) {
      response.status = RESPONSE_CODES.DENIED;
      response.message = 'I am sorry, that username is already taken';
      return response;
    }

    const profileId = systemCreateOverride
      ? username
      : createCollectionId(FIRESTORE_COLLECTIONS.PROFILES);

    const profile = new ProfileFactory().use('PROFILE').createWithValues({
      id: profileId,
      username,
      userId: context.userId,
    });

    // I must create username outside of create document and share the logic
    // Because it requires profile username which could not be on a user yet
    // if they have no profiles/logged into that profile atm
    await firestoreAdmin
      .collection(FIRESTORE_COLLECTIONS.PROFILES)
      .doc(profile.id)
      .set(profile);

    // Use the newly created profileId as the profile that creates the following
    const updatedContext: Context = {
      ...context,
      selectedProfileId: profile.id,
    };

    const rating = await copyCircle(
      'rating',
      FIRESTORE_COLLECTIONS.CIRCLES,
      updatedContext,
    );
    const history = await copyCircle(
      'history',
      FIRESTORE_COLLECTIONS.CIRCLES,
      updatedContext,
    );
    const level = await copyCircle(
      'level',
      FIRESTORE_COLLECTIONS.CIRCLES,
      updatedContext,
    );
    const theme = await copyCircle(
      'theme',
      FIRESTORE_COLLECTIONS.CIRCLES,
      updatedContext,
    );
    const following = await copyCircle(
      'following',
      FIRESTORE_COLLECTIONS.CIRCLES,
      updatedContext,
    );
    const circleUis = await copyCircle(
      'circle-uis',
      FIRESTORE_COLLECTIONS.CIRCLES,
      updatedContext,
    );
    const home = await copyCircle(
      'home',
      FIRESTORE_COLLECTIONS.CIRCLES,
      updatedContext,
    );
    const publicHome = await copyCircle(
      'public-home',
      FIRESTORE_COLLECTIONS.CIRCLES,
      updatedContext,
    );
    const defaultProfileMedia = await copyCircle(
      'default-profile-media',
      FIRESTORE_COLLECTIONS.CIRCLES,
      updatedContext,
    );

    if (
      rating &&
      rating.createdDocumentId &&
      history &&
      history.createdDocumentId &&
      level &&
      level.createdDocumentId &&
      theme &&
      theme.createdDocumentId &&
      following &&
      following.createdDocumentId &&
      circleUis &&
      circleUis.createdDocumentId &&
      home &&
      home.createdDocumentId &&
      publicHome &&
      publicHome.createdDocumentId &&
      defaultProfileMedia &&
      defaultProfileMedia.createdDocumentId
    ) {
      const updatedProfile: UserProfileData = {
        id: profile.id,
        collection: FIRESTORE_COLLECTIONS.PROFILES,
        username,
        userId: context.userId,
        media: 'default-profile-media',
        level: level.createdDocumentId,
        rating: rating.createdDocumentId,
        circleUis: circleUis.createdDocumentId,
        theme: theme.createdDocumentId,
        publicHome: publicHome.createdDocumentId,
        home: home.createdDocumentId,
        following: following.createdDocumentId,
        history: history.createdDocumentId,
      };

      await updateDocumentById(updatedProfile, updatedContext, true, false);

      firestoreAdmin
        .collection(FIRESTORE_COLLECTIONS.USERS)
        .doc(context.userId)
        .update({
          profiles: firestore.FieldValue.arrayUnion(profile.id),
        });

      response.status = RESPONSE_CODES.SUCCESS;
      response.message = 'I created that profile for you.';
      response.createdDocumentId = updatedProfile.id;
      return response;
    } else {
      if (rating && rating.createdDocumentId) {
        firestoreAdmin
          .collection(FIRESTORE_COLLECTIONS.PROFILES)
          .doc(rating.createdDocumentId)
          .delete()
          .then(() => {
            console.log('rating deleted');
          })
          .catch(error => {
            stackdriver.report(error);
          });
      }
      if (history && history.createdDocumentId) {
        firestoreAdmin
          .collection(FIRESTORE_COLLECTIONS.PROFILES)
          .doc(history.createdDocumentId)
          .delete()
          .then(() => {
            console.log('history deleted');
          })
          .catch(error => {
            stackdriver.report(error);
          });
      }
      if (level && level.createdDocumentId) {
        firestoreAdmin
          .collection(FIRESTORE_COLLECTIONS.PROFILES)
          .doc(level.createdDocumentId)
          .delete()
          .then(() => {
            console.log('level deleted');
          })
          .catch(error => {
            stackdriver.report(error);
          });
      }
      if (theme && theme.createdDocumentId) {
        firestoreAdmin
          .collection(FIRESTORE_COLLECTIONS.PROFILES)
          .doc(theme.createdDocumentId)
          .delete()
          .then(() => {
            console.log('theme deleted');
          })
          .catch(error => {
            stackdriver.report(error);
          });
      }
      if (following && following.createdDocumentId) {
        firestoreAdmin
          .collection(FIRESTORE_COLLECTIONS.PROFILES)
          .doc(following.createdDocumentId)
          .delete()
          .then(() => {
            console.log('following deleted');
          })
          .catch(error => {
            stackdriver.report(error);
          });
      }
      if (circleUis && circleUis.createdDocumentId) {
        firestoreAdmin
          .collection(FIRESTORE_COLLECTIONS.PROFILES)
          .doc(circleUis.createdDocumentId)
          .delete()
          .then(() => {
            console.log('circleUis deleted');
          })
          .catch(error => {
            stackdriver.report(error);
          });
      }
      if (home && home.createdDocumentId) {
        firestoreAdmin
          .collection(FIRESTORE_COLLECTIONS.PROFILES)
          .doc(home.createdDocumentId)
          .delete()
          .then(() => {
            console.log('home deleted');
          })
          .catch(error => {
            stackdriver.report(error);
          });
      }
      if (publicHome && publicHome.createdDocumentId) {
        firestoreAdmin
          .collection(FIRESTORE_COLLECTIONS.PROFILES)
          .doc(publicHome.createdDocumentId)
          .delete()
          .then(() => {
            console.log('publicHome deleted');
          })
          .catch(error => {
            stackdriver.report(error);
          });
      }
      if (defaultProfileMedia && defaultProfileMedia.createdDocumentId) {
        firestoreAdmin
          .collection(FIRESTORE_COLLECTIONS.PROFILES)
          .doc(defaultProfileMedia.createdDocumentId)
          .delete()
          .then(() => {
            console.log('defaultProfileMedia deleted');
          })
          .catch(error => {
            stackdriver.report(error);
          });
      }

      firestoreAdmin
        .collection(FIRESTORE_COLLECTIONS.PROFILES)
        .doc(profile.id)
        .delete()
        .then(() => {
          console.log('defaultProfileMedia deleted');
        })
        .catch(error => {
          stackdriver.report(error);
        });

      response.status = RESPONSE_CODES.ERROR;
      response.message =
        'There was an error creating one or more of the circles on the profile.  Everything was undone, please try again.';
      return response;
    }
  } catch (error) {
    stackdriver.report(error);
    response.status = RESPONSE_CODES.ERROR;
    response.message =
      'I am sorry there was an error creating your profile.  Please try again.';
    return response;
  }
}

import buildAndCreateProfile from '../../../../schema/profile/mutations/createProfile/buildAndCreateProfile';
import createUser from '../../../../schema/user/mutations/createUser/createUser';
import profile from './../../../../schema/profile/seed/profile';
import user from '../../../../schema/user/seed/user';
import { firestore, stackdriver } from '@myiworlds/cloud-services';
import { updateDocumentById } from '../mutations';

async function theCreationStory() {
  const context = {
    userId: user.id,
    queriedUserId: user.id,
    selectedProfileId: '',
    validated: true,
    addToHistory: false,
    profileHistoryId: '',
  };

  const userExists = await firestore
    .collection('users')
    .doc(user.id)
    .get()
    .then((res: any) => res.data());

  try {
    if (userExists) {
      await updateDocumentById(user, context, true, false);
    } else {
      await createUser(user.id, user.email, context);
      await buildAndCreateProfile(profile.username, context, true);
    }
  } catch (error) {
    stackdriver.report(error);
  }
}

theCreationStory();

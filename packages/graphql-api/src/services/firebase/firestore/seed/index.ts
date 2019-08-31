import buildAndCreateProfile from '../../../../schema/profile/mutations/createProfile/buildAndCreateProfile';
import createUser from '../../../../schema/user/mutations/createUser/createUser';
import profile from './profiles/profiles';
import systemCreator from './users/systemCreator';
import { firestore, stackdriver } from '@myiworlds/cloud-services';
import { updateDocumentById } from '../mutations';

async function theCreationStory() {
  const context = {
    userId: systemCreator.id,
    queriedUserId: systemCreator.id,
    selectedProfileId: '',
    validated: true,
    addToHistory: false,
    profileHistoryId: '',
  };

  const userExists = await firestore
    .collection('users')
    .doc(systemCreator.id)
    .get()
    .then((res: any) => res.data());

  try {
    if (userExists) {
      await updateDocumentById(systemCreator, context, true, false);
    } else {
      await createUser(systemCreator.id, systemCreator.email, context);
      await buildAndCreateProfile(profile.username, context, true);
    }
  } catch (error) {
    stackdriver.report(error);
  }
}

theCreationStory();

import * as firebase from 'firebase-admin';
import { googleCloudServiceAccount } from '@myiworlds/credentials';

firebase.initializeApp({
  credential: firebase.credential.cert({
    projectId: googleCloudServiceAccount.project_id,
    clientEmail: googleCloudServiceAccount.client_email,
    privateKey: googleCloudServiceAccount.private_key,
  }),
});

export default firebase;

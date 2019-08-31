import * as firebaseAdmin from 'firebase-admin';
import { googleCloudServiceAccount } from '@myiworlds/credentials';

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert({
    projectId: googleCloudServiceAccount.project_id,
    clientEmail: googleCloudServiceAccount.client_email,
    privateKey: googleCloudServiceAccount.private_key,
  }),
});

export default firebaseAdmin;

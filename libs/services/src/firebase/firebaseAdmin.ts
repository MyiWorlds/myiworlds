import * as firebaseAdmin from 'firebase-admin';
import { firebaseServerAdminServiceAccount } from '@myiworlds/credentials';

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert({
    projectId: firebaseServerAdminServiceAccount.project_id,
    clientEmail: firebaseServerAdminServiceAccount.client_email,
    privateKey: firebaseServerAdminServiceAccount.private_key,
  }),
});

export default firebaseAdmin;

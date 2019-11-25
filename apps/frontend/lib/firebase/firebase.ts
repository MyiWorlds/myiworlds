import firebase from 'firebase/app';
import { firebaseConfig } from '@myiworlds/credentials';

try {
  firebase.initializeApp(firebaseConfig);
} catch (error) {
  // we skip the "already exists" message which is
  // not an actual error when we're hot-reloading
  if (!/already exists/.test(error.message)) {
    console.error('Firebase initialization error', error.stack);
  }
}

export default firebase;

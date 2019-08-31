import firebase from 'firebase/app';
import { firebaseConfig } from '@myiworlds/credentials';
import 'firebase/auth';
import 'firebase/firestore';

try {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  // we skip the "already exists" message which is
  // not an actual error when we're hot-reloading
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}

const firestore = firebase.firestore();

export { firebase, firestore };

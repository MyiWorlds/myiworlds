import firestoreAdmin from './firebaseAdmin';

const firestore = firestoreAdmin.firestore();

const settings = {
  timestampsInSnapshots: true,
};

firestore.settings(settings);

export default firestore;

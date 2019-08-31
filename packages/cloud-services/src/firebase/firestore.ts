import firebaseAdmin from './firebaseAdmin';

const firestore = firebaseAdmin.firestore();

const settings = {
  timestampsInSnapshots: true,
};

firestore.settings(settings);

export default firestore;

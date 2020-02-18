import { FIRESTORE_COLLECTIONS } from '../../enums/src/firestoreCollections';

export interface PublicProfile {
  id: string;
  collection: FIRESTORE_COLLECTIONS.PROFILES;
  username?: string;
  dateCreated?: number;
  dateUpdated?: number;
  theme?: string;
  publicProfile?: string;
}

export interface Profile extends PublicProfile {
  addToHistory: string;
  home: string;
  history: string;
}

export interface PublicProfileClone extends PublicProfile {
  collection: FIRESTORE_COLLECTIONS.PROFILES_CLONES;
}

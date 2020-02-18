import { FIRESTORE_COLLECTIONS } from '@myiworlds/enums';
export type LoggedInUser = GuestUser | User;

export interface User {
  id: string;
  collection: FIRESTORE_COLLECTIONS.USERS;
  email: string;
  photoURL: string | null;
  isSystemAdmin: boolean;
  canCreate: boolean;
  dateCreated: number;
  dateUpdated: number;
}

export interface UserClone extends User {
  collection: FIRESTORE_COLLECTIONS.PROFILES_CLONES;
}

export interface GuestUser extends User {
  id: null;
}

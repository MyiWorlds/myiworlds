import { FIRESTORE_COLLECTIONS } from '@myiworlds/enums';
import { User } from '@myiworlds/types';

export class UserDoesNotExist implements User {
  id: string;
  collection: 'users';
  email: string;
  photoURL: string | null;
  isSystemAdmin: boolean;
  canCreate: boolean;
  dateCreated: number;
  dateUpdated: number;
  profiles: [];

  constructor() {
    this.id = `does-not-exist-${Date.now()}-${Math.random()}`;
    this.collection = FIRESTORE_COLLECTIONS.USERS;
    this.email = 'does@not.exist';
    this.photoURL = null;
    this.isSystemAdmin = false;
    this.canCreate = false;
    this.dateCreated = Date.now();
    this.dateUpdated = Date.now();
    this.profiles = [];
  }

  create() {
    return {
      ...this,
    };
  }
}

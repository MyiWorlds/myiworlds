import { UserClone } from '@myiworlds/types';

export class UserClonePermssionDenied implements UserClone {
  id: string;
  collection: 'users-clones';
  email: string;
  photoURL: string | null;
  isSystemAdmin: boolean;
  canCreate: boolean;
  dateCreated: number;
  dateUpdated: number;
  clonedFrom: string;

  constructor() {
    this.id = `permission-denied-${Date.now()}-${Math.random()}`;
    this.collection = 'users-clones';
    this.email = 'permission@was.denied';
    this.photoURL = null;
    this.isSystemAdmin = false;
    this.canCreate = false;
    this.dateCreated = Date.now();
    this.dateUpdated = Date.now();
  }

  create() {
    return {
      ...this,
    };
  }
}

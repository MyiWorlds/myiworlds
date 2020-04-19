import { UserClone } from '@myiworlds/types';

export class UserCloneDoesNotExist implements UserClone {
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
    this.id = `does-not-exist-${Date.now()}-${Math.random()}`;
    this.collection = 'users-clones';
    this.email = 'does@not.exist';
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

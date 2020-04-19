import { User } from '@myiworlds/types';

export class UserPermssionDenied implements User {
  id: string;
  collection: 'users';
  email: string;
  photoURL: string | null;
  isSystemAdmin: boolean;
  canCreate: boolean;
  dateCreated: number;
  dateUpdated: number;
  profiles: string[];

  constructor() {
    this.id = `permission-denied-${Date.now()}-${Math.random()}`;
    this.collection = 'users';
    this.email = 'permission@was.denied';
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

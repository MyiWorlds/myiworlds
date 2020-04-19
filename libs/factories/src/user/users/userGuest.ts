import { User } from '@myiworlds/types';

export class UserGuest implements User {
  id: string;
  collection: 'users';
  email: string;
  photoURL: string | null;
  isSystemAdmin: boolean;
  canCreate: boolean;
  profiles: string[];
  dateCreated: number;
  dateUpdated: number;

  constructor() {
    this.id = `user-guest-${Date.now()}-${Math.random()}`;
    this.collection = 'users';
    this.email = 'guest@user.com';
    this.profiles = ['guest'];
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

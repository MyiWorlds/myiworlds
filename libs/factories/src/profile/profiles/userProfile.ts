import { Profile } from '@myiworlds/types';

export class UserProfile implements Profile {
  id: string;
  collection: 'profiles';
  username: string;
  publicHome: string;
  theme: string;
  addToHistory: boolean;
  home: string;
  history: string;
  dateCreated: number;
  dateUpdated: number;
  userId: string;

  constructor() {
    this.collection = 'profiles';
    this.dateCreated = Date.now();
    this.dateUpdated = Date.now();
    this.addToHistory = true;
  }

  create() {
    return {
      ...this,
    };
  }

  createWithValues(profile: Profile) {
    return {
      ...this,
      ...profile,
    };
  }
}

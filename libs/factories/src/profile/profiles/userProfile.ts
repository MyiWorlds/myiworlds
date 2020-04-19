import { UserProfileData } from '@myiworlds/types';

export class UserProfile implements UserProfileData {
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

  createWithValues(profile: UserProfileData) {
    return {
      ...this,
      ...profile,
    };
  }
}

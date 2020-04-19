import { PublicProfileData } from '@myiworlds/types';

export class ProfileGuest implements PublicProfileData {
  id: string;
  collection: 'profiles';
  username: string;
  publicHome: undefined;
  theme: undefined;

  constructor() {
    this.id = `guest`;
    this.collection = 'profiles';
    this.username = 'guest';
    // this.theme = null; // Add default theme created at app start time
    this.publicHome = undefined;
  }

  create() {
    return {
      ...this,
    };
  }
}

import { PublicProfileData } from '@myiworlds/types';

export class ProfilePermssionDenied implements PublicProfileData {
  id: string;
  collection: 'profiles';
  type: 'PERMISSION_DENIED';
  username: string;

  constructor() {
    this.id = `does-not-exist-${Date.now()}-${Math.random()}`;
    this.type = 'PERMISSION_DENIED';
    this.collection = 'profiles';
    this.username = 'permission-denied';
  }

  create() {
    return this as PublicProfileData;
  }
}

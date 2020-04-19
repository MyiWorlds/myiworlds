import { PublicProfileCloneHydrated } from '@myiworlds/types';

export class ProfileClonePermssionDenied implements PublicProfileCloneHydrated {
  id: string;
  collection: 'profiles-clones';
  type: 'PERMISSION_DENIED';
  username: string;
  clonedFrom: string;

  constructor() {
    this.id = `does-not-exist-${Date.now()}-${Math.random()}`;
    this.type = 'PERMISSION_DENIED';
    this.collection = 'profiles-clones';
    this.username = 'permission-denied';
  }

  create() {
    return this;
  }
}

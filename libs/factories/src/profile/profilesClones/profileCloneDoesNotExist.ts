import { PublicProfileClone } from '@myiworlds/types';

export class ProfileCloneDoesNotExist implements PublicProfileClone {
  id: string;
  collection: 'profiles-clones';
  username: string;
  publicHome: undefined;
  theme: undefined;
  clonedFrom: string;

  constructor() {
    this.id = `does-not-exist-${Date.now()}-${Math.random()}`;
    this.collection = 'profiles-clones';
    this.username = 'does-not-exist';
  }

  create() {
    return {
      ...this,
    };
  }
}

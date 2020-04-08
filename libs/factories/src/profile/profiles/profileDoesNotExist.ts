import { PublicProfile } from '@myiworlds/types';

export class ProfileDoesNotExist implements PublicProfile {
  id: string;
  collection: 'profiles';
  username: string;
  publicHome: undefined;
  theme: undefined;

  constructor() {
    this.id = `does-not-exist-${Date.now()}-${Math.random()}`;
    this.collection = 'profiles';
    this.username = 'does-not-exist';
  }

  create() {
    return {
      ...this,
    };
  }
}

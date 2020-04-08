import { CircleClone } from '@myiworlds/types';

export class CircleClonePermssionDenied implements CircleClone {
  id: string | null;
  collection: 'circles-clones';
  type: 'PERMISSION_DENIED';
  title: string;
  clonedFrom: string;

  constructor() {
    this.id = `does-not-exist-${Date.now()}-${Math.random()}`;
    this.type = 'PERMISSION_DENIED';
    this.collection = 'circles-clones';
    this.title = 'Sorry, you do not have the required permissions to see this.';
  }

  create() {
    return this;
  }
}

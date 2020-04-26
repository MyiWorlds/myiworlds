import { Circle } from '@myiworlds/types';

export class CirclePermssionDenied implements Circle {
  id: string;
  collection: 'circles';
  type: 'PERMISSION_DENIED';
  title: string;

  constructor() {
    this.id = `permission-denied-${Date.now()}-${Math.random()}`;
    this.type = 'PERMISSION_DENIED';
    this.collection = 'circles';
    this.title = 'Sorry, you do not have the required permissions to see this.';
  }

  create() {
    return this;
  }
}

import { CircleClone, Header } from '@myiworlds/types';

export class CircleCloneDoesNotExist implements CircleClone {
  id: string;
  collection: 'circles-clones';
  type: 'DOES_NOT_EXIST';
  title: string;
  clonedFrom: string;

  constructor() {
    this.id = `does-not-exist-${Date.now()}-${Math.random()}`;
    this.collection = 'circles-clones';
    this.type = 'DOES_NOT_EXIST';
    this.title = 'Does Not Exist';
  }

  create(header?: Header) {
    return {
      ...this,
      ...header,
    };
  }
}

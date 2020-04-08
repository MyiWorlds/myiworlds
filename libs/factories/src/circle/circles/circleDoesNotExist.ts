import { Circle, Header } from '@myiworlds/types';

export class CircleDoesNotExist implements Circle {
  id: string;
  collection: 'circles';
  type: 'DOES_NOT_EXIST';
  title: string;

  constructor() {
    this.id = `does-not-exist-${Date.now()}-${Math.random()}`;
    this.collection = 'circles';
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

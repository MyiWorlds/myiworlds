import { Circle, Header } from '@myiworlds/types';

export class CircleKeyValue implements Circle {
  id: string | null;
  collection: 'circles';
  type: 'KEY_VALUE';
  title: string;
  key: string;
  string: string;

  constructor() {
    this.id = null;
    this.type = 'KEY_VALUE';
    this.collection = 'circles';
  }

  create(creator: string, header: Header, key: string, string: string) {
    return {
      ...this,
      ...header,
      creator,
      key,
      string,
    };
  }
}

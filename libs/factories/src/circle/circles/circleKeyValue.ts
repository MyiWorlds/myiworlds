import { Circle, Header } from '@myiworlds/types';
import { HeaderFactory } from './headerFactory';

export class CircleKeyValue implements Circle {
  id: string;
  collection: 'circles';
  type: 'KEY_VALUE';
  title: string;
  key: string;
  string: string;

  constructor() {
    // this.id = null;
    this.type = 'KEY_VALUE';
    this.collection = 'circles';
  }

  create({
    selectedProfileId,
    header,
    key,
    string,
  }: {
    selectedProfileId: string;
    header: Header;
    key: string;
    string: string;
  }) {
    header = new HeaderFactory().create({
      selectedProfileId,
      defaultValues: header,
    });
    return {
      ...this,
      ...header,
      key,
      string,
    };
  }
}

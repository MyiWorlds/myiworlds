import { Circle, Header } from '@myiworlds/types';
import { HeaderFactory } from './headerFactory';

export class CircleString implements Circle {
  id: string;
  collection: 'circles';
  type: 'STRING';
  string: string;

  constructor() {
    this.collection = 'circles';
    this.type = 'STRING';
  }

  create({
    selectedProfileId,
    header,
    string,
  }: {
    selectedProfileId: string;
    header: Header;
    string: string;
  }) {
    header = new HeaderFactory().create({
      selectedProfileId,
      defaultValues: header,
    });

    return {
      ...header,
      type: this.type,
      collection: this.collection,
      string,
    };
  }
}

import { Circle, Header } from '@myiworlds/types';
import { HeaderFactory } from './headerFactory';

export class CircleNumber implements Circle {
  id: string | null;
  collection: 'circles';
  type: 'NUMBER';
  number: number;

  constructor() {
    this.type = 'NUMBER';
    this.collection = 'circles';
  }

  create({
    selectedProfileId,
    header,
    number,
  }: {
    selectedProfileId: string;
    header: Header;
    number: number;
  }) {
    header = new HeaderFactory().create({
      selectedProfileId,
      defaultValues: header,
    });

    return {
      ...header,
      type: this.type,
      collection: this.collection,
      number,
    };
  }
}

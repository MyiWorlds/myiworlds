import { Circle, Header } from '@myiworlds/types';
import { HeaderFactory } from './headerFactory';

export class CircleDate implements Circle {
  id: string;
  collection: 'circles';
  type: 'DATE';
  date: number;

  constructor() {
    this.type = 'DATE';
    this.collection = 'circles';
  }

  create({
    selectedProfileId,
    header,
    date,
  }: {
    selectedProfileId: string;
    header: Header;
    date: number;
  }) {
    header = new HeaderFactory().create({
      selectedProfileId,
      defaultValues: header,
    });

    return {
      ...header,
      type: this.type,
      collection: this.collection,
      date,
    };
  }
}

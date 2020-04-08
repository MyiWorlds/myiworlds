import { Circle, Header } from '@myiworlds/types';
import { HeaderFactory } from './headerFactory';

export class CircleLine implements Circle {
  id: string | null;
  collection: 'circles';
  type: 'LINE';
  line: string;

  constructor() {
    this.type = 'LINE';
    this.collection = 'circles';
  }

  create({
    selectedProfileId,
    header,
    line,
  }: {
    selectedProfileId: string;
    header: Header;
    line: string;
  }) {
    header = new HeaderFactory().create({
      selectedProfileId,
      defaultValues: header,
    });

    return {
      ...header,
      type: this.type,
      collection: this.collection,
      line,
    };
  }
}

import { Circle, Header } from '@myiworlds/types';
import { HeaderFactory } from './headerFactory';

export class CircleLines implements Circle {
  id: string | null;
  collection: 'circles';
  type: 'LINES';
  lines: string[];

  constructor() {
    this.type = 'LINES';
    this.collection = 'circles';
  }

  create({
    selectedProfileId,
    header,
    lines,
  }: {
    selectedProfileId: string;
    header: Header;
    lines: string[];
  }) {
    header = new HeaderFactory().create({
      selectedProfileId,
      defaultValues: header,
    });

    return {
      ...header,
      type: this.type,
      collection: this.collection,
      lines,
    };
  }
}

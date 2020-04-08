import { Circle, Header } from '@myiworlds/types';
import { HeaderFactory } from './headerFactory';

export class CircleData implements Circle {
  id: string | null;
  collection: 'circles';
  type: 'DATA';
  data: {
    [key: string]: any;
  };

  constructor() {
    this.collection = 'circles';
    this.type = 'DATA';
  }

  create({
    selectedProfileId,
    header,
    data,
  }: {
    selectedProfileId: string;
    header: Header;
    data: {
      [key: string]: any;
    };
  }) {
    header = new HeaderFactory().create({
      selectedProfileId,
      defaultValues: header,
    });

    return {
      ...header,
      type: this.type,
      collection: this.collection,
      data,
    };
  }
}

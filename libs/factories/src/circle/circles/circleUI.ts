import { Circle, Header } from '@myiworlds/types';
import { HeaderFactory } from './headerFactory';

/*
  Takes code that is put to string and saves it as string
*/
export class CircleUI implements Circle {
  id: string;
  collection: 'circles';
  type: 'UI';
  string: string;

  constructor() {
    this.collection = 'circles';
    this.type = 'UI';
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

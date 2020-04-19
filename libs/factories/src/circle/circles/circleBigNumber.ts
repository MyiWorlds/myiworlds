import { Circle, Header } from '@myiworlds/types';
import { HeaderFactory } from './headerFactory';

export class CircleBigNumber implements Circle {
  id: string | null;
  collection: 'circles';
  type: 'BIG_NUMBER';
  bigNumber: bigint;

  constructor() {
    this.type = 'BIG_NUMBER';
    this.collection = 'circles';
  }

  create({
    selectedProfileId,
    header,
    bigNumber,
  }: {
    selectedProfileId: string;
    header: Header;
    bigNumber: bigint;
  }) {
    header = new HeaderFactory().create({
      selectedProfileId,
      defaultValues: header,
    });

    return {
      ...header,
      type: this.type,
      collection: this.collection,
      bigNumber,
    };
  }
}

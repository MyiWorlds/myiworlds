import { Circle, Header } from '@myiworlds/types';
import { HeaderFactory } from './headerFactory';

export class CircleBoolean implements Circle {
  id: string;
  collection: 'circles';
  type: 'BOOLEAN';
  boolean: boolean;

  constructor() {
    this.collection = 'circles';
    this.type = 'BOOLEAN';
  }

  create({
    selectedProfileId,
    header,
    boolean,
  }: {
    selectedProfileId: string;
    header: Header;
    boolean: boolean;
  }) {
    header = new HeaderFactory().create({
      selectedProfileId,
      defaultValues: header,
    });

    return {
      ...header,
      type: this.type,
      collection: this.collection,
      boolean,
    };
  }
}

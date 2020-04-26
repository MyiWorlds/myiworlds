import { Circle, Header } from '@myiworlds/types';
import { HeaderFactory } from './headerFactory';

export class CircleGeoPoint implements Circle {
  id: string;
  collection: 'circles';
  type: 'GEO_POINT';
  geoPoint: string;

  constructor() {
    this.type = 'GEO_POINT';
    this.collection = 'circles';
  }

  create({
    selectedProfileId,
    header,
    geoPoint,
  }: {
    selectedProfileId: string;
    header: Header;
    geoPoint: string;
  }) {
    header = new HeaderFactory().create({
      selectedProfileId,
      defaultValues: header,
    });

    return {
      ...header,
      type: this.type,
      collection: this.collection,
      geoPoint,
    };
  }
}

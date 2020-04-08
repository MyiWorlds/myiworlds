import { Circle, Header, ViewedByIds } from '@myiworlds/types';
import { FirestoreCollectionTypes } from '../../../../types/src/firebase';
import { HeaderFactory } from './headerFactory';

export class CircleViewedByIds implements Circle {
  id: string | null;
  collection: 'circles';
  type: 'VIEWED_BY_IDS';
  data: ViewedByIds;

  constructor() {
    this.type = 'VIEWED_BY_IDS';
    this.collection = 'circles';
  }

  create({
    selectedProfileId,
    header,
    collection,
    ids,
  }: {
    selectedProfileId: string;
    header: Header;
    collection: FirestoreCollectionTypes;
    ids: string[];
  }) {
    header = new HeaderFactory().create({
      selectedProfileId,
      defaultValues: header,
    });

    return {
      ...header,
      type: this.type,
      collection: this.collection,
      data: {
        collection,
        ids,
      },
    };
  }
}

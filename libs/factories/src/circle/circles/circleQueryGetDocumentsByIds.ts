import { Circle, Header, QueryGetDocumentsByIds } from '@myiworlds/types';
import { HeaderFactory } from './headerFactory';

export class CircleQueryGetDocumentsByIds implements Circle {
  id: string;
  collection: 'circles';
  type: 'QUERY_GET_DOCUMENTS_BY_IDS';
  data: QueryGetDocumentsByIds;

  constructor() {
    this.collection = 'circles';
    this.type = 'QUERY_GET_DOCUMENTS_BY_IDS';
  }

  create({
    selectedProfileId,
    header,
    data,
  }: {
    selectedProfileId: string;
    header: Header;
    data: QueryGetDocumentsByIds;
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

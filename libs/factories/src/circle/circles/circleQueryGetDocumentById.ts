import { Circle, Header, QueryGetDocumentById } from '@myiworlds/types';
import { HeaderFactory } from './headerFactory';

export class CircleQueryGetDocumentById implements Circle {
  id: string | null;
  collection: 'circles';
  type: 'QUERY_GET_DOCUMENT_BY_ID';
  data: QueryGetDocumentById;

  constructor() {
    this.collection = 'circles';
    this.type = 'QUERY_GET_DOCUMENT_BY_ID';
  }

  create({
    selectedProfileId,
    header,
    data,
  }: {
    selectedProfileId: string;
    header: Header;
    data: QueryGetDocumentById;
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

import { Circle, Header, QueryGetDocumentsByFilters } from '@myiworlds/types';
import { HeaderFactory } from './headerFactory';

export class CircleQueryGetDocumentsByFilters implements Circle {
  id: string;
  collection: 'circles';
  type: 'QUERY_GET_DOCUMENTS_BY_FILTERS';
  data: QueryGetDocumentsByFilters;

  constructor() {
    this.collection = 'circles';
    this.type = 'QUERY_GET_DOCUMENTS_BY_FILTERS';
  }

  create({
    selectedProfileId,
    header,
    data,
  }: {
    selectedProfileId: string;
    header: Header;
    data: QueryGetDocumentsByFilters;
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

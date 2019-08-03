export interface IFilter {
  property: string;
  condition: '==' | '<' | '>' | '<=' | '>=' | 'array-contains';
  value: any;
}

export interface IOrderBy {
  property: string;
  ascending: boolean;
}

export interface IGetDocumentsByFilters {
  filters: IFilter;
  orderBy: IOrderBy;
  numberOfResults: number;
  hasMoreResults: boolean;
}

export interface IGetDocumentsByFiltersResponse {
  type: string;
  data: {
    collection: string;
    filters: IFilter[];
    orderBy: IOrderBy;
    numberOfResults: number;
    hasMoreResults: boolean;
    cursor: any | null;
  };
  lines: any[];
}

export interface IGetDocumentsByIds {
  collection: string;
  ids: string[];
}

export interface IGetDocumentById {
  id: string;
  collection: string;
}

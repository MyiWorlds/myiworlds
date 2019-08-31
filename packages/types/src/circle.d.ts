import {
  IGetDocumentsByFilters,
  IGetDocumentById,
  IGetDocumentsByIds,
} from './queries.d';

export type Property =
  | 'parent'
  | 'copiedFrom'
  | 'type'
  | 'public'
  | 'rating'
  | 'tags'
  | 'slug'
  | 'title'
  | 'subtitle'
  | 'description'
  | 'media'
  | 'icon'
  | 'creator'
  | 'owner'
  | 'viewers'
  | 'editors'
  | 'dateCreated'
  | 'dateUpdated'
  | 'key'
  | 'string'
  | 'data'
  | 'number'
  | 'bigNumber'
  | 'boolean'
  | 'date'
  | 'geoPoint'
  | 'line'
  | 'lines';

export interface Circle {
  id?: string | null;
  cached?: boolean;
  cache?: any;
  collection?: 'circles';
  pii?: boolean | null;
  parent?: string | null;
  copiedFrom?: string | null;
  slug?: string | null;
  public?: boolean | null;
  passwordRequired?: boolean | null;
  type?: string | null;
  properties?: Property[] | null;
  settings?: string | null;
  rating?: string | null;
  tags?: string[] | null;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  media?: string | null;
  icon?: string | null;
  creator?: string | null;
  owner?: string | null;
  viewers?: string[] | null;
  editors?: string[] | null;
  dateCreated?: any | null;
  dateUpdated?: any | null;
  string?: string | null;
  key?: string;
  data?:
    | any
    | null
    | IGetDocumentsByFilters
    | IGetDocumentById
    | IGetDocumentsByIds;
  number?: number | null;
  bigNumber?: any | null;
  boolean?: boolean | null;
  date?: any | null;
  geoPoint?: any | null;
  line?: string | null;
  lines?: string[] | null;
}

export interface CircleClone {
  id: string;
  collection: 'circles-clones';
  cached?: boolean;
  cache?: any;
  pii?: boolean | null;
  parent?: string | null;
  clonedFrom?: string | null;
  slug?: string | null;
  public?: boolean | null;
  passwordRequired?: boolean | null;
  type?: string | null;
  properties?: Property[] | null;
  settings?: string | null;
  rating?: string | null;
  tags?: string[] | null;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  media?: string | null;
  icon?: string | null;
  creator?: string | null;
  owner?: string | null;
  viewers?: string[] | null;
  editors?: string[] | null;
  dateCreated?: any | null;
  dateUpdated?: any | null;
  string?: string | null;
  key?: string;
  data?:
    | any
    | null
    | IGetDocumentsByFilters
    | IGetDocumentById
    | IGetDocumentsByIds;
  number?: number | null;
  bigNumber?: any | null;
  boolean?: boolean | null;
  date?: any | null;
  geoPoint?: any | null;
  line?: string | null;
  lines?: string[] | null;
}

export interface SearchCircle {
  id: string;
  title?: string | null;
  type: string;
  lines: SearchCircle[];
  data:
    | any
    | null
    | IGetDocumentsByFilters
    | IGetDocumentById
    | IGetDocumentsByIds;
}

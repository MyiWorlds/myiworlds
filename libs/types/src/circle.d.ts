import { FIRESTORE_COLLECTIONS } from '@myiworlds/enums';
import { FirestoreCollectionTypes } from './firebase';
import { PublicProfile, PublicProfileClone } from './profile';

export type MediaTypes =
  | 'MEDIA_FONT_ICON'
  | 'MEDIA_IMAGE_GCS'
  | 'MEDIA_VIDEO_GCS'
  | 'MEDIA_AUDIO_GCS'
  | 'MEDIA_IMAGE_HREF'
  | 'MEDIA_VIDEO_HREF'
  | 'MEDIA_AUDIO_HREF';

export type PossibleCircleTypes =
  | 'STRING'
  | 'BOOLEAN'
  | 'DATA'
  | 'DATE'
  | 'NUMBER'
  | 'BIG_NUMBER'
  | 'KEY_VALUE'
  | 'GEO_POINT'
  | 'DOES_NOT_EXIST'
  | 'PERMISSION_DENIED'
  | 'LINE'
  | 'LINES'
  | 'UI'
  | 'UPDATED'
  | 'CREATED'
  | 'VIEWED'
  | 'VIEWED_BY_IDS'
  | 'EDGE'
  | 'EDGE_NODE'
  | 'QUERY_GET_DOCUMENT_BY_ID'
  | 'QUERY_GET_DOCUMENTS_BY_IDS'
  | 'QUERY_GET_DOCUMENTS_BY_FILTERS'
  | MediaTypes;

export interface Header {
  id: string | null;
  collection?: FIRESTORE_COLLECTIONS.CIRCLES;
  type?: PossibleCircleTypes;
  parent?: string;
  cached?: boolean;
  cache?: Circle;
  pii?: boolean;
  copiedFrom?: string;
  autoUpdate?: boolean;
  slug?: string;
  public?: boolean;
  passwordRequired?: boolean;
  tags?: string[];
  title?: string;
  subtitle?: string;
  description?: string;
  media?: string;
  creator?: string;
  owner?: string;
  viewers?: string[];
  editors?: string[];
  ui?: string;
  dateCreated?: number;
  dateUpdated?: number;
}

export interface Circle extends Header {
  key?: string;
  string?: string;
  data?:
    | QueryGetDocumentById
    | QueryGetDocumentsByIds
    | QueryGetDocumentsByFilters
    | any
    | {
        [key: string]: any;
      };
  number?: number;
  bigNumber?: bigint;
  boolean?: boolean;
  date?: any;
  geoPoint?: string;
  line?: string;
  lines?: string[];
}

export interface CircleHydrated extends Circle {
  id: string;
  media?: CircleHydrated;
}

export interface CircleClone extends Circle {
  collection: FIRESTORE_COLLECTIONS.CIRCLES_CLONES;
  clonedFrom: string;
}

export interface CircleCloneHydrated extends Circle {
  collection: FIRESTORE_COLLECTIONS.CIRCLES_CLONES;
  clonedFrom: string;
}

export interface Filter {
  property: string;
  condition: '==' | '<' | '>' | '<=' | '>=' | 'array-contains';
  value: string | number | boolean;
}

export interface OrderBy {
  property: string;
  ascending: boolean;
}

export interface QueryGetDocumentsByFilters {
  collection: FirestoreCollectionTypes;
  filters: Filter[];
  orderBy: OrderBy;
  numberOfResults: number;
  hasMoreResults: boolean;
  cursor: string | null;
  results: Circle[] | CircleClone[] | PublicProfile[] | PublicProfileClone[];
}

export interface GetDocumentById {
  id: string;
  collection: FirestoreCollectionTypes;
}

export interface QueryGetDocumentById extends GetDocumentById {
  result: Circle | CircleClone | PublicProfile | PublicProfileClone | null;
}

export interface QueryGetDocumentsByIds {
  documents: GetDocumentById[];
  results: (
    | Circle
    | CircleClone
    | PublicProfile
    | PublicProfileClone
    | never)[];
}

export interface ViewedByIds {
  collection: FirestoreCollectionTypes;
  ids: string[];
}

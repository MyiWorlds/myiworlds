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
  | 'SELECT'
  | 'BIG_NUMBER'
  | 'KEY_VALUE'
  | 'GEO_POINT'
  | 'DOES_NOT_EXIST'
  | 'PERMISSION_DENIED'
  | 'LINE'
  | 'LINES'
  | 'UI'
  | 'LAYOUTS'
  | 'THEME'
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
  id: string;
  collection?: FIRESTORE_COLLECTIONS.CIRCLES;
  type?: PossibleCircleTypes;
  parent?: string;
  cached?: boolean;
  cache?: string;
  pii?: boolean;
  clonedFrom?: string;
  copiedFrom?: string;
  copiedFromClone?: boolean;
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
  layouts?: string;
  dateCreated?: number;
  dateUpdated?: number;
}

export interface HeaderHydrated {
  id: string;
  collection?:
    | FIRESTORE_COLLECTIONS.CIRCLES
    | FIRESTORE_COLLECTIONS.CIRCLES_CLONES;
  type?: PossibleCircleTypes;
  parent?: CircleHydrated;
  cached?: boolean;
  cache?: CircleHydrated;
  pii?: boolean;
  clonedFrom?: string;
  copiedFrom?: CircleHydrated;
  autoUpdate?: boolean;
  slug?: string;
  public?: boolean;
  passwordRequired?: boolean;
  tags?: string[];
  title?: string;
  subtitle?: string;
  description?: string;
  media?: CircleHydrated;
  creator?: PublicProfile;
  owner?: PublicProfile;
  viewers?: PublicProfile[];
  editors?: PublicProfile[];
  ui?: CircleHydrated;
  layouts?: CircleHydrated;
  dateCreated?: number;
  dateUpdated?: number;
}

export interface Content {
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
  date?: number;
  geoPoint?: string;
  line?: string;
  lines?: string[];
}

export interface Circle extends Header, Content {}

export interface ContentHydrated {
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
  date?: number;
  geoPoint?: string;
  media?: CircleHydrated;
  line?: CircleHydrated;
  lines?: CircleHydrated[];
}

export interface CircleHydrated extends HeaderHydrated, ContentHydrated {}

export interface UpdateCircleMutation extends Circle {
  __typename?: 'Circle';
  merge?: boolean;
}

export interface CircleCloneHydrated extends CircleHydrated {
  collection: FIRESTORE_COLLECTIONS.CIRCLES_CLONES;
  clonedFrom: Circle;
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
  results: Circle[] | PublicProfile[] | PublicProfileClone[];
}

export interface GetDocumentById {
  id: string;
  collection: FirestoreCollectionTypes;
}

export interface QueryGetDocumentById extends GetDocumentById {
  result: Circle | PublicProfile | PublicProfileClone | null;
}

export interface QueryGetDocumentsByIds {
  documents: GetDocumentById[];
  results: (Circle | PublicProfile | PublicProfileClone | never)[];
}

export interface ViewedByIds {
  collection: FirestoreCollectionTypes;
  ids: string[];
}

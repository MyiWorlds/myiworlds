import { FIRESTORE_COLLECTIONS } from '../../enums/src/firestoreCollections';

export interface Circle {
  id: string | null;
  collection: FIRESTORE_COLLECTIONS.CIRCLES;
  type?: string;
  cached?: boolean;
  cache?: any;
  pii?: boolean;
  parent?: string;
  copiedFrom?: string;
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
  dateCreated?: any;
  dateUpdated?: any;
  key?: string;
  string?: string;
  data?: any;
  number?: number;
  bigNumber?: any;
  boolean?: boolean;
  date?: any;
  geoPoint?: string;
  line?: string;
  lines?: string[];
}

export interface CircleClone extends Circle {
  collection: FIRESTORE_COLLECTIONS.CIRCLES_CLONES;
}

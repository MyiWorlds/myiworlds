import { FIRESTORE_COLLECTIONS } from '@myiworlds/enums';

export interface PublicProfile {
  id: string;
  collection?: FIRESTORE_COLLECTIONS.PROFILES;
  username: string;
  dateCreated?: number;
  dateUpdated?: number;
  theme?: string;
  rating?: string;
  following?: string;
  level?: string;
  publicHome?: string;
  media?: string;
  circleUIs?: string;
}

export interface Profile extends PublicProfile {
  addToHistory?: boolean;
  home?: string;
  history?: string;
  overrideCircleUIs?: boolean;
  userId: string | null;
}

export interface CreatedProfile extends Profile {
  id: string;
}

export interface ProfileClone extends Profile {
  collection: FIRESTORE_COLLECTIONS.PROFILES_CLONES;
  clonedFrom: string;
}

export interface PublicProfileClone extends PublicProfile {
  collection: FIRESTORE_COLLECTIONS.PROFILES_CLONES;
  clonedFrom: string;
}

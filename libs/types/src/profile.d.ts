import { CircleHydrated } from '@myiworlds/types';
import { FIRESTORE_COLLECTIONS } from '@myiworlds/enums';

interface PublicProfileBase {
  id: string;
  collection?: FIRESTORE_COLLECTIONS.PROFILES;
  username: string;
  dateCreated?: number;
  dateUpdated?: number;
}

export interface PublicProfileHydrated extends PublicProfileBase {
  media?: CircleHydrated;
  theme?: CircleHydrated;
  rating?: CircleHydrated;
  following?: CircleHydrated;
  level?: CircleHydrated;
  publicHome?: CircleHydrated;
  circleUIs?: CircleHydrated;
}

export interface UserProfileData extends PublicProfileBase {
  addToHistory?: boolean;
  home?: string;
  history?: string;
  overrideCircleUIs?: boolean;
  userId: string | null;
  media?: string;
  theme?: string;
  rating?: string;
  following?: string;
  level?: string;
  publicHome?: string;
  media?: string;
  circleUIs?: string;
}

export interface UserProfileHydrated extends PublicProfileHydrated {
  addToHistory?: boolean;
  home?: string;
  history?: string;
  overrideCircleUIs?: boolean;
  userId: string | null;
  media?: CircleHydrated;
  theme?: CircleHydrated;
  rating?: CircleHydrated;
  following?: CircleHydrated;
  level?: CircleHydrated;
  publicHome?: CircleHydrated;
  media?: CircleHydrated;
  circleUIs?: CircleHydrated;
}

export interface PublicProfileData extends PublicProfileBase {
  media?: string;
  theme?: string;
  rating?: string;
  following?: string;
  level?: string;
  publicHome?: string;
  media?: string;
  circleUIs?: string;
}

export interface UserProfileCloneHydrated extends UserProfileCreated {
  collection: FIRESTORE_COLLECTIONS.PROFILES_CLONES;
  clonedFrom: UserProfileCreated;
}

export interface UserProfileCloneData extends UserProfileData {
  collection: FIRESTORE_COLLECTIONS.PROFILES_CLONES;
  clonedFrom: string;
}

export interface PublicProfileCloneHydrated extends PublicProfileData {
  collection: FIRESTORE_COLLECTIONS.PROFILES_CLONES;
  clonedFrom: string;
}

export interface PublicProfileCloneHydrated extends PublicProfileData {
  collection: FIRESTORE_COLLECTIONS.PROFILES_CLONES;
  clonedFrom: PublicProfileData;
}

import { Profile } from './profile.d';
export interface User {
  id?: string | null;
  collection?: 'users';
  email?: string | null;
  canCreate?: boolean | null;
  dateCreated?: any | null;
  dateUpdated?: any | null;
  levelTotal?: string | null;
  balanceTotal?: string | null;
  ratingTotal?: string | null;
  allMyThemes?: string | null;
  allMyTypeStyles?: string | null;
  inbox?: string | null;
  search?: string | null;
  selectedProfile?: string | null;
  profiles?: Array<string> | null;
}

export interface LoggedInUser {
  id: string;
  email: string;
  canCreate: boolean;
  dateCreated?: string;
  dateUpdated?: string;
  selectedProfile: Profile | null;
  profiles: Profile[];
  // allMyThemes?: string | null;
  // allMyTypeStyles?: string | null;
  // inbox?: string | null;
  // search?: string | null;
}

export interface UserClone {
  id: string;
  collection?: 'users-clones';
  email?: string | null;
  canCreate?: boolean | null;
  dateCreated?: any | null;
  dateUpdated?: any | null;
  levelTotal?: string | null;
  balanceTotal?: string | null;
  ratingTotal?: string | null;
  allMyThemes?: string | null;
  allMyTypeStyles?: string | null;
  inbox?: string | null;
  search?: string | null;
  selectedProfile?: string | null;
  profiles?: Array<string> | null;
}

export interface User {
  id?: string | null;
  collection?: string | null;
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

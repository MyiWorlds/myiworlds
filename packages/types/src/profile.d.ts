export interface Profile {
  id?: string | null;
  collection?: 'profiles';
  public?: boolean | null;
  username?: string | null;
  canCreate?: boolean | null;
  profileMedia?: string | null;
  dateCreated?: any | null;
  dateUpdated?: any | null;
  level?: string | null;
  rating?: string | null;
  isDarkTheme?: boolean | null;
  circleTypeOverrides?: string | null;
  overrideCircleTypes?: boolean | null;
  myTheme?: string | null;
  homePublic?: string | null;
  home?: string | null;
  following?: string | null;
  addToHistory?: boolean | null;
  history?: string | null;
}

export interface ProfileClone {
  id: string | null;
  collection: 'profiles-clones';
  public?: boolean | null;
  username?: string | null;
  canCreate?: boolean | null;
  profileMedia?: string | null;
  dateCreated?: any | null;
  dateUpdated?: any | null;
  level?: string | null;
  rating?: string | null;
  isDarkTheme?: boolean | null;
  circleTypeOverrides?: string | null;
  overrideCircleTypes?: boolean | null;
  myTheme?: string | null;
  homePublic?: string | null;
  home?: string | null;
  following?: string | null;
  addToHistory?: boolean | null;
  history?: string | null;
}

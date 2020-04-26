export interface Context {
  userId: string | null;
  selectedProfileId: string | null;
  addToHistory: boolean;
  isSystemAdmin: boolean;
  profileHistoryId: string | null;
  circleLoader: any;
  profileLoader: any;
}

export type Environment = 'development' | 'qa' | 'production';

export interface Context {
  userId: string;
  queriedUserId?: string;
  selectedProfileId: string;
  profileLoader?: any;
  circleLoader?: any;
  validated: boolean;
  addToHistory: boolean;
  profileHistoryId: string;
}

export type Environment = 'development' | 'qa' | 'production';

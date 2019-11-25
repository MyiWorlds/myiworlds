export interface Context {
  userId: string | null;
}

export type Environment = 'development' | 'qa' | 'production';

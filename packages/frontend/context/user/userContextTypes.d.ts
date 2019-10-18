import { LoggedInUser } from '@myiworlds/types';

export interface ProviderStore {
  user: LoggedInUser;
  handleLogout: () => void;
  handleLogin: () => void;
  setUser: (LoggedInUser) => void;
}

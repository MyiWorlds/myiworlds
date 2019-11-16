import { LoggedInUser } from '@myiworlds/types';

export interface ProviderStore {
  user: LoggedInUser;
  handleLogin: () => void;
  handleLogout: () => void;
}

export interface UserToCreate {
  id: string;
  email: string;
}

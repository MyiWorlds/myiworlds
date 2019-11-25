import { LoggedInUser } from '@myiworlds/types';

export interface ProviderStore {
  user: LoggedInUser;
  handleLogin: () => void;
  handleLogout: () => void;
  handleDeleteAccount: () => void;
}

export interface UserToCreate {
  id: string;
  email: string;
  photoURL: string | null;
}

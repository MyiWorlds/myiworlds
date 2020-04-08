import { SelectedProfile } from '@myiworlds/types';

export interface ProviderStore {
  setUsernameToCreate: (username: string) => void;
  setProfileIdToSelect: (username: string | null) => void;
  createProfile: () => void;
  handleCancelCreateProfile: () => void;
  selectedProfile: SelectedProfile;
  usernameToCreate: string;
  profileIdToSelect: string | null;
  createProfileLoading: boolean;
  usernameAvailable: boolean;
  usernameInvalid: boolean;
  getProfileByUsernameLoading: boolean;
  searchTimeoutActive: boolean;
  creatingNew: boolean;
}

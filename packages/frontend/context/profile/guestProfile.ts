import { SelectedProfile } from '@myiworlds/types';

const guestProfile: SelectedProfile = {
  id: 'guest',
  collection: 'profiles',
  public: true,
  username: 'guest',
  canCreate: false,
  profileMedia: null,
  dateCreated: Date.now(),
  dateUpdated: Date.now(),
  level: null,
  rating: null,
  isDarkTheme: true,
  circleTypeOverrides: null,
  overrideCircleTypes: null,
  myTheme: null,
  homePublic: null,
  home: null,
  following: null,
  addToHistory: false,
  history: null,
};

export default guestProfile;

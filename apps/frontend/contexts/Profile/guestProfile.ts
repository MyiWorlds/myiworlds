import { CreatedProfile } from '@myiworlds/types';

const guestProfile: CreatedProfile = {
  id: 'guest',
  collection: 'profiles',
  username: 'guest',
  media: undefined,
  dateCreated: Date.now(),
  dateUpdated: Date.now(),
  theme: undefined,
  publicHome: undefined,
  userId: null,
};

export default guestProfile;

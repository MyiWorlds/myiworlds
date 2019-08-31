import guestProfile from '../profile/guestProfile';
import { LoggedInUser } from '@myiworlds/types';

const guestUser: LoggedInUser = {
  id: null,
  email: 'guest@email.com',
  canCreate: false,
  selectedProfile: guestProfile,
  profiles: [guestProfile],
};

export default guestUser;

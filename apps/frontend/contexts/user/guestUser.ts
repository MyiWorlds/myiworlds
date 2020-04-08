import { FIRESTORE_COLLECTIONS } from '@myiworlds/enums';
import { GuestUser } from '@myiworlds/types';

const guestUser: GuestUser = {
  id: null,
  collection: FIRESTORE_COLLECTIONS.USERS,
  email: 'guest@email.com',
  photoURL: null,
  isSystemAdmin: false,
  dateCreated: Date.now(),
  dateUpdated: Date.now(),
  canCreate: false,
};

export default guestUser;

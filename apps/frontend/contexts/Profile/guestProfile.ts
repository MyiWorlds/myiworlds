import { CircleFactory } from '@myiworlds/factories';
import { UserProfileHydrated } from '@myiworlds/types';

const guestProfile: UserProfileHydrated = {
  id: 'guest',
  collection: 'profiles',
  username: 'guest',
  media: undefined,
  dateCreated: Date.now(),
  dateUpdated: Date.now(),
  theme: new CircleFactory().use('THEME').create({
    selectedProfileId: 'guest',
    header: {
      id: 'theme',
      title: 'Theme',
      description:
        'The theme that this profile uses to interact with the application.',
      public: true,
      type: 'THEME',
    },
  }) as any,
  publicHome: undefined,
  userId: null,
};

export default guestProfile;

import { CircleFactory } from '@myiworlds/factories';
import { googleCloud } from '@myiworlds/credentials';

export const theme = new CircleFactory().use('THEME').create({
  selectedProfileId: googleCloud.applicationCreatorProfile,
  header: {
    id: 'theme',
    title: 'Theme',
    description:
      'The theme that this profile uses to interact with the application.',
    public: true,
    type: 'THEME',
  },
});

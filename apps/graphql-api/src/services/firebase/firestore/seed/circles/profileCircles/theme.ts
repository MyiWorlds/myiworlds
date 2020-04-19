import { CircleFactory } from '@myiworlds/factories';
import { googleCloud } from '@myiworlds/credentials';

export const theme = new CircleFactory().use('DATA').create({
  selectedProfileId: googleCloud.applicationCreatorProfile,
  header: {
    id: 'theme',
    title: 'Theme',
    description:
      'The theme that this profile uses to interact with the application.',
    public: true,
    component: 'THEME',
  },
  data: {
    theme: {
      palette: {
        primary: {
          main: '#2196f3',
        },
        secondary: {
          main: '#f44336',
        },
        type: 'dark',
      },
    },
  },
});

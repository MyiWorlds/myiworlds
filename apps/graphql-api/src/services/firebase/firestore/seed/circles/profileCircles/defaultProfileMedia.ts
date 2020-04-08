import { CircleFactory } from '@myiworlds/factories';
import { googleCloud } from '@myiworlds/credentials';

export const defaultProfileMedia = new CircleFactory()
  .use('MEDIA_FONT_ICON')
  .create({
    selectedProfileId: googleCloud.applicationCreatorProfile,
    header: {
      id: 'default-profile-media',
      title: 'Default profile pic',
      public: true,
    },
    string: 'account-circle',
  });

import { CircleFactory } from '@myiworlds/factories';
import { googleCloud } from '@myiworlds/credentials';

export const booleanMedia = new CircleFactory().use('MEDIA_FONT_ICON').create({
  selectedProfileId: googleCloud.applicationCreatorProfile,
  header: {
    id: 'default-boolean-media',
    title: 'Default boolean media',
    public: true,
  },
  string: 'toggle_on',
});

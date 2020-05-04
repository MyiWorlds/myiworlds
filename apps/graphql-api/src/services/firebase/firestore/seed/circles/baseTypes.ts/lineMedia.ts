import { CircleFactory } from '@myiworlds/factories';
import { googleCloud } from '@myiworlds/credentials';

export const lineMedia = new CircleFactory().use('MEDIA_FONT_ICON').create({
  selectedProfileId: googleCloud.applicationCreatorProfile,
  header: {
    id: 'default-line-media',
    title: 'Default line media',
    public: true,
  },
  string: 'keyboard_tab',
});

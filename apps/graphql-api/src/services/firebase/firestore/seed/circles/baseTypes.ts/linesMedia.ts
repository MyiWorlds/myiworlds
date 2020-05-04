import { CircleFactory } from '@myiworlds/factories';
import { googleCloud } from '@myiworlds/credentials';

export const linesMedia = new CircleFactory().use('MEDIA_FONT_ICON').create({
  selectedProfileId: googleCloud.applicationCreatorProfile,
  header: {
    id: 'default-lines-media',
    title: 'Default lines media',
    public: true,
  },
  string: 'dashboard',
});

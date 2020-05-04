import { CircleFactory } from '@myiworlds/factories';
import { googleCloud } from '@myiworlds/credentials';

export const stringMedia = new CircleFactory().use('MEDIA_FONT_ICON').create({
  selectedProfileId: googleCloud.applicationCreatorProfile,
  header: {
    id: 'default-string-media',
    title: 'Default string media',
    public: true,
  },
  string: 'title',
});

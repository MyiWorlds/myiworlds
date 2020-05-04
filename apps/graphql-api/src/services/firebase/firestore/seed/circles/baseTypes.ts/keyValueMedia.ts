import { CircleFactory } from '@myiworlds/factories';
import { googleCloud } from '@myiworlds/credentials';

export const keyValueMedia = new CircleFactory().use('MEDIA_FONT_ICON').create({
  selectedProfileId: googleCloud.applicationCreatorProfile,
  header: {
    id: 'default-keyvalue-media',
    title: 'Default key value media',
    public: true,
  },
  string: 'hdr_strong',
});

import { CircleFactory } from '@myiworlds/factories';
import { googleCloud } from '@myiworlds/credentials';

export const lines = new CircleFactory().use('LINES').create({
  selectedProfileId: googleCloud.applicationCreatorProfile,
  header: {
    id: 'lines',
    title: 'Lines',
    public: true,
    media: 'default-lines-media',
  },
  lines: [],
});
